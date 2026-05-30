// src/components/screens/QuestionScreen.jsx
// GuestIQ — Question Screen
// S3-07: Tier upgrade prompts after Episode 1 (Amateur) and Episode 4 (Professional).
// S3-08: Captures Q31 service style + session timing + priorities for completion screen.
// B-3-001 fix (S3-12): handleAnswer now accepts an array of codes for
//   multi_select questions and writes one response row per selected code,
//   per the entity_relationship_diagram_v10.md responses.answer_code spec
//   ("Multi-select questions produce multiple response records").
// B-3-002 fix (S3-13): handleAnswer is now guarded against re-entry. A
//   answeringRef latch ensures that even if the renderer fires onAnswer more
//   than once for a single question, only the first call writes rows. This
//   is defence-in-depth alongside the submit latch in MultiSelectQuestion.

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
import {
  BADGE_DEFINITIONS,
  BADGE_IDS,
  EPISODE_BADGE_MAP,
} from '../badges/BadgeDefinitions';

// Upgrade trigger: which episode completion triggers an upgrade prompt
const UPGRADE_TRIGGERS = {
  amateur: 1, // after Episode 1
  professional: 4, // after Episode 4
};

// Q31 — service interaction style answer codes (Module 4).
// Source: hotel_questionnaire_all79.md Module 4. Used by completion screen.
const SERVICE_STYLE_QUESTION_ID = 'Q31';

function getTenseFrame(answerCode) {
  return answerCode === 'B' ? 'anticipatory' : 'retrospective';
}

function getEpisodeForQuestion(question, episodes) {
  if (!question || !episodes) return null;
  return episodes.find((ep) => ep.moduleMappings.includes(question.module)) || null;
}

// Derive top 3 priority labels from a captured-responses map.
// Heuristic for Phase 1a: pick the highest-rated scale answers (4 or 5) from
// the priority/expectation modules (M2/M3/M6) and return their question text.
//
// CRITICAL — question copy is tense-aware. Fields like q.shortLabel and q.text
// may be objects shaped as { retrospective: '...', anticipatory: '...' } rather
// than plain strings. We must pick the right tense and coerce to string, or
// React throws error #31 (objects are not valid as a React child).
function pickTenseString(value, tenseFrame) {
  if (value == null) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    const preferred = tenseFrame && value[tenseFrame];
    if (typeof preferred === 'string' && preferred.length > 0) return preferred;
    // Fall back to whichever tense exists
    if (typeof value.retrospective === 'string') return value.retrospective;
    if (typeof value.anticipatory === 'string') return value.anticipatory;
  }
  return null;
}

function deriveTopPriorities(responsesByQid, allQuestions, tenseFrame) {
  if (!responsesByQid || !allQuestions) return [];
  const scaleEntries = [];
  Object.entries(responsesByQid).forEach(([qid, entry]) => {
    if (entry?.scaleValue && entry.scaleValue >= 4) {
      const q = allQuestions.find((x) => x.id === qid);
      if (q && [2, 3, 6].includes(q.module)) {
        const label =
          pickTenseString(q.shortLabel, tenseFrame) ||
          pickTenseString(q.text, tenseFrame) ||
          qid;
        // Defence in depth — guarantee string before pushing.
        scaleEntries.push({
          qid,
          value: entry.scaleValue,
          label: String(label),
        });
      }
    }
  });
  scaleEntries.sort((a, b) => b.value - a.value);
  return scaleEntries.slice(0, 3).map((e) => e.label);
}

