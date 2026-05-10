// src/components/screens/CompletionScreen.jsx
// GuestIQ — Completion Celebration Screen
// S3-08: Badges grid, personal results summary, aggregate comparison chart.
// AC5: session.is_complete set in Supabase, localStorage token cleared.

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import Badge from '../badges/Badge';
import { BADGE_DEFINITIONS } from '../badges/BadgeDefinitions';
import { fetchDashboardData } from '../../services/supabase';
import {
  trackSessionCompleted,
  trackResultsViewed,
  trackAggregateComparisonViewed,
} from '../../services/analytics';

// ── Intent category display labels and descriptions ───────────────────────
const INTENT_LABELS = {
  'WORK-TRANS':  {
    label: 'Business Traveller',
    desc: 'Guests visiting for meetings, client engagements, or site visits.',
  },
  'WORK-EVENT':  {
    label: 'Conference Attendee',
    desc: 'Guests attending a professional event, trade show, or conference.',
  },
  'WORK-EXT':    {
    label: 'Extended Assignment',
    desc: 'Guests on longer work placements or project-based stays.',
  },
  'LEIS-PLAN':   {
    label: 'Leisure Traveller',
    desc: 'Guests on a planned holiday, city break, or vacation.',
  },
  'LEIS-SOC':    {
    label: 'Event Guest',
    desc: 'Guests attending a personal occasion — wedding, reunion, or celebration.',
  },
  'LEIS-EXP':    {
    label: 'Explorer',
    desc: 'Guests driven by curiosity — sightseeing, culture, or new experiences.',
  },
  'DISP-HOME':   {
    label: 'Displaced Guest',
    desc: 'Guests whose home is temporarily unavailable.',
  },
  'DISP-TRANS':  {
    label: 'Transitional Guest',
    desc: 'Guests needing a private, stable space during a life transition.',
  },
  'MED':         {
    label: 'Health-Adjacent Guest',
    desc: 'Guests staying near a hospital, clinic, or treatment facility.',
  },
  'FAM':         {
    label: 'Family Traveller',
    desc: 'Guests visiting family or supporting a family situation.',
  },
  'TRANSIT':     {
    label: 'Transit Passenger',
    desc: 'Guests passing through — early flights, late arrivals, or layovers.',
  },
  'LOC-ESC':     {
    label: 'Local Escapee',
    desc: 'Guests seeking a short break from routine close to home.',
  },
};

// ── Service style labels (Q31 answer codes) ──────────────────────────────
const SERVICE_STYLE_LABELS = {
  A: 'High-touch — warmly recognised and engaged throughout',
  B: 'Attentive — available when needed, not intrusive',
  C: 'Efficient — quick service, otherwise left alone',
  D: 'Invisible — technology-mediated, minimal human contact',
  E: 'Context-dependent — varies by time and activity',
};

// ── Tier colours ──────────────────────────────────────────────────────────
const TIER_COLORS = {
  amateur:      '#4ADE80',
  professional: '#60A5FA',
  expert:       '#A78BFA',
};

const TIER_LABELS = {
  amateur:      'Amateur',
  professional: 'Professional',
  expert:       'Expert',
};

// ── Derive top priorities from responses ─────────────────────────────────
// Looks at Q58 (value attributes) and Q34 (staff qualities) for top answers
function deriveTopPriorities(sessionResponses) {
  const priorities = [];

  // Q57: value framework
  const q57 = sessionResponses.find((r) => r.question_id === 'Q57');
  if (q57) {
    const valueMap = {
      A: 'Experience matching price paid',
      B: 'Competitive quality at price point',
      C: 'Better than alternatives considered',
      D: 'Productivity and time value',
      E: 'Overall fairness of the deal',
    };
    if (valueMap[q57.answer_code]) priorities.push(valueMap[q57.answer_code]);
  }

  // Q31: service interaction style
  const q31 = sessionResponses.find((r) => r.question_id === 'Q31');
  if (q31 && SERVICE_STYLE_LABELS[q31.answer_code]) {
    priorities.push(SERVICE_STYLE_LABELS[q31.answer_code]);
  }

  // Q21: cleanliness non-negotiables
  const q21 = sessionResponses.find((r) => r.question_id === 'Q21');
  if (q21) priorities.push('Cleanliness standards — non-negotiable');

  // Fill to 3 with defaults if needed
  const defaults = ['Room quality and comfort', 'Staff responsiveness', 'Location convenience'];
  while (priorities.length < 3) {
    priorities.push(defaults[priorities.length]);
  }

  return priorities.slice(0, 3);
}

