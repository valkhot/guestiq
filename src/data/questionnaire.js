// src/data/questionnaire.js
// GuestIQ — Phase 1a Content Source
// THE ONLY import point is src/hooks/useQuestionnaire.js.
// No component imports this file directly.
// Phase 1b: content extracted to 6 JSON files (same structure, same field names).
// Phase 2: content moves to Supabase questions table (same field names).

const questionnaire = {
  // ── questions ────────────────────────────────────────────────────────────
  // 80 question objects: Q0 (QR1, tense routing) + Q1–Q79 (instrument)
  // Each object has exactly 13 required fields — see S1-2.3 for full spec.
  questions: [

    // ── Q0 — Tense Routing Gate ─────────────────────────────────────────
    {
      id: 'QR1',
      module: 0,
      section: '0',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: 'Are you completing this questionnaire about a hotel stay you have recently experienced, or about a stay you are planning or expecting to take?',
        anticipatory: 'Are you completing this questionnaire about a hotel stay you have recently experienced, or about a stay you are planning or expecting to take?',
      },
      instruction: null,
      options: [
        { code: 'A', taxonomy_code: 'RETROSPECTIVE', text: 'I am reflecting on a stay I have already completed (within the past 90 days)' },
        { code: 'B', taxonomy_code: 'ANTICIPATORY', text: 'I am thinking about a stay I am planning or likely to take in the near future' },
        { code: 'C', taxonomy_code: 'RETROSPECTIVE', text: 'Both — I have recently stayed and have another stay coming up' },
        { code: 'D', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: false,
      max_selections: null,
      researcher_note: 'Q0 determines tense_frame for entire session. A/C/D → retrospective. B → anticipatory. Flag C and D sessions analytically.',
      routes_module_5: false,
      module_5_code: null,
    },

    // ── Q1 — Primary Stay Purpose (Intent Capture) ──────────────────────
    {
      id: 'Q1',
      module: 1,
      section: '1A',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: 'What was the main reason for this hotel stay? Select the one that best fits — even if your stay has more than one purpose.',
        anticipatory: 'What is the main reason for this hotel stay? Select the one that best fits — even if your stay has more than one purpose.',
      },
      instruction: null,
      options: [
        { code: 'A', taxonomy_code: 'WORK-TRANS', text: 'Work or business — meetings, site visits, or client engagements' },
        { code: 'B', taxonomy_code: 'WORK-EVENT', text: 'Work or business — attending a conference, trade show, or professional event' },
        { code: 'C', taxonomy_code: 'WORK-EXT', text: 'Work or business — extended assignment or project away from home' },
        { code: 'D', taxonomy_code: 'LEIS-PLAN', text: 'Leisure — a planned holiday, city break, or vacation' },
        { code: 'E', taxonomy_code: 'LEIS-SOC', text: 'Leisure — attending a personal event (wedding, reunion, celebration, concert, sports event)' },
        { code: 'F', taxonomy_code: 'LEIS-EXP', text: 'Leisure — exploring somewhere new, sightseeing, or cultural experience' },
        { code: 'G', taxonomy_code: 'DISP-HOME', text: 'Personal necessity — my home was / is temporarily unavailable' },
        { code: 'H', taxonomy_code: 'DISP-TRANS', text: 'Personal necessity — I needed a neutral or private space during a life transition' },
        { code: 'I', taxonomy_code: 'MED', text: 'Medical or health-related — staying near a hospital, clinic, or treatment facility' },
        { code: 'J', taxonomy_code: 'FAM', text: 'Family reasons — visiting family or supporting a family situation' },
        { code: 'K', taxonomy_code: 'TRANSIT', text: 'In transit — passing through, early flight, late arrival, or long layover' },
        { code: 'L', taxonomy_code: 'LOC-ESC', text: 'A local escape — distance from routine without traveling far from home' },
        { code: 'M', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      researcher_note: 'Q1 is the intent capture question. taxonomy_code stored as intent_category in sessions table — drives all Module 5 routing.',
      routes_module_5: true,
      module_5_code: 'taxonomy_code',
    },

    // ── Q2 — Secondary Purpose ───────────────────────────────────────────
    {
      id: 'Q2',
      module: 1,
      section: '1A',
      tiers: ['professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: 'How would you describe the secondary purpose of this stay, if any?',
        anticipatory: 'How would you describe the secondary purpose of this stay, if any?',
      },
      instruction: null,
      options: [
        { code: 'A', taxonomy_code: null, text: 'There was no secondary purpose — it was purely for one reason' },
        { code: 'B', taxonomy_code: 'LEIS-PLAN', text: 'Business primary, but I planned some personal time around it' },
        { code: 'C', taxonomy_code: 'WORK-TRANS', text: 'Leisure primary, but I had some work obligations during the stay' },
        { code: 'D', taxonomy_code: 'FAM', text: 'I combined visiting family with personal leisure time' },
        { code: 'E', taxonomy_code: 'LEIS-EXP', text: 'I combined attending an event with exploring the destination' },
        { code: 'F', taxonomy_code: 'MED', text: 'I used downtime around a medical or care commitment' },
        { code: 'G', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      researcher_note: 'Q2 shown to Professional and Expert only. None option or G = no secondary. Same sub-section as Q1 = skip secondary.',
      routes_module_5: false,
      module_5_code: null,
    },

    // ── Q3–Q79: Remaining questions ──────────────────────────────────────
    // Sprint 3 builds out all remaining questions with full content.
    // Placeholder objects below maintain array structure and allow
    // tier routing logic to be tested in Sprint 2 with Q0 and Q1.
    // Each placeholder has all 13 required fields.

    ...Array.from({ length: 77 }, (_, i) => ({
      id: `Q${i + 3}`,
      module: i + 3 <= 9 ? 1 : i + 3 <= 18 ? 2 : i + 3 <= 30 ? 3 : i + 3 <= 38 ? 4 : i + 3 <= 56 ? 5 : i + 3 <= 66 ? 6 : 7,
      section: 'placeholder',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: `[Q${i + 3} — Full question text added in Sprint 3]`,
        anticipatory: `[Q${i + 3} — Full question text added in Sprint 3]`,
      },
      instruction: null,
      options: [
        { code: 'A', taxonomy_code: null, text: 'Option A — Sprint 3' },
        { code: 'B', taxonomy_code: null, text: 'Option B — Sprint 3' },
      ],
      has_none_option: true,
      max_selections: null,
      researcher_note: `Placeholder for Q${i + 3}. Full content added Sprint 3.`,
      routes_module_5: false,
      module_5_code: null,
    })),
  ],

  // ── episodes ─────────────────────────────────────────────────────────────
  episodes: [
    { number: 1, name: 'Why You Stay', moduleMappings: [1], curiosityHookText: 'You know why guests come. Now we dig into how they decide.', curiosityHookSubtext: null },
    { number: 2, name: 'Your Space', moduleMappings: [3], curiosityHookText: 'The room matters more than guests admit.', curiosityHookSubtext: null },
    { number: 3, name: 'Before You Arrive', moduleMappings: [2], curiosityHookText: 'Expectations form before the guest walks in.', curiosityHookSubtext: null },
    { number: 4, name: 'The Human Element', moduleMappings: [4], curiosityHookText: 'Service is where hotels win or lose.', curiosityHookSubtext: null },
    { number: 5, name: 'Your Kind of Stay', moduleMappings: [5], curiosityHookText: 'Every stay type has its own set of non-negotiables.', curiosityHookSubtext: null },
    { number: 6, name: "What It's Worth", moduleMappings: [6], curiosityHookText: 'Value is always relative — relative to expectations.', curiosityHookSubtext: null },
    { number: 7, name: 'After the Stay', moduleMappings: [7], curiosityHookText: null, curiosityHookSubtext: null },
  ],

  // ── tiers ─────────────────────────────────────────────────────────────────
  tiers: {
    amateur: {
      name: 'Amateur',
      descriptor: 'Quick take on the essentials — 8 focused questions',
      timeEstimate: '~5 minutes',
      questionCount: 8,
      ctaLabel: 'Start as Amateur',
      colorToken: 'amateur-400',
    },
    professional: {
      name: 'Professional',
      descriptor: 'Deeper dive into service and environment — 18 questions',
      timeEstimate: '~8 minutes',
      questionCount: 18,
      ctaLabel: 'Start as Professional',
      colorToken: 'professional-400',
    },
    expert: {
      name: 'Expert',
      descriptor: 'The complete picture — all 7 modules, 79 questions',
      timeEstimate: '~16 minutes',
      questionCount: 79,
      ctaLabel: 'Start as Expert',
      colorToken: 'expert-400',
    },
  },

  // ── uiCopy ────────────────────────────────────────────────────────────────
  uiCopy: {
    welcomeHookText: 'You know hotel guests. What do they actually expect?',
    welcomeContextStatement: 'This questionnaire captures what front desk professionals like you know about guest expectations across different stay types.',
    privacyNoticeText: 'All answers are anonymous. Your responses contribute to aggregate research only.',
    voluntaryParticipationText: 'Participation is voluntary. You may close this page at any time without consequence.',
    mostSelectedBadgeText: 'Most selected',
    notNowLinkLabel: 'Not now — maybe later',
    skipButtonLabel: "Skip — I'm done",
    continueButtonLabel: 'Continue',
    disambiguationTitle: 'Welcome back',
    disambiguationResumeText: 'Resume my session — pick up where I left off',
    disambiguationNewSessionText: 'Start fresh — I am someone new',
    downtimeTitle: 'GuestIQ is temporarily unavailable',
    downtimeMessageText: 'Your answers are saved. Please try again in a few minutes.',
    downtimeRetryLabel: 'Try again',
    configErrorPrefix: 'Configuration error —',
    enrichmentTitle: 'One last thing — help us understand your expertise',
    enrichmentSubtitle: 'Optional. Skip anytime.',
    enrichmentSkipLabel: "Skip — I'm done",
    enrichmentYearsLabel: 'Years in hospitality',
    enrichmentInteractionsLabel: 'Approximate weekly guest interactions',
    enrichmentShiftLabel: 'Primary shift',
  },

  // ── branching ─────────────────────────────────────────────────────────────
  branching: {
    // Module 5 routing: taxonomy code → sub-section ID
    // Must match Branching Logic Specification exactly (S1-2.1)
    module5Routes: {
      'WORK-TRANS': '5A',
      'WORK-EVENT': '5A',
      'WORK-EXT': '5A',
      'LEIS-PLAN': '5B',
      'LEIS-SOC': '5B',
      'LEIS-EXP': '5B',
      'DISP-HOME': '5C',
      'DISP-TRANS': '5C',
      'MED': '5D',
      'FAM': '5E',
      'TRANSIT': '5F',
      'LOC-ESC': '5G',
    },
    // Q2 secondary purpose routing: Q2 answer code → taxonomy code
    q2Routes: {
      A: null,
      B: 'LEIS-PLAN',
      C: 'WORK-TRANS',
      D: 'FAM',
      E: 'LEIS-EXP',
      F: 'MED',
      NONE: null,
    },
    sameSectionSkipEnabled: true,
  },

  // ── taxonomy ──────────────────────────────────────────────────────────────
  taxonomy: {
    'WORK-TRANS': { name: 'Business Travel', description: 'Work stays for meetings, site visits, or client engagements' },
    'WORK-EVENT': { name: 'Conference and Events', description: 'Work stays for conferences, trade shows, or professional events' },
    'WORK-EXT': { name: 'Extended Assignment', description: 'Extended work stays for projects or assignments away from home' },
    'LEIS-PLAN': { name: 'Planned Leisure', description: 'Planned holidays, city breaks, or vacations' },
    'LEIS-SOC': { name: 'Social Occasion', description: 'Leisure stays for personal events: weddings, reunions, celebrations' },
    'LEIS-EXP': { name: 'Exploration', description: 'Sightseeing, cultural experience, or exploring somewhere new' },
    'DISP-HOME': { name: 'Home Displacement', description: 'Staying because home is temporarily unavailable' },
    'DISP-TRANS': { name: 'Life Transition', description: 'Needing a neutral or private space during a personal transition' },
    'MED': { name: 'Medical Adjacent', description: 'Staying near a hospital, clinic, or health facility' },
    'FAM': { name: 'Family Visit', description: 'Visiting or supporting family' },
    'TRANSIT': { name: 'In Transit', description: 'Passing through — early flight, late arrival, or long layover' },
    'LOC-ESC': { name: 'Local Escape', description: 'Personal retreat close to home for rest or restoration' },
  },
};

export default questionnaire;
