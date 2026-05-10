// src/components/screens/CompletionScreen.jsx
// S3-08 — Completion celebration screen and results display
// Builds: badge grid, personal results, aggregate comparison chart (3+ sessions),
// fires session_completed / results_viewed / aggregate_comparison_viewed.
//
// SERVICE LAYER NOTE — supabase.js exports getDashboardData (NOT fetchDashboardData).
// All Supabase calls go through src/services/supabase.js per API Spec v1.0 § 1.
//
// CONTRACT NOTE — earnedBadges is an array of badge DEFINITION OBJECTS produced by
// useBadges.allBadges (each has id, name, color, ariaLabel, svgPath, description).
// No keyed lookup is performed here.

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  trackSessionCompleted,
  trackResultsViewed,
  trackAggregateComparisonViewed,
} from '../../services/analytics';
import { getDashboardData } from '../../services/supabase';

// 12 intent categories — human-readable labels and short descriptions.
// Keep in sync with branching_logic_specification_v10.md § 3 and
// taxonomy.json (Phase 1b). Used only on the results screen.
const INTENT_LABELS = {
  'WORK-TRANS': {
    name: 'Business Travel',
    description: 'Work-related stay for meetings, site visits, or client engagements.',
  },
  'WORK-EVENT': {
    name: 'Conference or Event',
    description: 'Stay tied to a conference, training, or scheduled event.',
  },
  'WORK-EXT': {
    name: 'Extended Work Stay',
    description: 'Longer-term work assignment requiring a multi-week stay.',
  },
  'LEIS-PLAN': {
    name: 'Planned Leisure',
    description: 'Holiday or vacation booked in advance for relaxation or sightseeing.',
  },
  'LEIS-SOC': {
    name: 'Social Leisure',
    description: 'Leisure stay built around friends, gatherings, or events.',
  },
  'LEIS-EXP': {
    name: 'Experiential Leisure',
    description: 'Leisure stay focused on a specific experience or activity.',
  },
  'DISP-HOME': {
    name: 'Home Displacement',
    description: 'Stay caused by a home-related disruption — renovation, repair, or insurance.',
  },
  'DISP-TRANS': {
    name: 'Transition Stay',
    description: 'Temporary stay during relocation or housing transition.',
  },
  MED: {
    name: 'Medical or Health-Adjacent',
    description: 'Stay tied to a medical appointment, procedure, or care for a relative.',
  },
  FAM: {
    name: 'Family Visit',
    description: 'Stay built around visiting or hosting family members.',
  },
  TRANSIT: {
    name: 'In Transit',
    description: 'Short overnight stay between two longer journeys.',
  },
  'LOC-ESC': {
    name: 'Local Escape',
    description: 'Short break close to home — staycation or local getaway.',
  },
};

// Tier display names + accent colors (matching --tier-400 design tokens).
const TIER_META = {
  amateur: { label: 'Amateur', accent: '#4ADE80' },
  professional: { label: 'Professional', accent: '#60A5FA' },
  expert: { label: 'Expert', accent: '#A78BFA' },
};

// Q31 (service interaction style) — answer codes mapped to descriptors.
// Source: hotel_questionnaire_all79.md § Module 4.
const SERVICE_STYLE_LABELS = {
  A: 'Hands-off — minimal staff contact preferred',
  B: 'Available but unobtrusive',
  C: 'Friendly and conversational',
  D: 'High-touch and personalised',
};

/**
 * CompletionScreen — final screen of the questionnaire.
 *
 * Props:
 *  - tier: 'amateur' | 'professional' | 'expert'
 *  - earnedBadges: array of badge definition objects (each: {id, name, color, ...})
 *  - intentCategory: string — Q1 taxonomy code (e.g. 'WORK-TRANS')
 *  - serviceStyleCode: string | null — Q31 answer code, or null if not asked
 *  - topPriorities: string[] — top 3 expectation labels (derived upstream)
 *  - tenseFrame: 'retrospective' | 'anticipatory'
 *  - sessionStartedAt: number — Date.now() at session start (for total_time_seconds)
 *  - episodeCountCompleted: number — episodes finished
 *  - propertyId: string — for aggregate query and PostHog
 *  - onComplete: () => void — fires session.completeSession() on mount
 */
