**JOBS-TO-BE-DONE STATEMENTS**

**GuestIQ · Three Actor Analysis**

|  |  |
| --- | --- |
| **Document ID** | S0-0.3 — Sprint 0 Artifact |
| **Document Version** | 1.0 — Initial Release |
| **Document Status** | DRAFT — Pending Review by Lead Researcher |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Actors Covered** | Actor 1: Hotel Management / Project Sponsor · Actor 2: Lead Researcher · Actor 3: Front Desk Team |
| **Framework** | Jobs-to-be-Done (Christensen / Ulwick) — functional, social, and emotional job dimensions |
| **Purpose** | Reference document for all product decisions. If a design choice does not serve at least one actor's job, it does not belong in the prototype. |
| **Related Document** | GuestIQ Methodology Document v1.1 (S0-0.1) — Section 7.1 |
| **Document Location** | 00-Sprint-0 / AI-Outputs / JTBD-Statements-v1.0.docx |

ℹ JTBD statements describe what actors are trying to accomplish — not what features they use. The product is the means; the job is the end. These statements were implicit throughout all GuestIQ planning decisions. This document makes them explicit so they can be referenced in every sprint when design choices are being made.

# 1. HOW TO USE THESE STATEMENTS

Each actor card contains a primary JTBD statement and three job dimensions: functional (what they are trying to accomplish), social (how they want to be seen by others), and emotional (how they want to feel). It also documents the barriers that make the job hard, the success signal that tells the actor the job is done, and the switching event — what they were doing before GuestIQ and why they switched.

The final row of each card shows the GuestIQ design decisions that are directly driven by that actor's JTBD. This is the practical test: every feature in the product should be traceable to at least one actor's job. If a proposed feature cannot be traced to any actor's job, it is a candidate for deferral.

The cross-actor analysis in Section 5 maps all three actors across the same dimensions — revealing where their jobs align (shared design decisions) and where they diverge (trade-offs the product must manage).

ℹ These statements apply to Phase 1 — the internal pilot with front desk staff. The JTBD for hotel guests (the eventual primary respondent in Phase 2) is different and will be documented in the Phase 2 Recommendations Document.

# 2. ACTOR 1 — HOTEL MANAGEMENT / PROJECT SPONSOR

**Actor 1 Hotel Management / Project Sponsor**

*Role:* General Manager or equivalent — final decision authority on operations and Phase 2 *| Context:* Hospitality operator with 10–30 years of experience. Makes daily decisions about staffing, service design, F&B, housekeeping, and guest communication based primarily on observation, experience, and satisfaction score data. Has access to PMS booking data but not to the guest expectations that drove those bookings.

**PRIMARY JOB-TO-BE-DONE STATEMENT**

**Hotel Management hires GuestIQ to translate their front desk team's collective knowledge of guest behaviour into structured, segmented data — so that operational decisions about service design, staffing, and positioning are made with evidence rather than accumulated assumption.**

|  |  |  |
| --- | --- | --- |
| **Functional Job** | **Social Job** | **Emotional Job** |
| Obtain reliable, segmented data on why guests choose this property for specific stay purposes and what they expect from each experience type. | To be seen by property owners, corporate teams, and industry peers as an operator who makes decisions based on evidence — not gut feel alone. | Confident that the resources invested in training, service design, and guest experience improvements are directed at what guests actually need — not what management assumes they need. |
| *Without this, management makes decisions based on satisfaction scores (which measure outcomes, not expectations), anecdote (which is unrepresentative), and intuition (which cannot be validated or communicated to ownership). The gap between what management assumes guests want and what guests actually need is commercially consequential.* | *The hospitality industry has historically been slow to adopt data-informed operating practices at the property level. Being a pilot property for GuestIQ positions management as innovative and rigorous — ahead of competitors still relying on NPS scores.* | *The deep discomfort of uncertainty — making significant operational decisions without reliable data — is the emotional driver. GuestIQ replaces that uncertainty with a structured, defensible evidence base.* |
| **Barriers (what makes this job hard)**  No systematic method exists for capturing guest expectation data at the property level without expensive consultancy, lengthy survey projects, or direct guest intrusion during the stay. Satisfaction tools (TripAdvisor, internal surveys) measure outcomes after the fact — not the expectation framework guests arrived with. | **Success signal**  The debrief report produces at least 3 actionable operational insights that management can act on within 30 days. PostHog funnel data confirms front desk team engaged meaningfully with the instrument. | **Switching event**  *Was using:* Guest satisfaction surveys, TripAdvisor monitoring, anecdotal staff observation, and occasional consultancy reviews.  *Switched because:* These tools measure how guests felt after the fact — not what they expected before. They cannot segment expectations by intent category (business traveller vs. leisure vs. transit) and cannot produce the structured data management needs for targeted operational decisions. |

