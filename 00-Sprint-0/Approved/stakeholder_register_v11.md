**STAKEHOLDER REGISTER**

**GuestIQ — Hotel Guest Expectations Research Application**

|  |  |
| --- | --- |
| **Document ID** | S0-1.3 — Sprint 0 Artifact |
| **Document Version** | 1.0 — Initial Release |
| **Document Status** | DRAFT — Pending Review by Lead Researcher |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Review Due** | Within 48 hours of receipt — per project commitment |
| **Next Update** | Start of Sprint 1 — and at the start of every subsequent sprint |
| **Document Location** | 00-Sprint-0 / AI-Outputs / Stakeholder-Register-v1.0.docx |

ℹ This is a living document. It is reviewed and updated at the start of every sprint. If new stakeholders are identified during the project, they are added here with a version note. The Lead Researcher is responsible for keeping this register current throughout all 6 sprints.

# **1. PURPOSE AND SCOPE**

The Stakeholder Register identifies every individual, group, or system that has a direct interest in or influence over the GuestIQ project. For each stakeholder it documents their interest in the project, their level of influence over outcomes, how they should be communicated with, and how the project team should engage them to ensure their needs are met and their support is maintained.

This register is the input to the RACI Matrix (S0-1.5) and the Communication Plan (Section 4 of this document). It is referenced throughout the project whenever a decision affects stakeholder expectations or requires stakeholder input.

# **2. STAKEHOLDER INFLUENCE AND INTEREST OVERVIEW**

The following matrix maps all stakeholders by their level of influence over the project and their level of interest in its outcomes. This mapping determines the engagement strategy for each group.

|  |  |  |
| --- | --- | --- |
|  | **Low Interest** | **High Interest** |
| **High Influence** | **Keep Satisfied**  SH-05 Property Owner / Investor | **Manage Closely — Key Partners**  SH-01 Hotel Management / Project Sponsor  SH-02 Lead Researcher  SH-04 Claude / AI Developer |
| **Low Influence** | **Monitor**  SH-06 Future Research Collaborators  SH-07 Sentry / PostHog Platforms | **Keep Informed — Active Participants**  SH-03 Front Desk Team (10 members) |

# **3. STAKEHOLDER PROFILES**

Each stakeholder is documented with a full profile covering their interest, influence, communication preferences, engagement strategy, and contact/alert routing details. Profiles are ordered by influence level — highest influence first.

**SH-01 Hotel Management / Project Sponsor**

*Name / Representative:* **[Name — To Be Completed] · [Title — e.g. General Manager]**

|  |  |  |
| --- | --- | --- |
| **Interest in Project**  Operational insights from pilot data to inform service design decisions. Positive ROI on time investment. Pilot success to justify Phase 2 expansion. Validation that the front desk team finds the tool engaging and professionally appropriate. | **Influence**  **High** | **Engagement Strategy**  Manage Closely — inform of all key decisions, involve in milestone reviews, address concerns immediately |

|  |  |
| --- | --- |
| **Communication Method**  Sprint review briefings at end of each sprint. Pilot debrief meeting (45 minutes, Week 14). Management dashboard access via SHIFT+CTRL+A at any time during pilot. Summary PDF report from dashboard export. | **Notes**  Final decision authority on Phase 2 continuation. Approves Project Charter. Encourages (but does not mandate) front desk team participation. Primary recipient of operational insights from debrief report. |

|  |  |
| --- | --- |
| **Contact & Alert Routing** | **Detail** |
| **Email address** | [To Be Completed] |
| **MS Teams handle** | [To Be Completed] |
| **Sprint review format** | Brief — 15-minute written summary sent end of each sprint |
| **Debrief meeting** | Week 14 — 45 minutes — findings + Phase 2 decision |
| **Dashboard access** | SHIFT+CTRL+A on any front desk PC or via the GuestIQ URL |
| **Preferred contact** | [Email / Teams / In-person — To Be Completed] |

**SH-02 Lead Researcher**

*Name / Representative:* **[Name — To Be Completed] · [Title — e.g. Director of Research / GM]**

|  |  |  |
| --- | --- | --- |
| **Interest in Project**  Instrument quality and validity — the 79-question questionnaire produces research-grade data. Publishable findings from the pilot dataset. Phase 2 academic collaboration opportunities. Personal professional development through research output. | **Influence**  **High** | **Engagement Strategy**  Manage Closely — daily collaboration partner, all decisions flow through this role |

