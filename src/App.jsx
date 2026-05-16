// src/App.jsx
// GuestIQ — Root React Component
// Session router: disambiguation → welcome → question screens → completion
// S3-09: Migrated from inline hex styles to Tailwind utility classes.
//   AC3 specifically protected — DashboardOverlay uses bg-canvas-dashboard,
//   all respondent screens use bg-canvas-respondent.
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useEffect, useState } from 'react';

import { trackAppLoaded, trackSessionPaused } from './services/analytics';
import { getIncompleteSession } from './services/supabase';
import { useQuestionnaire } from './hooks/useQuestionnaire';
import WelcomeScreen from './components/screens/WelcomeScreen';
import CompletionScreen from './components/screens/CompletionScreen';
import QuestionScreen from './components/screens/QuestionScreen';

// ── Disambiguation screen ─────────────────────────────────────────────────
function DisambiguationScreen({ onResume, onNewSession }) {
  return (
    <div
      className={
        'min-h-screen bg-canvas-respondent flex items-center justify-center p-8'
      }
    >
      <div className="max-w-[480px] w-full bg-canvas-surface rounded-card p-8">
        <h2 className="text-primary text-heading-md font-medium mb-2">
          Welcome back
        </h2>
        <p className="text-secondary text-body mb-8">
          It looks like you started a session earlier.
        </p>
        <button
          type="button"
          onClick={onResume}
          className={
            'block w-full p-4 rounded-lg text-body cursor-pointer mb-3 ' +
            'bg-professional-400/10 border border-professional-400 ' +
            'text-professional-400'
          }
        >
          Resume my session — pick up where I left off
        </button>
        <button
          type="button"
          onClick={onNewSession}
          className={
            'block w-full p-4 rounded-lg text-body cursor-pointer ' +
            'bg-transparent border border-white/10 text-secondary'
          }
        >
          Start fresh — I am someone new
        </button>
      </div>
    </div>
  );
}

// ── Dashboard overlay ─────────────────────────────────────────────────────
// AC3 anchor: This is the ONLY surface that uses bg-canvas-dashboard.
function DashboardOverlay({ onClose }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Management Dashboard"
      className={
        'fixed inset-0 z-50 flex items-center justify-center bg-black/70'
      }
    >
      <div
        className={
          'w-full max-w-4xl bg-canvas-dashboard rounded-card p-8 overflow-auto'
        }
        style={{ height: '75vh' }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-neutral-200 text-heading-md font-medium">
            GuestIQ Management
          </h2>
          <button
            type="button"
            onClick={onClose}
            className={
              'bg-transparent border-none text-secondary cursor-pointer ' +
              'text-caption'
            }
          >
            Esc to close ×
          </button>
        </div>
        <p className="text-secondary text-body">
          Dashboard — full implementation in Sprint 4
        </p>
      </div>
    </div>
  );
}

// ── Screen states ─────────────────────────────────────────────────────────
const SCREEN = {
  LOADING: 'LOADING',
  DISAMBIGUATION: 'DISAMBIGUATION',
  WELCOME: 'WELCOME',
  QUESTION: 'QUESTION',
  COMPLETE: 'COMPLETE',
  EXITED: 'EXITED',
};