**GuestIQ Design Decisions Driven by This JTBD**

Management dashboard (SHIFT+CTRL+A) with 9 panels, CSV export, and PDF report — so management sees structured data without needing developer access. Intent distribution chart — segments data by the 12 taxonomy categories management cannot currently access. Competitive threat map (Q8) — directly actionable intelligence on which alternatives guests considered. 45-minute debrief meeting structure — ensures findings are delivered in a format management can present to ownership. Pilot at zero IT cost — removes the procurement friction that would otherwise block adoption.

# 3. ACTOR 2 — LEAD RESEARCHER

**Actor 2 Lead Researcher**

*Role:* Research lead — responsible for instrument validity, data quality, and publishable output *| Context:* Hospitality professional with research methodology expertise. Operating at the intersection of industry practice and academic scholarship. Designing a 14-week project that must produce both a working software application and a publishable academic instrument — at zero cost, with zero IT involvement, using a single AI development partner.

**PRIMARY JOB-TO-BE-DONE STATEMENT**

**The Lead Researcher hires GuestIQ to prove that a gamified, episodic digital instrument can collect research-grade guest expectation data from front desk professionals at higher completion rates than conventional survey methods — producing a dataset that is simultaneously publishable and operationally useful.**

|  |  |  |
| --- | --- | --- |
| **Functional Job** | **Social Job** | **Emotional Job** |
| Collect a validated dataset from front desk professionals using a 79-question instrument across 12 intent taxonomy categories, with dual-tense (retrospective and anticipatory) capability, at zero cost and zero IT dependency. | To be seen by academic peers and the hospitality research community as the originator of a validated instrument and methodology for capturing staff-reported guest expectation data — a gap in the current hospitality research literature. | Confident that the research methodology is rigorous enough to withstand peer review — and that the data collected is clean, complete, and defensible. |
| *Standard survey platforms (SurveyMonkey, Qualtrics, Google Forms) cannot deliver the adaptive tier system, gamification layer, or real-time results comparison that are required for adequate completion rates with a professional hospitality audience. Building a custom research instrument requires software development capability the researcher does not have independently.* | *The guest expectation taxonomy (12 intent categories with push-pull theory grounding) represents an original contribution. The gamified delivery format is novel in hospitality research. Being published as the originator of both the taxonomy and the methodology is the social job.* | *Academic publishing involves significant scrutiny. The researcher needs to feel that every methodological choice — the dual-tense design, the taxonomy coding, the sampling approach, the data integrity verification — has been made deliberately and can be justified in a methods section.* |
| **Barriers (what makes this job hard)**  Research instrument development normally requires either significant budget (custom software), long timelines (academic development cycles), or compromised instrument quality (using standard survey platforms that lack the adaptive and gamification capabilities needed). The 79-question length is a significant completion risk without the engagement design. | **Success signal**  At least 60% of participating front desk team members complete their selected tier. The none-flag rate stays below 15% per question on average. PostHog funnel data shows no systematic drop-off at specific questions. The dataset is sufficient for the academic paper. | **Switching event**  *Was using:* Standard survey platforms, paper questionnaires, or commissioned research reports.  *Switched because:* Standard platforms lack adaptive tier routing, gamification, real-time results, and the observability needed to understand respondent behaviour. Paper questionnaires have no data integrity verification. Commissioned research is too expensive and too slow for a 14-week prototype. |

**GuestIQ Design Decisions Driven by This JTBD**