|  |  |
| --- | --- |
| **Communication Method**  Daily collaboration with AI Developer in this conversation. Reviews and approves all 38 project artifacts. Facilitates UAT sessions in Sprint 5. Monitors Supabase daily during Sprint 6 pilot. Receives Sentry error alerts and PostHog weekly digest by email. | **Notes**  Primary human team member covering ALL human roles simultaneously: Project Sponsor liaison, Lead Researcher, UAT Facilitator, Pilot Monitor, and Hotel Management Liaison. This role concentration is formally documented as Risk R-11 in the Risk Register (High/High). Approves all artifacts within 48 hours of receipt. Makes all content and research decisions. Single point of contact for front desk team during pilot. Epic Owner for all research-domain Epics (UC-01 Respondent Experience, UC-02 Research Data Quality, UC-06 Post-Pilot Reporting). |

|  |  |
| --- | --- |
| **Contact & Alert Routing** | **Detail** |
| **Email address** | [To Be Completed — receives Sentry alerts and PostHog digest] |
| **MS Teams handle** | [To Be Completed] |
| **Sentry alert routing** | Automatic error email alerts — configured in Sprint 2 |
| **PostHog weekly digest** | Optional weekly analytics email — configured in Sprint 2 |
| **Artifact review turnaround** | 48 hours maximum — project commitment |
| **Supabase dashboard URL** | https://supabase.com/dashboard/project/[project-id] |
| **GuestIQ management access** | SHIFT+CTRL+A on any browser with app open |

**SH-03 Front Desk Team — Pilot Participants**

*Name / Representative:* **Approximately 10 members · [Property Name — To Be Completed]**

|  |  |  |
| --- | --- | --- |
| **Interest in Project**  A genuinely engaging experience that respects their professional expertise and does not waste their limited time. Seeing their input matter — the results screen shows their answers compared to the aggregate, making their contribution tangible. Recognition that their hospitality experience is valuable research data. | **Influence**  **Medium** | **Engagement Strategy**  Keep Informed — engage through experience design, not direct management |

|  |  |
| --- | --- |
| **Communication Method**  Single MS Teams launch message at pilot start (Week 11). Follow-up Teams message on Day 5 if participation is below target. In-person mid-pilot check-in on Day 5 by Lead Researcher. Bug Reporting Guide pinned to Teams channel. Results screen visible immediately upon completing any tier. | **Notes**  Voluntary participation only — never mandated. Identity-based tier labels (Amateur / Professional / Expert) designed to activate professional self-concept and motivate higher-tier selection. Results screen with real-time comparison is the primary intrinsic reward. UAT participants (2–3 members) selected from this group for Sprint 5. |

|  |  |
| --- | --- |
| **Contact & Alert Routing** | **Detail** |
| **Contact channel** | MS Teams — front desk team channel |
| **Launch message timing** | Start of morning shift — Week 11 |
| **Bug reports** | Screenshot + Teams message to Lead Researcher |
| **UAT participants** | 2–3 selected members — Sprint 5 |
| **App access** | guestiq.github.io?property=PROP001 — any front desk PC |
| **PCs available** | 3 Windows PCs — Edge and Chrome installed |
| **Team size** | ~10 members (confirm exact count before pilot launch) |

**SH-04 Claude / AI Developer**

*Name / Representative:* **Claude (Anthropic AI) · AI Development Partner**

|  |  |  |
| --- | --- | --- |
| **Interest in Project**  Delivering all code and artifacts to the approved specification within the sprint schedule. Producing a working prototype that demonstrates the capability of AI-assisted research tool development. Maintaining architectural integrity across all 6 sprints. | **Influence**  **High** | **Engagement Strategy**  Manage Closely — primary delivery partner for all technical and documentation outputs |

|  |  |
| --- | --- |
| **Communication Method**  All communication occurs in this conversation. Artifacts delivered as downloadable Word documents and code files. Responds to all requests within the same session. Bound by approved artifacts — no unilateral scope changes. | **Notes**  Produces all AI deliverables: 44 project artifacts, complete React PWA application, Supabase schema, Sentry configuration, PostHog event instrumentation, Playwright tests, PDF and CSV export functionality. Does not make decisions — produces options and recommendations for Lead Researcher to decide. SCRUM MASTER FUNCTION (v1.1 addition): At the start of each sprint session Claude transitions into Scrum Master mode and runs the 7-item sprint-start checklist before any delivery work begins. This is the structural resolution to Risk R-11 (single human covering all roles). EPIC OWNER (v1.1 addition): Owns all technical-domain Epics — UC-03 Management Dashboard, UC-04 Data Infrastructure, UC-05 Content Management, UC-07 PWA Shell and Delivery. |

