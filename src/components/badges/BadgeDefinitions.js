// src/components/badges/BadgeDefinitions.js
// GuestIQ — Badge definitions and trigger mapping
// 9 badges, each with id, name, aria-label, SVG path data, and trigger condition.

export const BADGE_IDS = {
  FIRST_STEP:         'first-step',
  INTENT_LOCKED:      'intent-locked',
  GUEST_ARRIVAL:      'guest-arrival',
  ENVIRONMENT_CRITIC: 'environment-critic',
  SERVICE_SPECIALIST: 'service-specialist',
  PURPOSE_EXPERT:     'purpose-expert',
  VALUE_ANALYST:      'value-analyst',
  FULL_PICTURE:       'full-picture',
  EXPERT_COMPLETE:    'expert-complete',
};

// Maps episode number → badge awarded on that episode's completion
export const EPISODE_BADGE_MAP = {
  1: BADGE_IDS.GUEST_ARRIVAL,
  3: BADGE_IDS.ENVIRONMENT_CRITIC,
  4: BADGE_IDS.SERVICE_SPECIALIST,
  5: BADGE_IDS.PURPOSE_EXPERT,
  6: BADGE_IDS.VALUE_ANALYST,
  7: BADGE_IDS.FULL_PICTURE,
};

export const BADGE_DEFINITIONS = [
  {
    id: BADGE_IDS.FIRST_STEP,
    name: 'First Step',
    ariaLabel: 'First Step badge — awarded for beginning the questionnaire',
    description: 'You started. That already puts you ahead.',
    color: '#4ADE80',
    // Footprint icon
    svgPath: 'M12 2C9.24 2 7 4.24 7 7s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm-3 15c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v3H9v-3zm8-2c-.55 0-1 .45-1 1v4h2v-4c0-.55-.45-1-1-1zm-10 0c-.55 0-1 .45-1 1v4h2v-4c0-.55-.45-1-1-1z',
  },
  {
    id: BADGE_IDS.INTENT_LOCKED,
    name: 'Intent Locked',
    ariaLabel: 'Intent Locked badge — awarded for identifying the primary stay purpose',
    description: 'You know what brings a guest through the door.',
    color: '#60A5FA',
    // Target/crosshair icon
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z',
  },
  {
    id: BADGE_IDS.GUEST_ARRIVAL,
    name: 'Guest Arrival Expert',
    ariaLabel: 'Guest Arrival Expert badge — awarded for completing the Why You Stay episode',
    description: 'You understand what drives a guest to choose this hotel.',
    color: '#A78BFA',
    // Hotel/building icon
    svgPath: 'M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z',
  },
  {
    id: BADGE_IDS.ENVIRONMENT_CRITIC,
    name: 'Environment Critic',
    ariaLabel: 'Environment Critic badge — awarded for completing the Your Space episode',
    description: 'The physical environment shapes every moment of a stay.',
    color: '#34D399',
    // Home/room icon
    svgPath: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  },
  {
    id: BADGE_IDS.SERVICE_SPECIALIST,
    name: 'Service Specialist',
    ariaLabel: 'Service Specialist badge — awarded for completing the Human Element episode',
    description: 'Service is where hotels win or lose a guest for life.',
    color: '#FBBF24',
    // Star icon
    svgPath: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  },
  {
    id: BADGE_IDS.PURPOSE_EXPERT,
    name: 'Purpose Expert',
    ariaLabel: 'Purpose Expert badge — awarded for completing the Your Kind of Stay episode',
    description: 'Every stay type has its own language of expectations.',
    color: '#F472B6',
    // Compass/navigation icon
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-12.93V7h2v.07c2.83.48 5 2.94 5 5.93 0 2.99-2.17 5.45-5 5.93V19h-2v-.07C7.17 18.45 5 16 5 13c0-2.99 2.17-5.45 5-5.93zM12 17c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z',
  },
  {
    id: BADGE_IDS.VALUE_ANALYST,
    name: 'Value Analyst',
    ariaLabel: 'Value Analyst badge — awarded for completing the What It\'s Worth episode',
    description: 'You understand that value is always relative to expectation.',
    color: '#2DD4BF',
    // Diamond/gem icon
    svgPath: 'M19 3H5L2 9l10 12L22 9l-3-6zm-8.5 7L9 7.5l1.5-2.5h3L15 7.5 13.5 10h-3zm-4.06-1L8 7h1.5L8 9.5 6.44 9zm9.62 0L14 9.5 12.5 7H14l1.56 2z',
  },
  {
    id: BADGE_IDS.FULL_PICTURE,
    name: 'Full Picture',
    ariaLabel: 'Full Picture badge — awarded for completing all 7 episodes',
    description: 'You see the complete guest journey from arrival to advocacy.',
    color: '#818CF8',
    // Circle complete / panorama icon
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z',
  },
  {
    id: BADGE_IDS.EXPERT_COMPLETE,
    name: 'Expert Complete',
    ariaLabel: 'Expert Complete badge — awarded for completing the full Expert tier questionnaire',
    description: 'All 7 modules. Every dimension of guest expectation. Nothing held back.',
    color: '#F59E0B',
    // Trophy icon
    svgPath: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z',
  },
];