79-question expert tier with full taxonomy coding — the complete research instrument. Dual-tense routing gate (QR1) — the methodological innovation that makes retrospective and anticipatory data comparable. 12 Module 5 sub-sections — full intent category coverage required for taxonomy validation. None-flag mechanic — surfaces questions requiring instrument refinement. Data integrity verification protocol (NFR-043/044/045) — the research data quality guarantee. Academic paper as parallel output to the application — not a secondary deliverable. Zero cost and zero IT dependency — the constraint that makes the methodology replicable at other properties.

# 4. ACTOR 3 — FRONT DESK TEAM (PILOT PARTICIPANTS)

**Actor 3 Front Desk Team — Pilot Participants**

*Role:* ~10 front desk professionals — the primary respondents in the internal pilot *| Context:* Experienced hospitality professionals who interact with hotel guests daily across all intent categories (business, leisure, transit, displacement, etc.). They possess a rich, practical understanding of guest expectations that is rarely captured systematically. They have limited lull time during shifts and no obligation to participate in research — their participation is entirely voluntary.

**PRIMARY JOB-TO-BE-DONE STATEMENT**

**The Front Desk Team hires GuestIQ to give their professional expertise about guest behaviour a form — converting what they know from thousands of interactions into structured data that is visible, valued, and consequential beyond the front desk.**

|  |  |  |
| --- | --- | --- |
| **Functional Job** | **Social Job** | **Emotional Job** |
| Complete a professional questionnaire that captures their knowledge of guest expectations in a way that feels relevant to their experience — and see that knowledge reflected back to them as data they can recognise. | To be recognised as a hospitality professional whose expertise is worth studying — not just a service delivery agent completing a form. | That their 8–16 minutes of engagement contributed something real — that their professional knowledge has weight and consequence beyond the front desk. |
| *Front desk professionals know a great deal about guests — which stay types arrive with which expectations, which requests are predictable, which guests are most likely to complain and why. This knowledge exists entirely as tacit, unstructured experience. GuestIQ gives it a structured form that becomes a research asset.* | *The identity-based tier labels (Amateur / Professional / Expert) are the direct social job signal. A front desk professional who self-selects Expert is signalling their professional identity. The results comparison ('your responses vs. your team') makes that identity visible in aggregate data.* | *Front desk professionals are often undervalued as knowledge workers. GuestIQ offers a rare experience: their expertise becomes research data, their perspective is compared with colleagues, and the findings from their collective knowledge may change how the hotel operates. This is a meaningful emotional experience in a role that often feels transactional.* |
| **Barriers (what makes this job hard)**  Standard surveys feel generic and transactional — questions are not written in the language of hospitality professionals, answers do not reflect the nuance of real guest interactions, and there is no visible outcome from completing them. The respondent experience is the primary barrier: if the questionnaire feels like admin, it will not be completed. | **Success signal**  Reaching the results screen and seeing their responses compared to the aggregate — recognising their professional perspective in the data. Ideally: a colleague mentions the questionnaire unprompted, or management references findings from it in a team briefing. | **Switching event**  *Was using:* Declining to engage with any hotel survey or research request, or completing it minimally to satisfy a perceived obligation.  *Switched because:* Standard surveys offer nothing in return for completion. GuestIQ offers: the identity of being an Expert respondent, curiosity hooks that make each episode interesting, immediate personal results on the completion screen, and the knowledge that their responses contribute to aggregate data that management will act on. |

**GuestIQ Design Decisions Driven by This JTBD**

Identity-based tier labels (Amateur / Professional / Expert) — not 'Short / Medium / Long'. These labels activate professional self-concept and make tier selection an identity statement. Curiosity hooks at the end of each episode — 'Do respondents in your intent categories rate cleanliness or noise sensitivity higher?' — create forward tension. Badge system — 9 badges, awarded at meaningful milestones, not arbitrary points. Results screen with aggregate comparison — the aha moment; the job is 'done' when the respondent sees their expertise reflected as data. Voluntary participation — no mandate from management. The product must earn its adoption through the experience quality alone.

# 5. CROSS-ACTOR ANALYSIS

## 5.1 Job Dimension Comparison

The following table maps all three actors across the same JTBD dimensions — revealing where jobs align (shared design decisions) and where they diverge (trade-offs the product must navigate).