|  |  |
| --- | --- |
| **Contact & Alert Routing** | **Detail** |
| **Communication channel** | This Claude conversation — all sessions |
| **Response time** | Same session — immediate |
| **Artifact format** | Word .docx files for documents, code files for application |
| **Decision authority** | None — recommends, Lead Researcher decides |
| **Scope change process** | Formal change request required — no unilateral additions |
| **Sprint commitment** | Produces all deliverables within sprint boundaries |

**SH-05 Property Owner / Investor**

*Name / Representative:* **[Name — To Be Completed if applicable] · [Role — e.g. Owner / Asset Manager]**

|  |  |  |
| --- | --- | --- |
| **Interest in Project**  Research ROI — does the pilot justify the investment of hotel management time? Guest satisfaction improvement opportunities surfaced by the data. Competitive intelligence on guest expectations relative to market. Phase 2 expansion potential across portfolio. | **Influence**  **Low** | **Engagement Strategy**  Keep Satisfied — inform of outcomes, do not burden with process detail |

|  |  |
| --- | --- |
| **Communication Method**  Receives debrief report summary only — a 1–2 page executive summary extracted from the full Sprint 6 debrief report. No involvement in day-to-day project decisions. No access to raw data unless specifically requested. | **Notes**  Not involved in day-to-day project decisions. Informed of pilot outcomes at debrief stage. If the property is part of a larger portfolio, Phase 2 multi-property expansion plans are relevant to this stakeholder and should be specifically addressed in the Phase 2 Recommendations Document. |

|  |  |
| --- | --- |
| **Contact & Alert Routing** | **Detail** |
| **Communication format** | Executive summary — 1–2 pages extracted from debrief report |
| **Communication timing** | After Sprint 6 debrief — Week 14 or 15 |
| **Data access** | Executive summary only — not raw Supabase data |
| **Phase 2 relevance** | Multi-property expansion is relevant — address in recommendations |

**SH-06 Future Academic Research Collaborators**

*Name / Representative:* **Potential future partners — not yet identified · Academic / Hospitality Research Community**

|  |  |  |
| --- | --- | --- |
| **Interest in Project**  Instrument validity and psychometric soundness sufficient for co-publication. Access to research data for academic analysis. Citation potential — the published academic paper and validated instrument represent citable research contributions. Potential for joint grant applications in Phase 2. | **Influence**  **Low** | **Engagement Strategy**  Monitor — no active engagement in Phase 1, prepare Phase 2 outreach strategy |

|  |  |
| --- | --- |
| **Communication Method**  No communication during Phase 1. Post-pilot: academic paper already published serves as the primary communication vehicle. Phase 2 outreach to potential collaborators begins after pilot data validates the instrument. | **Notes**  Not involved in Phase 1. The academic paper produced alongside this project is the primary outreach mechanism — researchers who read it and wish to collaborate will self-identify. Phase 2 plans should include a structured academic outreach strategy. |

|  |  |
| --- | --- |
| **Contact & Alert Routing** | **Detail** |
| **Phase 1 communication** | None — academic paper serves as passive outreach |
| **Phase 2 action** | Structured academic outreach strategy — Sprint 6 recommendations |
| **Instrument access** | Published academic paper with instrument appendix |
| **Data sharing** | Phase 2 decision — requires IRB/ethics review if shared externally |

**SH-07 Sentry / PostHog — External Platform Stakeholders**

*Name / Representative:* **Sentry (sentry.io) · PostHog (posthog.com) · External service providers**

|  |  |  |
| --- | --- | --- |
| **Interest in Project**  Continued usage and potential upgrade to paid plans as the project scales. Platform stability and free-tier limits are sufficient for prototype needs. No interest in research content — these are technical service providers. | **Influence**  **Low** | **Engagement Strategy**  Monitor — technical dependency, no relationship management required |

|  |  |
| --- | --- |
| **Communication Method**  No direct communication required. Alerts configured automatically. Sentry sends error alerts to Lead Researcher email. PostHog sends optional weekly analytics digest. Both platforms are accessed via their web dashboards. | **Notes**  External dependencies — not project team members. Free-tier limits monitored passively. If either platform experiences downtime the project continues via offline queue (Sentry/PostHog data simply not collected during outage — no data loss for Supabase research data). Free tier limits far exceed prototype usage. |

