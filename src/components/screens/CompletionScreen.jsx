// src/components/screens/CompletionScreen.jsx
// S3-08 — Completion celebration screen and results display
// Builds: badge grid (all 10, locked/earned), personal results, aggregate
// comparison chart (3+ sessions); fires session_completed / results_viewed /
// aggregate_comparison_viewed.
//
// SERVICE LAYER NOTE — supabase.js exports getDashboardData (NOT fetchDashboardData).
// All Supabase calls go through src/services/supabase.js per API Spec v1.0 § 1.
//
// CONTRACT NOTE — earnedBadges is an array of badge DEFINITION OBJECTS produced
// by QuestionScreen's deterministic-final-badges resolution. Each has
// {id, name, color, ariaLabel, svgPath, description, earned}. No keyed lookup.
//
// S3-09: Migrated from inline hex styles to Tailwind utility classes.
//   Tier accent colour imported from src/constants/tierColors.js.

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
import { getTierHex, getTierLabel } from '../../constants/tierColors';

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

// Q31 (service interaction style) — answer codes mapped to descriptors.
// Source: hotel_questionnaire_all79.md § Module 4.
const SERVICE_STYLE_LABELS = {
  A: 'Hands-off — minimal staff contact preferred',
  B: 'Available but unobtrusive',
  C: 'Friendly and conversational',
  D: 'High-touch and personalised',
};

// Tooltip text for unearned badges — explains how to unlock each one.
// Badge IDs match BADGE_IDS in BadgeDefinitions.js.
// Used on the completion screen badge grid for the desaturated/locked state.
const UNLOCK_REQUIREMENTS = {
  'first-step': 'Answer the first question to earn this.',
  'intent-locked': 'Tell us your stay purpose to earn this.',
  'guest-arrival': 'Complete Episode 1 — Why You Stay — to earn this.',
  'environment-critic': 'Complete Episode 3 — Your Space — to earn this.',
  'service-specialist': 'Complete Episode 4 — The Human Element — to earn this.',
  'purpose-expert': 'Complete Episode 5 — Your Kind of Stay — to earn this.',
  'value-analyst': 'Complete Episode 6 — What It\u2019s Worth — to earn this.',
  'full-picture': 'Complete Episode 7 — After the Stay — to earn this.',
  'professional-complete':
    'Complete the Professional tier — go deeper across all dimensions — to earn this.',
  'expert-complete': 'Complete the Expert tier to earn this.',
};