| **Dimension** | **Hotel Management** | **Lead Researcher** | **Front Desk Team** |
| --- | --- | --- | --- |
| **Functional Job** | Obtain segmented, actionable guest expectation data for operational decision-making | Collect a validated, publishable dataset at zero cost using a research-grade instrument | Give professional expertise about guest behaviour a structured, visible form |
| **Social Job** | Be seen as a data-informed, evidence-based operator by ownership and peers | Be recognised as originator of a validated taxonomy and novel research methodology | Be recognised as a hospitality professional whose expertise is worth studying |
| **Emotional Job** | Confident that operational investments target what guests actually need | Confident that the methodology is rigorous enough for peer review | Feeling that their engagement produced something real and consequential |
| **Primary Barrier** | No systematic method for capturing expectations at property level without high cost | 79-question length is a significant completion risk without engagement design | Standard surveys feel generic, transactional, and without visible outcome |
| **Success Signal** | 3+ actionable insights at debrief that management can act on within 30 days | ≥60% completion rate; none-flag rate <15%; dataset sufficient for publication | Reaching results screen and seeing their expertise reflected as comparable data |
| **Switching From** | Satisfaction surveys, anecdotal observation, and occasional consultancy reviews | Standard survey platforms lacking adaptive tier, gamification, and real-time results | Declining to engage, or completing surveys minimally out of obligation |

## 5.2 Where Actor Jobs Align

All three actors share one underlying need: the pilot must produce data that is credible and complete. Hotel Management needs credible data for the debrief report. The Lead Researcher needs credible data for the academic paper. The Front Desk Team needs the experience to feel credible enough to be worth their time. This shared need is why data integrity (NFR-043, NFR-044, NFR-045) is a hard requirement that no other consideration can override.

All three actors also need the completion rate to be high. Management needs sufficient data volume for operational insights. The researcher needs sufficient volume for statistical validity. The front desk team's aggregate comparison only appears when 3+ complete sessions exist — low completion means the results screen delivers less value, which reduces the motivation to complete, which reduces the completion rate further. Completion rate is a positive feedback loop for all three actors.

## 5.3 Where Actor Jobs Create Tension

The Lead Researcher's job requires all 79 questions — the full instrument is the research deliverable. The Front Desk Team's job requires a short, engaging experience — 79 questions in a single sitting is a completion risk. This tension is resolved by the tier system: the three-tier design allows the researcher to capture full data from Expert respondents while giving Amateur respondents a five-minute path to value. The tier system is not a concession — it is the solution to a genuine JTBD conflict.

Hotel Management's job prioritises operational insights (debrief report, Module 5 intent distribution, competitive threat data). The Lead Researcher's job prioritises instrument validity (consistent taxonomy coding, dual-tense integrity, complete data across all 7 modules). These jobs are aligned in Phase 1 but may diverge in Phase 2 if management requests instrument changes that would compromise academic validity. The conflict resolution rule in the Methodology Document is explicit: academic integrity wins.

## 5.4 The JTBD Minimum Test

Any proposed feature or design decision that cannot be traced to at least one of the following three statements should be challenged before being added to the scope:

|  |
| --- |
| **A1:** Does this feature help Hotel Management obtain segmented guest expectation data they can act on? |
| **A2:** Does this feature help the Lead Researcher collect a valid, publishable dataset at zero cost? |
| **A3:** Does this feature make the Front Desk Team feel that their expertise is visible, valued, and consequential? |

ℹ If a proposed feature serves none of these three jobs, it is a candidate for removal. If it serves one or two but creates friction for the third, assess the trade-off explicitly — do not add features that serve Hotel Management at the cost of Front Desk Team completion rate.

# 6. VERSION UPDATE LOG

| **Version** | **Date** | **Updated By** | **Change** |
| --- | --- | --- | --- |
| **v1.0** | [Sprint 0] | Claude / AI Developer | Initial version. Three actor cards: Hotel Management, Lead Researcher, Front Desk Team. Each with primary JTBD statement, three job dimensions, barriers, success signal, switching event, and product decisions. Cross-actor analysis: dimension comparison table, alignment, tension, JTBD minimum test. |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**— END OF JTBD STATEMENTS —**

*GuestIQ · JTBD Statements v1.0 · S0-0.3 · Sprint 0 Artifact · Reference for all product decisions*