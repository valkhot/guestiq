// src/App.jsx
// GuestIQ — Root React Component
// Session router: disambiguation → welcome → question screens → completion
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
      style={{
        minHeight: '100vh',
        background: '#0D0D12',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          background: '#161620',
          borderRadius: '12px',
          padding: '2rem',
        }}
      >
        <h2
          style={{
            color: '#F8FAFC',
            fontSize: '1.25rem',
            fontWeight: 500,
            marginBottom: '0.5rem',
          }}
        >
          Welcome back
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '0.9375rem', marginBottom: '2rem' }}>
          It looks like you started a session earlier.
        </p>
        <button
          type="button"
          onClick={onResume}
          style={{
            display: 'block',
            width: '100%',
            padding: '1rem',
            background: 'rgba(96, 165, 250, 0.1)',
            border: '1px solid #60A5FA',
            borderRadius: '8px',
            color: '#60A5FA',
            fontSize: '0.9375rem',
            cursor: 'pointer',
            marginBottom: '0.75rem',
          }}
        >
          Resume my session — pick up where I left off
        </button>
        <button
          type="button"
          onClick={onNewSession}
          style={{
            display: 'block',
            width: '100%',
            padding: '1rem',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#94A3B8',
            fontSize: '0.9375rem',
            cursor: 'pointer',
          }}
        >
          Start fresh — I am someone new
        </button>
      </div>
    </div>
  );
}

// ── Dashboard overlay ─────────────────────────────────────────────────────
function DashboardOverlay({ onClose }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Management Dashboard"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.7)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '64rem',
          height: '75vh',
          background: '#0B1120',
          borderRadius: '12px',
          padding: '2rem',
          overflow: 'auto',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <h2 style={{ color: '#E2E8F0', fontSize: '1.25rem', fontWeight: 500 }}>
            GuestIQ Management
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              fontSize: '0.8125rem',
            }}
          >
            Esc to close ×
          </button>
        </div>
        <p style={{ color: '#94A3B8', fontSize: '0.9375rem' }}>
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
        style={{
          minHeight: '100vh',
          background: '#0D0D12',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: '#475569',
            fontSize: '0.8125rem',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  if (screen === SCREEN.EXITED) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0D0D12',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#94A3B8', fontSize: '0.9375rem', marginBottom: '1rem' }}>
            Thank you. You can close this page.
          </p>
          <button
            type="button"
            onClick={() => setScreen(SCREEN.WELCOME)}
            style={{
              background: 'none',
              border: 'none',
              color: '#475569',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
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
