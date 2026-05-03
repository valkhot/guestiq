// src/App.jsx
// GuestIQ — Root React Component
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useEffect, useState } from 'react';

import { trackAppLoaded, trackSessionPaused } from './services/analytics';
import { getIncompleteSession } from './services/supabase';

function WelcomeScreen({ onTierSelected }) {
  const propertyId = new URLSearchParams(window.location.search).get('property') || 'PROP001';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-heading-lg font-bold text-professional-400 mb-4">GuestIQ</h1>
        <p className="text-body text-secondary mb-8">Hotel Guest Expectations Research</p>
        <p className="text-caption text-muted mb-12">Property: {propertyId}</p>
        <div className="grid grid-cols-3 gap-4">
          {['amateur', 'professional', 'expert'].map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => onTierSelected(tier)}
              className="p-6 rounded-card border transition-colors"
              style={{ borderColor: `var(--tier-${tier})44` }}
            >
              <span
                className="block text-heading-sm font-medium capitalize mb-2"
                style={{ color: `var(--tier-${tier})` }}
              >
                {tier}
              </span>
              <span className="text-caption text-secondary">
                {tier === 'amateur' ? '~5 min' : tier === 'professional' ? '~8 min' : '~16 min'}
              </span>
            </button>
          ))}
        </div>
        <p className="text-caption text-muted mt-8">
          Sprint 2 scaffold — full welcome screen built in S2-2.2
        </p>
      </div>
    </div>
  );
}

function DisambiguationScreen({ onResume, onNewSession }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-lg w-full bg-canvas-surface rounded-card p-8">
        <h2 className="text-heading-md font-medium mb-2">Welcome back</h2>
        <p className="text-body text-secondary mb-8">
          It looks like you started a session earlier.
        </p>
        <button
          type="button"
          onClick={onResume}
          className="w-full p-4 bg-professional-400/10 border border-professional-400 rounded-lg text-professional-400 text-heading-sm mb-4 hover:bg-professional-400/20 transition-colors"
        >
          Resume my session — pick up where I left off
        </button>
        <button
          type="button"
          onClick={onNewSession}
          className="w-full p-4 border border-white/10 rounded-lg text-secondary text-heading-sm hover:border-white/20 transition-colors"
        >
          Start fresh — I am someone new
        </button>
      </div>
    </div>
  );
}

function QuestionScreen({ tier }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <p className="text-heading-sm text-secondary mb-4">
          Tier:{' '}
          <span className="capitalize" style={{ color: `var(--tier-${tier})` }}>
            {tier}
          </span>
        </p>
        <p className="text-body text-muted">Question screens built in S2-2.3 and S2-2.4</p>
      </div>
    </div>
  );
}

function DashboardOverlay({ onClose }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Management Dashboard"
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.7)' }}
    >
      <div
        className="w-full max-w-4xl h-3/4 rounded-card p-8 overflow-auto"
        style={{ background: 'var(--canvas-dashboard)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-heading-md font-medium" style={{ color: '#E2E8F0' }}>
            GuestIQ Management
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-caption text-secondary hover:text-primary transition-colors"
          >
            Esc to close ×
          </button>
        </div>
        <p className="text-body" style={{ color: '#94A3B8' }}>
          Dashboard overlay — full implementation in Sprint 4
        </p>
      </div>
    </div>
  );
}

const SCREEN = {
  LOADING: 'LOADING',
  DISAMBIGUATION: 'DISAMBIGUATION',
  WELCOME: 'WELCOME',
  QUESTION: 'QUESTION',
};

export default function App() {
  const [screen, setScreen] = useState(SCREEN.LOADING);
  const [tier, setTier] = useState(null);
  const [incompleteSession, setIncompleteSession] = useState(null);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const propertyId = new URLSearchParams(window.location.search).get('property') || 'PROP001';

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

  useEffect(() => {
    function handleBeforeUnload() {
      if (screen === SCREEN.QUESTION) {
        trackSessionPaused({ property_id: propertyId, tier });
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [screen, tier, propertyId]);

  function handleTierSelected(selectedTier) {
    setTier(selectedTier);
    setScreen(SCREEN.QUESTION);
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

  if (screen === SCREEN.LOADING) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-caption text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {screen === SCREEN.DISAMBIGUATION && (
        <DisambiguationScreen onResume={handleResume} onNewSession={handleNewSession} />
      )}
      {screen === SCREEN.WELCOME && <WelcomeScreen onTierSelected={handleTierSelected} />}
      {screen === SCREEN.QUESTION && <QuestionScreen tier={tier} />}
      {dashboardOpen && <DashboardOverlay onClose={() => setDashboardOpen(false)} />}
    </>
  );
}
