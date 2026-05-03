// src/data/questionnaire.js
// GuestIQ Phase 1a Content Source
// THE ONLY import point is src/hooks/useQuestionnaire.js.
// Module 1 (Q1-Q9): COMPLETE
// Modules 2-7 (Q10-Q79): stubs — full content added Sprint 3

const questionnaire = {
  questions: [
    // ── Q0 — Tense Routing Gate ──────────────────────────────────────────
    {
      id: 'QR1',
      module: 0,
      section: '0',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective:
          'Are you completing this questionnaire about a hotel stay you have recently experienced, or about a stay you are planning or expecting to take?',
        anticipatory:
          'Are you completing this questionnaire about a hotel stay you have recently experienced, or about a stay you are planning or expecting to take?',
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: 'RETROSPECTIVE',
          text: 'I am reflecting on a stay I have already completed (within the past 90 days)',
        },
        {
          code: 'B',
          taxonomy_code: 'ANTICIPATORY',
          text: 'I am thinking about a stay I am planning or likely to take in the near future',
        },
        {
          code: 'C',
          taxonomy_code: 'RETROSPECTIVE',
          text: 'Both — I have recently stayed and have another stay coming up',
        },
        { code: 'D', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: false,
      max_selections: null,
      researcher_note:
        'Q0 determines tense_frame for entire session. A/C/D → retrospective. B → anticipatory.',
      routes_module_5: false,
      module_5_code: null,
    },

    // ── MODULE 1A — Primary Stay Purpose ────────────────────────────────
    {
      id: 'Q1',
      module: 1,
      section: '1A',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective:
          'What was the main reason for this hotel stay? Select the one that best fits — even if your stay has more than one purpose.',
        anticipatory:
          'What is the main reason for this hotel stay? Select the one that best fits — even if your stay has more than one purpose.',
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: 'WORK-TRANS',
          text: 'Work or business — meetings, site visits, or client engagements',
        },
        {
          code: 'B',
          taxonomy_code: 'WORK-EVENT',
          text: 'Work or business — attending a conference, trade show, or professional event',
        },
        {
          code: 'C',
          taxonomy_code: 'WORK-EXT',
          text: 'Work or business — extended assignment or project away from home',
        },
        {
          code: 'D',
          taxonomy_code: 'LEIS-PLAN',
          text: 'Leisure — a planned holiday, city break, or vacation',
        },
        {
          code: 'E',
          taxonomy_code: 'LEIS-SOC',
          text: 'Leisure — attending a personal event (wedding, reunion, celebration, concert, sports event)',
        },
        {
          code: 'F',
          taxonomy_code: 'LEIS-EXP',
          text: 'Leisure — exploring somewhere new, sightseeing, or cultural experience',
        },
        {
          code: 'G',
          taxonomy_code: 'DISP-HOME',
          text: 'Personal necessity — my home was / is temporarily unavailable',
        },
        {
          code: 'H',
          taxonomy_code: 'DISP-TRANS',
          text: 'Personal necessity — I needed a neutral or private space during a life transition',
        },
        {
          code: 'I',
          taxonomy_code: 'MED',
          text: 'Medical or health-related — staying near a hospital, clinic, or treatment facility',
        },
        {
          code: 'J',
          taxonomy_code: 'FAM',
          text: 'Family reasons — visiting family or supporting a family situation',
        },
        {
          code: 'K',
          taxonomy_code: 'TRANSIT',
          text: 'In transit — passing through, early flight, late arrival, or long layover',
        },
        {
          code: 'L',
          taxonomy_code: 'LOC-ESC',
          text: 'A local escape — distance from routine without traveling far from home',
        },
        { code: 'M', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      researcher_note:
        'Q1 intent capture. taxonomy_code stored as intent_category in sessions. Drives Module 5 routing.',
      routes_module_5: true,
      module_5_code: 'taxonomy_code',
    },

    // ── Q2 — Secondary Purpose (Professional + Expert only) ──────────────
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
        {
          code: 'A',
          taxonomy_code: null,
          text: 'There was no secondary purpose — it was purely for one reason',
        },
        {
          code: 'B',
          taxonomy_code: 'LEIS-PLAN',
          text: 'Business primary, but I planned some personal time around it',
        },
        {
          code: 'C',
          taxonomy_code: 'WORK-TRANS',
          text: 'Leisure primary, but I had some work obligations during the stay',
        },
        {
          code: 'D',
          taxonomy_code: 'FAM',
          text: 'I combined visiting family with personal leisure time',
        },
        {
          code: 'E',
          taxonomy_code: 'LEIS-EXP',
          text: 'I combined attending an event with exploring the destination',
        },
        {
          code: 'F',
          taxonomy_code: 'MED',
          text: 'I used downtime around a medical or care commitment',
        },
        { code: 'G', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      researcher_note:
        'Q2 shown to Professional and Expert only. Drives secondary Module 5 routing.',
      routes_module_5: false,
      module_5_code: null,
    },

    // ── MODULE 1B — Trigger & Planning Horizon ───────────────────────────
    {
      id: 'Q3',
      module: 1,
      section: '1B',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: 'How far in advance did you book this stay?',
        anticipatory: 'How far in advance will you book this stay?',
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: 'UNPLANNED',
          text: 'Same day or within 24 hours — it was entirely unplanned',
        },
        {
          code: 'B',
          taxonomy_code: 'UNPLANNED',
          text: '1–3 days ahead — it came up with very little notice',
        },
        {
          code: 'C',
          taxonomy_code: 'SEMI-PLANNED',
          text: '4–14 days ahead — relatively short notice',
        },
        {
          code: 'D',
          taxonomy_code: 'PLANNED',
          text: '2–6 weeks ahead — moderate advance planning',
        },
        { code: 'E', taxonomy_code: 'PLANNED', text: '1–3 months ahead — planned well in advance' },
        {
          code: 'F',
          taxonomy_code: 'LONG-LEAD',
          text: 'More than 3 months ahead — long-range planning',
        },
        { code: 'G', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      researcher_note: 'A-B=UNPLANNED | C=SEMI-PLANNED | D-F=PLANNED | F=LONG-LEAD',
      routes_module_5: false,
      module_5_code: null,
    },

    {
      id: 'Q4',
      module: 1,
      section: '1B',
      tiers: ['professional', 'expert'],
      type: 'multi_select',
      text: {
        retrospective: 'What triggered the decision to stay at a hotel for this need?',
        anticipatory: 'What is triggering the decision to stay at a hotel for this need?',
      },
      instruction: 'Select all that apply — rank your top two if possible.',
      options: [
        {
          code: 'A',
          taxonomy_code: 'FORCED-DISP',
          text: 'My home or usual accommodation was unavailable',
        },
        {
          code: 'B',
          taxonomy_code: 'CONVENIENCE',
          text: 'The hotel was the most convenient option given the location',
        },
        {
          code: 'C',
          taxonomy_code: 'PRIVACY',
          text: 'I wanted privacy or separation from my usual environment',
        },
        {
          code: 'D',
          taxonomy_code: 'MANDATED',
          text: 'Someone else arranged or required the hotel stay (employer, event organiser, family)',
        },
        {
          code: 'E',
          taxonomy_code: 'AMENITY-PULL',
          text: "I wanted dedicated amenities I don't have at home",
        },
        {
          code: 'F',
          taxonomy_code: 'EXPERIENTIAL',
          text: 'I wanted the experience itself — the hotel was part of the occasion',
        },
        {
          code: 'G',
          taxonomy_code: 'ECONOMIC',
          text: 'Cost or availability made it the most practical choice',
        },
        {
          code: 'H',
          taxonomy_code: 'PROXIMITY',
          text: 'I needed to be close to a specific person, place, or facility',
        },
        { code: 'I', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      researcher_note: null,
      routes_module_5: false,
      module_5_code: null,
    },

    // ── MODULE 1C — Party Configuration ─────────────────────────────────
    {
      id: 'Q5',
      module: 1,
      section: '1C',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: 'Who was staying with you on this trip?',
        anticipatory: 'Who will be staying with you on this trip?',
      },
      instruction: null,
      options: [
        { code: 'A', taxonomy_code: 'SOLO', text: 'Just me — solo stay' },
        { code: 'B', taxonomy_code: 'COUPLE', text: 'My partner or spouse — couple stay' },
        { code: 'C', taxonomy_code: 'FAM-YOUNG', text: 'My family, including children under 12' },
        { code: 'D', taxonomy_code: 'FAM-TEEN', text: 'My family, including teenagers (12–17)' },
        { code: 'E', taxonomy_code: 'FRIEND-GRP', text: 'A group of friends or peers' },
        { code: 'F', taxonomy_code: 'CORP-GRP', text: 'Colleagues or professional contacts' },
        { code: 'G', taxonomy_code: 'MULTI-GEN', text: 'Extended family — multiple generations' },
        { code: 'H', taxonomy_code: 'MIXED', text: 'A mix of personal and professional contacts' },
        { code: 'I', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      researcher_note:
        'SOLO | COUPLE | FAM-YOUNG | FAM-TEEN | FRIEND-GRP | CORP-GRP | MULTI-GEN | MIXED',
      routes_module_5: false,
      module_5_code: null,
    },

    {
      id: 'Q6',
      module: 1,
      section: '1C',
      tiers: ['professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: 'How many rooms did your party use?',
        anticipatory: 'How many rooms will your party use?',
      },
      instruction: null,
      options: [
        { code: 'A', taxonomy_code: null, text: 'One room — everyone together' },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Two rooms — for privacy or different sleeping configurations',
        },
        { code: 'C', taxonomy_code: null, text: 'Three or more rooms — large group or family' },
        { code: 'D', taxonomy_code: null, text: 'A suite or interconnecting rooms' },
        { code: 'E', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      researcher_note: null,
      routes_module_5: false,
      module_5_code: null,
    },

    // ── MODULE 1D — Duration ─────────────────────────────────────────────
    {
      id: 'Q7',
      module: 1,
      section: '1D',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: 'How many nights did you stay?',
        anticipatory: 'How many nights will you stay?',
      },
      instruction: null,
      options: [
        { code: 'A', taxonomy_code: 'DAY-USE', text: 'Day use only — no overnight' },
        { code: 'B', taxonomy_code: 'SHORT-1', text: '1 night' },
        { code: 'C', taxonomy_code: 'SHORT-3', text: '2–3 nights' },
        { code: 'D', taxonomy_code: 'MID-WEEK', text: '4–7 nights' },
        { code: 'E', taxonomy_code: 'EXT-STAY', text: '8–14 nights — extended stay' },
        {
          code: 'F',
          taxonomy_code: 'LONG-PROJ',
          text: '15–30 nights — long-term project or assignment',
        },
        { code: 'G', taxonomy_code: 'RELO', text: 'More than 30 nights' },
        { code: 'H', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      researcher_note: 'DAY-USE | SHORT-1 | SHORT-3 | MID-WEEK | EXT-STAY | LONG-PROJ | RELO',
      routes_module_5: false,
      module_5_code: null,
    },

    // ── MODULE 1E — Substitute Consideration ────────────────────────────
    {
      id: 'Q8',
      module: 1,
      section: '1E',
      tiers: ['professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective:
          'Before choosing a hotel, what other accommodation options did you seriously consider?',
        anticipatory:
          'Before choosing a hotel, what other accommodation options are you seriously considering?',
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: 'NO-ALT',
          text: 'None — the hotel was the obvious choice from the start',
        },
        {
          code: 'B',
          taxonomy_code: 'STR',
          text: 'A short-term rental apartment (e.g. Airbnb, VRBO, serviced apartment)',
        },
        { code: 'C', taxonomy_code: 'SOCIAL', text: 'Staying with friends or family' },
        {
          code: 'D',
          taxonomy_code: 'CORP-HOUSING',
          text: 'A company-managed or employer-provided apartment',
        },
        {
          code: 'E',
          taxonomy_code: 'BUDGET-LODGE',
          text: 'A hostel, guesthouse, or budget lodging',
        },
        { code: 'F', taxonomy_code: 'HOTEL-SWITCH', text: 'A different hotel or hotel category' },
        {
          code: 'G',
          taxonomy_code: 'AVOIDED-TRAVEL',
          text: 'Not traveling at all — managing the situation another way',
        },
        { code: 'H', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      researcher_note:
        'NO-ALT | STR | SOCIAL | CORP-HOUSING | BUDGET-LODGE | HOTEL-SWITCH | AVOIDED-TRAVEL',
      routes_module_5: false,
      module_5_code: null,
    },

    {
      id: 'Q9',
      module: 1,
      section: '1E',
      tiers: ['professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: 'What made you choose a hotel over those alternatives?',
        anticipatory: 'What is making you choose a hotel over those alternatives?',
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Reliability and consistency — I knew what I was getting',
        },
        { code: 'B', taxonomy_code: null, text: 'Location — the hotel was where I needed to be' },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Amenities or services I required (gym, F&B, meeting space, etc.)',
        },
        { code: 'D', taxonomy_code: null, text: 'Privacy and professionalism of the environment' },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'Ease of booking and flexibility (check-in, cancellation, extension)',
        },
        {
          code: 'F',
          taxonomy_code: null,
          text: 'Loyalty points, corporate rate, or someone else was paying',
        },
        {
          code: 'G',
          taxonomy_code: null,
          text: 'It was the only practical option available at the time',
        },
        { code: 'H', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      researcher_note: null,
      routes_module_5: false,
      module_5_code: null,
    },

    // ── MODULES 2–7 (Q10–Q79) — Stubs: full content Sprint 3 ────────────
    ...Array.from({ length: 70 }, (_, i) => {
      const qNum = i + 10;
      const module =
        qNum <= 18 ? 2 : qNum <= 30 ? 3 : qNum <= 38 ? 4 : qNum <= 56 ? 5 : qNum <= 66 ? 6 : 7;
      return {
        id: `Q${qNum}`,
        module,
        section: 'placeholder',
        tiers: ['amateur', 'professional', 'expert'],
        type: 'single_select',
        text: {
          retrospective: `[Q${qNum} — Full question text added in Sprint 3]`,
          anticipatory: `[Q${qNum} — Full question text added in Sprint 3]`,
        },
        instruction: null,
        options: [
          { code: 'A', taxonomy_code: null, text: 'Option A — Sprint 3' },
          { code: 'B', taxonomy_code: null, text: 'Option B — Sprint 3' },
        ],
        has_none_option: true,
        max_selections: null,
        researcher_note: `Placeholder for Q${qNum}. Full content Sprint 3.`,
        routes_module_5: false,
        module_5_code: null,
      };
    }),
  ],

  // ── episodes ─────────────────────────────────────────────────────────────
  episodes: [
    {
      number: 1,
      name: 'Why You Stay',
      moduleMappings: [1],
      curiosityHookText: 'You know why guests come. Now we dig into how they decide.',
      curiosityHookSubtext: null,
    },
    {
      number: 2,
      name: 'Your Space',
      moduleMappings: [3],
      curiosityHookText: 'The room matters more than guests admit.',
      curiosityHookSubtext: null,
    },
    {
      number: 3,
      name: 'Before You Arrive',
      moduleMappings: [2],
      curiosityHookText: 'Expectations form before the guest walks in.',
      curiosityHookSubtext: null,
    },
    {
      number: 4,
      name: 'The Human Element',
      moduleMappings: [4],
      curiosityHookText: 'Service is where hotels win or lose.',
      curiosityHookSubtext: null,
    },
    {
      number: 5,
      name: 'Your Kind of Stay',
      moduleMappings: [5],
      curiosityHookText: 'Every stay type has its own set of non-negotiables.',
      curiosityHookSubtext: null,
    },
    {
      number: 6,
      name: "What It's Worth",
      moduleMappings: [6],
      curiosityHookText: 'Value is always relative — relative to expectations.',
      curiosityHookSubtext: null,
    },
    {
      number: 7,
      name: 'After the Stay',
      moduleMappings: [7],
      curiosityHookText: null,
      curiosityHookSubtext: null,
    },
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
    welcomeContextStatement:
      'This questionnaire captures what front desk professionals like you know about guest expectations across different stay types.',
    privacyNoticeText:
      'All answers are anonymous. Your responses contribute to aggregate research only.',
    voluntaryParticipationText:
      'Participation is voluntary. You may close this page at any time without consequence.',
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
    module5Routes: {
      'WORK-TRANS': '5A',
      'WORK-EVENT': '5A',
      'WORK-EXT': '5A',
      'LEIS-PLAN': '5B',
      'LEIS-SOC': '5B',
      'LEIS-EXP': '5B',
      'DISP-HOME': '5C',
      'DISP-TRANS': '5C',
      MED: '5D',
      FAM: '5E',
      TRANSIT: '5F',
      'LOC-ESC': '5G',
    },
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
    'WORK-TRANS': {
      name: 'Business Travel',
      description: 'Work stays for meetings, site visits, or client engagements',
    },
    'WORK-EVENT': {
      name: 'Conference and Events',
      description: 'Work stays for conferences, trade shows, or professional events',
    },
    'WORK-EXT': {
      name: 'Extended Assignment',
      description: 'Extended work stays for projects or assignments away from home',
    },
    'LEIS-PLAN': {
      name: 'Planned Leisure',
      description: 'Planned holidays, city breaks, or vacations',
    },
    'LEIS-SOC': {
      name: 'Social Occasion',
      description: 'Leisure stays for personal events: weddings, reunions, celebrations',
    },
    'LEIS-EXP': {
      name: 'Exploration',
      description: 'Sightseeing, cultural experience, or exploring somewhere new',
    },
    'DISP-HOME': {
      name: 'Home Displacement',
      description: 'Staying because home is temporarily unavailable',
    },
    'DISP-TRANS': {
      name: 'Life Transition',
      description: 'Needing a neutral or private space during a personal transition',
    },
    MED: {
      name: 'Medical Adjacent',
      description: 'Staying near a hospital, clinic, or health facility',
    },
    FAM: { name: 'Family Visit', description: 'Visiting or supporting family' },
    TRANSIT: {
      name: 'In Transit',
      description: 'Passing through — early flight, late arrival, or long layover',
    },
    'LOC-ESC': {
      name: 'Local Escape',
      description: 'Personal retreat close to home for rest or restoration',
    },
  },
};

export default questionnaire;