export default function QuestionScreen({
  tier: initialTier,
  propertyId,
  onComplete,
  resumedSession,
}) {
  const { filterQuestionsForSession, episodes, questions: allQuestions } =
    useQuestionnaire();
  const session = useSession(propertyId);
  const badges = useBadges();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionReady, setSessionReady] = useState(false);
  const [secondaryIntentCategory, setSecondaryIntentCategory] = useState(null);
  const [pendingHook, setPendingHook] = useState(null);
  // S3-07: upgrade prompt state
  const [pendingUpgrade, setPendingUpgrade] = useState(null);
  // Track all answered question IDs for correct resume after tier upgrade
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState(new Set());
  // Current tier — may change if respondent accepts upgrade
  const [currentTier, setCurrentTier] = useState(initialTier);
  // S3-08: capture all responses keyed by question ID for derivation downstream
  const [responsesByQid, setResponsesByQid] = useState({});
  // S3-08: count completed episodes (for session_completed PostHog property)
  const [episodesCompleted, setEpisodesCompleted] = useState(0);
  // S3-08: session start time (Date.now()) — set once on mount
  const sessionStartedAtRef = useRef(Date.now());

  const lastEpisodeRef = useRef(null);

  // B-3-002: re-entry guard for handleAnswer. Set true while an answer is
  // being persisted, reset once the question has advanced. If handleAnswer
  // is somehow invoked twice for the same question (double-click, a stray
  // duplicate onAnswer call), the second invocation returns immediately and
  // writes nothing. This is defence-in-depth — the primary guard is the
  // submit latch inside the renderer components.
  const answeringRef = useRef(false);

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

  // Helper — build the completion payload for handoff to App.jsx
  function buildCompletionPayload() {
    const activeTenseFrame =
      session.tenseFrame || resumedSession?.tense_frame || 'retrospective';
    const serviceStyleCode =
      responsesByQid[SERVICE_STYLE_QUESTION_ID]?.answerCode || null;
    const topPriorities = deriveTopPriorities(
      responsesByQid,
      allQuestions,
      activeTenseFrame
    );
    return {
      tier: currentTier,
      sessionResponses: responsesByQid,
      intentCategory,
      serviceStyleCode,
      topPriorities,
      tenseFrame: activeTenseFrame,
      sessionStartedAt: sessionStartedAtRef.current,
      episodeCountCompleted: episodesCompleted,
      sessionId: session.sessionId || resumedSession?.session_id,
      onComplete: () => session.completeSession(),
    };
  }

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

    // B-3-002: re-entry guard. If a previous invocation for this question is
    // still in flight (its inserts not finished), drop this call entirely.
    // The ref is checked and set synchronously, before any await, so two
    // calls in the same tick cannot both pass. It is released in a finally
    // block once the answer is fully persisted and the screen has advanced.
    if (answeringRef.current) return;
    answeringRef.current = true;

    try {
      // Track answered question ID for upgrade resume logic
      setAnsweredQuestionIds((prev) => {
        const next = new Set(prev);
        next.add(currentQuestion.id);
        return next;
      });

      // ── B-3-001: multi_select array handling ──────────────────────────
      // MultiSelectQuestion calls onAnswer with an ARRAY of codes (and a
      // parallel array of taxonomy codes). Multi_select questions never
      // overlap the QR1/Q1/Q2/scale special branches below, so array input
      // is handled fully here and the function returns early.
      if (Array.isArray(answerCode)) {
        const codes = answerCode;
        const isNoneArray = codes.length === 1 && codes[0] === 'NONE';

        // Capture in the local response map. Store the full code list so any
        // downstream derivation can see every selected code.
        setResponsesByQid((prev) => ({
          ...prev,
          [currentQuestion.id]: {
            answerCode: isNoneArray ? 'NONE' : codes.join(','),
            answerCodes: codes,
            scaleValue: null,
            isNone: isNoneArray,
          },
        }));

        if (isNoneArray) {
          // B-3-003: write BOTH a responses row (answer_code='NONE') AND a
          // none_flags row. Per the ERD (none_flags table): "A none-flag
          // record is written in addition to the corresponding responses
          // record (DFD-W5 + DFD-W7 both fire)." The responses NONE row was
          // previously never written — exposed by S3-13 NFR-045.
          await insertResponse({
            response_id: crypto.randomUUID(),
            session_id: activeSessionId,
            question_id: currentQuestion.id,
            answer_code: 'NONE',
            tense_frame: activeTenseFrame,
            module_number: currentQuestion.module,
            property_id: propertyId,
          });
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
        } else {
          // One response row per selected code, per the ERD spec. Inserts
          // run in parallel (B-3-002): each row is independent with its own
          // UUID, so there is no ordering requirement. Parallel inserts also
          // shrink the submission window — the original sequential await
          // loop kept the Continue button live for ~1.2s on a 6-option
          // answer, which was what made the double-click double-write
          // possible in the first place.
          await Promise.all(
            codes.map((code) =>
              insertResponse({
                response_id: crypto.randomUUID(),
                session_id: activeSessionId,
                question_id: currentQuestion.id,
                answer_code: code,
                tense_frame: activeTenseFrame,
                module_number: currentQuestion.module,
                property_id: propertyId,
              })
            )
          );
          codes.forEach((code) => {
            trackQuestionAnswered({
              question_id: currentQuestion.id,
              answer_code: code,
              module_number: currentQuestion.module,
              tier: currentTier,
              tense_frame: activeTenseFrame,
              property_id: propertyId,
            });
          });
        }

        await advanceAfterAnswer(null);
        return;
      }
      // ── end B-3-001 multi_select handling ─────────────────────────────

      const isNoneOption = answerCode === 'NONE';
      const isScaleAnswer = answerCode?.startsWith('SCALE_');

      // S3-08: capture every response in a local map so the completion screen
      // can show top priorities and Q31 service style without re-querying
      // Supabase.
      setResponsesByQid((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          answerCode,
          scaleValue: isScaleAnswer
            ? parseInt(answerCode.replace('SCALE_', ''), 10)
            : null,
          isNone: isNoneOption,
        },
      }));

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
        // First Step earned silently — no toast. Intent Locked is the single
        // visible moment.
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
        // B-3-003: write BOTH a responses row (answer_code='NONE') AND a
        // none_flags row, per the ERD ("in addition to the corresponding
        // responses record"). The responses NONE row was previously never
        // written for single-select None either — exposed by S3-13 NFR-045.
        await insertResponse({
          response_id: crypto.randomUUID(),
          session_id: activeSessionId,
          question_id: currentQuestion.id,
          answer_code: 'NONE',
          tense_frame: activeTenseFrame,
          module_number: currentQuestion.module,
          property_id: propertyId,
        });
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

      await advanceAfterAnswer(answerCode);
    } finally {
      // B-3-002: release the guard. By the time we reach here the answer is
      // persisted and the screen has advanced (or completion has fired), so
      // the next question's renderer — a fresh component instance — is free
      // to submit. Released in finally so an insert error cannot wedge the
      // guard permanently.
      answeringRef.current = false;
    }
  }

  // ── Advance logic — shared by single-code and multi_select array paths ──
  // Extracted (B-3-001) so the multi_select array branch and the single-code
  // path use identical episode-boundary, upgrade-trigger, and completion
  // logic. Behaviour is unchanged from the previous inline version.
  //
  // justAnsweredCode: the answer code that was just submitted. Used only for
  // the Q31 service-style completion override (see below). The single-code
  // path passes its answerCode; the multi_select path passes null because
  // Q31 is a single_select question and never arrives via the array path.
  async function advanceAfterAnswer(justAnsweredCode) {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= tierQuestions.length) {
      // S3-08 React 18 batching rule: ALL badge awards BEFORE any await.
      badges.awardEpisodeBadge(currentEpisode?.number);
      badges.awardProfessionalComplete(currentTier);
      badges.awardExpertComplete(currentTier);
      // Final episode counts toward total
      const finalEpisodesCompleted = episodesCompleted + 1;
      setEpisodesCompleted(finalEpisodesCompleted);

      if (currentEpisode) {
        trackEpisodeCompleted({
          episode_number: currentEpisode.number,
          episode_name: currentEpisode.name,
          tier: currentTier,
          property_id: propertyId,
        });
      }
      if (onComplete) {
        // Build payload with the up-to-date episodesCompleted number,
        // bypassing setState async to avoid a stale value in the handoff.
        const payload = buildCompletionPayload();
        payload.episodeCountCompleted = finalEpisodesCompleted;
        // Latest Q31 may have just been added — re-read from the just-
        // captured answer code if the final question was Q31. responsesByQid
        // is updated via setState (async) so it would be stale here; the
        // explicit override bypasses the stale snapshot.
        if (currentQuestion.id === SERVICE_STYLE_QUESTION_ID && justAnsweredCode) {
          payload.serviceStyleCode = justAnsweredCode;
        }
        // Deterministic final-badges resolution.
        // React 18 batches setState — badges.allBadges may NOT include the
        // tier-completion badges we just awarded. Build the expected
        // earned-IDs set ourselves and return matching definitions,
        // bypassing the stale hook snapshot entirely.
        const finalEarnedIds = new Set(badges.earnedBadgeIds);
        const finalEpisodeBadgeId = EPISODE_BADGE_MAP[currentEpisode?.number];
        if (finalEpisodeBadgeId) finalEarnedIds.add(finalEpisodeBadgeId);
        if (currentTier === 'professional' || currentTier === 'expert') {
          finalEarnedIds.add(BADGE_IDS.PROFESSIONAL_COMPLETE);
        }
        if (currentTier === 'expert') {
          finalEarnedIds.add(BADGE_IDS.EXPERT_COMPLETE);
        }
        const finalBadges = BADGE_DEFINITIONS.map((def) => ({
          ...def,
          earned: finalEarnedIds.has(def.id),
        }));
        onComplete(finalBadges, payload);
      }
      return;
    }

    const nextQuestion = tierQuestions[nextIndex];
    const nextEpisode = getEpisodeForQuestion(nextQuestion, episodes);
    const crossingEpisode =
      nextEpisode && currentEpisode && nextEpisode.number !== currentEpisode.number;

    if (crossingEpisode) {
      badges.awardEpisodeBadge(currentEpisode.number);
      setEpisodesCompleted((prev) => prev + 1);
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
            showUpgradeAfter: true,
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
      <div
        className={
          'min-h-screen bg-canvas-respondent flex items-center justify-center'
        }
      >
        <div className="text-neutral-600 text-caption">Starting session...</div>
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
          onContinue={handleHookContinueWithUpgrade}
        />
      ) : pendingUpgrade ? (
        <TierUpgradeScreen
          currentTier={currentTier}
          onAccept={handleUpgradeAccept}
          onDecline={handleUpgradeDecline}
        />
      ) : !currentQuestion ? (
        <div
          className={
            'min-h-screen bg-canvas-respondent flex items-center justify-center'
          }
        >
          <div className="text-secondary text-body">Session complete.</div>
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