export default function CompletionScreen({
  tier,
  earnedBadges = [],
  intentCategory,
  serviceStyleCode = null,
  topPriorities = [],
  tenseFrame,
  sessionStartedAt,
  episodeCountCompleted = 0,
  propertyId,
  onComplete,
}) {
  const [aggregateData, setAggregateData] = useState(null);
  const [aggregateError, setAggregateError] = useState(false);

  const tierMeta = TIER_META[tier] || TIER_META.amateur;
  const intentMeta = INTENT_LABELS[intentCategory] || {
    name: intentCategory || 'Unknown',
    description: '',
  };

  // Mount effect — fire completion side-effects exactly once.
  useEffect(() => {
    let cancelled = false;

    const totalTimeSeconds = sessionStartedAt
      ? Math.round((Date.now() - sessionStartedAt) / 1000)
      : 0;

    // Fire session_completed FIRST — funnel anchor: app_loaded → session_completed.
    trackSessionCompleted({
      tier,
      total_time_seconds: totalTimeSeconds,
      episode_count_completed: episodeCountCompleted,
      intent_category: intentCategory,
      tense_frame: tenseFrame,
      property_id: propertyId,
    });

    trackResultsViewed({
      tier,
      intent_category: intentCategory,
      property_id: propertyId,
    });

    // Trigger Supabase write: is_complete=true + completed_at,
    // and clear localStorage token. Owned by parent (App.jsx) via prop.
    if (typeof onComplete === 'function') {
      onComplete();
    }

    // Aggregate comparison — only if 3+ complete sessions exist for property.
    async function loadAggregate() {
      try {
        const result = await getDashboardData(propertyId);
        if (cancelled) return;

        // Per API Spec § 2 + Production Readiness § 7.3, getDashboardData
        // returns { sessions, responses, scale_responses, none_flags } on
        // success or { success: false, ... } on failure.
        if (!result || result.success === false) {
          setAggregateError(true);
          return;
        }

        const sessions = Array.isArray(result.sessions)
          ? result.sessions
          : Array.isArray(result?.data?.sessions)
            ? result.data.sessions
            : [];

        const completeSessions = sessions.filter((s) => s && s.is_complete);

        if (completeSessions.length < 3) {
          setAggregateData({ count: completeSessions.length, chart: [] });
          return;
        }

        // Simple intent-distribution chart so the respondent sees how their
        // primary intent compares to the property cohort.
        const intentCounts = {};
        completeSessions.forEach((s) => {
          const code = s.intent_category;
          if (!code) return;
          intentCounts[code] = (intentCounts[code] || 0) + 1;
        });

        const chart = Object.entries(intentCounts)
          .map(([code, count]) => ({
            code,
            label: INTENT_LABELS[code]?.name || code,
            count,
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6);

        setAggregateData({ count: completeSessions.length, chart });

        trackAggregateComparisonViewed({
          responses_in_aggregate: completeSessions.length,
          property_id: propertyId,
        });
      } catch {
        if (!cancelled) setAggregateError(true);
      }
    }

    loadAggregate();

    return () => {
      cancelled = true;
    };
    // Mount-only effect — dependencies are intentionally fixed at mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0D0D12',
        color: '#F8FAFC',
        padding: '3rem 1.5rem',
        fontFamily: 'system-ui, sans-serif',
      }}
      role="main"
      aria-labelledby="completion-heading"
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: tierMeta.accent,
              marginBottom: '0.75rem',
              fontWeight: 600,
            }}
          >
            {tierMeta.label} tier complete
          </div>
          <h1
            id="completion-heading"
            style={{
              fontSize: '2rem',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}
          >
            ✦ You did it.
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1rem' }}>
            Thank you for sharing your front-desk perspective.
          </p>
        </motion.div>

        {/* Badge grid */}
        {earnedBadges && earnedBadges.length > 0 && (
          <section
            aria-label="Badges earned during this session"
            style={{ marginBottom: '2.5rem' }}
          >
            <h2
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#94A3B8',
                marginBottom: '1rem',
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              Badges earned
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(96px, 1fr))',
                gap: '1rem',
                justifyItems: 'center',
              }}
            >
              {earnedBadges.map((badge) => {
                if (!badge || !badge.id) return null;
                const color = badge.color || '#94A3B8';
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      width: '100%',
                    }}
                  >
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label={badge.ariaLabel || badge.name || 'Badge'}
                      style={{
                        background: `${color}22`,
                        border: `2px solid ${color}`,
                        borderRadius: '50%',
                        padding: '6px',
                      }}
                    >
                      {badge.svgPath && (
                        <path d={badge.svgPath} fill={color} />
                      )}
                    </svg>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        marginTop: '0.5rem',
                        color: '#94A3B8',
                        lineHeight: 1.3,
                      }}
                    >
                      {badge.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* Personal results */}
        <section
          aria-label="Your personal results"
          style={{
            background: '#161620',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <h2
            style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#94A3B8',
              marginBottom: '0.75rem',
              fontWeight: 600,
            }}
          >
            Your profile
          </h2>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            {intentMeta.name}
          </div>
          {intentMeta.description && (
            <p style={{ color: '#94A3B8', fontSize: '0.9375rem', marginBottom: '1.25rem' }}>
              {intentMeta.description}
            </p>
          )}

          {topPriorities && topPriorities.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#94A3B8',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                }}
              >
                Your top priorities
              </div>
              <ul
                style={{
                  fontSize: '1rem',
                  color: '#F8FAFC',
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {topPriorities.slice(0, 3).map((label, idx) => (
                  <li key={`${label}-${idx}`} style={{ padding: '0.25rem 0' }}>
                    · {label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {serviceStyleCode && SERVICE_STYLE_LABELS[serviceStyleCode] && (
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#94A3B8',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                }}
              >
                Service interaction style
              </div>
              <p style={{ fontSize: '1rem', color: '#F8FAFC', margin: 0 }}>
                {SERVICE_STYLE_LABELS[serviceStyleCode]}
              </p>
            </div>
          )}
        </section>

        {/* Aggregate comparison — only if 3+ complete sessions */}
        {aggregateData &&
          aggregateData.count >= 3 &&
          aggregateData.chart.length > 0 && (
            <section
              aria-label="How your priorities compare to other respondents"
              style={{
                background: '#161620',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <h2
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#94A3B8',
                  marginBottom: '0.25rem',
                  fontWeight: 600,
                }}
              >
                How your colleagues responded
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '0.75rem', marginBottom: '1rem' }}>
                Based on {aggregateData.count} complete sessions at this property.
              </p>
              <div style={{ width: '100%', height: 240 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={aggregateData.chart}
                    margin={{ top: 8, right: 16, left: 0, bottom: 24 }}
                  >
                    <CartesianGrid stroke="#1A2540" vertical={false} />
                    <XAxis
                      dataKey="label"
                      stroke="#94A3B8"
                      tick={{ fontSize: 11 }}
                      interval={0}
                      angle={-20}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      stroke="#94A3B8"
                      tick={{ fontSize: 11 }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: '#161620',
                        border: '1px solid #1F2B4A',
                        color: '#F8FAFC',
                      }}
                    />
                    <Bar dataKey="count" fill={tierMeta.accent} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

        {aggregateError && (
          <p
            style={{
              color: '#64748B',
              fontSize: '0.75rem',
              textAlign: 'center',
              marginBottom: '1.5rem',
            }}
          >
            (Aggregate comparison unavailable right now — your responses are saved.)
          </p>
        )}

        <div
          style={{
            textAlign: 'center',
            color: '#64748B',
            fontSize: '0.75rem',
          }}
        >
          Your responses have been saved. You can close this window.
        </div>
      </div>
    </div>
  );
}