|  |  |
| --- | --- |
| **Contact & Alert Routing** | **Detail** |
| **Sentry dashboard** | https://sentry.io — guestiq-pilot project |
| **Sentry free tier limit** | 5,000 errors/month — prototype generates ~100 maximum |
| **Sentry alert email** | Lead Researcher email — configured in Sprint 2 |
| **PostHog dashboard** | https://app.posthog.com — GuestIQ Pilot project |
| **PostHog free tier limit** | 1,000,000 events/month — prototype generates ~5,000 maximum |
| **PostHog weekly digest** | Optional — configured in Sprint 2 for Lead Researcher |
| **Downtime impact** | Observability data not collected — research data unaffected |

**FUNCTIONAL ROLE — SCRUM MASTER**

*This is not a new stakeholder — it is a distinct function that Claude (SH-04) performs at the start of each sprint session.*

|  |  |
| --- | --- |
| **Held By** | Claude (SH-04 AI Developer) — in a distinct Scrum Master mode |
| **Activation Trigger** | First message of each sprint session that is explicitly a sprint start |
| **Duration** | 5 minutes maximum before any delivery work begins |
| **Problem It Solves** | Risk R-11: one human covering all human roles creates structural tension between Product Owner (deliver) and Scrum Master (protect process). The SM function separates these instincts by giving process discipline an explicit, non-negotiable form. |
| **7-Item Checklist** | (1) Previous gate conditions confirmed · (2) Epic/Feature/Story hierarchy correct · (3) DoR satisfied for all entering stories · (4) TDD test specifications in place before coding · (5) PLG metric check (Sprints 5–6) · (6) Methodology impediments · (7) Use Case model current |
| **Authority** | Can and must flag any unmet condition before delivery begins. Any failure blocks new sprint work until resolved. |
| **Bridges** | Use Case 3.0 ↔ Scrum ↔ PRINCE2-lite ↔ Academic Research ↔ BDD-TDD ↔ PLG |
| **Full Specification** | GuestIQ Methodology Document v1.1 (S0-0.1) Section 4 · Definition of Done + Ready v1.1 (S0-1.7v) |

# **4. RACI MATRIX**

The RACI Matrix assigns every major project activity to the appropriate stakeholder role. R = Responsible (does the work). A = Accountable (owns the outcome — only one per activity). C = Consulted (input required before action). I = Informed (notified of outcome). — = Not involved.

ℹ No activity should have more than one A (Accountable). If two parties share accountability, the activity is not clearly owned. Review any row with two A entries immediately.

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **R** | **A** | **C** | **I** | R=Responsible · A=Accountable · C=Consulted · I=Informed · —=Not Involved | SH-01=Sponsor, SH-02=Researcher, SH-03=Front Desk, SH-04=AI Dev, SH-05=Owner, SH-06=Academic, SH-07=Sentry/PH |