// ── Root App ──────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState(SCREEN.LOADING);
  const [tier, setTier] = useState(null);
  const [incompleteSession, setIncompleteSession] = useState(null);
  // S3-08: completion screen data — populated by QuestionScreen.onComplete
  const [completionData, setCompletionData] = useState(null);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const { uiCopy, tiers } = useQuestionnaire();

  const propertyId =
    new URLSearchParams(window.location.search).get('property') || 'PROP001';

  // ── Initialization ────────────────────────────────────────────────
  useEffect(() => {
    async function init() {
      trackAppLoaded({
        property_id: propertyId,
        device_type: window.innerWidth < 768 ? 'mobile' : 'desktop',
      });

      const token = localStorage.getItem('guestiq_session_token');
      if (token) {
        const result = await getIncompleteSession(token);
        if (result.success && result.session) {
          setIncompleteSession(result.session);
          setScreen(SCREEN.DISAMBIGUATION);
          return;
        }
        localStorage.removeItem('guestiq_session_token');
      }
      setScreen(SCREEN.WELCOME);
    }
    init();
  }, [propertyId]);

  // ── SHIFT+CTRL+A dashboard shortcut ──────────────────────────────
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.shiftKey && e.ctrlKey && e.key === 'A') {
        setDashboardOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && dashboardOpen) {
        setDashboardOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dashboardOpen]);

  // ── Session pause on browser close ───────────────────────────────
  useEffect(() => {
    function handleBeforeUnload() {
      if (screen === SCREEN.QUESTION) {
        trackSessionPaused({ property_id: propertyId, tier });
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [screen, tier, propertyId]);

  // ── Handlers ─────────────────────────────────────────────────────
  function handleTierSelected(selectedTier) {
    setTier(selectedTier);
    setScreen(SCREEN.QUESTION);
  }

  function handleNotNow() {
    setScreen(SCREEN.EXITED);
  }

  function handleResume() {
    if (incompleteSession) {
      setTier(incompleteSession.tier);
      setScreen(SCREEN.QUESTION);
    }
  }

  function handleNewSession() {
    localStorage.removeItem('guestiq_session_token');
    setIncompleteSession(null);
    setScreen(SCREEN.WELCOME);
  }

  // ── Render ────────────────────────────────────────────────────────
  if (screen === SCREEN.LOADING) {
    return (
      <div
        className={
          'min-h-screen bg-canvas-respondent flex items-center justify-center'
        }
      >
        <div className="text-neutral-600 text-caption">Loading...</div>
      </div>
    );
  }

  if (screen === SCREEN.EXITED) {
    return (
      <div
        className={
          'min-h-screen bg-canvas-respondent flex items-center justify-center'
        }
      >
        <div className="text-center">
          <p className="text-secondary text-body mb-4">
            Thank you. You can close this page.
          </p>
          <button
            type="button"
            onClick={() => setScreen(SCREEN.WELCOME)}
            className={
              'bg-transparent border-none text-neutral-600 text-caption ' +
              'cursor-pointer underline'
            }
          >
            Changed your mind? Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {screen === SCREEN.DISAMBIGUATION && (
        <DisambiguationScreen onResume={handleResume} onNewSession={handleNewSession} />
      )}
      {screen === SCREEN.WELCOME && (
        <WelcomeScreen
          uiCopy={uiCopy}
          tiers={tiers}
          onTierSelected={handleTierSelected}
          onNotNow={handleNotNow}
          propertyId={propertyId}
        />
      )}
      {screen === SCREEN.QUESTION && (
        <QuestionScreen
          tier={tier}
          propertyId={propertyId}
          onComplete={(badgeData, sessionData) => {
            setCompletionData({
              earnedBadges: badgeData,
              ...(sessionData || {}),
            });
            setScreen(SCREEN.COMPLETE);
          }}
          resumedSession={incompleteSession}
        />
      )}
      {screen === SCREEN.COMPLETE && completionData && (
        <CompletionScreen
          tier={completionData.tier || tier}
          earnedBadges={completionData.earnedBadges || []}
          intentCategory={completionData.intentCategory}
          serviceStyleCode={completionData.serviceStyleCode}
          topPriorities={completionData.topPriorities || []}
          tenseFrame={completionData.tenseFrame}
          sessionStartedAt={completionData.sessionStartedAt}
          episodeCountCompleted={completionData.episodeCountCompleted || 0}
          propertyId={propertyId}
          onComplete={completionData.onComplete}
        />
      )}
      {dashboardOpen && <DashboardOverlay onClose={() => setDashboardOpen(false)} />}
    </>
  );
}
