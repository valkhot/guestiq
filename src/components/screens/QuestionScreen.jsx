// src/components/screens/QuestionScreen.jsx
// GuestIQ — Question Screen
// S3-07: Tier upgrade prompts after Episode 1 (Amateur) and Episode 4 (Professional).

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

import {
  useQuestionnaire,
  getSecondaryIntentFromQ2Answer,
} from '../../hooks/useQuestionnaire';
import { useSession } from '../../hooks/useSession';
import { useBadges } from '../../hooks/useBadges';
import Question from '../question/Question';
import CuriosityHookScreen from './CuriosityHookScreen';
import TierUpgradeScreen from './TierUpgradeScreen';
import BadgeToast from '../badges/BadgeToast';
import { insertResponse, insertScaleResponse, insertNoneFlag } from '../../services/supabase';
import {
  trackRoutingGateAnswered,
  trackEpisodeStarted,
  trackEpisodeCompleted,
  trackQuestionAnswered,
  trackNoneFlagSelected,
  trackPurposeExpert,
  trackCuriosityHookViewed,
  trackTierUpgradePrompted,
  trackTierUpgradeAccepted,
  trackTierUpgradeDeclined,
} from '../../services/analytics';

const TIER_COLORS = {
  amateur:      '#4ADE80',
  professional: '#60A5FA',
  expert:       '#A78BFA',
};

// Upgrade trigger: which episode completion triggers an upgrade prompt
const UPGRADE_TRIGGERS = {
  amateur:      1, // after Episode 1
  professional: 4, // after Episode 4
};

function getTenseFrame(answerCode) {
  return answerCode === 'B' ? 'anticipatory' : 'retrospective';
}

function getEpisodeForQuestion(question, episodes) {
  if (!question || !episodes) return null;
  return episodes.find((ep) => ep.moduleMappings.includes(question.module)) || null;
}