/**
 * CompletionScreen — final screen of the questionnaire.
 *
 * Props:
 *  - tier: 'amateur' | 'professional' | 'expert'
 *  - earnedBadges: array of badge definition objects (each: {id, name, color,
 *    ariaLabel, svgPath, description, earned})
 *  - intentCategory: string — Q1 taxonomy code (e.g. 'WORK-TRANS')
 *  - serviceStyleCode: string | null — Q31 answer code, or null if not asked
 *  - topPriorities: string[] — top 3 expectation labels (derived upstream)
 *  - tenseFrame: 'retrospective' | 'anticipatory'
 *  - sessionStartedAt: number — Date.now() at session start (total time)
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

  // Tier accent — single source of truth from constants module.
  const tierAccent = getTierHex(tier);
  const tierLabel = getTierLabel(tier);

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
      className="min-h-screen bg-canvas-respondent text-primary px-6 py-12"
      role="main"
      aria-labelledby="completion-heading"
    >
      <div className="max-w-[720px] mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <div
            className="text-caption uppercase mb-3 font-semibold"
            style={{
              letterSpacing: '0.15em',
              color: tierAccent,
            }}
          >
            {tierLabel} tier complete
          </div>
          <h1
            id="completion-heading"
            className="text-display font-semibold mb-3"
          >
            ✦ You did it.
          </h1>
          <p className="text-body text-secondary">
            Thank you for sharing your front-desk perspective.
          </p>
        </motion.div>

        {/* Badge grid — all badges always shown; unearned render as locked
            silhouettes to create aspirational signal toward upgrade */}
        {earnedBadges && earnedBadges.length > 0 && (() => {
          const earnedCount = earnedBadges.filter(
            (b) => b && b.earned === true
          ).length;
          const totalCount = earnedBadges.length;
          return (
            <section
              aria-label={`${earnedCount} of ${totalCount} badges earned`}
              className="mb-10"
            >
              <h2
                className={
                  'text-caption uppercase text-secondary mb-4 text-center ' +
                  'font-semibold'
                }
                style={{ letterSpacing: '0.15em' }}
              >
                Badges &nbsp;·&nbsp;
                <span className="text-primary">
                  {earnedCount} of {totalCount} earned
                </span>
              </h2>
              <div
                className="grid gap-4 justify-items-center"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(96px, 1fr))',
                }}
              >
                {earnedBadges
                  .filter((b) => b && b.id)
                  .map((badge) => {
                    const isEarned = badge.earned === true;
                    const color = badge.color || '#94A3B8';
                    // Locked badges render in muted grey, no fill, reduced
                    // opacity. Earned badges render full colour with animation.
                    const displayColor = isEarned ? color : '#475569';
                    const titleText = isEarned
                      ? badge.ariaLabel || badge.name || 'Badge earned'
                      : UNLOCK_REQUIREMENTS[badge.id] ||
                        `Locked — ${badge.name || 'badge'} not yet earned.`;
                    return (
                      <motion.div
                        key={badge.id}
                        initial={
                          isEarned
                            ? { scale: 0.85, opacity: 0 }
                            : { opacity: 0 }
                        }
                        animate={
                          isEarned
                            ? { scale: 1, opacity: 1 }
                            : { opacity: 1 }
                        }
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center text-center w-full"
                        style={{
                          opacity: isEarned ? 1 : 0.35,
                          filter: isEarned ? 'none' : 'grayscale(60%)',
                        }}
                        title={titleText}
                      >
                        <svg
                          width="56"
                          height="56"
                          viewBox="0 0 24 24"
                          role="img"
                          aria-label={titleText}
                          style={{
                            background: isEarned
                              ? `${color}22`
                              : 'transparent',
                            border: `2px ${
                              isEarned ? 'solid' : 'dashed'
                            } ${displayColor}`,
                            borderRadius: '50%',
                            padding: '6px',
                          }}
                        >
                          {badge.svgPath && (
                            <path
                              d={badge.svgPath}
                              fill={isEarned ? color : 'none'}
                              stroke={isEarned ? 'none' : displayColor}
                              strokeWidth={isEarned ? 0 : 1.25}
                            />
                          )}
                        </svg>
                        <span
                          className={
                            'text-xs mt-2 leading-tight ' +
                            (isEarned ? 'text-secondary' : 'text-muted')
                          }
                        >
                          {badge.name}
                        </span>
                      </motion.div>
                    );
                  })}
              </div>
              {earnedCount < totalCount && (
                <p className="text-muted text-xs text-center mt-4 italic">
                  Hover any locked badge to see how to earn it.
                </p>
              )}
            </section>
          );
        })()}

        {/* Personal results */}
        <section
          aria-label="Your personal results"
          className="bg-canvas-surface rounded-card p-6 mb-8"
        >
          <h2
            className={
              'text-caption uppercase text-secondary mb-3 font-semibold'
            }
            style={{ letterSpacing: '0.15em' }}
          >
            Your profile
          </h2>
          <div className="text-heading-lg font-semibold mb-2">
            {intentMeta.name}
          </div>
          {intentMeta.description && (
            <p className="text-secondary text-body mb-5">
              {intentMeta.description}
            </p>
          )}

          {topPriorities && topPriorities.length > 0 && (
            <div className="mb-5">
              <div
                className={
                  'text-caption uppercase text-secondary mb-2 font-semibold'
                }
                style={{ letterSpacing: '0.15em' }}
              >
                Your top priorities
              </div>
              <ul className="text-body text-primary list-none p-0 m-0">
                {topPriorities
                  .filter((label) => typeof label === 'string' && label.length > 0)
                  .slice(0, 3)
                  .map((label, idx) => (
                    <li key={`${label}-${idx}`} className="py-1">
                      · {label}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {serviceStyleCode && SERVICE_STYLE_LABELS[serviceStyleCode] && (
            <div>
              <div
                className={
                  'text-caption uppercase text-secondary mb-2 font-semibold'
                }
                style={{ letterSpacing: '0.15em' }}
              >
                Service interaction style
              </div>
              <p className="text-body text-primary m-0">
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
              className="bg-canvas-surface rounded-card p-6 mb-8"
            >
              <h2
                className={
                  'text-caption uppercase text-secondary mb-1 font-semibold'
                }
                style={{ letterSpacing: '0.15em' }}
              >
                How your colleagues responded
              </h2>
              <p className="text-secondary text-xs mb-4">
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
                        background: 'var(--canvas-surface)',
                        border: '1px solid #1F2B4A',
                        color: 'var(--text-primary)',
                      }}
                    />
                    <Bar dataKey="count" fill={tierAccent} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

        {aggregateError && (
          <p className="text-neutral-600 text-xs text-center mb-6">
            (Aggregate comparison unavailable right now — your responses are saved.)
          </p>
        )}

        <div className="text-center text-neutral-600 text-xs">
          Your responses have been saved. You can close this window.
        </div>
      </div>
    </div>
  );
}
