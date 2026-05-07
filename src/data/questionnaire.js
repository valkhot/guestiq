// src/data/questionnaire.js
// GuestIQ Phase 1a Content Source
// Module 1 (Q1–Q9): COMPLETE
// Module 2 (Q10–Q18): COMPLETE
// Module 3 (Q19–Q30): COMPLETE
// Module 4 (Q31–Q38): COMPLETE
// Modules 5–7 (Q39–Q79): stubs — full content Sprint 3

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
      routes_module_5: false,
      module_5_code: null,
      researcher_note: 'Q0 determines tense_frame. A/C/D → retrospective. B → anticipatory.',
    },

    // ══════════════════════════════════════════════════════════════════════
    // MODULE 1 — STAY INTENT & CONTEXT
    // ══════════════════════════════════════════════════════════════════════

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
          text: 'Personal necessity — a private space needed during a difficult personal circumstance',
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
      routes_module_5: true,
      module_5_code: 'taxonomy_code',
      researcher_note:
        'Q1 intent capture. taxonomy_code → intent_category in sessions. Drives Module 5 routing.',
    },
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
      routes_module_5: false,
      module_5_code: null,
      researcher_note: 'Professional + Expert only. Drives secondary Module 5 routing.',
    },
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
      routes_module_5: false,
      module_5_code: null,
      researcher_note: 'A-B=UNPLANNED | C=SEMI-PLANNED | D-F=PLANNED | F=LONG-LEAD',
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
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
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
      routes_module_5: false,
      module_5_code: null,
      researcher_note:
        'SOLO | COUPLE | FAM-YOUNG | FAM-TEEN | FRIEND-GRP | CORP-GRP | MULTI-GEN | MIXED',
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
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
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
      routes_module_5: false,
      module_5_code: null,
      researcher_note: 'DAY-USE | SHORT-1 | SHORT-3 | MID-WEEK | EXT-STAY | LONG-PROJ | RELO',
    },
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
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
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
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },

    // ══════════════════════════════════════════════════════════════════════
    // MODULE 2 — PRE-ARRIVAL EXPECTATIONS
    // ══════════════════════════════════════════════════════════════════════

    {
      id: 'Q10',
      module: 2,
      section: '2A',
      tiers: ['professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: 'How did you find the hotel for this stay?',
        anticipatory: 'How did you find / will you find the hotel for this stay?',
      },
      instruction: null,
      options: [
        { code: 'A', taxonomy_code: null, text: 'Hotel brand website or app directly' },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Online travel agency (e.g. Booking.com, Expedia, Hotels.com)',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Recommendation from someone I trust — colleague, friend, or family',
        },
        {
          code: 'D',
          taxonomy_code: null,
          text: "My company's travel management system or travel agent",
        },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'Loyalty programme — I always stay within this brand',
        },
        {
          code: 'F',
          taxonomy_code: null,
          text: 'Search engine or review site (e.g. TripAdvisor, Google)',
        },
        { code: 'G', taxonomy_code: null, text: 'Social media or influencer content' },
        {
          code: 'H',
          taxonomy_code: null,
          text: 'I have stayed here before and returned by choice',
        },
        { code: 'I', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q11',
      module: 2,
      section: '2A',
      tiers: ['professional', 'expert'],
      type: 'multi_select',
      text: {
        retrospective: 'What information mattered most when deciding which hotel to book?',
        anticipatory: 'What information matters most when deciding which hotel to book?',
      },
      instruction: 'Select up to three.',
      options: [
        { code: 'A', taxonomy_code: null, text: 'Guest reviews and ratings' },
        { code: 'B', taxonomy_code: null, text: 'Room photos and virtual tours' },
        { code: 'C', taxonomy_code: null, text: 'Price and rate transparency — no hidden fees' },
        { code: 'D', taxonomy_code: null, text: 'Location relative to where I needed to be' },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'Specific amenities listed (gym, pool, restaurant, workspace)',
        },
        { code: 'F', taxonomy_code: null, text: 'Cancellation and flexibility policies' },
        {
          code: 'G',
          taxonomy_code: null,
          text: 'Brand reputation or loyalty programme affiliation',
        },
        { code: 'H', taxonomy_code: null, text: 'Sustainability or ethical credentials' },
        { code: 'I', taxonomy_code: null, text: 'Accessibility features' },
        { code: 'J', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: 3,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q12',
      module: 2,
      section: '2A',
      tiers: ['expert'],
      type: 'scale_5',
      text: {
        retrospective:
          'How important is it that the hotel acknowledges your booking and communicates before arrival?',
        anticipatory:
          'How important is it that the hotel acknowledges your booking and communicates before arrival?',
      },
      instruction: null,
      scale_labels: [
        'Not important',
        'Slightly important',
        'Moderately important',
        'Very important',
        'Essential',
      ],
      options: [],
      has_none_option: false,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q13',
      module: 2,
      section: '2A',
      tiers: ['expert'],
      type: 'multi_select',
      text: {
        retrospective: 'What pre-arrival communication would you find most valuable?',
        anticipatory: 'What pre-arrival communication would you find most valuable?',
      },
      instruction: 'Select up to two.',
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Booking confirmation with all key details clearly summarised',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Information about check-in options — time, digital key, express',
        },
        { code: 'C', taxonomy_code: null, text: 'Directions and transport options to the hotel' },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'Offers to pre-arrange services — dining, transfers, special setups',
        },
        {
          code: 'E',
          taxonomy_code: null,
          text: "Information about the hotel's amenities and how to access them",
        },
        {
          code: 'F',
          taxonomy_code: null,
          text: 'Local area guide — restaurants, attractions, practicalities',
        },
        { code: 'G', taxonomy_code: null, text: 'A reminder close to arrival with any updates' },
        {
          code: 'H',
          taxonomy_code: null,
          text: 'I prefer no pre-arrival contact beyond a booking confirmation',
        },
        { code: 'I', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: 2,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q14',
      module: 2,
      section: '2B',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: 'What time did you typically arrive at the hotel?',
        anticipatory: 'What time do you typically arrive at a hotel?',
      },
      instruction: null,
      options: [
        { code: 'A', taxonomy_code: null, text: 'Before noon — I often arrive early' },
        { code: 'B', taxonomy_code: null, text: '12:00–15:00 — standard check-in window' },
        { code: 'C', taxonomy_code: null, text: '15:00–18:00 — standard afternoon arrival' },
        {
          code: 'D',
          taxonomy_code: null,
          text: '18:00–22:00 — evening arrival after work or travel',
        },
        { code: 'E', taxonomy_code: null, text: 'After 22:00 — late-night arrival' },
        { code: 'F', taxonomy_code: null, text: 'It varies significantly depending on the trip' },
        { code: 'G', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q15',
      module: 2,
      section: '2B',
      tiers: ['professional', 'expert'],
      type: 'scale_5',
      text: {
        retrospective: 'How important is guaranteed early check-in (before standard time)?',
        anticipatory: 'How important is guaranteed early check-in (before standard time)?',
      },
      instruction: null,
      scale_labels: [
        'Not important',
        'Nice to have',
        'Moderately important',
        'Very important',
        'I require it',
      ],
      options: [],
      has_none_option: false,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q16',
      module: 2,
      section: '2B',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: 'What was your preferred check-in method?',
        anticipatory: 'What is your preferred check-in method?',
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Traditional front desk check-in — I want to be welcomed personally',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Express front desk — fast and efficient, minimal conversation',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Digital / mobile check-in — completed before arrival, key on my phone',
        },
        { code: 'D', taxonomy_code: null, text: 'Self-service kiosk in the lobby' },
        { code: 'E', taxonomy_code: null, text: 'No strong preference — whatever is fastest' },
        { code: 'F', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q17',
      module: 2,
      section: '2B',
      tiers: ['professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: 'How did you typically get to the hotel for this type of stay?',
        anticipatory: 'How do you typically get to the hotel for this type of stay?',
      },
      instruction: null,
      options: [
        { code: 'A', taxonomy_code: null, text: 'Private car, taxi, or ride-hailing' },
        { code: 'B', taxonomy_code: null, text: 'Public transport' },
        { code: 'C', taxonomy_code: null, text: 'Hotel shuttle or pre-arranged transfer' },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'On foot — the hotel is very close to my destination',
        },
        { code: 'E', taxonomy_code: null, text: 'I drive and need on-site parking' },
        { code: 'F', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q18',
      module: 2,
      section: '2C',
      tiers: ['expert'],
      type: 'single_select',
      text: {
        retrospective:
          'How easy was it to communicate any special requirements to the hotel before arrival?',
        anticipatory:
          'How easy do you expect it to be to communicate any special requirements to the hotel before arrival?',
      },
      instruction: null,
      options: [
        { code: 'A', taxonomy_code: null, text: 'Very easy — the booking process made it simple' },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Somewhat easy — I found a way to communicate my needs',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Neutral — I had no special requirements to communicate',
        },
        { code: 'D', taxonomy_code: null, text: 'Somewhat difficult — it required extra effort' },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'Very difficult — the hotel made it hard to convey what I needed',
        },
        { code: 'F', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note:
        'Surfaces accessibility friction without asking about the nature of the requirement.',
    },

    // ══════════════════════════════════════════════════════════════════════
    // MODULE 3 — PHYSICAL ENVIRONMENT EXPECTATIONS
    // ══════════════════════════════════════════════════════════════════════

    {
      id: 'Q19',
      module: 3,
      section: '3A',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: 'For this stay, which type of room did you ideally want?',
        anticipatory: 'For this stay, which type of room would you ideally want?',
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Standard room — clean, functional, no frills needed',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'A room with a workspace that genuinely works — desk, good lighting, outlets',
        },
        { code: 'C', taxonomy_code: null, text: 'A room with a dedicated sitting or lounge area' },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'A suite or larger room — I need space to spread out or entertain',
        },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'A room configured for two people with appropriate sleeping arrangements',
        },
        { code: 'F', taxonomy_code: null, text: 'A family room or interconnecting rooms' },
        {
          code: 'G',
          taxonomy_code: null,
          text: 'A long-stay or apartment-style room with kitchen facilities',
        },
        {
          code: 'H',
          taxonomy_code: null,
          text: 'A room with a specific view or physical characteristic',
        },
        { code: 'I', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q20',
      module: 3,
      section: '3A',
      tiers: ['professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: 'How important was the floor level or room position within the hotel?',
        anticipatory: 'How important is the floor level or room position within the hotel?',
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Very important — I have a strong preference (high floor, quiet side, corner, etc.)',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Somewhat important — I would prefer but will not insist',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Indifferent — room quality matters more than position',
        },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'I prefer lower floors — easier access, less dependent on lifts',
        },
        { code: 'E', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q21',
      module: 3,
      section: '3B',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'multi_select',
      text: {
        retrospective: 'Which aspects of cleanliness were non-negotiable for you?',
        anticipatory: 'Which aspects of cleanliness are non-negotiable for you?',
      },
      instruction: 'Select up to three.',
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Bedding and linen — visibly clean and freshly laundered',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Bathroom hygiene — toilet, shower, and surfaces spotless',
        },
        { code: 'C', taxonomy_code: null, text: 'No visible evidence of previous guests' },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'Air quality — no musty, chemical, or unpleasant odours',
        },
        { code: 'E', taxonomy_code: null, text: 'Floor and carpet cleanliness' },
        {
          code: 'F',
          taxonomy_code: null,
          text: 'High-touch surfaces — remote controls, door handles, phones',
        },
        { code: 'G', taxonomy_code: null, text: 'Minibar, coffee area, and glassware hygiene' },
        {
          code: 'H',
          taxonomy_code: null,
          text: 'Overall sense of freshness upon entering the room',
        },
        { code: 'I', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: 3,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q22',
      module: 3,
      section: '3B',
      tiers: ['professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: 'How did you feel about housekeeping visiting your room during your stay?',
        anticipatory: 'How do you feel about housekeeping visiting your room during your stay?',
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'I want daily full housekeeping — it is part of what I am paying for',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'I want housekeeping every other day — a reasonable balance',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'I prefer minimal housekeeping — only when I explicitly request it',
        },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'I do not want anyone entering my room unless absolutely necessary',
        },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'I want full control over when and how often housekeeping comes',
        },
        { code: 'F', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q23',
      module: 3,
      section: '3C',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'scale_5',
      text: {
        retrospective: 'How sensitive are you to noise when sleeping in a hotel?',
        anticipatory: 'How sensitive are you to noise when sleeping in a hotel?',
      },
      instruction: null,
      scale_labels: [
        'Not sensitive — I sleep through anything',
        'Slightly sensitive',
        'Moderately sensitive',
        'Very sensitive',
        'Extremely sensitive — noise ruins my stay',
      ],
      options: [],
      has_none_option: false,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q24',
      module: 3,
      section: '3C',
      tiers: ['professional', 'expert'],
      type: 'multi_select',
      text: {
        retrospective: 'Which noise sources concerned you most?',
        anticipatory: 'Which noise sources concern you most?',
      },
      instruction: 'Select all that apply.',
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Noise from other guests — corridors, adjacent rooms, above/below',
        },
        { code: 'B', taxonomy_code: null, text: 'Street noise — traffic, construction, nightlife' },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'HVAC systems — air conditioning or heating noise',
        },
        { code: 'D', taxonomy_code: null, text: 'Elevator or mechanical sounds' },
        { code: 'E', taxonomy_code: null, text: 'Early morning deliveries or staff activity' },
        { code: 'F', taxonomy_code: null, text: 'Noise is not a concern for me' },
        { code: 'G', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q25',
      module: 3,
      section: '3C',
      tiers: ['expert'],
      type: 'scale_5',
      text: {
        retrospective: 'How important is natural light in your hotel room?',
        anticipatory: 'How important is natural light in your hotel room?',
      },
      instruction: null,
      scale_labels: [
        'Not important',
        'Slightly important',
        'Moderately important',
        'Very important',
        'Essential',
      ],
      options: [],
      has_none_option: false,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q26',
      module: 3,
      section: '3C',
      tiers: ['expert'],
      type: 'scale_5',
      text: {
        retrospective: 'How important is the ability to control your room temperature precisely?',
        anticipatory: 'How important is the ability to control your room temperature precisely?',
      },
      instruction: null,
      scale_labels: [
        'Not important',
        'Slightly important',
        'Moderately important',
        'Very important',
        'Significantly affects my sleep / wellbeing',
      ],
      options: [],
      has_none_option: false,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q27',
      module: 3,
      section: '3D',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective: 'How critical was reliable, fast Wi-Fi to your stay?',
        anticipatory: 'How critical is reliable, fast Wi-Fi to your stay?',
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Essential and a dealbreaker if unreliable — I depend on it professionally',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Very important — I use it heavily for personal and professional needs',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Moderately important — I use it for streaming and browsing',
        },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'Somewhat important — I check messages and emails',
        },
        { code: 'E', taxonomy_code: null, text: 'Not important — I use my own mobile data' },
        { code: 'F', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q28',
      module: 3,
      section: '3D',
      tiers: ['professional', 'expert'],
      type: 'multi_select',
      text: {
        retrospective: 'What in-room technology features mattered most to you?',
        anticipatory: 'What in-room technology features matter most to you?',
      },
      instruction: 'Select up to three.',
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Sufficient power outlets and USB ports near the bed and desk',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Smart TV with streaming apps or ability to cast from my device',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'In-room controls for lighting, temperature, and blackout blinds',
        },
        { code: 'D', taxonomy_code: null, text: 'A Bluetooth speaker or good audio system' },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'A landline phone for easy room-to-hotel communication',
        },
        {
          code: 'F',
          taxonomy_code: null,
          text: 'In-room tablet or control panel for hotel services',
        },
        { code: 'G', taxonomy_code: null, text: 'I care very little about in-room technology' },
        { code: 'H', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: 3,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q29',
      module: 3,
      section: '3E',
      tiers: ['expert'],
      type: 'scale_5',
      text: {
        retrospective: 'How important were visible safety and security features to your comfort?',
        anticipatory: 'How important are visible safety and security features to your comfort?',
      },
      instruction: null,
      scale_labels: [
        'Not important',
        'Slightly important',
        'Moderately important',
        'Very important',
        'A major factor in my hotel choice',
      ],
      options: [],
      has_none_option: false,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q30',
      module: 3,
      section: '3E',
      tiers: ['expert'],
      type: 'multi_select',
      text: {
        retrospective: 'Which security features mattered most to you?',
        anticipatory: 'Which security features matter most to you?',
      },
      instruction: 'Select up to two.',
      options: [
        { code: 'A', taxonomy_code: null, text: 'In-room safe for valuables' },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Electronic or digital door locks with no visible compromise',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Controlled access to guest floors — key card barriers',
        },
        { code: 'D', taxonomy_code: null, text: '24-hour visible security or front desk presence' },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'Privacy features — do not disturb signage, door reinforcement',
        },
        { code: 'F', taxonomy_code: null, text: 'CCTV coverage in public areas' },
        { code: 'G', taxonomy_code: null, text: 'Security is not a factor I actively consider' },
        { code: 'H', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: 2,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },

    // ══════════════════════════════════════════════════════════════════════
    // MODULE 4 — SERVICE & HUMAN INTERACTION EXPECTATIONS
    // ══════════════════════════════════════════════════════════════════════

    {
      id: 'Q31',
      module: 4,
      section: '4A',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective:
          'How much human interaction did you want from hotel staff during this type of stay?',
        anticipatory:
          'How much human interaction do you want from hotel staff during this type of stay?',
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: 'HIGH-TOUCH',
          text: 'High-touch — I enjoy being recognised, greeted warmly, and engaged throughout',
        },
        {
          code: 'B',
          taxonomy_code: 'ATTENTIVE',
          text: 'Professional and attentive — available when I need them, not intrusive',
        },
        {
          code: 'C',
          taxonomy_code: 'EFFICIENT',
          text: 'Minimal and efficient — handle my needs quickly, otherwise leave me alone',
        },
        {
          code: 'D',
          taxonomy_code: 'INVISIBLE',
          text: 'Invisible — I prefer technology-mediated service and minimal human contact',
        },
        {
          code: 'E',
          taxonomy_code: 'CONTEXT-DEP',
          text: 'It depends strongly on the time of day and what I am doing',
        },
        { code: 'F', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: 'HIGH-TOUCH | ATTENTIVE | EFFICIENT | INVISIBLE | CONTEXT-DEP',
    },
    {
      id: 'Q32',
      module: 4,
      section: '4A',
      tiers: ['professional', 'expert'],
      type: 'scale_5',
      text: {
        retrospective:
          'How important was it that staff recognised you and recalled preferences from previous stays?',
        anticipatory:
          'How important is it that staff recognise you and recall preferences from previous stays?',
      },
      instruction: null,
      scale_labels: [
        'Unimportant — I prefer anonymity',
        'Slightly important',
        'Moderately important',
        'Very important',
        'One of the most important service qualities',
      ],
      options: [],
      has_none_option: false,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q33',
      module: 4,
      section: '4A',
      tiers: ['expert'],
      type: 'single_select',
      text: {
        retrospective: 'How did you prefer to make service requests during your stay?',
        anticipatory: 'How do you prefer to make service requests during your stay?',
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Calling the front desk or a dedicated service line',
        },
        { code: 'B', taxonomy_code: null, text: 'Messaging via hotel app on my phone' },
        { code: 'C', taxonomy_code: null, text: 'Speaking to staff in person' },
        { code: 'D', taxonomy_code: null, text: 'Using an in-room device or smart screen' },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'I prefer not to request anything — I like things to be pre-arranged',
        },
        { code: 'F', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q34',
      module: 4,
      section: '4B',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'multi_select',
      text: {
        retrospective: 'Which staff qualities mattered most to you?',
        anticipatory: 'Which staff qualities matter most to you?',
      },
      instruction: 'Select up to three.',
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Speed and efficiency — they get things done without delay',
        },
        { code: 'B', taxonomy_code: null, text: 'Genuine warmth and friendliness' },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Local knowledge — can advise on the area, restaurants, transport',
        },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'Discretion — they respect my privacy and do not over-engage',
        },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'Problem-solving ability — handles issues without over-complicating them',
        },
        {
          code: 'F',
          taxonomy_code: null,
          text: 'Language ability — communicates clearly in my language',
        },
        {
          code: 'G',
          taxonomy_code: null,
          text: 'Attentiveness without being asked — they anticipate my needs',
        },
        { code: 'H', taxonomy_code: null, text: 'Professionalism in appearance and manner' },
        { code: 'I', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: 3,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q35',
      module: 4,
      section: '4C',
      tiers: ['amateur', 'professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective:
          'When something went wrong during a stay, what mattered most in how the hotel responded?',
        anticipatory:
          'When something goes wrong during a stay, what matters most in how the hotel responds?',
      },
      instruction: null,
      options: [
        { code: 'A', taxonomy_code: null, text: 'Speed of response — fix it immediately' },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'A genuine apology and acknowledgment that something went wrong',
        },
        { code: 'C', taxonomy_code: null, text: 'A concrete solution, not just words' },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'Compensation or goodwill gesture proportionate to the problem',
        },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'Evidence it will not happen again — systemic fix, not just a patch',
        },
        {
          code: 'F',
          taxonomy_code: null,
          text: 'I do not have to repeat myself or escalate to get results',
        },
        { code: 'G', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q36',
      module: 4,
      section: '4C',
      tiers: ['professional', 'expert'],
      type: 'scale_5',
      text: {
        retrospective:
          'How likely were you to give the hotel a second chance if a problem was handled exceptionally well?',
        anticipatory:
          'How likely are you to give the hotel a second chance if a problem was handled exceptionally well?',
      },
      instruction: null,
      scale_labels: [
        'Very unlikely',
        'Unlikely',
        'Neutral',
        'Likely',
        'Very likely — good recovery builds loyalty',
      ],
      options: [],
      has_none_option: false,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q37',
      module: 4,
      section: '4D',
      tiers: ['professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective:
          'How much did you want the hotel to personalise your experience based on your history or stated preferences?',
        anticipatory:
          'How much do you want the hotel to personalise your experience based on your history or stated preferences?',
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Extensively — I want to feel known and individually catered for',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Moderately — acknowledge my preferences without making it feel intrusive',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Minimally — just remember the basics (room type, dietary needs)',
        },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'Not at all — I prefer each stay to be treated independently',
        },
        { code: 'E', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q38',
      module: 4,
      section: '4D',
      tiers: ['expert'],
      type: 'single_select',
      text: {
        retrospective:
          'How comfortable were you with the hotel storing your personal preferences to improve future stays?',
        anticipatory:
          'How comfortable are you with the hotel storing your personal preferences to improve future stays?',
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Fully comfortable — the more they know, the better my experience',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Comfortable with basic operational preferences only (room type, dietary needs)',
        },
        { code: 'C', taxonomy_code: null, text: 'Neutral — I have not thought about this' },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'Slightly uncomfortable — I prefer minimal data storage',
        },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'Very uncomfortable — I do not want my preferences stored',
        },
        { code: 'F', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },

    // ══════════════════════════════════════════════════════════════════════
    // MODULE 5 — FUNCTIONAL NEEDS BY STAY PURPOSE (S3-01 COMPLETE)
    // Routing: intent_category → section. Engine in useQuestionnaire.js.
    // intent_codes field drives filtering — not used at render time.
    // ══════════════════════════════════════════════════════════════════════

    // ── 5A — WORK & BUSINESS [WORK-TRANS | WORK-EVENT | WORK-EXT] ────────
    {
      id: 'Q39',
      module: 5,
      section: '5A',
      intent_codes: ['WORK-TRANS', 'WORK-EVENT', 'WORK-EXT'],
      tiers: ['professional', 'expert'],
      type: 'scale_5',
      text: {
        retrospective: 'How important was a high-quality, dedicated workspace in your hotel room?',
        anticipatory: 'How important is a high-quality, dedicated workspace in your hotel room?',
      },
      instruction: null,
      scale_labels: [
        'Irrelevant',
        'Nice to have',
        'Moderately important',
        'Very important',
        'Essential — my productivity depends on it',
      ],
      options: [],
      has_none_option: false,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q40',
      module: 5,
      section: '5A',
      intent_codes: ['WORK-TRANS', 'WORK-EVENT', 'WORK-EXT'],
      tiers: ['professional', 'expert'],
      type: 'multi_select',
      text: {
        retrospective: 'What did an effective hotel workspace require for you?',
        anticipatory: 'What does an effective hotel workspace require for you?',
      },
      instruction: 'Select up to three.',
      options: [
        { code: 'A', taxonomy_code: null, text: 'A full-sized desk with an ergonomic chair' },
        { code: 'B', taxonomy_code: null, text: 'Reliable, fast, and secure internet connection' },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Good desk lighting that does not cause eye strain',
        },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'Multiple power outlets and USB ports at desk level',
        },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'A large monitor or ability to connect my laptop to the TV',
        },
        { code: 'F', taxonomy_code: null, text: 'Quiet environment with strong sound insulation' },
        {
          code: 'G',
          taxonomy_code: null,
          text: 'A phone/video call-friendly background and acoustics',
        },
        { code: 'H', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: 3,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q41',
      module: 5,
      section: '5A',
      intent_codes: ['WORK-TRANS', 'WORK-EVENT', 'WORK-EXT'],
      tiers: ['expert'],
      type: 'single_select',
      text: {
        retrospective: 'Did you need access to hotel meeting or working spaces beyond your room?',
        anticipatory: 'Do you need access to hotel meeting or working spaces beyond your room?',
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Yes — I needed a private meeting room for professional meetings',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Yes — I needed a co-working lounge or business centre',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Possibly — it would be useful but is not essential',
        },
        { code: 'D', taxonomy_code: null, text: 'No — I work exclusively from my room' },
        { code: 'E', taxonomy_code: null, text: 'No — my meetings happen off-property' },
        { code: 'F', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q42',
      module: 5,
      section: '5A',
      intent_codes: ['WORK-TRANS', 'WORK-EVENT', 'WORK-EXT'],
      tiers: ['professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective:
          "How important was the hotel's food and beverage offering for your work-related stay?",
        anticipatory:
          "How important is the hotel's food and beverage offering for work-related stays?",
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Very important — I entertain clients or colleagues at the hotel',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Important — I rely on room service and in-hotel dining when working late',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Moderate — breakfast matters; I dine out for other meals',
        },
        { code: 'D', taxonomy_code: null, text: 'Minimal — I primarily eat outside the hotel' },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'Not important — I manage my own food arrangements',
        },
        { code: 'F', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q43',
      module: 5,
      section: '5A',
      intent_codes: ['WORK-EXT'],
      tiers: ['expert'],
      type: 'multi_select',
      text: {
        retrospective:
          'For extended work stays of seven or more nights, which features became important?',
        anticipatory:
          'For extended work stays of seven or more nights, which features become important?',
      },
      instruction: 'Select all that apply.',
      options: [
        { code: 'A', taxonomy_code: null, text: 'In-room laundry or on-site laundry service' },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'A kitchenette or ability to store and prepare basic food',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'A gym or fitness facility for daily routine maintenance',
        },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'A sense of routine and familiarity — consistent staff and processes',
        },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'Grocery or essential supplies deliverable to the room',
        },
        {
          code: 'F',
          taxonomy_code: null,
          text: 'A quieter, more residential atmosphere — less hotel bustle',
        },
        {
          code: 'G',
          taxonomy_code: null,
          text: 'Flexible billing — weekly invoicing, expense-ready receipts',
        },
        {
          code: 'H',
          taxonomy_code: null,
          text: 'This section does not apply — my stay is short-term',
        },
        { code: 'I', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: 'Q43 only shown to WORK-EXT sessions — gated in filterQuestionsForSession()',
    },

    // ── 5B — LEISURE [LEIS-PLAN | LEIS-SOC | LEIS-EXP] ──────────────────
    {
      id: 'Q44',
      module: 5,
      section: '5B',
      intent_codes: ['LEIS-PLAN', 'LEIS-SOC', 'LEIS-EXP'],
      tiers: ['amateur', 'professional', 'expert'],
      type: 'multi_select',
      text: {
        retrospective:
          'For leisure stays, which hotel attributes contributed most to the overall experience?',
        anticipatory:
          'For leisure stays, which hotel attributes contribute most to the overall experience?',
      },
      instruction: 'Select up to three.',
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'The sense of arrival — first impression, lobby atmosphere, warm welcome',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Room quality and comfort — this is where I recharge',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Food and beverage — quality dining is part of the leisure experience',
        },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'Recreational amenities — pool, spa, gym, outdoor space',
        },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'Location and proximity to attractions, nightlife, or nature',
        },
        {
          code: 'F',
          taxonomy_code: null,
          text: 'Design and aesthetic — the hotel is beautiful and distinctive',
        },
        {
          code: 'G',
          taxonomy_code: null,
          text: 'Exclusivity or a sense of being somewhere special',
        },
        {
          code: 'H',
          taxonomy_code: null,
          text: 'Family-friendliness — appropriate for children or mixed-age groups',
        },
        { code: 'I', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: 3,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q45',
      module: 5,
      section: '5B',
      intent_codes: ['LEIS-PLAN', 'LEIS-SOC', 'LEIS-EXP'],
      tiers: ['professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective:
          "How important was the hotel's food and beverage offering for your leisure stay?",
        anticipatory: "How important is the hotel's food and beverage offering for leisure stays?",
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Central to the experience — I planned to dine in-hotel significantly',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Important — at least breakfast and one other meal should be excellent',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Moderate — breakfast matters most; I prefer to explore outside for other meals',
        },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'Minimal — I use the hotel for sleeping and spend time elsewhere',
        },
        { code: 'E', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q46',
      module: 5,
      section: '5B',
      intent_codes: ['LEIS-SOC'],
      tiers: ['expert'],
      type: 'multi_select',
      text: {
        retrospective:
          'For stays tied to a specific occasion, what must the hotel get right above all else?',
        anticipatory:
          'For stays tied to a specific occasion, what must the hotel get right above all else?',
      },
      instruction: 'Select up to two.',
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Acknowledgment of the occasion — recognition from staff',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Room setup or in-room amenity tied to the occasion',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Discretion — treating it as special without over-engineering it',
        },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'Reliability — nothing goes wrong on an important day',
        },
        { code: 'E', taxonomy_code: null, text: 'Proximity to the event venue' },
        { code: 'F', taxonomy_code: null, text: 'This stay is not tied to a specific occasion' },
        { code: 'G', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: 2,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: 'Q46 only shown to LEIS-SOC sessions — gated in filterQuestionsForSession()',
    },

    // ── 5C — DISPLACEMENT [DISP-HOME | DISP-TRANS] ───────────────────────
    {
      id: 'Q47',
      module: 5,
      section: '5C',
      intent_codes: ['DISP-HOME', 'DISP-TRANS'],
      tiers: ['amateur', 'professional', 'expert'],
      type: 'multi_select',
      text: {
        retrospective:
          'When staying for practical or logistical reasons outside your normal routine, what mattered most?',
        anticipatory:
          'When staying for practical or logistical reasons outside your normal routine, what matters most?',
      },
      instruction: 'Select up to three.',
      options: [
        {
          code: 'A',
          taxonomy_code: 'RELIABILITY',
          text: 'Reliability — I need to know exactly what to expect, with no surprises',
        },
        {
          code: 'B',
          taxonomy_code: 'NORMALCY',
          text: 'A sense of normalcy — routines and comfort to maintain stability',
        },
        {
          code: 'C',
          taxonomy_code: 'FLEX',
          text: 'Flexibility — ability to extend or modify the stay without friction',
        },
        {
          code: 'D',
          taxonomy_code: 'PRIVACY-SENS',
          text: 'Privacy and discretion — minimal questions, no unnecessary engagement',
        },
        {
          code: 'E',
          taxonomy_code: 'EFFICIENCY',
          text: 'Efficiency in all processes — checking in, accessing services, checking out',
        },
        {
          code: 'F',
          taxonomy_code: 'PROXIMITY',
          text: 'Proximity to a specific place I need to be regularly',
        },
        {
          code: 'G',
          taxonomy_code: 'LONG-STAY-LIVE',
          text: 'A homely feel — enough space and facilities to live, not just sleep',
        },
        { code: 'H', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: 3,
      routes_module_5: false,
      module_5_code: null,
      researcher_note:
        'RELIABILITY | NORMALCY | FLEX | PRIVACY-SENS | EFFICIENCY | PROXIMITY | LONG-STAY-LIVE',
    },
    {
      id: 'Q48',
      module: 5,
      section: '5C',
      intent_codes: ['DISP-HOME', 'DISP-TRANS'],
      tiers: ['professional', 'expert'],
      type: 'single_select',
      text: {
        retrospective:
          'How important was long-term rate or stay flexibility when a stay extended beyond your original expectation?',
        anticipatory:
          'How important is long-term rate or stay flexibility when a stay extends beyond the original expectation?',
      },
      instruction: null,
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Very important — the hotel must accommodate extended stays at a fair rate',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Important — some flexibility and goodwill goes a long way',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Moderate — I can manage if given reasonable notice of rate changes',
        },
        { code: 'D', taxonomy_code: null, text: 'Not applicable — my stay is fixed in duration' },
        { code: 'E', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },

    // ── 5D — MEDICAL [MED] ───────────────────────────────────────────────
    {
      id: 'Q49',
      module: 5,
      section: '5D',
      intent_codes: ['MED'],
      tiers: ['amateur', 'professional', 'expert'],
      type: 'multi_select',
      text: {
        retrospective:
          'When staying near a hospital, clinic, or health facility, which practical hotel features became most important?',
        anticipatory:
          'When staying near a hospital, clinic, or health facility, which practical hotel features become most important?',
      },
      instruction: 'Select up to three.',
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Location — walking distance or easy transport to the facility',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Quiet environment — I need undisturbed rest above all else',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Flexible meal options — access to food at irregular hours',
        },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'Reliable transportation access — taxis and rideshares at any hour',
        },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'Privacy — minimal interaction and discreet service',
        },
        { code: 'F', taxonomy_code: null, text: 'Extended checkout or early check-in flexibility' },
        {
          code: 'G',
          taxonomy_code: null,
          text: 'A calm, unhurried atmosphere — not a busy, loud hotel',
        },
        {
          code: 'H',
          taxonomy_code: null,
          text: 'The ability to have visitors in my room comfortably',
        },
        { code: 'I', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: 3,
      routes_module_5: false,
      module_5_code: null,
      researcher_note:
        'Behavioural/logistical framing only. No clinical questions. MED subcategory derived analytically.',
    },
    {
      id: 'Q50',
      module: 5,
      section: '5D',
      intent_codes: ['MED'],
      tiers: ['professional', 'expert'],
      type: 'scale_5',
      text: {
        retrospective:
          'How important was 24-hour access to food, beverages, and essential supplies during this type of stay?',
        anticipatory:
          'How important is 24-hour access to food, beverages, and essential supplies during this type of stay?',
      },
      instruction: null,
      scale_labels: [
        'Not important',
        'Slightly important',
        'Moderately important',
        'Very important',
        'Essential',
      ],
      options: [],
      has_none_option: false,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },

    // ── 5E — FAMILY [FAM] ────────────────────────────────────────────────
    {
      id: 'Q51',
      module: 5,
      section: '5E',
      intent_codes: ['FAM'],
      tiers: ['amateur', 'professional', 'expert'],
      type: 'multi_select',
      text: {
        retrospective: 'When traveling with children, which hotel features were non-negotiable?',
        anticipatory: 'When traveling with children, which hotel features are non-negotiable?',
      },
      instruction: 'Select up to three.',
      options: [
        { code: 'A', taxonomy_code: null, text: 'Safe and child-appropriate room configuration' },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Interconnecting rooms or a proper family room option',
        },
        { code: 'C', taxonomy_code: null, text: 'Child-friendly food available at flexible hours' },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'On-site facilities for children — pool, play area, or kids club',
        },
        { code: 'E', taxonomy_code: null, text: 'Proximity to family-oriented attractions' },
        {
          code: 'F',
          taxonomy_code: null,
          text: 'Staff who are genuinely welcoming and comfortable with children',
        },
        {
          code: 'G',
          taxonomy_code: null,
          text: 'Baby equipment availability — cot, high chair, sterilising facilities',
        },
        {
          code: 'H',
          taxonomy_code: null,
          text: "A quiet environment appropriate for children's sleep routines",
        },
        { code: 'I', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: 3,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q52',
      module: 5,
      section: '5E',
      intent_codes: ['FAM'],
      tiers: ['expert'],
      type: 'scale_5',
      text: {
        retrospective:
          'How important was the availability of childcare or supervised activities during your stay?',
        anticipatory:
          'How important is the availability of childcare or supervised activities during your stay?',
      },
      instruction: null,
      scale_labels: [
        'Not important',
        'Slightly important',
        'Moderately important',
        'Very important',
        'Essential to how I choose a hotel',
      ],
      options: [],
      has_none_option: false,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },

    // ── 5F — TRANSIT [TRANSIT] ───────────────────────────────────────────
    {
      id: 'Q53',
      module: 5,
      section: '5F',
      intent_codes: ['TRANSIT'],
      tiers: ['amateur', 'professional', 'expert'],
      type: 'multi_select',
      text: {
        retrospective:
          'For transit stays (early flight, late arrival, long layover), what mattered most?',
        anticipatory:
          'For transit stays (early flight, late arrival, long layover), what matters most?',
      },
      instruction: 'Select up to two.',
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'Proximity to the airport or transport hub — walking distance preferred',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Seamless, fast check-in and check-out with no wait',
        },
        { code: 'C', taxonomy_code: null, text: 'Reliable alarm call or wake-up service' },
        {
          code: 'D',
          taxonomy_code: null,
          text: 'A clean room and a good shower — the stay is purely functional',
        },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'Luggage storage before check-in or after check-out',
        },
        { code: 'F', taxonomy_code: null, text: 'Hotel shuttle service to and from the airport' },
        {
          code: 'G',
          taxonomy_code: null,
          text: 'A quiet room — I need to sleep quickly and reliably',
        },
        { code: 'H', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: 2,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q54',
      module: 5,
      section: '5F',
      intent_codes: ['TRANSIT'],
      tiers: ['expert'],
      type: 'scale_5',
      text: {
        retrospective:
          'For day-use or short-window stays, how important was flexible checkout time?',
        anticipatory: 'For day-use or short-window stays, how important is flexible checkout time?',
      },
      instruction: null,
      scale_labels: [
        'Not important',
        'Slightly important',
        'Moderately important',
        'Very important',
        'Essential — I plan my journey around it',
      ],
      options: [],
      has_none_option: false,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },

    // ── 5G — LOCAL ESCAPE [LOC-ESC] ──────────────────────────────────────
    {
      id: 'Q55',
      module: 5,
      section: '5G',
      intent_codes: ['LOC-ESC'],
      tiers: ['amateur', 'professional', 'expert'],
      type: 'multi_select',
      text: {
        retrospective:
          'When booking a hotel near home as a personal escape, what motivated the choice?',
        anticipatory:
          'When booking a hotel near home as a personal escape, what motivates the choice?',
      },
      instruction: 'Select up to two.',
      options: [
        {
          code: 'A',
          taxonomy_code: null,
          text: 'A genuine change of environment — I need to feel somewhere different',
        },
        {
          code: 'B',
          taxonomy_code: null,
          text: 'Complete separation from domestic responsibilities',
        },
        {
          code: 'C',
          taxonomy_code: null,
          text: 'Access to amenities I do not have at home — spa, pool, room service',
        },
        { code: 'D', taxonomy_code: null, text: 'A romantic or intimate occasion with my partner' },
        {
          code: 'E',
          taxonomy_code: null,
          text: 'Personal restoration — rest in a distraction-free space',
        },
        {
          code: 'F',
          taxonomy_code: null,
          text: 'A treat or reward — celebrating something personal',
        },
        { code: 'G', taxonomy_code: null, text: 'Other – please specify' },
      ],
      has_none_option: true,
      max_selections: 2,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },
    {
      id: 'Q56',
      module: 5,
      section: '5G',
      intent_codes: ['LOC-ESC'],
      tiers: ['expert'],
      type: 'scale_5',
      text: {
        retrospective:
          'How important was it that the hotel felt distinctly different from your everyday environment?',
        anticipatory:
          'How important is it that the hotel feels distinctly different from your everyday environment?',
      },
      instruction: null,
      scale_labels: [
        'Not important — functional comfort is enough',
        'Slightly important',
        'Moderately important',
        'Very important',
        'Essential — the contrast is the entire point',
      ],
      options: [],
      has_none_option: false,
      max_selections: null,
      routes_module_5: false,
      module_5_code: null,
      researcher_note: null,
    },

    // ══════════════════════════════════════════════════════════════════════
    // MODULES 6–7 (Q57–Q79) — Stubs: full content Sprint 3 (S3-03)
    // ══════════════════════════════════════════════════════════════════════
    ...Array.from({ length: 23 }, (_, i) => {
      const qNum = i + 57;
      const module = qNum <= 66 ? 6 : 7;
      return {
        id: `Q${qNum}`,
        module,
        section: 'placeholder',
        intent_codes: [],
        tiers: ['amateur', 'professional', 'expert'],
        type: 'single_select',
        text: {
          retrospective: `[Q${qNum} — Full question text added in S3-03]`,
          anticipatory: `[Q${qNum} — Full question text added in S3-03]`,
        },
        instruction: null,
        options: [
          { code: 'A', taxonomy_code: null, text: 'Option A — S3-03' },
          { code: 'B', taxonomy_code: null, text: 'Option B — S3-03' },
        ],
        has_none_option: true,
        max_selections: null,
        routes_module_5: false,
        module_5_code: null,
        researcher_note: `Placeholder for Q${qNum}. Full content S3-03.`,
      };
    }),
  ],

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