| **Activity** | **SH-01 Sponsor** | **SH-02 Researcher** | **SH-03 Front Desk** | **SH-04 AI Dev** | **SH-05 Owner** | **SH-06 Academic** | **SH-07 Sentry/PH** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Approve Project Charter** | **A** | **C** | **—** | **R** | **I** | **—** | **—** |
| **Produce project artifacts (docs)** | **I** | **A** | **—** | **R** | **—** | **—** | **—** |
| **Review and approve artifacts** | **C** | **A** | **—** | **I** | **—** | **—** | **—** |
| **Build React application** | **I** | **A** | **—** | **R** | **—** | **—** | **—** |
| **Configure Supabase database** | **I** | **A** | **—** | **R** | **—** | **—** | **—** |
| **Configure Sentry error tracking** | **I** | **A** | **—** | **R** | **—** | **—** | **—** |
| **Configure PostHog analytics** | **I** | **A** | **—** | **R** | **—** | **—** | **—** |
| **Set up GitHub repository** | **I** | **R** | **—** | **I** | **—** | **—** | **—** |
| **Set up GitHub Actions deployment** | **I** | **R** | **—** | **I** | **—** | **—** | **—** |
| **Verify GitHub Pages permissions** | **I** | **R** | **—** | **I** | **—** | **—** | **—** |
| **Install Node.js on researcher PC** | **—** | **R** | **—** | **I** | **—** | **—** | **—** |
| **Create PostHog account** | **—** | **R** | **—** | **I** | **—** | **—** | **—** |
| **Create Sentry account** | **—** | **R** | **—** | **I** | **—** | **—** | **—** |
| **Design branching logic (84 paths)** | **I** | **A** | **—** | **R** | **—** | **—** | **—** |
| **Review branching logic test matrix** | **C** | **A** | **—** | **R** | **—** | **—** | **—** |
| **Design questionnaire.js structure** | **I** | **A** | **—** | **R** | **—** | **—** | **—** |
| **Sprint 1b JSON content extraction** | **I** | **A** | **—** | **R** | **—** | **—** | **—** |
| **Execute Sprint 2 test cases** | **—** | **R** | **—** | **I** | **—** | **—** | **—** |
| **Offline queue connectivity test** | **—** | **R** | **—** | **I** | **—** | **—** | **—** |
| **Data integrity verification** | **—** | **R** | **—** | **I** | **—** | **—** | **—** |
| **Visual regression (Playwright)** | **I** | **A** | **—** | **R** | **—** | **—** | **—** |
| **Select and brief UAT participants** | **—** | **R** | **—** | **—** | **—** | **—** | **—** |
| **Facilitate UAT sessions** | **—** | **R** | **—** | **—** | **—** | **—** | **—** |
| **Compile UAT findings** | **—** | **A** | **—** | **C** | **—** | **—** | **—** |
| **Send pilot launch Teams message** | **—** | **R** | **—** | **—** | **—** | **—** | **—** |
| **Distribute bug reporting guide** | **—** | **R** | **—** | **—** | **—** | **—** | **—** |
| **Daily pilot monitoring (Supabase)** | **—** | **R** | **—** | **—** | **—** | **—** | **—** |
| **Review Sentry error alerts** | **—** | **R** | **—** | **—** | **—** | **—** | **—** |
| **Review PostHog funnel analysis** | **—** | **R** | **—** | **—** | **—** | **—** | **—** |
| **Weekly CSV export to OneDrive** | **—** | **R** | **—** | **—** | **—** | **—** | **—** |
| **Conduct mid-pilot team check-in** | **—** | **R** | **—** | **—** | **—** | **—** | **—** |
| **Access management dashboard** | **A** | **R** | **—** | **—** | **—** | **—** | **—** |
| **Present debrief findings** | **—** | **R** | **—** | **—** | **—** | **—** | **—** |
| **Make Phase 2 decision** | **A** | **C** | **—** | **I** | **C** | **—** | **—** |
| **Produce Phase 2 recommendations** | **I** | **A** | **—** | **R** | **—** | **—** | **—** |
| **Archive all project documents** | **—** | **R** | **—** | **—** | **—** | **—** | **—** |
| **Edit JSON questionnaire content** | **—** | **A** | **—** | **I** | **—** | **—** | **—** |
| **Monitor Sentry/PostHog dashboards** | **—** | **R** | **—** | **—** | **—** | **—** | **I** |

# **5. STAKEHOLDER COMMUNICATION PLAN**

The following communication schedule defines every planned touchpoint between the project team and stakeholders throughout the 14-week project. Unplanned communication (bug reports, urgent decisions) follows the escalation process in Section 6.

| **Communication** | **Audience** | **Frequency** | **Channel** | **Owner** |
| --- | --- | --- | --- | --- |
| Sprint Review Summary | SH-01 Sponsor, SH-02 Researcher | End of each sprint (every 2 weeks) | Written summary — email or Teams | SH-02 Researcher |
| Sprint Gate Sign-Off | SH-02 Researcher | Before each sprint begins | Written confirmation in project folder | SH-02 Researcher |
| AI Artifact Delivery | SH-02 Researcher | Per step (within sprint) | This Claude conversation + Word doc download | SH-04 AI Developer |
| Artifact Review Confirmation | SH-04 AI Developer | Within 48h of delivery | Reply in this conversation | SH-02 Researcher |
| Sentry Error Alerts | SH-02 Researcher | Automatically on each new error | Sentry email notification | Sentry platform (auto) |
| PostHog Weekly Digest | SH-02 Researcher | Weekly (optional — configurable) | PostHog email digest | PostHog platform (auto) |
| Risk Register Update | SH-02 Researcher | Start of each sprint | Updated document in project folder | SH-02 Researcher |
| Pilot Launch Message | SH-03 Front Desk Team | Week 11 — start of pilot (morning shift) | MS Teams — front desk channel | SH-02 Researcher |
| Day 5 Participation Follow-Up | SH-03 Front Desk Team | Day 5 of pilot — if participation below target | MS Teams message + in-person check-in | SH-02 Researcher |
| Bug Reporting Guide | SH-03 Front Desk Team | Week 11 — immediately after launch message | MS Teams — pinned message in channel | SH-02 Researcher |
| UAT Session Invitation | SH-03 selected members | Sprint 5 — before UAT sessions | In-person or Teams message | SH-02 Researcher |
| Pilot Debrief Invitation | SH-01 Sponsor | Sprint 6 — Week 14 | Email or Teams calendar invite | SH-02 Researcher |
| Pilot Debrief Meeting | SH-01 Sponsor, SH-02 Researcher | Week 14 — 45 minutes | In-person or video call | SH-02 Researcher (lead) |
| Debrief Executive Summary | SH-05 Property Owner | After Sprint 6 debrief — Week 14–15 | Email attachment — 1–2 page PDF | SH-02 Researcher |
| Phase 2 Recommendations | SH-01 Sponsor | Sprint 6 — debrief meeting | Word document — discussed in meeting | SH-04 AI Developer |