export default function QuestionScreen({
  tier: initialTier,
  propertyId,
  onComplete,
  resumedSession,
}) {
  const { filterQuestionsForSession, episodes } = useQuestionnaire();
  const session = useSession(propertyId);
  const badges = useBadges();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionReady, setSessionReady] = useState(false);
  const [secondaryIntentCategory, setSecondaryIntentCategory] = useState(null);
  const [pendingHook, setPendingHook] = useState(null);
  // S3-07: upgrade prompt state
  const [pendingUpgrade, setPendingUpgrade] = useState(null);
  // { nextIndex, completedEpisodeNumber }
  // Track all answered question IDs for correct resume after tier upgrade
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState(new Set());
  // Current tier — may change if respondent accepts upgrade
  const [currentTier, setCurrentTier] = useState(initialTier);

  const lastEpisodeRef = useRef(null);
  const tierColor = TIER_COLORS[currentTier] || TIER_COLORS.professional;

  const intentCategory = session.intentCategory || resumedSession?.intent_category || null;

  const tierQuestions = filterQuestionsForSession({
    tier: currentTier,
    intentCategory,
    secondaryIntentCategory,
  });

  const currentQuestion = tierQuestions[currentIndex];
  const currentEpisode = currentQuestion
    ? getEpisodeForQuestion(currentQuestion, episodes)
    : null;
  const currentEpisodeNumber = currentEpisode?.number || 1;
  const progressWithinEpisode =
    tierQuestions.length > 0 ? currentIndex / tierQuestions.length : 0;

  const getEpisodeName = (moduleNum) => {
    const ep = episodes.find((e) => e.moduleMappings.includes(moduleNum));
    return ep?.name || 'GuestIQ';
  };

  // Episode transition PostHog tracking
  useEffect(() => {
    if (!sessionReady || !currentEpisode) return;
    const lastEp = lastEpisodeRef.current;
    if (lastEp && lastEp.number !== currentEpisode.number) {
      trackEpisodeStarted({
        episode_number: currentEpisode.number,
        episode_name: currentEpisode.name,
        tier: currentTier,
        property_id: propertyId,
      });
    }
    lastEpisodeRef.current = currentEpisode;
  }, [currentEpisodeNumber, sessionReady, currentEpisode, currentTier, propertyId]);

  // Session initialization
  useEffect(() => {
    async function init() {
      if (resumedSession) {
        session.restoreSession(resumedSession);
        setCurrentTier(resumedSession.tier || initialTier);
        const startIndex = resumedSession.tense_frame ? 1 : 0;
        setCurrentIndex(startIndex);
        setSessionReady(true);
      } else {
        await session.startSession(currentTier);
        setSessionReady(true);
        const ep1 = episodes.find((e) => e.number === 1);
        if (ep1) {
          trackEpisodeStarted({
            episode_number: 1,
            episode_name: ep1.name,
            tier: currentTier,
            property_id: propertyId,
          });
          lastEpisodeRef.current = ep1;
        }
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Upgrade accepted — AC3: update tier in Supabase and continue
  async function handleUpgradeAccept() {
    if (!pendingUpgrade) return;
    const { completedEpisodeNumber } = pendingUpgrade;
    const newTier = currentTier === 'amateur' ? 'professional' : 'expert';

    trackTierUpgradeAccepted({
      from_tier: currentTier,
      to_tier: newTier,
      after_episode: completedEpisodeNumber,
      property_id: propertyId,
    });

    // AC3: update Supabase sessions.tier
    await session.upgradeTier(newTier);

    // Find the correct resume index in the NEW tier's question list.
    // Find the first question in the new tier list that has NOT been answered yet.
    // This correctly handles interleaved Professional-only questions (Q2, Q4, Q6)
    // that appear between Amateur questions already answered.
    const newTierQuestions = filterQuestionsForSession({
      tier: newTier,
      intentCategory,
      secondaryIntentCategory,
    });
    const firstUnansweredIdx = newTierQuestions.findIndex(
      (q) => !answeredQuestionIds.has(q.id)
    );
    const resumeIndex = firstUnansweredIdx >= 0 ? firstUnansweredIdx : currentIndex + 1;

    setCurrentTier(newTier);
    setPendingUpgrade(null);
    setCurrentIndex(resumeIndex);
  }

  // Upgrade declined — continue with current tier
  function handleUpgradeDecline() {
    if (!pendingUpgrade) return;
    const { nextIndex, completedEpisodeNumber } = pendingUpgrade;
    const newTier = currentTier === 'amateur' ? 'professional' : 'expert';

    trackTierUpgradeDeclined({
      from_tier: currentTier,
      to_tier: newTier,
      after_episode: completedEpisodeNumber,
      property_id: propertyId,
    });

    setPendingUpgrade(null);
    setCurrentIndex(nextIndex);
  }

  async function handleAnswer(answerCode, taxonomyCode, extraText) {
    const activeSessionId = session.sessionId || resumedSession?.session_id;
    const activeTenseFrame =
      session.tenseFrame || resumedSession?.tense_frame || 'retrospective';

    if (!activeSessionId) return;

    // Track answered question ID for upgrade resume logic
    setAnsweredQuestionIds((prev) => {
      const next = new Set(prev);
      next.add(currentQuestion.id);
      return next;
    });

    const isNoneOption = answerCode === 'NONE';
    const isScaleAnswer = answerCode?.startsWith('SCALE_');

    if (currentQuestion.id === 'QR1') {
      const frame = getTenseFrame(answerCode);
      await session.setTenseFrameAndPersist(frame);
      await insertResponse({
        response_id: crypto.randomUUID(),
        session_id: activeSessionId,
        question_id: 'QR1',
        answer_code: answerCode,
        tense_frame: frame,
        module_number: 0,
        property_id: propertyId,
      });
      trackRoutingGateAnswered({
        tense_frame: frame,
        answer_option: answerCode,
        property_id: propertyId,
        ...(extraText ? { qr1_other_text: extraText } : {}),
      });
    } else if (currentQuestion.id === 'Q1' && !isNoneOption) {
      // First Step earned silently — no toast. Intent Locked is the single visible moment.
      badges.awardBadgeSilent(badges.BADGE_IDS.FIRST_STEP);
      badges.awardBadge(badges.BADGE_IDS.INTENT_LOCKED);
      await session.setIntentCategoryAndPersist(taxonomyCode);
      await insertResponse({
        response_id: crypto.randomUUID(),
        session_id: activeSessionId,
        question_id: 'Q1',
        answer_code: answerCode,
        tense_frame: activeTenseFrame,
        module_number: 1,
        property_id: propertyId,
      });
      trackQuestionAnswered({
        question_id: 'Q1',
        answer_code: answerCode,
        module_number: 1,
        tier: currentTier,
        tense_frame: activeTenseFrame,
        property_id: propertyId,
      });
    } else if (currentQuestion.id === 'Q2' && !isNoneOption && answerCode !== 'A') {
      const secondaryIntent = getSecondaryIntentFromQ2Answer(answerCode);
      if (secondaryIntent && secondaryIntent !== intentCategory) {
        setSecondaryIntentCategory(secondaryIntent);
        trackPurposeExpert({
          primary_intent: intentCategory,
          secondary_intent: secondaryIntent,
          tier: currentTier,
          property_id: propertyId,
        });
      }
      await insertResponse({
        response_id: crypto.randomUUID(),
        session_id: activeSessionId,
        question_id: 'Q2',
        answer_code: answerCode,
        tense_frame: activeTenseFrame,
        module_number: 1,
        property_id: propertyId,
      });
      trackQuestionAnswered({
        question_id: 'Q2',
        answer_code: answerCode,
        module_number: 1,
        tier: currentTier,
        tense_frame: activeTenseFrame,
        property_id: propertyId,
      });
    } else if (isScaleAnswer) {
      const scaleValue = parseInt(answerCode.replace('SCALE_', ''), 10);
      await insertScaleResponse({
        scale_response_id: crypto.randomUUID(),
        session_id: activeSessionId,
        question_id: currentQuestion.id,
        scale_value: scaleValue,
        property_id: propertyId,
      });
      trackQuestionAnswered({
        question_id: currentQuestion.id,
        answer_code: answerCode,
        module_number: currentQuestion.module,
        tier: currentTier,
        tense_frame: activeTenseFrame,
        property_id: propertyId,
      });
    } else if (!isNoneOption) {
      await insertResponse({
        response_id: crypto.randomUUID(),
        session_id: activeSessionId,
        question_id: currentQuestion.id,
        answer_code: answerCode,
        tense_frame: activeTenseFrame,
        module_number: currentQuestion.module,
        property_id: propertyId,
      });
      trackQuestionAnswered({
        question_id: currentQuestion.id,
        answer_code: answerCode,
        module_number: currentQuestion.module,
        tier: currentTier,
        tense_frame: activeTenseFrame,
        property_id: propertyId,
      });
    }

    if (isNoneOption) {
      await insertNoneFlag({
        none_flag_id: crypto.randomUUID(),
        session_id: activeSessionId,
        question_id: currentQuestion.id,
        property_id: propertyId,
      });
      trackNoneFlagSelected({
        question_id: currentQuestion.id,
        module_number: currentQuestion.module,
        tier: currentTier,
        property_id: propertyId,
      });
    }

    // Advance — check episode boundary and upgrade trigger
    const nextIndex = currentIndex + 1;

    if (nextIndex >= tierQuestions.length) {
      badges.awardEpisodeBadge(currentEpisode?.number);
      badges.awardExpertComplete(currentTier);
      if (currentEpisode) {
        trackEpisodeCompleted({
          episode_number: currentEpisode.number,
          episode_name: currentEpisode.name,
          tier: currentTier,
          property_id: propertyId,
        });
      }
      if (onComplete) {
        onComplete(badges.allBadges, {
          sessionResponses: [],
          intentCategory,
          serviceStyleCode: null,
          sessionId: session.sessionId || resumedSession?.session_id,
          onComplete: () => session.completeSession(),
        });
      }
      return;
    }

    const nextQuestion = tierQuestions[nextIndex];
    const nextEpisode = getEpisodeForQuestion(nextQuestion, episodes);
    const crossingEpisode =
      nextEpisode && currentEpisode && nextEpisode.number !== currentEpisode.number;

    if (crossingEpisode) {
      badges.awardEpisodeBadge(currentEpisode.number);
      trackEpisodeCompleted({
        episode_number: currentEpisode.number,
        episode_name: currentEpisode.name,
        tier: currentTier,
        property_id: propertyId,
      });

      // S3-07: Check upgrade trigger BEFORE curiosity hook
      const upgradeTriggerEpisode = UPGRADE_TRIGGERS[currentTier];
      if (upgradeTriggerEpisode && currentEpisode.number === upgradeTriggerEpisode) {
        const toTier = currentTier === 'amateur' ? 'professional' : 'expert';
        // AC4: tier_upgrade_prompted PostHog event
        trackTierUpgradePrompted({
          from_tier: currentTier,
          to_tier: toTier,
          after_episode: currentEpisode.number,
          property_id: propertyId,
        });
        // Show curiosity hook first, then upgrade prompt
        // Store upgrade info for after hook is dismissed
        if (currentEpisode.number <= 6 && currentEpisode.curiosityHookText) {
          trackCuriosityHookViewed({
            episode_number: currentEpisode.number,
            episode_name: currentEpisode.name,
            tier: currentTier,
            property_id: propertyId,
          });
          setPendingHook({
            completedEpisode: currentEpisode,
            nextEpisode,
            nextIndex,
            showUpgradeAfter: true, // flag to show upgrade after hook
          });
        } else {
          setPendingUpgrade({
            nextIndex,
            completedEpisodeNumber: currentEpisode.number,
          });
        }
        return;
      }

      // Regular curiosity hook (no upgrade)
      if (currentEpisode.number <= 6 && currentEpisode.curiosityHookText) {
        trackCuriosityHookViewed({
          episode_number: currentEpisode.number,
          episode_name: currentEpisode.name,
          tier: currentTier,
          property_id: propertyId,
        });
        setPendingHook({
          completedEpisode: currentEpisode,
          nextEpisode,
          nextIndex,
          showUpgradeAfter: false,
        });
        return;
      }
    }

    setCurrentIndex(nextIndex);
  }

  // Override hook continue to show upgrade after hook when flagged
  function handleHookContinueWithUpgrade() {
    if (!pendingHook) return;
    const { nextIndex, showUpgradeAfter, completedEpisode } = pendingHook;
    setPendingHook(null);
    if (showUpgradeAfter) {
      setPendingUpgrade({
        nextIndex,
        completedEpisodeNumber: completedEpisode.number,
      });
    } else {
      setCurrentIndex(nextIndex);
    }
  }

  if (!sessionReady) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0D0D12', display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{ color: '#475569', fontSize: '0.8125rem' }}>Starting session...</div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {badges.currentToast && (
          <BadgeToast
            key={badges.currentToast.id}
            definition={badges.currentToast}
            onDismiss={badges.dismissToast}
          />
        )}
      </AnimatePresence>

      {pendingHook ? (
        <CuriosityHookScreen
          completedEpisode={pendingHook.completedEpisode}
          nextEpisode={pendingHook.nextEpisode}
          tierColor={tierColor}
          onContinue={handleHookContinueWithUpgrade}
        />
      ) : pendingUpgrade ? (
        <TierUpgradeScreen
          currentTier={currentTier}
          onAccept={handleUpgradeAccept}
          onDecline={handleUpgradeDecline}
        />
      ) : !currentQuestion ? (
        <div style={{
          minHeight: '100vh', background: '#0D0D12', display: 'flex',
          alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif',
        }}>
          <div style={{ color: '#94A3B8', fontSize: '0.9375rem' }}>
            Session complete — results screen coming in S3-08.
          </div>
        </div>
      ) : (
        <Question
          key={currentQuestion.id}
          tier={currentTier}
          question={currentQuestion}
          tenseFrame={session.tenseFrame || resumedSession?.tense_frame}
          onAnswer={handleAnswer}
          questionNumber={`${currentQuestion.id} / ${tierQuestions.length}`}
          episodeName={currentEpisode?.name || getEpisodeName(currentQuestion.module)}
          episodes={episodes}
          currentEpisode={currentEpisodeNumber}
          progressWithinEpisode={progressWithinEpisode}
        />
      )}
    </>
  );
}
