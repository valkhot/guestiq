// src/components/screens/CompletionScreen.jsx
// S3-08 — Completion celebration screen and results display
// Builds: badge grid, personal results, aggregate comparison chart (3+ sessions),
// fires session_completed / results_viewed / aggregate_comparison_viewed.
//
// SERVICE LAYER NOTE — supabase.js exports getDashboardData (NOT fetchDashboardData).
// All Supabase calls go through src/services/supabase.js per API Spec v1.0 § 1.

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
import Badge from '../badges/Badge';
import { BADGE_DEFINITIONS } from '../badges/BadgeDefinitions';
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
    description:
      'Work-related stay for meetings, site visits, or client engagements.',
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
    description:
      'Holiday or vacation booked in advance for relaxation or sightseeing.',
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
    description:
      'Stay caused by a home-related disruption — renovation, repair, or insurance.',
  },
  'DISP-TRANS': {
    name: 'Transition Stay',
    description:
      'Temporary stay during relocation or housing transition.',
  },
  MED: {
    name: 'Medical or Health-Adjacent',
    description:
      'Stay tied to a medical appointment, procedure, or care for a relative.',
  },
  FAM: {
    name: 'Family Visit',
    description:
      'Stay built around visiting or hosting family members.',
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

// Tier display names + tier accent token reference.
const TIER_META = {
  amateur: { label: 'Amateur', tokenClass: 'text-amateur-400' },
  professional: { label: 'Professional', tokenClass: 'text-professional-400' },
  expert: { label: 'Expert', tokenClass: 'text-expert-400' },
};

// Q31 (service interaction style) maps to a short descriptor.
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
 *  - intentCategory: string — Q1 taxonomy code (e.g. 'WORK-TRANS')
 *  - earnedBadges: string[] — array of badge IDs earned this session
 *  - propertyId: string — for aggregate query and PostHog
 *  - sessionStartedAt: number — Date.now() at session start (for total_time_seconds)
 *  - tenseFrame: 'retrospective' | 'anticipatory'
 *  - topPriorities: string[] — top 3 expectation labels (derived upstream)
 *  - serviceStyleAnswer: string | null — Q31 answer code, or null if not asked
 *  - episodeCountCompleted: number — episodes finished
 *  - onComplete: () => void — fires session.completeSession() on mount
 */
export default function CompletionScreen({
  tier,
  intentCategory,
  earnedBadges = [],
  propertyId,
  sessionStartedAt,
  tenseFrame,
  topPriorities = [],
  serviceStyleAnswer = null,
  episodeCountCompleted = 0,
  onComplete,
}) {
  const [aggregateData, setAggregateData] = useState(null);
  const [aggregateError, setAggregateError] = useState(false);

  const tierMeta = TIER_META[tier] || TIER_META.amateur;
  const intentMeta =
    INTENT_LABELS[intentCategory] || {
      name: intentCategory || 'Unknown',
      description: '',
    };

  // Mount effect — fire completion side-effects exactly once.
  useEffect(() => {
    let cancelled = false;

    const totalTimeSeconds = sessionStartedAt
      ? Math.round((Date.now() - sessionStartedAt) / 1000)
      : 0;

    // Fire session_completed FIRST — single source of truth for analytics
    // funnel from app_loaded → session_completed.
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

        // Build a simple intent-distribution chart so the respondent sees
        // how their primary intent compares to the property cohort.
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
      } catch (err) {
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
      className="min-h-screen bg-canvas-respondent text-text-primary px-6 py-12"
      role="main"
      aria-labelledby="completion-heading"
    >
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <div className={`text-sm uppercase tracking-widest mb-3 ${tierMeta.tokenClass}`}>
            {tierMeta.label} tier complete
          </div>
          <h1
            id="completion-heading"
            className="text-3xl sm:text-4xl font-semibold mb-3"
          >
            ✦ You did it.
          </h1>
          <p className="text-text-secondary text-base">
            Thank you for sharing your front-desk perspective.
          </p>
        </motion.div>

        {/* Badge grid */}
        {earnedBadges.length > 0 && (
          <section
            aria-label="Badges earned during this session"
            className="mb-10"
          >
            <h2 className="text-sm uppercase tracking-widest text-text-secondary mb-4 text-center">
              Badges earned
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 justify-items-center">
              {earnedBadges.map((badgeId) => {
                const def = BADGE_DEFINITIONS[badgeId];
                if (!def) return null;
                return (
                  <motion.div
                    key={badgeId}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center text-center"
                  >
                    <Badge
                      badgeId={badgeId}
                      color={def.color || '#94A3B8'}
                      size={56}
                    />
                    <span className="text-xs mt-2 text-text-secondary">
                      {def.name}
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
          className="bg-canvas-surface rounded-xl p-6 mb-8"
        >
          <h2 className="text-sm uppercase tracking-widest text-text-secondary mb-3">
            Your profile
          </h2>
          <div className="text-2xl font-semibold mb-2">{intentMeta.name}</div>
          {intentMeta.description && (
            <p className="text-text-secondary text-sm mb-5">
              {intentMeta.description}
            </p>
          )}

          {topPriorities.length > 0 && (
            <div className="mb-5">
              <div className="text-sm uppercase tracking-widest text-text-secondary mb-2">
                Your top priorities
              </div>
              <ul className="text-base text-text-primary space-y-1">
                {topPriorities.slice(0, 3).map((label, idx) => (
                  <li key={`${label}-${idx}`}>· {label}</li>
                ))}
              </ul>
            </div>
          )}

          {serviceStyleAnswer && SERVICE_STYLE_LABELS[serviceStyleAnswer] && (
            <div>
              <div className="text-sm uppercase tracking-widest text-text-secondary mb-2">
                Service interaction style
              </div>
              <p className="text-base text-text-primary">
                {SERVICE_STYLE_LABELS[serviceStyleAnswer]}
              </p>
            </div>
          )}
        </section>

        {/* Aggregate comparison — only if 3+ complete sessions */}
        {aggregateData && aggregateData.count >= 3 && aggregateData.chart.length > 0 && (
          <section
            aria-label="How your priorities compare to other respondents"
            className="bg-canvas-surface rounded-xl p-6 mb-8"
          >
            <h2 className="text-sm uppercase tracking-widest text-text-secondary mb-1">
              How your colleagues responded
            </h2>
            <p className="text-text-secondary text-xs mb-4">
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
                  <YAxis stroke="#94A3B8" tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#161620',
                      border: '1px solid #1F2B4A',
                      color: '#F8FAFC',
                    }}
                  />
                  <Bar dataKey="count" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

        {aggregateError && (
          <p className="text-text-muted text-xs text-center mb-6">
            (Aggregate comparison unavailable right now — your responses are saved.)
          </p>
        )}

        <div className="text-center text-text-muted text-xs">
          Your responses have been saved. You can close this window.
        </div>
      </div>
    </div>
  );
}