// ── Aggregate chart data builder ─────────────────────────────────────────
function buildRadarData(sessions, responses) {
  if (!sessions || sessions.length < 3) return null;

  const intentCounts = {};
  sessions.forEach((s) => {
    if (s.intent_category) {
      intentCounts[s.intent_category] = (intentCounts[s.intent_category] || 0) + 1;
    }
  });

  // Top 6 intent categories for radar
  const sorted = Object.entries(intentCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const total = sessions.length;
  return sorted.map(([code, count]) => ({
    subject: INTENT_LABELS[code]?.label || code,
    value: Math.round((count / total) * 100),
  }));
}

// ── Main component ────────────────────────────────────────────────────────
export default function CompletionScreen({
  tier,
  earnedBadges,        // array of badge definitions with earned flag
  sessionResponses,    // responses from this session for personal results
  intentCategory,      // from session state
  serviceStyleCode,    // Q31 answer code
  sessionId,
  propertyId,
  onComplete,          // called by parent to handle session.completeSession()
}) {
  const [aggregateData, setAggregateData] = useState(null);
  const [loadingAggregate, setLoadingAggregate] = useState(true);

  const tierColor = TIER_COLORS[tier] || TIER_COLORS.professional;
  const tierLabel = TIER_LABELS[tier] || 'GuestIQ';
  const intentInfo = INTENT_LABELS[intentCategory] || {
    label: 'Hotel Guest',
    desc: 'Thank you for completing the questionnaire.',
  };
  const topPriorities = deriveTopPriorities(sessionResponses || []);
  const badgesToShow = earnedBadges || BADGE_DEFINITIONS.map((d) => ({ ...d, earned: false }));
  const earnedCount = badgesToShow.filter((b) => b.earned).length;

  // AC5 + AC4: complete session in Supabase, fire PostHog events
  useEffect(() => {
    if (onComplete) onComplete();

    trackSessionCompleted({
      tier,
      intent_category: intentCategory,
      badges_earned: earnedCount,
      property_id: propertyId,
    });

    trackResultsViewed({
      tier,
      intent_category: intentCategory,
      property_id: propertyId,
    });

    // AC3: fetch aggregate data
    async function loadAggregate() {
      try {
        const data = await fetchDashboardData(propertyId);
        const completeSessions = (data?.sessions || []).filter((s) => s.is_complete);
        if (completeSessions.length >= 3) {
          const radarData = buildRadarData(completeSessions, data?.responses || []);
          if (radarData) {
            setAggregateData(radarData);
            trackAggregateComparisonViewed({
              session_count: completeSessions.length,
              property_id: propertyId,
            });
          }
        }
      } catch {
        // Aggregate data is optional — fail silently
      } finally {
        setLoadingAggregate(false);
      }
    }

    loadAggregate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0D0D12',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '2.5rem 1.5rem 4rem',
        maxWidth: '680px',
        margin: '0 auto',
      }}
    >
      {/* ── Celebration header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
      >
        <div
          style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            lineHeight: 1,
          }}
        >
          🎉
        </div>
        <h1
          style={{
            fontSize: 'clamp(1.375rem, 3vw, 1.75rem)',
            fontWeight: 700,
            color: '#F8FAFC',
            marginBottom: '0.5rem',
            lineHeight: 1.3,
          }}
        >
          Session complete
        </h1>
        <p
          style={{
            fontSize: '0.9375rem',
            color: tierColor,
            fontWeight: 600,
          }}
        >
          {tierLabel} tier · {earnedCount} badge{earnedCount !== 1 ? 's' : ''} earned
        </p>
      </motion.div>

      {/* ── Badges grid — AC1 ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ marginBottom: '2.5rem' }}
      >
        <h2
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: '#475569',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Badges earned
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
            gap: '1rem',
          }}
        >
          {badgesToShow.map((badge) => (
            <div
              key={badge.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Badge definition={badge} size={56} earned={badge.earned} animate={false} />
              <span
                style={{
                  fontSize: '0.6875rem',
                  color: badge.earned ? '#94A3B8' : '#334155',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                {badge.name}
              </span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Personal results — AC2 ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <h2
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: '#475569',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          Your results
        </h2>

        {/* Intent category */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '0.375rem 0.875rem',
              borderRadius: '20px',
              background: `${tierColor}18`,
              border: `1px solid ${tierColor}50`,
              fontSize: '0.875rem',
              fontWeight: 600,
              color: tierColor,
              marginBottom: '0.5rem',
            }}
          >
            {intentInfo.label}
          </div>
          <p
            style={{
              fontSize: '0.875rem',
              color: '#64748B',
              lineHeight: 1.5,
            }}
          >
            {intentInfo.desc}
          </p>
        </div>

        {/* Top 3 priorities */}
        <div style={{ marginBottom: '1.25rem' }}>
          <p
            style={{
              fontSize: '0.8125rem',
              color: '#475569',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}
          >
            Top expectation priorities
          </p>
          {topPriorities.map((priority, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                marginBottom: '0.5rem',
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: `${tierColor}22`,
                  border: `1px solid ${tierColor}60`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  color: tierColor,
                  marginTop: '1px',
                }}
              >
                {i + 1}
              </div>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#CBD5E1',
                  lineHeight: 1.5,
                }}
              >
                {priority}
              </p>
            </div>
          ))}
        </div>

        {/* Service style from Q31 */}
        {serviceStyleCode && SERVICE_STYLE_LABELS[serviceStyleCode] && (
          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '8px',
              padding: '0.875rem 1rem',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <p
              style={{
                fontSize: '0.75rem',
                color: '#475569',
                fontWeight: 600,
                marginBottom: '0.25rem',
              }}
            >
              Preferred service style
            </p>
            <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.5 }}>
              {SERVICE_STYLE_LABELS[serviceStyleCode]}
            </p>
          </div>
        )}
      </motion.section>

      {/* ── Aggregate comparison — AC3 ── */}
      {!loadingAggregate && aggregateData && (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <h2
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#475569',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              marginBottom: '0.375rem',
            }}
          >
            How your team sees it
          </h2>
          <p
            style={{
              fontSize: '0.8125rem',
              color: '#334155',
              marginBottom: '1.5rem',
            }}
          >
            Anonymous distribution across all completed sessions at this property
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={aggregateData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#475569', fontSize: 11 }}
              />
              <Radar
                name="Guest Intent"
                dataKey="value"
                stroke={tierColor}
                fill={tierColor}
                fillOpacity={0.18}
                strokeWidth={1.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.section>
      )}

      {/* ── Thank you footer ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        style={{ textAlign: 'center' }}
      >
        <p
          style={{
            fontSize: '0.875rem',
            color: '#334155',
            lineHeight: 1.6,
            maxWidth: '420px',
            margin: '0 auto',
          }}
        >
          Your responses are anonymous and contribute directly to understanding
          what guests at this property genuinely expect.
        </p>
      </motion.div>
    </div>
  );
}