# **6. ISSUE ESCALATION PROCESS**

The following escalation levels define how project issues — technical, scope-related, or stakeholder-related — are handled. Issues must be escalated within the defined response times to prevent sprint delays.

| **Level** | **Trigger** | **Response Time** | **Escalate To** |
| --- | --- | --- | --- |
| **Critical** | Application completely broken — pilot respondents cannot access the app, data is being lost, or a security issue is identified | Within 4 hours — same day fix required | SH-02 Researcher escalates to SH-04 AI Developer immediately in this conversation. SH-01 Sponsor informed if fix requires > 24 hours. |
| **High** | A specific feature is broken — one question type not displaying, a tier routing error found, session resume not working | Within 24 hours | SH-02 Researcher logs in Bug Log and raises in this conversation. SH-04 AI Developer fixes and redeploys. Playwright run after fix. |
| **Medium** | Visual issue, minor UX friction, one question's wording is confusing | Within 48 hours — or next sprint | SH-02 Researcher logs in Bug Log. SH-04 AI Developer fixes if within sprint scope. Otherwise deferred to next sprint or Phase 2. |
| **Low** | Minor cosmetic issue, nice-to-have improvement, Phase 2 idea | Logged for Phase 2 | SH-02 Researcher logs in Bug Log with tag Phase-2. Not actioned in current sprint. |
| **Scope Change** | Request to add something that is listed as Out of Scope | Within 5 working days of formal request | SH-02 Researcher submits written change request. SH-01 Sponsor and SH-02 Researcher review. SH-04 AI Developer assesses impact. All 3 must approve before work begins. |

# **7. REGISTER UPDATE LOG**

Every time this register is updated, the change is recorded below. This log provides an audit trail of how the stakeholder landscape evolved across the project.

| **Version** | **Date** | **Updated By** | **Change Description** |
| --- | --- | --- | --- |
| **v1.0** | [Sprint 0 Date] | Claude / AI Developer | Initial version — 7 stakeholders identified and profiled. RACI Matrix, Communication Plan, and Escalation Process established. |
| v1.1 |  |  |  |
| v1.2 |  |  |  |
| v1.3 |  |  |  |
| v1.4 |  |  |  |
| v1.5 |  |  |  |

# **VERSION UPDATE LOG**

| **Version** | **Date** | **Updated By** | **Change** |
| --- | --- | --- | --- |
| **v1.0** | [Sprint 0] | Claude / AI Developer | Initial version. 7 stakeholder profiles (SH-01 through SH-07). Influence/interest matrix. RACI summary. Communication plan. Full engagement strategy per stakeholder. |
| **v1.1** | [Sprint 0] | Claude / AI Developer | Three additions triggered by Methodology Document (S0-0.1): (1) SH-02 Lead Researcher — notes updated to document single-human role concentration (Risk R-11) and Epic Owner assignment for research-domain Use Cases. (2) SH-04 AI Developer — notes updated with Scrum Master function description and Epic Owner assignment for technical-domain Use Cases. (3) Scrum Master Functional Role entry added after SH-07 — detailed specification of the SM role, 7-item checklist, and activation trigger. All additions are additive — no existing content removed. |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**— END OF STAKEHOLDER REGISTER v1.1 —**

*GuestIQ · Stakeholder Register v1.0 · Document S0-1.3 · Sprint 0 Artifact · Confidential*