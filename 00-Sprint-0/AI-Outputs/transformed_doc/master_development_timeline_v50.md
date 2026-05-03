**GuestIQ — HOTEL GUEST EXPECTATIONS APP**

**MASTER DEVELOPMENT TIMELINE v5.0**

**VERSION 5.0 — UPDATED TO REFLECT ALL POST-PLANNING DECISIONS INCLUDING UC SPECS v2.0 AND BACKLOG v3.1**

*Fully Sequential Operational Outline · Agile/Scrum · 6 Sprints · 14 Weeks*

**Every step listed in execution order · AI steps and Human steps clearly separated**

★ New steps added in v2.0 are marked with purple star indicators throughout

↑ Updated steps are marked with amber update indicators

**CONFIDENTIAL — INTERNAL PROJECT DOCUMENT**

# VERSION 5.0 — CHANGE LOG (cumulative: v1.0 through v5.0)

The following changes were made to the Master Development Timeline in v2.0 following the post-approval planning phase. All changes are additive — no original steps have been removed. New steps are marked with ★ throughout the document. Updated steps are marked with ↑.

| **Area** | **Change Type** | **Detail** |
| --- | --- | --- |
| Pre-Sprint | **3 NEW STEPS (v2.0)** | PRE-4 PostHog account setup · PRE-5 Sentry account setup · PRE-6 Node.js installation on researcher PC |
| Pre-Sprint | **UPDATED (v2.0)** | PRE total time updated from 1.5h to 2.5h. PRE gate updated to include PostHog, Sentry, and Node.js verification. |
| Sprint 1 | **2 NEW STEPS (v2.0)** | S1-1.11 ESLint + Prettier configuration · S1-2.3 questionnaire.js data structure design |
| Sprint 2 | **4 NEW STEPS (v2.0)** | S2-1.4 GitHub Actions permissions verification · S2-2.1a Sentry SDK initialization · S2-2.1b PostHog SDK initialization · S2-3.5 Offline queue connectivity test via Chrome DevTools |
| Sprint 3 | **1 NEW STEP (v2.0)** | S3-5.0 Phase 1b content extraction — questionnaire.js to JSON config files (Strangler Fig migration) |
| Sprint 4 | **2 NEW STEPS (v2.0)** | S4-2.7 Supabase downtime contingency screen build · S4-2.8 Playwright visual regression setup |
| Sprint 5 | **1 NEW STEP (v2.0)** | S5-2.6 Bug reporting guide for pilot team |
| Sprint 6 | **1 NEW STEP (v2.0)** | S6-1.4 Weekly CSV export to OneDrive data backup protocol |
| Step Counts (v2.0) | **UPDATED** | Total: 135 → 178 steps |
| Sprint 0 — Methodology | **5 NEW STEPS (v3.0)** | S0-0.1 Methodology Document · S0-0.2 Review · S0-0.3 JTBD Statements · S0-0.4 Review · S0-0.5 North Star Metric |
| Sprint 0 — Doc Updates | **20 NEW STEPS (v3.0)** | v1.1/v2.1 updates to all 8 approved documents: Charter, Stakeholder Register, RACI, DoD+DoR, Risk Register, SRS-F, SRS-NFR, Backlog. Each update has a produce step and a review step. |
| Recurring (all sprints) | **1 NEW STEP (v3.0)** | SM-CHECK: Scrum Master sprint-start 5-minute checklist — first occurrence Sprint 1, every sprint thereafter |
| Methodology Changes | **NEW FRAMEWORK (v3.0)** | Use Case 3.0 adopted. Epic→Feature→Story→Task hierarchy. Scrum Master function added. JTBD (3 actors). North Star Metric defined. Story mapping deferred to Phase 2. |
| Risk Register | **2 NEW RISKS (v3.0)** | R-11: Single human covering all roles (High/High). R-12: Mid-project methodology adoption (Medium/Medium). |
| SRS-NFR | **3 NEW NFRs (v3.0)** | NFR-043: Tense frame accuracy. NFR-044: Module 5 routing fidelity. NFR-045: Research data integrity. New category: Research Data Integrity. |
| Product Backlog | **4 NEW STORIES (v3.0)** | S0-11 JTBD Statements · S0-12 North Star Metric · S0-13 Methodology Document · PS-10 Scrum Master checklist (recurring). Stories: 99 → 103. Points: 227 → 231. |
| Artifact Count | **UPDATED (v3.0)** | 34 → 44 artifacts (5 new primary artifacts + 10 v1.1 document updates counting as new versions). |
| Step Counts (v3.0) | **UPDATED** | Sprint 0: 31 → 53 steps (22 new). Recurring SM step added to Sprints 1–6. Total: 152 → 172+ steps. |
| Sprint 0 — Sequence (v4.0) | **CORRECTED** | S0-2.5/S0-2.6 and S0-2.7/S0-2.8 swapped. Use Case Specifications now precede Product Backlog — correcting a v1.0 ordering error that was never fixed when Use Case 3.0 was adopted. Root cause: UC3.0 adopted after original sequence was fixed; the dependency was overlooked in v2.0 and v3.0 updates. |
| Step Counts | **UNCHANGED** | 178 steps total. No steps added or removed — sequence corrected only. |
| v5.0 Changes | 18 TARGETED UPDATES (v5.0) | Critical: S2-2.4 Option B UX · S2-2.8 RLS rejection detection · S4-1.2 Panel 1 abandoned sessions + min-data warning · S4-1.5 export failure handling · S0-2.5/2.6 UC descriptions + review guidance corrected. High: S0-GATE IRB path condition added + artifact version refs updated. Medium: S5-2.3 abandoned SQL + PostHog funnel check · S4-1.6 two new test cases · decision log IRB row + welcome screen update. Low: S0-5.1 count · S6-3.1 Release Plan · artifact registry 38→44. Version header v4.0→v5.0 throughout. |

# HOW TO USE THIS DOCUMENT

Work through this document sequentially from top to bottom. Do not jump ahead. Every step is numbered within its sprint. Steps are color-coded by owner. Sprint gates are hard stops requiring every checklist item confirmed before the next sprint begins.

|  |  |
| --- | --- |
| **AI** | Claude performs this step — output delivered in this conversation |
| **HUMAN** | You perform this step — detailed instructions provided |
| **BOTH** | Collaborative step — AI produces, human reviews and approves |
| **GATE** | Sprint gate — must be passed before proceeding to next sprint |
| **★ NEW** | New step added in v2.0 — not present in original timeline |

Step details use the following markers:

*🔗 URL — exact website address to navigate to*

ℹ NOTE — important context or clarification

**⚠ WARN — do not skip or overlook this**

✓ CHECK — verify this before moving to the next step

*$ CMD — exact command to type or paste*

**★ NEW — step added in v2.0**

# PROJECT AT A GLANCE

| **Element** | **Specification** |
| --- | --- |
| Application name | GuestIQ |
| Platform | Progressive Web App — browser-based, no installation |
| Primary device | Windows desktop PC — Edge or Chrome browser |
| Secondary device | Mobile phone — any modern browser |
| Hosting | GitHub Pages (guestiq.github.io) |
| URL structure | guestiq.github.io?property=PROP001 |
| Database | Supabase — 4-table schema via Supabase Migrations |
| Error tracking | Sentry — free tier, instrumented from Sprint 2 day one |
| Product analytics | PostHog — free tier, 27 named events, session replay |
| Deployment method | Single URL sent via email or MS Teams |
| IT involvement required | Zero |
| Login required | No — open access in prototype |
| Management access | SHIFT+CTRL+A hidden keyboard shortcut |
| Content management | Phase 1a: hardcoded questionnaire.js · Phase 1b: JSON config files · Phase 2: Supabase CMS |
| Languages | English only — i18n-ready architecture |
| Tiers | Amateur (5 min) / Professional (8 min) / Expert (16 min) |
| Initial user count | ~10 front desk team members |
| Total prototype cost | $0 (GitHub Pages + Supabase + PostHog + Sentry all free tier) |
| Estimated build time | 14 weeks · 6 sprints · 178 sequential steps |

| **Sprint** | **Weeks** | **Steps** | **AI Steps** | **Human Steps** | **Your Hours** |
| --- | --- | --- | --- | --- | --- |
| Pre-Sprint | Before Wk 1 | 12 | 0 | 11 | 2.5 hours |
| Sprint 0 | Weeks 1–2 | 53 | 25 | 27 | 8–9 hours |
| Sprint 1 | Weeks 3–4 | 24 | 11 | 12 | 7–8 hours |
| Sprint 2 | Weeks 5–6 | 22 | 9 | 9 | 8–10 hours |
| Sprint 3 | Weeks 7–8 | 16 | 9 | 4 | 8–10 hours |
| Sprint 4 | Weeks 9–10 | 21 | 13 | 4 | 8–10 hours |
| Sprint 5 | Weeks 11–12 | 13 | 2 | 8 | 8–10 hours |
| Sprint 6 | Weeks 13–14 | 17 | 4 | 8 | 6–8 hours |
| **TOTAL** | **14 weeks** | **178** | **73** | **83** | **55–68 hours** |

# CONFIRMED TECHNOLOGY STACK — COMPLETE v2.0

All technology decisions are confirmed and locked. Every tool operates within its free tier for the full prototype duration. This table supersedes the stack table in v1.0.

| **Technology** | **Layer** | **Purpose** | **Cost** | **Sprint Introduced** |
| --- | --- | --- | --- | --- |
| React 18 + Vite | Frontend | Application framework and build tooling | Free | Sprint 2 |
| Radix UI | Frontend | Headless accessible components — saves ~10h build time | Free | Sprint 2 ★ |
| Tailwind CSS | Frontend | Utility-first CSS — GuestIQ design token system | Free | Sprint 2 |
| Framer Motion | Frontend | Animation — progress bars, badges, episode transitions | Free | Sprint 3 |
| Recharts | Frontend | Charts — results screen and management dashboard | Free | Sprint 4 |
| i18next | Frontend | i18n architecture — English only in prototype | Free | Sprint 2 |
| Vite PWA Plugin | Frontend | PWA configuration + session persistence | Free | Sprint 2 |
| ESLint + Prettier | Dev Tools | Code quality + consistent formatting | Free | Sprint 1 ★ |
| Node.js | Dev Tools | Local development environment on researcher PC | Free | Pre-Sprint ★ |
| Supabase | Backend | Database, auth bypass, real-time, migrations | Free tier | Sprint 2 |
| Supabase Auth | Backend | Bypass mode prototype — active Phase 2 | Free tier | Sprint 2 |
| Supabase Migrations | Backend | Schema version control from Sprint 1 | Free | Sprint 1 |
| GitHub Pages | Hosting | App hosting at guestiq.github.io | Free | Sprint 2 |
| GitHub Actions | CI/CD | Auto-deploy on every code push | Free | Sprint 2 |
| Sentry | Observability | Error tracking + performance monitoring | Free tier | Sprint 2 ★ |
| PostHog | Observability | Product analytics + session replay | Free tier | Sprint 2 ★ |
| Playwright | Testing | Visual regression screenshot comparison | Free | Sprint 4 ★ |
| questionnaire.js | Content Ph 1a | Hardcoded centralized questionnaire data | Free | Sprint 2 |
| JSON Config Files | Content Ph 1b | Editable without code — 6 config files | Free | Sprint 3→4 ★ |

**PRE-SPRINT — BEFORE THE PROJECT BEGINS**

**Before Week 1 · Updated: 3 new steps added (PRE-4, PRE-5, PRE-6) · Total: 2.5 hours**

*SPRINT GOAL: Ensure all pre-conditions are met. 10 setup tasks total — all must be complete before Sprint 0 begins.*

↑ UPDATED v2.0: Pre-Sprint now includes 10 tasks (previously 7). Three new account setups added: PostHog (PRE-4), Sentry (PRE-5), and Node.js installation (PRE-6). Total time updated from 1.5h to 2.5h.

**PRE-1 — Project Commitment and Folder Setup**

**PRE-1.1 HUMAN Confirm your available time commitment** *[15 min]*

① You are committing approximately 8–10 hours per 2-week sprint across 14 weeks — roughly 45 minutes per working day.

ℹ The single biggest project risk is decision latency. Commit to a 48-hour review turnaround for all AI deliverables.

③ Block 2 hours at the start of each sprint for planning and 1 hour at the end for review in your calendar.

✓ You have a clear 14-week window with no major planned absences.

**PRE-1.2 HUMAN Create project folder structure** *[20 min]*

① On your PC or OneDrive create a top-level folder: GuestIQ Research Project

② Inside it create 7 sub-folders: 00-Sprint-0, 01-Sprint-1, 02-Sprint-2, 03-Sprint-3, 04-Sprint-4, 05-Sprint-5, 06-Sprint-6

③ Inside each sprint folder create 3 sub-folders: AI-Outputs, Human-Outputs, Approved

✓ Folder structure created and accessible.

**PRE-1.3 HUMAN Create project tracking spreadsheet** *[15 min]*

① Open Microsoft Excel or Google Sheets.

② Create a new spreadsheet: GuestIQ Project Tracker

③ Columns: Step Number, Description, Owner, Status (Not Started / In Progress / Complete / Blocked)

④ Add a second tab called Bug Log with columns: Bug ID, Step, Expected, Actual, Severity, Resolved

✓ Spreadsheet created and saved to 00-Sprint-0 folder.

**PRE-2 — Account Setup — GitHub and Supabase**

**PRE-2.1 HUMAN Create a GitHub account** *[20 min]*

*🔗 https://github.com*

② Click Sign Up. Enter your professional email address.

③ Create a password — at least 12 characters with numbers and symbols.

④ Choose a username — professional format recommended (e.g. hotelresearch2024).

⑤ Verify your email address from the GitHub verification email.

⑥ Select the Free plan when prompted.

*🔗 https://github.com/settings/profile — verify you can see your profile.*

✓ Logged into GitHub and profile dashboard visible.

ℹ If you already have a GitHub account, log in and proceed to PRE-2.2.

**PRE-2.2 HUMAN Create a Supabase account and project** *[25 min]*

*🔗 https://supabase.com*

② Click Start your project. Click Continue with GitHub.

③ Authorize Supabase to access your GitHub account.

④ Click New Project. Create an organization named: GuestIQ Research

⑤ Project Name: guestiq-hotel-research

⑥ Database password: Create a strong password and save it securely — you will need it in Sprint 2.

⑦ Region: US East (North Virginia)

⑧ Click Create new project. Wait 60–90 seconds for initialization.

*🔗 https://supabase.com/dashboard — verify project shows status Active.*

✓ Project Active with green indicator.

**PRE-2.3 HUMAN Save your Supabase API credentials** *[10 min]*

*🔗 https://supabase.com/dashboard/project/[your-project]/settings/api*

② Navigate: Click your project → Settings (gear icon) → API

③ Create a text file: supabase-credentials.txt

④ Copy and paste: Project URL: [paste URL] and Anon Key: [paste anon/public key]

**⚠ Never share the service\_role key. Never paste it into any public location.**

⑥ Save the file to your 00-Sprint-0 folder.

✓ Project URL and Anon Key saved locally.

**PRE-3 — Account Setup — PostHog ★ NEW**

**PRE-3.1 HUMAN Create a PostHog account ★ NEW**

① NEW\_PLACEHOLDER

**PRE-4 HUMAN Create PostHog account and project — product analytics** *[15 min]* **★ NEW**

*🔗 https://posthog.com*

② Click Get started free in the top right corner.

③ Click Sign up with email. Enter your professional email address and create a password.

④ Check your email for a verification link from PostHog. Click the link to verify.

⑤ PostHog will ask about your use case — select Product Analytics and click Next.

⑥ Organization name: GuestIQ Research. Click Create organization.

⑦ Project name: GuestIQ Pilot. Click Create project.

⑧ PostHog will show you your Project API Key — it looks like phc\_xxxxxxxxxxxx.

⑨ Create a text file: posthog-credentials.txt. Copy and paste: Project API Key: [paste key] and Host: https://app.posthog.com

⑨ Save the file to your 00-Sprint-0 folder.

*🔗 https://app.posthog.com/project/settings — verify you can see the API key on this page.*

✓ PostHog project active. API key saved to credentials file.

ℹ PostHog free tier includes 1 million events per month and full session replay. The prototype will generate approximately 5,000 events total — far within the free limit.

**PRE-4 — Account Setup — Sentry ★ NEW**

**PRE-5 HUMAN Create Sentry account and project — error tracking and performance** *[15 min]* **★ NEW**

*🔗 https://sentry.io*

② Click Get Started for Free in the center of the page.

③ Click Sign up with GitHub — this links Sentry to your existing GitHub account cleanly.

④ Authorize Sentry to access your GitHub account.

⑤ Sentry will ask for your organization name: GuestIQ Research. Click Create.

⑥ Click Create Project. Select React from the platform list.

⑦ Project name: guestiq-pilot. Alert frequency: Alert me on every new issue. Click Create Project.

⑧ Sentry will show you a DSN — a URL that looks like: https://xxxxx@sentry.io/xxxxxx

⑨ Create a text file: sentry-credentials.txt. Copy and paste: DSN: [paste DSN]

⑨ Save the file to your 00-Sprint-0 folder.

*🔗 https://sentry.io/settings/[your-org]/projects/ — verify guestiq-pilot appears in the project list.*

✓ Sentry project active. DSN saved to credentials file.

ℹ Sentry free tier includes 5,000 errors per month. The prototype is unlikely to generate more than 100. Free tier also includes performance monitoring and session traces.

**PRE-5 — Node.js Installation ★ NEW**

**PRE-6 HUMAN Install Node.js on your PC — required for local development** *[15 min]* **★ NEW**

*🔗 https://nodejs.org/en/download*

② The page will show two options: LTS (Long Term Support) and Current. Always download LTS.

③ Click the Windows Installer (.msi) button for the LTS version.

④ Run the downloaded installer. Accept all default options — do not change any settings.

⑤ When the installer finishes, open Command Prompt: press Windows key, type cmd, press Enter.

*$ node --version*

⑦ You should see a version number like v20.11.0 or similar. Any v18+ is correct.

*$ npm --version*

⑨ You should see a version number like 10.2.0 or similar.

✓ Both node --version and npm --version return version numbers without errors.

ℹ Node.js enables you to run the application on your own PC in under 3 seconds rather than waiting 2 minutes for GitHub Actions to deploy after every change. This saves significant time across Sprints 2–5.

**⚠ If Command Prompt shows 'node is not recognized as a command', restart your PC and try again. The installer requires a restart to update the system PATH variable.**

**PRE-6 — Final Verification**

**PRE-7 HUMAN Verify MS Teams access for pilot communications** *[5 min]*

① Open Microsoft Teams on your PC.

② Confirm access to the channel or group where the pilot launch message will be sent to the front desk team.

ℹ You do not need to send anything now. Just confirm access exists.

✓ You can see the front desk team channel and can post messages to it.

**PRE-GATE GATE Pre-Sprint Gate — All 10 pre-conditions confirmed**

✓ Project folder structure created (7 sprint folders, 3 sub-folders each).

✓ Project tracking spreadsheet created with Bug Log tab.

✓ GitHub account active and email verified.

✓ Supabase account active — project shows Active status.

✓ Supabase credentials saved to supabase-credentials.txt.

✓ PostHog account active — project created — API key saved to posthog-credentials.txt.

✓ Sentry account active — React project created — DSN saved to sentry-credentials.txt.

✓ Node.js installed — node --version and npm --version both return version numbers.

✓ MS Teams access confirmed for pilot launch channel.

**⚠ Do not begin Sprint 0 until every item above is checked. Sprint 0 documentation references all these accounts.**

**SPRINT 0 — FOUNDATION & GOVERNANCE**

**Weeks 1–2 · Your time: 8–9 hours · AI output: 12+ documents**

*SPRINT GOAL: All governance, requirements, and planning documents produced and approved before any code is written. Includes 4 new architecture documents added in v2.0.*

Sprint 0 is the foundation sprint. No code is written. The sole output is a complete, approved documentation set. Sprint 0 now produces 14 artifacts — 10 original plus 4 new architecture documents covering visual identity, observability, content management, and production-readiness.

**PHASE 0.1 — Governance Documents**

**S0-0.1 AI Produce GuestIQ Methodology Document** *[AI: 2h]* **★ NEW**

① AI produces: Comprehensive methodology document covering the hybrid delivery framework agreed during Sprint 0 planning.

② Sections: (1) Hybrid Framework Stack — Use Case 3.0, Scrum, PRINCE2-lite governance, Academic Research Methodology. (2) Scrum Master Function — definition, activation trigger, sprint-start checklist. (3) Epic→Feature→Story→Task Hierarchy — definitions and GuestIQ application. (4) JTBD Framework — three-actor application. (5) North Star Metric. (6) Business Goals Layer — JTBD, NSM, OKRs (existing success criteria), Value Proposition Canvas and Blue Ocean (Phase 2). (7) Story Mapping — deferred to Phase 2 planning. (8) Framework interactions and conflict resolution.

③ This document is the anchor for all v1.1 updates to previously approved Sprint 0 artifacts.

✓ Document received.

**S0-0.2 BOTH Review and approve Methodology Document** *[You: 30min]* **★ NEW**

① Verify the hybrid methodology stack accurately reflects all framework decisions made in this conversation.

② Verify JTBD statements correctly represent the three actor perspectives.

③ Verify the Scrum Master function and sprint-start checklist are correctly specified.

④ Verify the Epic→Feature→Story→Task hierarchy is correctly applied to GuestIQ.

⑤ Verify the North Star Metric is precisely stated and connected to the pilot success criteria.

✓ Approved and filed in 00-Sprint-0/Approved folder.

**S0-0.3 AI Produce JTBD Statements — three actors** *[AI: 30min]* **★ NEW**

① AI produces: One JTBD statement per actor in the format: '[Actor] hires GuestIQ to [functional job] so that [outcome].'

② Actor 1: Hotel Management — functional job, social job (data credibility with ownership), emotional job (confidence in decisions).

③ Actor 2: Lead Researcher — functional job, social job (publishable instrument), emotional job (professional validation).

④ Actor 3: Front Desk Team — functional job, social job (expertise recognised), emotional job (contribution that matters).

⑤ Total: one half-page document. Filed in Sprint 0 Approved folder. Referenced in Project Charter v2.1 and Methodology Document.

✓ Document received.

**S0-0.4 BOTH Review and approve JTBD Statements** *[You: 15min]* **★ NEW**

① Verify each JTBD statement accurately represents the actor's primary goal.

② Verify no actor's job is conflated with another's.

✓ Approved and filed.

**S0-0.5 AI Define North Star Metric — one sentence** *[AI: 15min]* **★ NEW**

① AI produces: A single, precise NSM statement: 'GuestIQ's North Star Metric is the percentage of respondents who complete their selected tier, measured as complete sessions / started sessions for the same property\_id at the close of the pilot window.'

② Connected to the pilot success criteria table in the Project Charter.

③ Filed as a one-paragraph artifact — can be embedded in the Methodology Document or as a standalone note.

✓ Statement agreed.

**S0-0.6 BOTH Review and confirm North Star Metric** *[You: 10min]* **★ NEW**

① Verify the metric is the correct single measure of GuestIQ's core value.

② Verify it is measurable from existing Supabase data (is\_complete flag / session count).

✓ Confirmed.

**S0-1.1 AI Produce Project Charter v2.0** *[AI: 1h]*

① AI produces: Updated Project Charter v2.0 incorporating all post-planning decisions.

② Covers: GuestIQ name, production-readiness objective, content management strategy, observability strategy, full confirmed technology stack, 2 new risks, updated success criteria.

③ Delivered as Word document to your 00-Sprint-0 / AI-Outputs folder.

ℹ Project Charter v1.0 was already approved. v2.0 requires re-approval from all signatories.

✓ Document received and placed in AI-Outputs folder.

**S0-1.2 BOTH Review and approve Project Charter v2.0** *[You: 1h]*

① Read the change log table at the top of v2.0 first — it lists every section that changed.

② Verify the GuestIQ application name is correctly reflected throughout.

③ Verify the technology stack table is complete and accurate.

④ Verify the two new risks (config file corruption, Supabase deletion) have appropriate mitigations.

⑤ When satisfied, sign the approval block and copy to 00-Sprint-0 / Approved folder.

✓ Project Charter v2.0 marked Approved with date.

**S0-1.3 AI Produce Stakeholder Register** *[AI: 30min]*

① AI produces: Structured table of all 6 stakeholders with interest, influence, communication preference, and notes.

② Includes PostHog and Sentry alert routing in the communication plan section.

✓ Document received.

**S0-1.4 BOTH Review Stakeholder Register — add real names and roles** *[You: 30min]*

① Fill in bracketed placeholder fields with actual names and roles where known.

② Verify PostHog weekly digest and Sentry error alert routing are assigned to the correct person.

✓ Approved version in Approved folder.

**S0-1.5 AI Produce RACI Matrix** *[AI: 30min]*

① AI produces: Grid mapping every major project activity to Responsible, Accountable, Consulted, Informed roles.

② Activities now include: Sentry monitoring, PostHog analysis, JSON config file editing, content validation, Phase 1b extraction task.

✓ Document received.

**S0-1.6 BOTH Review and approve RACI Matrix** *[You: 20min]*

① Verify no activity has more than one Accountable owner.

② Verify your role is correctly assigned for all new v2.0 activities.

✓ Approved version in Approved folder.

**S0-1.7 AI Produce Definition of Done and Definition of Ready** *[AI: 30min]*

① AI produces: Two checklists. Definition of Done now includes: Sentry shows no new errors from the feature, PostHog events firing correctly for the feature, content accessible from questionnaire.js (Phase 1a) or JSON file (Phase 1b) without code changes.

✓ Document received.

**S0-1.8 BOTH Review and approve Definitions** *[You: 20min]*

① Verify the new Definition of Done items for Sentry, PostHog, and content separation are appropriate.

✓ Approved versions in Approved folder.

**S0-1.9 AI Produce Risk Register v1** *[AI: 45min]*

① AI produces: Full risk table including all 10 risks from Project Charter v2.0 plus detailed probability/impact/mitigation for each.

✓ Document received.

**S0-1.10 BOTH Review Risk Register** *[You: 30min]*

① Verify all 10 risks are present including the 2 new v2.0 risks.

② Add any property-specific risks not in the list.

✓ Approved version in Approved folder.

**PHASE 0.2 — Requirements Documents**

**S0-2.1 AI Produce SRS — Functional Requirements** *[AI: 2.5h]*

① AI produces: Complete SRS covering all functional requirements.

② New v2.0 sections: Content Management Requirements (questionnaire editable without code changes), Observability Requirements (27 PostHog events, Sentry automatic capture), Production-Readiness Requirements (auth bypass, feature flags, service layer, migrations).

✓ Document received.

**S0-2.2 BOTH Review and approve SRS Functional Requirements** *[You: 2h]*

**⚠ This is the most important review in Sprint 0. The new content management and observability requirements sections are critical — they define how the developer instruments the application.**

② Verify the 27 PostHog event names match the event taxonomy confirmed in planning.

③ Verify the questionnaire.js data structure requirements align with what you expect to see in Sprint 2.

✓ All functional requirements reviewed. Approved version in Approved folder.

**S0-2.3 AI Produce SRS — Non-Functional Requirements** *[AI: 45min]*

① AI produces: Non-functional requirements covering performance, security, accessibility, browser compatibility, scalability, and observability benchmarks.

② New v2.0 items: Performance benchmarks measured by Sentry in the field (not just development). IP anonymization requirement for PostHog and Sentry. Content configuration file integrity requirement.

✓ Document received.

**S0-2.4 BOTH Review and approve Non-Functional Requirements** *[You: 30min]*

① Verify the Sentry performance targets (page load under 2 seconds measured from real user devices) are achievable on hotel PC hardware.

② Verify IP anonymization requirement is included — no personal data in PostHog or Sentry.

✓ Approved version in Approved folder.

**S0-2.5 AI Produce Use Case Specifications ★ SEQUENCED BEFORE BACKLOG** *[AI: 1.5h]*

① AI produces: Use Case Specifications v2.0 — all 7 Use Cases fully specified: UC-01 Respondent Completes the Questionnaire · UC-02 Research Data Quality is Maintained · UC-03 Manager Reviews Pilot Analytics · UC-04 Data is Stored, Versioned, and Protected · UC-05 Questionnaire Content is Managed Without Code Changes · UC-06 Pilot Debrief and Post-Pilot Reporting · UC-07 GuestIQ is Deployed, Accessible, and Observed. v2.0 changes: UC-05 basic scenario structurally corrected (Lead Researcher is the actor, not the developer). 9 new extensions across all UCs. New Section 5 — Research Ethics and IRB Path Analysis (requires Lead Researcher decision before pilot launch). ★ UPDATED v5.0: Corrected UC descriptions — previous v4.0 text described superseded UC-06/UC-07 from earlier planning.

✓ Document received.

**S0-2.6 BOTH Review Use Case Specifications** *[You: 30min]*

① Three v2.0 review priorities: (1) UC-05 basic scenario — verify the Lead Researcher is the actor achieving their goal (opening questions.json, editing a question, committing, seeing it live). The developer's Strangler Fig migration must be in Preconditions, not the basic scenario. (2) UC-01 Extensions 5 and 6 — verify the voluntary non-participation pathway (Extension 5) and Q0 Option D handling (Extension 6) are present. (3) Section 5 IRB Path Analysis — requires a decision from the Lead Researcher (Scenario A, B, or C) before pilot launch. Record your decision in writing now and add it to the 00-Sprint-0/Approved folder. ★ UPDATED v5.0: Review guidance corrected — previous v4.0 directed attention to UC-07 (wrong UC for this review priority).

✓ Approved version in Approved folder.

**S0-2.7 AI Produce complete Product Backlog with user stories — Epic structure derived from S0-2.5 Use Cases** *[AI: 2.5h]*

① DEPENDENCY: This step follows S0-2.6 (Use Case review) because the Product Backlog Epic grouping structure is derived from the Use Cases. Use Cases define the Epics; Backlog stories are grouped under them.

② AI produces: Master prioritized list of all features as user stories with story points and acceptance criteria.

③ New v2.0 stories: Sentry initialization, PostHog initialization, 27 PostHog event implementations, offline queue connectivity test, questionnaire.js data structure, Phase 1b JSON extraction, disambiguation screen, GitHub Actions permissions, Playwright visual regression, downtime contingency screen, bug reporting guide.

✓ Document received.

**S0-2.8 BOTH Review and prioritize Product Backlog** *[You: 1h]*

① Verify all new v2.0 stories are present and correctly prioritized as Must Have.

② Verify the Phase 1b JSON extraction story is scheduled in the Sprint 3→4 transition.

✓ Backlog reviewed and approved.

**PHASE 0.3 — New Architecture Artifacts (v2.0 additions)**

★ NEW v2.0: Sprint 0 now produces 4 additional architecture documents that feed directly into Sprint 1 design. These did not exist in v1.0.

**S0-1.1v AI Update Project Charter → v2.1 (methodology section)** *[AI: 45min]* **★ NEW**

① Add Section 13: Delivery Methodology — hybrid framework stack.

② Add: JTBD statements for Hotel Management, Lead Researcher, and Front Desk Team.

③ Add: North Star Metric statement.

④ Add: Scrum Master function — definition, activation trigger (start of each sprint session), sprint-start checklist.

⑤ Add: Epic→Feature→Story→Task hierarchy — definitions and GuestIQ application.

⑥ Correct: risk count from 10 to 12 (reflecting R-11 and R-12 added in S0-1.9v).

⑦ No existing content removed or modified — purely additive.

✓ v2.1 received.

**S0-1.2v BOTH Review and approve Charter v2.1** *[You: 20min]* **★ NEW**

① Verify methodology section is accurate and consistent with the Methodology Document (S0-0.1).

② Verify JTBD statements match S0-0.3.

③ Verify North Star Metric matches S0-0.5.

✓ Approved. File as Charter-v2.1.docx in Approved folder.

**S0-1.3v AI Update Stakeholder Register → v1.1 (Scrum Master + Epic Owners)** *[AI: 30min]* **★ NEW**

① Add: Scrum Master as a functional role entry — held by Claude at the start of each sprint session. Responsibilities: enforce DoR, enforce DoD, manage Epic/Feature/Story slicing, bridge four active methodologies, maintain Use Case model currency.

② Add: Epic Owner field to SH-02 Lead Researcher (owns research-domain Epics) and SH-04 AI Developer (owns technical Epics).

③ No existing stakeholder profiles modified.

✓ v1.1 received.

**S0-1.4v BOTH Review and approve Stakeholder Register v1.1** *[You: 15min]* **★ NEW**

① Verify Scrum Master role is correctly described — particularly the activation trigger and responsibilities.

✓ Approved.

**S0-1.5v AI Update RACI Matrix → v1.1 (Scrum Master activities + new rows)** *[AI: 30min]* **★ NEW**

① Add category: Scrum Master Function — 5 activity rows: sprint-start checklist, Epic/Feature review, Use Case model currency check, methodology compliance verification, gate condition sign-off.

② Add rows to Sprint 0 governance category: Produce JTBD Statements (R=AI, A=Researcher), Define North Star Metric (R=AI, A=Researcher), Produce Methodology Document (R=AI, A=Researcher).

③ No existing rows modified.

✓ v1.1 received.

**S0-1.6v BOTH Review and approve RACI Matrix v1.1** *[You: 15min]* **★ NEW**

① Verify single Accountable owner on all new rows.

② Verify Scrum Master activities are correctly assigned.

✓ Approved.

**S0-1.7v AI Update Definition of Done + Ready → v1.1 (Epic and Feature tiers)** *[AI: 30min]* **★ NEW**

① Add: Definition of Ready — Epic level (3 criteria: Use Case narrative complete, actor and goal defined, key scenarios identified). A Use Case must satisfy all 3 before Feature slices are created from it.

② Add: Definition of Ready — Feature level (3 criteria: Use Case slice identified and bounded, scope fits within one sprint, test slice defined). A Feature must satisfy all 3 before Stories are written for it.

③ Add: Scrum Master gate criterion — Scrum Master checklist run and all impediments resolved before sprint work begins.

④ No existing criteria removed.

✓ v1.1 received.

**S0-1.8v BOTH Review and approve DoD + DoR v1.1** *[You: 15min]* **★ NEW**

① Verify Epic and Feature DoR criteria are correctly specified.

② Verify the Scrum Master gate criterion is clear and actionable.

✓ Approved.

**S0-1.9v AI Update Risk Register → v1.1 (R-11 and R-12)** *[AI: 45min]* **★ NEW**

① Add R-11: Single Human Covering All Roles — Category: Governance. Probability: High. Impact: High. Risk Level: High. Mitigation: Scrum Master function held by Claude provides process discipline separate from delivery pressure. Contingency: explicit role-switching at sprint start; Scrum Master checklist run before any delivery work begins.

② Add R-12: Mid-Project Methodology Adoption — Category: Governance. Probability: Medium. Impact: Medium. Risk Level: Medium. Mitigation: Methodology Document produced first as anchor. Phased adoption: Use Case 3.0 applied to Use Cases only; Epic hierarchy applied to Backlog; SM checklist lightweight and optional. Contingency: defer Epic restructuring to Sprint 1 review if it creates confusion.

③ Investigate and resolve 11-card discrepancy from v1.0.

④ Update heatmap and summary table.

✓ v1.1 received.

**S0-1.10v BOTH Review and approve Risk Register v1.1** *[You: 20min]* **★ NEW**

① Verify R-11 correctly captures the single-human structural risk.

② Verify R-12 is appropriately scoped — medium, not high.

✓ Approved.

**S0-2.1v AI Update SRS Functional Requirements → v1.1 (UC traceability note)** *[AI: 15min]* **★ NEW**

① Add note to Section 13 traceability table header: 'A Use Case reference column (UC-XX) will be added to this table after S0-2.7 Use Case Specifications are approved.'

② No requirement content changes. Internal consistency unchanged.

✓ v1.1 received.

**S0-2.2v BOTH Review and approve SRS-F v1.1** *[You: 10min]* **★ NEW**

① Verify the UC traceability note is present and clearly worded.

✓ Approved.

**S0-2.3v AI Update SRS Non-Functional Requirements → v1.1 (Research Data NFRs)** *[AI: 30min]* **★ NEW**

① Add new category: Research Data Integrity (10th NFR category).

② Add NFR-043 (MUST): Tense Frame Accuracy — the application delivers 100% of questions in the correct tense frame (retrospective or anticipatory) as set by QR1 for the duration of the session. Test: trace 5 sessions with mixed tense frames in Supabase and verify all question renders match tense\_frame field.

③ Add NFR-044 (MUST): Module 5 Routing Fidelity — intent category routing matches the Q1 answer\_code in 100% of complete sessions. Test: cross-reference intent\_category in sessions table against Q1 response record for all sessions in the 84-path test matrix run.

④ Add NFR-045 (MUST): Research Data Integrity — the count of none\_flag records in the none\_flags table matches the count of 'None of these fit my situation' selections visible in the respondent UI for all verified sessions. Test: complete 3 sessions deliberately selecting none options on known questions and verify record counts.

⑤ Update total: 42 → 45 NFRs. Update metadata and traceability table.

✓ v1.1 received.

**S0-2.4v BOTH Review and approve SRS-NFR v1.1** *[You: 15min]* **★ NEW**

① Verify the three new research data NFRs are correctly specified with testable acceptance criteria.

② Verify they address the academic research dimension that was absent from v1.0.

✓ Approved.

**S0-2.5v AI Update Product Backlog → v1.1 (Epic structure + 4 new stories)** *[AI: 1h]* **★ NEW**

① Restructure: add Epic layer above sprint banners. Each Epic corresponds to a Use Case from S0-2.7. Stories are grouped under their parent Epic. This is a visual/structural change — no story content changes.

② Add S0-11 (MUST, 1 SP): Produce and approve JTBD Statements — three actors, one page, filed in Sprint 0.

③ Add S0-12 (MUST, 1 SP): Define and approve North Star Metric — one sentence, filed in Sprint 0.

④ Add S0-13 (MUST, 2 SP): Produce and approve GuestIQ Methodology Document — full hybrid framework stack.

⑤ Add PS-10 (MUST, 0 SP): Scrum Master Sprint Start Checklist — recurring step, first occurrence Sprint 1.

⑥ Update story totals: 99 → 103 stories. Update point totals: 227 → 231 points.

⑦ Update verification table.

✓ v1.1 received.

**S0-2.6v BOTH Review and approve Product Backlog v1.1** *[You: 20min]* **★ NEW**

① Verify Epic grouping correctly maps Use Cases to Epic containers.

② Verify 4 new stories have correct acceptance criteria.

③ Verify updated counts are accurate.

✓ Approved.

**S0-3.1 AI Produce Visual Identity and Design System Document** *[AI: 2h]* **★ NEW**

① NEW\_PLACEHOLDER

② AI produces: GuestIQ application name and wordmark specifications (dark canvas and light context variants). Two-canvas system (respondent #0D0D12 vs. dashboard #0B1120). Complete color token system with all hex values. Tier color system (Amateur green / Professional blue / Expert purple with all stops). Typography scale (6 levels). SVG badge specifications (9 badges with trigger conditions, size, color usage). Episode visual identity (7 named episodes with color assignments). Dashboard color encoding for intent categories.

✓ Document received and placed in 00-Sprint-0 / AI-Outputs folder.

**S0-3.2 BOTH Review Visual Identity Document** *[You: 45min]* **★ NEW**

① Verify all confirmed design decisions are reflected accurately.

② Verify the SVG badge specifications are sufficient for a developer to implement without further design input.

③ Verify the two-canvas distinction (respondent vs. dashboard) is clearly specified with exact hex values.

✓ Approved version in Approved folder.

**S0-3.3 AI Produce Observability and Analytics Specification** *[AI: 1.5h]* **★ NEW**

① NEW\_PLACEHOLDER

② AI produces: Sentry configuration requirements (DSN setup, React SDK version, IP anonymization, performance monitoring targets, automatic capture list). PostHog configuration requirements (API key, host, identify calls, IP anonymization). Complete 27-event PostHog taxonomy with event names, trigger moments, and key properties for each event. Instrumentation sprint mapping (which events are added in which sprint). Privacy requirements (no PII in either platform).

✓ Document received.

**S0-3.4 BOTH Review Observability Specification** *[You: 30min]* **★ NEW**

① Verify the 27 PostHog event names match what was confirmed in planning.

② Verify privacy requirements (IP anonymization) are explicit and testable.

✓ Approved version in Approved folder.

**S0-3.5 AI Produce Content Management Strategy Document** *[AI: 1.5h]* **★ NEW**

① NEW\_PLACEHOLDER

② AI produces: Strangler Fig Pattern explanation and rationale. Phase 1a hardcoded questionnaire.js structure with complete JSON-like object specification showing how questions, options, tier assignments, taxonomy codes, and routing rules are organized. Phase 1b six JSON configuration file specifications (questions.json, episodes.json, tiers.json, ui-copy.json, branching.json, taxonomy.json). Architectural discipline requirement (components accept content as properties). Migration trigger (after Sprint 3 testing). Phase 2 visual admin CMS feature list.

✓ Document received.

**S0-3.6 BOTH Review Content Management Strategy Document** *[You: 30min]* **★ NEW**

① Verify the questionnaire.js data structure matches your expectations for how content should be organized.

② Verify the Phase 1b JSON file structure is clear enough that you could edit a question yourself following the documentation.

✓ Approved version in Approved folder.

**S0-3.7 AI Produce Production Readiness Architecture Document** *[AI: 1.5h]* **★ NEW**

① NEW\_PLACEHOLDER

② AI produces: All 7 production-readiness gaps documented — authentication in bypass mode, environment configuration, feature flag system, structured error logging, database migration strategy, API versioning via service layer, dashboard caching. For each gap: the problem, the fix, implementation cost, and the sprint in which it is addressed.

✓ Document received.

**S0-3.8 BOTH Review Production Readiness Architecture Document** *[You: 30min]* **★ NEW**

① Verify you understand the feature flag system — specifically that the same codebase switches between prototype and production behavior via a single configuration file.

② Verify the service layer concept is clear — all Supabase calls go through service functions, never directly from components.

✓ Approved version in Approved folder.

**PHASE 0.4 — Test Planning**

**S0-4.1 AI Produce Test Plan** *[AI: 1h]*

① AI produces: Complete testing strategy now covering unit, integration, cross-browser, UAT, accessibility, performance (Sentry), visual regression (Playwright), data integrity (5-session traces), offline queue (Chrome DevTools throttling), and branching logic (84-path test matrix).

✓ Document received.

**S0-4.2 BOTH Review and approve Test Plan** *[You: 20min]*

① Verify the data integrity test (5 sessions traced end-to-end) is clearly described.

② Verify the offline queue test (Chrome DevTools network throttling) is actionable.

✓ Approved version in Approved folder.

**PHASE 0.5 — Sprint 0 Close**

**S0-5.1 BOTH Sprint 0 Review** *[You: 30min]*

① Verify all Sprint 0 gate conditions are met — the gate checklist (S0-GATE) is the authoritative verification. As a reference: Sprint 0 produces 22+ approved documents across governance, requirements, architecture, and test planning phases after all v3.0 and v5.0 additions. ★ UPDATED v5.0

✓ 14 approved documents confirmed in 00-Sprint-0 / Approved folder.

**S0-5.2 BOTH Sprint 0 Retrospective + Sprint 1 Planning** *[You: 30min]*

① Retrospective: What went well? What did not? One improvement for Sprint 1?

② Risk Register update: any new risks identified?

③ Sprint 1 planning: Confirm Sprint 1 backlog includes all new v2.0 Sprint 1 tasks.

✓ Retrospective written. Sprint 1 backlog confirmed.

**S0-GATE GATE Sprint 0 Gate — 28 conditions must be met**

✓ Project Charter v2.1 approved. ★ UPDATED v5.0

✓ Stakeholder Register approved.

✓ RACI Matrix approved.

✓ Definition of Done + Ready approved.

✓ Risk Register approved.

✓ SRS Functional Requirements approved (including content management and observability sections).

✓ SRS Non-Functional Requirements approved.

✓ Product Backlog v3.1 approved (UC Specs v2.0 targeted ACs: S2-06 voluntary participation, S2-12 RLS rejection, S4-01 abandoned sessions + min-data warning, S4-02 export failure). ★ UPDATED v5.0

✓ Use Case Specifications v2.0 approved (UC-01 to UC-07, all revised, UC-05 structurally corrected, IRB ethics section added). ★ UPDATED v5.0

✓ Test Plan approved.

✓ Visual Identity and Design System Document approved. ★

✓ Observability and Analytics Specification approved. ★

✓ Content Management Strategy Document approved. ★

✓ Production Readiness Architecture Document approved. ★

✓ GuestIQ Methodology Document approved (S0-0.1). ★

✓ JTBD Statements approved (S0-0.3). ★

✓ North Star Metric defined and approved (S0-0.5). ★

✓ Project Charter v2.1 approved (methodology section added).

✓ Stakeholder Register v1.1 approved (Scrum Master role added).

✓ RACI Matrix v1.1 approved (SM activities added).

✓ Definition of Done + Ready v1.1 approved (Epic/Feature DoR added).

✓ Risk Register v1.1 approved (R-11 and R-12 added).

✓ SRS Functional Requirements v1.1 approved (UC traceability note added).

✓ SRS Non-Functional Requirements v1.1 approved (NFR-043/044/045 added).

✓ Product Backlog v3.1 approved (targeted AC additions from UC Specs v2.0 critique). ★ UPDATED v5.0

✓ All Sprint 0 documents filed as versioned files in 00-Sprint-0/Approved folder. ✓ IRB path decision made and documented in writing by Lead Researcher — Scenario A (internal operational research only), Scenario B (IRB exemption determination to be sought before pilot), or Scenario C (IRB expedited review). Decision filed in 00-Sprint-0/Approved folder. ★ NEW v5.0

✓ 22+ documents in 00-Sprint-0 / Approved folder (v1.0 originals + v1.1/v2.1 updates).

**⚠ Sprint 1 cannot begin until every item above is confirmed.**

**SPRINT 1 — ARCHITECTURE & DESIGN**

**Weeks 3–4 · Your time: 7–8 hours · AI output: 11 documents + diagrams · 2 new steps added**

*SPRINT GOAL: Complete technical blueprint produced. Branching logic test matrix (84 paths) produced. questionnaire.js data structure designed. ESLint + Prettier configured.*

↑ UPDATED v2.0: Sprint 1 now produces 11 artifacts (previously 9). Two new deliverables: ESLint + Prettier configuration (S1-1.11) and questionnaire.js data structure design (S1-2.3). Visual Design System updated to include SVG badge specifications. Branching Logic Specification updated to include 84-path test matrix.

**PHASE 1.1 — Architecture Documents**

**SM-CHECK-S1 BOTH Scrum Master Sprint Start — 5-minute methodology checklist** *[15 min]* **★ NEW**

① AI Developer acts as Scrum Master and runs a structured 5-minute checklist at the start of this sprint session before any delivery work begins.

② Checklist: (1) Are all previous sprint gate conditions confirmed? (2) Is the Epic/Feature/Story hierarchy correct for this sprint — are stories correctly parented to Features? (3) Is the Definition of Ready satisfied for all stories entering this sprint? (4) Are there any methodology conflicts or impediments? (5) Is the Use Case model current — do Use Cases still accurately describe the system being built?

③ Any impediment found must be resolved before sprint work begins. Impediments are logged in the Risk Register if systemic.

④ First occurrence: Sprint 1. Recurring: every sprint (S2 through S6).

✓ Checklist run. Any impediments documented. Sprint work may begin.

**S1-1.1 AI Produce System Architecture Document** *[AI: 2h]*

① AI produces: Complete 3-layer architecture — React PWA frontend, Supabase backend, GitHub Pages hosting.

② v2.0 additions: Radix UI in component layer. Sentry and PostHog as observability layer. Content management layer (questionnaire.js → JSON files → Supabase CMS). Feature flag system. Service layer architecture. Supabase Auth bypass mode. Environment configuration system.

✓ Document received.

**S1-1.2 BOTH Review System Architecture Document** *[You: 45min]*

① Verify the service layer is clearly described — all Supabase calls go through service/supabase.js functions.

② Verify the feature flag system is clearly described — a single .env file switches prototype/production behavior.

③ Verify Sentry and PostHog appear as distinct external services in the architecture diagram.

✓ Approved version in Approved folder.

**S1-1.3 AI Produce Information Architecture Diagram** *[AI: 2h]*

① AI produces: Complete visual map of every screen, navigation path, and branch point.

② v2.0 additions: PostHog event firing shown at key navigation points. Sentry error capture shown at API call points. JSON config file as content source. Downtime contingency screen path.

✓ Diagram received and legible.

**S1-1.4 BOTH Review Information Architecture Diagram** *[You: 1h]*

① Trace every path a respondent can take. Verify all paths are shown.

② Verify the downtime contingency screen path is shown.

③ Verify where PostHog events fire is indicated.

✓ All paths verified. Approved.

**S1-1.5 AI Produce Data Flow Diagram** *[AI: 1.5h]*

① AI produces: Level 0 and Level 1 DFD showing data movement through the system.

② v2.0 additions: Three outbound data streams shown — responses to Supabase, errors to Sentry, behavioral events to PostHog. Content reading from questionnaire.js shown as a data flow.

✓ Diagram received.

**S1-1.6 BOTH Review Data Flow Diagram** *[You: 30min]*

① Verify the three outbound data streams (Supabase, Sentry, PostHog) are clearly distinct.

② Verify no personal data flows to PostHog or Sentry — only anonymous session IDs.

✓ Approved.

**S1-1.7 AI Produce Entity Relationship Diagram** *[AI: 1h]*

① AI produces: Supabase 4-table schema showing sessions, responses, scale\_responses, none\_flags with all fields, data types, and relationships.

② v2.0 note: Schema implemented via Supabase Migrations — ERD serves as the migration source document.

✓ Diagram received.

**S1-1.8 BOTH Review ERD** *[You: 30min]*

① Verify sessions table includes user\_id field (null in prototype, populated in Phase 2).

② Verify property\_id field present in sessions table.

③ Verify all 4 tables present with correct field names and types.

✓ Approved.

**S1-1.9 AI Produce Application State Diagram** *[AI: 1h]*

① AI produces: State machine showing all application states and transitions.

② v2.0 additions: PostHog event names annotated at state transitions. Sentry error capture annotated at API call states. Content loading state (reading from questionnaire.js). Downtime state with retry transition.

✓ Diagram received.

**S1-1.10 BOTH Review Application State Diagram** *[You: 30min]*

① Verify the downtime state has a clear retry path.

② Verify the disambiguation screen state has correct transitions for both resume and new session paths.

✓ Approved.

**S1-1.11 AI Configure ESLint and Prettier — code quality tooling** *[AI: 1h]* **★ NEW**

① NEW\_PLACEHOLDER

**★ AI produces ESLint configuration file (.eslintrc.js) with rules for: React hooks dependency checking, accessibility violations (jsx-a11y), unused variables, and import ordering.**

**★ AI produces Prettier configuration file (.prettierrc) with consistent formatting rules: 2-space indent, single quotes, semicolons, 100-character line width.**

**★ AI produces package.json scripts for running lint checks and auto-formatting.**

ℹ Both tools are configured before any application code is written. Adding them to an existing codebase later requires fixing all existing violations at once — expensive and risky.

✓ Configuration files produced and ready to be added to the repository in Sprint 2.

**PHASE 1.2 — Branching Logic Specification + Test Matrix**

↑ UPDATED v2.0: The Branching Logic Specification now includes the 84-path test matrix as an integrated section. This is the most critical document in Sprint 1.

**S1-2.1 AI Produce Branching Logic Specification with 84-path test matrix** *[AI: 3h]*

① AI produces: Complete routing specification — tier routing, tense routing, Module 5 routing (12 categories), secondary purpose routing, upgrade paths, edge cases.

② v2.0 addition: Section 7 — 84-path test matrix. Each row is a test path with: Path ID, Tier, Intent Category, Q1 Answer Code, Expected Module 5 Sub-section, Secondary Purpose (if any), Tense Frame, Pass/Fail column.

③ 84 paths = 12 intent categories × 3 tiers = 36 paths + 6 secondary purpose combinations = 42 + retrospective/anticipatory variants for key branching questions = 84.

✓ Document received.

**S1-2.2 BOTH Review Branching Logic Specification — most critical review in the project** *[You: 1.5h]*

**⚠ Do not rush this review. An error here becomes a bug discovered during the pilot with real respondents.**

② Section 1 review: List all 8 Amateur questions. Verify against Refined Questionnaire document. Repeat for Professional (18) and Expert (79).

③ Section 3 review: For each of the 12 intent categories trace Q1 answer → taxonomy code → Module 5 sub-section → first question in that sub-section.

④ Section 7 review: Check 10 random rows from the 84-path matrix. Verify each path ID, tier, answer code, and expected outcome are consistent with Sections 1–6.

✓ Every section reviewed. All errors corrected. Branching Logic Specification explicitly approved.

**S1-2.3 AI Design questionnaire.js data structure** *[AI: 2h]* **★ NEW**

① NEW\_PLACEHOLDER

**★ AI produces the complete questionnaire.js data structure specification — the exact JavaScript object format used in Phase 1a hardcoded content.**

**★ Structure covers: question ID, module number, section, tier assignment array, question type, retrospective text, anticipatory text, instruction, options array (each with code, taxonomy\_code, and text), none\_option flag, researcher\_note, and routing flags.**

**★ Specification is designed to map exactly to the Phase 1b JSON file structure and the Phase 2 Supabase content schema. Migration from each phase to the next is a mechanical translation, not a redesign.**

ℹ This document is the developer's contract for how content is structured in Sprint 2. Any ambiguity here creates structural debt that compounds through the content management migrations.

✓ questionnaire.js data structure specification received and reviewed.

**PHASE 1.3 — Design System**

**S1-3.1 AI Produce UI/UX Wireframes — all screens** *[AI: 2h]*

① AI produces: Low-fidelity wireframes for every screen.

② v2.0 additions: PostHog event labels annotated on key interaction points. Downtime contingency screen wireframe. JSON config file editing workflow diagram (Phase 1b mental model for researchers).

✓ Wireframes received.

**S1-3.2 BOTH Review UI/UX Wireframes** *[You: 45min]*

① Verify the disambiguation screen wireframe is present and shows both resume and new session options clearly.

② Verify the downtime contingency screen wireframe is present.

✓ All wireframes approved.

**S1-3.3 AI Produce Visual Design System** *[AI: 2h]*

① AI produces: Complete visual specification from approved Visual Identity Document.

② v2.0 additions: SVG badge specifications — all 9 badges with exact trigger conditions, viewBox dimensions, color usage from GuestIQ design token system, and naming convention. Animation specifications for badge reveal (slide up + brief glow at 300ms). PostHog event annotation overlay style for developer reference diagrams.

✓ Design System received.

**S1-3.4 BOTH Review and approve Visual Design System** *[You: 30min]*

① Verify the SVG badge specifications are complete enough for a developer to implement without further design input.

② Verify all tier colors (Amateur green #4ADE80 / Professional blue #60A5FA / Expert purple #A78BFA) are correctly specified.

③ Verify the two-canvas distinction is explicit in the component specifications.

✓ Approved.

**S1-3.5 AI Produce API Specification** *[AI: 1h]*

① AI produces: All Supabase API calls through the service layer. PostHog event firing calls. Sentry error capture calls.

② v2.0 addition: Service layer architecture — all calls go through src/services/supabase.js and src/services/analytics.js. Components import from services, never from Supabase or PostHog SDKs directly.

✓ Document received.

**S1-3.6 BOTH Review API Specification** *[You: 20min]*

① Verify the service layer pattern is explicit — no direct Supabase or PostHog calls from React components.

② Verify all 27 PostHog event calls are included with correct event names from the Observability Specification.

✓ Approved.

**PHASE 1.4 — Sprint 1 Close**

**S1-4.1 BOTH Sprint 1 Review** *[You: 20min]*

① Count approved documents: You should have 11 Sprint 1 documents in 01-Sprint-1 / Approved folder.

② CRITICAL: Verify Branching Logic Specification with 84-path test matrix is explicitly noted as approved.

✓ 11 documents approved.

**S1-4.2 BOTH Sprint 1 Retrospective + Sprint 2 Planning** *[You: 25min]*

① Retrospective: What went well? What did not? One improvement?

② Risk Register update.

③ Sprint 2 planning: Confirm Sprint 2 stories include Sentry initialization, PostHog initialization, GitHub Actions permissions verification, Radix UI setup.

✓ Sprint 2 backlog confirmed.

**S1-GATE GATE Sprint 1 Gate — All conditions must be met**

✓ System Architecture Document approved (includes Radix UI, Sentry, PostHog, content management, production-readiness).

✓ Information Architecture Diagram approved.

✓ Data Flow Diagram approved (3 outbound streams confirmed).

✓ ERD approved (user\_id and property\_id fields present).

✓ Application State Diagram approved.

✓ ESLint + Prettier configuration files produced. ★

✓ Branching Logic Specification approved with 84-path test matrix. CRITICAL.

✓ questionnaire.js data structure specification approved. ★

✓ Wireframes approved (includes downtime screen and disambiguation screen).

✓ Visual Design System approved (includes SVG badge specifications). ★

✓ API Specification approved (service layer pattern confirmed).

✓ 11 documents in 01-Sprint-1 / Approved folder.

**⚠ The Branching Logic Specification and questionnaire.js data structure must both be explicitly approved before Sprint 2 begins. These are the developer's contracts for the two most complex Sprint 2 build tasks.**

✓ Scrum Master sprint-start checklist (SM-CHECK-S1) run and any impediments resolved.

**SPRINT 2 — CORE APPLICATION BUILD**

**Weeks 5–6 · Your time: 8–10 hours · 4 new steps added**

*SPRINT GOAL: Working URL live. Modules 1–4 functional. Sentry + PostHog live from day one. Session resume and disambiguation working. Data in Supabase.*

↑ UPDATED v2.0: Sprint 2 has 4 new steps in v2.0: S2-1.4 GitHub Actions permissions verification, S2-2.1a Sentry SDK initialization, S2-2.1b PostHog SDK initialization, S2-3.5 offline queue connectivity test. Data integrity verification added to S2-3.2 test cases.

**PHASE 2.1 — Project Setup (Human steps)**

**SM-CHECK-S2 BOTH Scrum Master Sprint Start — 5-minute methodology checklist** *[15 min]* **★ NEW**

① AI Developer acts as Scrum Master and runs a structured 5-minute checklist at the start of this sprint session before any delivery work begins.

② Checklist: (1) Are all previous sprint gate conditions confirmed? (2) Is the Epic/Feature/Story hierarchy correct for this sprint — are stories correctly parented to Features? (3) Is the Definition of Ready satisfied for all stories entering this sprint? (4) Are there any methodology conflicts or impediments? (5) Is the Use Case model current — do Use Cases still accurately describe the system being built?

③ Any impediment found must be resolved before sprint work begins. Impediments are logged in the Risk Register if systemic.

④ First occurrence: Sprint 1. Recurring: every sprint (S2 through S6).

✓ Checklist run. Any impediments documented. Sprint work may begin.

**S2-1.1 HUMAN Create GitHub repository** *[15 min]*

*🔗 https://github.com*

② Click the + icon in the top right. Select New repository.

③ Repository name: guestiq

④ Description: GuestIQ Hotel Guest Expectations Research PWA

⑤ Visibility: Private

⑥ Check: Add a README file.

⑦ Click Create repository.

*🔗 https://github.com/[your-username]/guestiq*

✓ Repository created and visible at your GitHub profile.

ℹ Copy the repository URL — you will give this to AI in the next step.

**S2-1.2 HUMAN Create Supabase database tables via Migrations** *[30 min]*

*🔗 https://supabase.com/dashboard*

② Click on your guestiq-hotel-research project.

③ Click SQL Editor in the left sidebar.

④ AI will provide 4 SQL migration commands — one per table (sessions, responses, scale\_responses, none\_flags). Each is formatted as a Supabase Migration.

⑤ Paste each command and click Run. Verify each table appears in Table Editor after running.

✓ All 4 tables visible in Table Editor.

**⚠ If any command produces a red error, copy the error text and share with AI before proceeding.**

**S2-1.3 HUMAN Configure Row Level Security on Supabase tables** *[20 min]*

*🔗 https://supabase.com/dashboard/project/[your-project]/auth/policies*

② AI will provide exact Row Level Security policy commands for all 4 tables.

③ Run each command in SQL Editor. These allow the app to write and read data without user authentication.

✓ Policies created for all 4 tables.

**S2-1.4 HUMAN Configure GitHub Pages and GitHub Actions deployment permissions** *[15 min]* **★ NEW**

① NEW\_PLACEHOLDER

**★ URL: https://github.com/[your-username]/guestiq/settings/pages**

**★ Under Source, select GitHub Actions from the dropdown menu. Click Save.**

**★ URL: https://github.com/[your-username]/guestiq/settings/actions**

**★ Scroll to Workflow permissions. Select Read and write permissions. Click Save.**

**★ URL: https://github.com/[your-username]/guestiq/settings/environments**

**★ Click New environment. Name it: github-pages. Click Configure environment.**

**★ Under Deployment branches, select main branch only. Click Save protection rules.**

✓ GitHub Pages source is set to GitHub Actions. Workflow permissions is set to Read and write.

**⚠ Skipping this step causes the first deployment to fail with a permissions error that is difficult to diagnose without knowing this step exists.**

**PHASE 2.2 — Core Application Build (AI steps)**

**S2-2.1a AI Initialize Sentry SDK — first build task** *[AI: 1h]* **★ NEW**

① NEW\_PLACEHOLDER

**★ AI builds Sentry initialization as the very first import in the application entry point (main.jsx).**

**★ Configuration: DSN from sentry-credentials.txt, IP anonymization enabled, environment variable for prototype/production switching, performance monitoring enabled with tracesSampleRate: 1.0 for prototype (captures 100% of transactions).**

**★ Sentry ErrorBoundary component wraps the entire application — catches all unhandled React errors.**

ℹ Initializing Sentry as the first build task means errors are captured from the very first time anyone opens the application URL — including errors in the welcome screen and tier selection.

✓ AI confirms Sentry initialized and ErrorBoundary in place.

**S2-2.1b AI Initialize PostHog SDK — second build task** *[AI: 1h]* **★ NEW**

① NEW\_PLACEHOLDER

**★ AI builds PostHog initialization in main.jsx immediately after Sentry.**

**★ Configuration: API key from posthog-credentials.txt, host: https://app.posthog.com, IP anonymization enabled (ip: false in capture calls), session recording enabled.**

**★ PostHog provider wraps the application. usePostHog hook available in all components.**

**★ src/services/analytics.js service file created with all 27 named event functions. Components call analytics.trackEpisodeCompleted() etc. — never PostHog directly.**

✓ AI confirms PostHog initialized and analytics service file created with all 27 event stubs.

**S2-2.2 AI Build React PWA project structure with all tooling** *[AI: 3h]*

① AI builds: Complete React 18 + Vite project. Radix UI installed. Tailwind CSS configured with GuestIQ design tokens as CSS custom properties. Framer Motion installed. i18next configured (en.json locale file). Vite PWA plugin configured. ESLint + Prettier configuration files from Sprint 1 added.

② questionnaire.js created with complete hardcoded questionnaire data following the approved data structure specification from S1-2.3.

③ src/services/ folder created with supabase.js and analytics.js service files.

④ GitHub Actions deployment pipeline configured using the approved permissions from S2-1.4.

✓ AI confirms project structure complete and all tools installed.

**S2-2.3 HUMAN Push initial code to GitHub and verify deployment** *[30 min]*

① AI provides exact commands. Open Command Prompt on your PC (Windows key → cmd → Enter).

② Navigate to the project folder.

③ Run the commands AI provides to push code to your GitHub repository.

*🔗 https://github.com/[your-username]/guestiq/actions*

⑤ Watch the Actions tab. Wait for a green checkmark on the workflow.

*🔗 https://guestiq.github.io?property=PROP001*

⑦ Open this URL in Edge and Chrome. Verify the app loads.

✓ App loads in both browsers within 3 seconds. No error messages.

ℹ First deployment takes 2–5 minutes after the GitHub Action completes. If the page shows a 404, wait 2 minutes and refresh.

**S2-2.4 AI Build welcome screen, tier selection, and credentials** *[AI: 2h]*

① AI builds: Single unified welcome screen — Option B confirmed in SRS-F v2.0. Hook text and tier cards displayed simultaneously on one screen — no wait, no Continue button, no three-beat sequence, no expert credentials at entry. Tier selection cards (Amateur/Professional/Expert) with GuestIQ design system applied. 'Not now' text link visible for voluntary non-participation — clicking creates no session record and writes no localStorage token. Privacy notice includes: 'Participation is voluntary. You may close this page at any time without consequence.' Optional post-completion enrichment screen (NOT at entry). PostHog events fire: app\_loaded, welcome\_hook\_viewed, tier\_selected. ★ UPDATED v5.0: Option B UX — three-beat sequence and expert credentials warm-up removed.

✓ AI confirms feature complete.

**S2-2.5 AI Build routing gate and tense management** *[AI: 1.5h]*

① AI builds: Routing gate question QR1. Tense frame stored in session state and applied to all question text from questionnaire.js. PostHog event: routing\_gate\_answered.

✓ AI confirms feature complete.

**S2-2.6 AI Build Module 1 — all questions with tier routing from questionnaire.js** *[AI: 3h]*

① AI builds: All 9 Module 1 questions read from questionnaire.js using the approved data structure. Correct tier routing applied. intent\_category stored to Supabase sessions table. PostHog events: episode\_started (Episode 1), question\_answered for each question, none\_flag\_selected where applicable.

✓ AI confirms feature complete.

**S2-2.7 AI Build Modules 2, 3, and 4** *[AI: 3h]*

① AI builds: All questions for Modules 2, 3, and 4 read from questionnaire.js with correct tier routing. All responses stored to Supabase in real time via supabase.js service. PostHog events fire for episode\_started and question\_answered throughout.

✓ AI confirms feature complete.

**S2-2.8 AI Build session resume, disambiguation screen, and Supabase connectivity** *[AI: 2.5h]*

① AI builds: Session token in browser local storage. Disambiguation screen for shared PC handoffs. Supabase offline queue with automatic retry. Downtime detection with 30-second retry interval. RLS rejection detection (new in v5.0): service layer catch block in src/services/supabase.js detects RLS rejection errors (HTTP 403/400) separately from network failures — RLS rejections call Sentry.captureException() with context {type: 'RLS\_REJECTION', function\_name, session\_id} and are NOT added to the offline queue for retry (configuration error, not a transient outage). PostHog events: session\_paused, disambiguation\_shown, disambiguation\_resumed, disambiguation\_new\_session, offline\_queue\_activated, offline\_queue\_flushed. ★ UPDATED v5.0: RLS rejection detection added per Backlog v3.1 S2-12 AC.

✓ AI confirms feature complete.

**PHASE 2.3 — Sprint 2 Testing**

**S2-3.1 HUMAN Pull updated code and verify deployment** *[15 min]*

① AI provides commands to pull latest code. Wait for green checkmark in GitHub Actions.

*🔗 https://guestiq.github.io?property=PROP001*

③ Open in Edge and Chrome.

✓ App loads in under 3 seconds in both browsers.

**S2-3.2 HUMAN Execute Sprint 2 test cases including data integrity verification** *[2.5h]*

① AI provides complete test case document.

② Test 1: Complete full Amateur flow — welcome → credentials → routing gate → Q1, Q3, Q5, Q7 → end screen.

③ Test 2: Complete Professional flow — all Module 1–4 questions for Professional tier.

④ Test 3: Session resume — start session, close browser partway, reopen, verify resume prompt.

⑤ Test 4: Disambiguation — start session on browser tab 1, open new tab with same URL, select 'I am someone new', verify clean new session starts.

⑥ Test 5 — DATA INTEGRITY (new in v2.0): Complete 5 full sessions with different Q1 answers each time. For each session open Supabase Table Editor and verify: session record exists with correct tier, intent\_category, and tense\_frame. Every question answered has a corresponding response record with the correct answer\_code. Any none\_flag selections appear in the none\_flags table.

⑦ Test 6: PostHog verification — URL: https://app.posthog.com/events. Verify events from your test sessions are appearing in the PostHog dashboard.

⑧ Test 7: Sentry verification — URL: https://sentry.io. Verify your project shows session data and no critical errors.

⑨ Log all failures in Bug Log spreadsheet tab.

✓ All 7 tests pass. Any bugs logged.

**S2-3.3 AI Fix Sprint 2 bugs** *[AI: variable]*

① All High and Medium severity bugs fixed before Sprint 2 closes.

✓ All High and Medium bugs resolved. New deployment pushed.

**S2-3.4 HUMAN Verify bug fixes** *[30 min]*

① Repeat test cases for any bug reported as fixed.

✓ All previously failing tests now pass.

**S2-3.5 HUMAN Offline queue connectivity test** *[45 min]* **★ NEW**

① NEW\_PLACEHOLDER

**★ Open the app in Chrome. Open Chrome DevTools (F12). Click the Network tab.**

**★ Start a test session. Answer questions Q1 through Q5.**

**★ In Chrome DevTools Network tab, change the throttle dropdown from No throttling to Offline.**

**★ Answer questions Q6 and Q7. You should see a visual indicator that the app is in offline/retry mode — the indicator should say something like 'Your answers are saved — reconnecting'.**

**★ Change the Network tab back to No throttling.**

**★ Wait 30–60 seconds for the app to detect connectivity and flush the offline queue.**

**★ Open Supabase Table Editor. Verify Q6 and Q7 response records now appear — the queued responses were successfully sent on reconnection.**

**⚠ If Q6 and Q7 responses do not appear in Supabase after reconnection, this is a High severity bug. Log it immediately.**

✓ Offline queue flushes correctly. All responses appear in Supabase after reconnection.

**PHASE 2.4 — Sprint 2 Close**

**S2-4.1 BOTH Sprint 2 Review** *[You: 20min]*

① Walk through Amateur flow end to end. Verify Supabase receiving data. Verify PostHog showing events. Verify Sentry showing session data.

✓ Working URL confirmed. All 3 data streams active.

**S2-4.2 BOTH Sprint 2 Retrospective + Sprint 3 Planning** *[You: 30min]*

① Retrospective + Risk Register update. Sprint 3 planning: confirm Module 5 branching stories and gamification stories.

ℹ Sprint 3 is the most complex build sprint. Ensure Branching Logic Specification and 84-path test matrix are open and accessible throughout.

✓ Sprint 3 backlog confirmed.

**S2-GATE GATE Sprint 2 Gate**

✓ App loads at guestiq.github.io?property=PROP001 in both Edge and Chrome.

✓ All 3 tiers route correctly through all Module 1–4 questions.

✓ Session resume works on same PC same browser.

✓ Disambiguation screen works for all 3 scenarios.

✓ All responses appearing in Supabase (5-session data integrity verified).

✓ PostHog events appearing in PostHog dashboard.

✓ Sentry showing session data with no critical errors.

✓ Offline queue flushes correctly after reconnection. ★

✓ All Sprint 2 High and Medium bugs resolved.

**SPRINT 3 — COMPLETE QUESTIONNAIRE + GAMIFICATION**

**Weeks 7–8 · Your time: 8–10 hours · 1 new step added**

*SPRINT GOAL: All 79 questions. All 12 Module 5 branches tested against 84-path matrix. Full gamification. Phase 1b JSON content extraction.*

↑ UPDATED v2.0: Sprint 3 has 1 new step in v2.0: S3-5.0 Phase 1b content extraction (Strangler Fig migration from questionnaire.js to JSON config files). Sprint 3 closing walkthrough test updated to include JSON config validation.

**PHASE 3.1 — Module 5 All Branches**

**SM-CHECK-S3 BOTH Scrum Master Sprint Start — 5-minute methodology checklist** *[15 min]* **★ NEW**

① AI Developer acts as Scrum Master and runs a structured 5-minute checklist at the start of this sprint session before any delivery work begins.

② Checklist: (1) Are all previous sprint gate conditions confirmed? (2) Is the Epic/Feature/Story hierarchy correct for this sprint — are stories correctly parented to Features? (3) Is the Definition of Ready satisfied for all stories entering this sprint? (4) Are there any methodology conflicts or impediments? (5) Is the Use Case model current — do Use Cases still accurately describe the system being built?

③ Any impediment found must be resolved before sprint work begins. Impediments are logged in the Risk Register if systemic.

④ First occurrence: Sprint 1. Recurring: every sprint (S2 through S6).

✓ Checklist run. Any impediments documented. Sprint work may begin.

**S3-1.1 AI Build Module 5 — all 7 sub-sections from questionnaire.js** *[AI: 4h]*

① AI builds: All 7 Module 5 sub-sections reading from questionnaire.js. Branching logic implements the approved Branching Logic Specification exactly. PostHog events: episode\_started for Episode 5, question\_answered throughout, purpose\_expert event if secondary purpose triggers second sub-section.

**⚠ This is the most complex build task. AI implements strictly against the Branching Logic Specification. Any deviation from the spec must be flagged before implementation continues.**

✓ AI confirms all 7 sub-sections built.

**S3-1.2 AI Build Modules 6 and 7** *[AI: 2h]*

① AI builds: All Module 6 (value and pricing) and Module 7 (post-stay) questions from questionnaire.js with correct tier routing. All PostHog events for Episodes 6 and 7.

✓ AI confirms feature complete.

**S3-1.3 HUMAN Test Module 5 branching against 84-path test matrix** *[2h]*

① AI provides the 84-path test matrix as a structured test script.

② Work through the matrix systematically. For each path: select the Q1 answer, complete Module 5, verify the correct sub-section appeared.

ℹ You do not need to complete all 79 questions for each path — you only need to verify the correct Module 5 sub-section appears after Q1.

④ This test will take approximately 2 hours. Do not rush it. A routing error found here costs 30 minutes to fix. The same error found during the pilot costs days of damage control.

⑤ Log any wrong routing as High severity bug in the Bug Log.

✓ All 84 paths verified correct. All bugs logged.

**S3-1.4 AI Fix Module 5 routing bugs** *[AI: variable]*

① All High severity routing bugs fixed before gamification build begins.

② Re-test the specific failing paths after fix.

✓ All routing fixes deployed and re-verified.

**PHASE 3.2 — Gamification Layer**

**S3-2.1 AI Build progress bar, episode map, and episode names** *[AI: 2h]*

① AI builds: Animated progress bar. Episode map with 7 named episodes. PostHog events: episode\_started at each new episode.

② Episode names: 1=Why Do Guests Actually Come Here? 2=The Room They Are Imagining 3=Finding and Arriving 4=The Human Side 5=What This Guest Actually Needs 6=Value and What They Pay 7=After the Stay.

✓ AI confirms feature complete.

**S3-2.2 AI Build SVG achievement badge system** *[AI: 2h]*

① AI builds: All 9 SVG badges designed to GuestIQ Visual Design System specifications from S1-3.3. Badges: First Step, Intent Locked, Guest Arrival Expert, Environment Critic, Service Specialist, Purpose Expert, Value Analyst, Full Picture, Expert Complete. Badge reveal animation at 300ms. PostHog event: badge\_awarded with badge\_name property (not in original 27 — add as supplementary event).

✓ AI confirms feature complete.

**S3-2.3 AI Build curiosity hooks, tier upgrade prompts, streak, and completion** *[AI: 2h]*

① AI builds: End-of-episode curiosity hooks. Tier upgrade prompts at Episodes 1 and 4. Streak mechanic. Completion celebration screen. PostHog events: curiosity\_hook\_viewed, tier\_upgrade\_prompted, tier\_upgrade\_accepted, tier\_upgrade\_declined.

✓ AI confirms feature complete.

**S3-3.1 AI Build real-time results and aggregate comparison** *[AI: 2h]*

① AI builds: Personal results screen. Anonymized aggregate comparison chart. PostHog events: results\_viewed, aggregate\_comparison\_viewed.

✓ AI confirms feature complete.

**S3-4.1 AI Apply full visual design to all screens** *[AI: 3h]*

① AI applies: Complete GuestIQ visual design from approved Visual Design System. Two-canvas system applied (respondent #0D0D12 vs dashboard #0B1120). Accessibility audit performed.

✓ AI confirms visual design complete and WCAG 2.1 AA compliant.

**S3-4.2 HUMAN Visual review walkthrough** *[1h]*

① Open the app. Walk through the complete Expert flow from welcome to completion.

② Note any visual issues. Test on actual front desk PC if possible.

✓ Complete visual walkthrough done. Issues logged.

**PHASE 3.5 — Phase 1b Content Extraction ★ NEW**

★ NEW v2.0: This is the Strangler Fig migration moment — questionnaire content moves from questionnaire.js to 6 JSON config files. The application behavior is identical before and after. This is a quality review opportunity disguised as a technical task.

**S3-5.0 AI Execute Phase 1b JSON content extraction — Strangler Fig migration** *[AI: 3h]* **★ NEW**

① NEW\_PLACEHOLDER

**★ AI extracts all content from questionnaire.js into 6 JSON configuration files: questions.json (all 79 questions with all properties), episodes.json (episode names, descriptions, curiosity hooks, module assignments), tiers.json (tier names, descriptors, time estimates, question counts, CTA labels), ui-copy.json (welcome hook, context statement, badge names, button labels, error messages), branching.json (complete routing rules), taxonomy.json (taxonomy code definitions).**

**★ React application updated to read from JSON files instead of questionnaire.js. questionnaire.js retired as content source but retained in codebase as reference.**

**★ Configuration validator implemented — on application load, all 6 JSON files are parsed and validated. If any file is malformed, a clear developer error is thrown before any respondent-facing code executes.**

**★ questionnaire.js data structure specification from S1-2.3 served as the template — JSON file structure matches exactly, making the migration mechanical.**

ℹ During the extraction, read every question and answer option carefully to structure them correctly in JSON. This careful read functions as a structured instrument quality review — you will likely catch small phrasing inconsistencies not visible when content was scattered.

✓ AI confirms all 6 JSON files created and application reads from them correctly.

**S3-5.0b HUMAN Verify Phase 1b migration — confirm identical behavior** *[1h]*

① Complete the Expert flow from welcome to completion screen using the JSON-backed application.

② Verify: all questions appear with correct text, all answer options present, all tier routing correct, all branching logic working, all PostHog events firing.

**⚠ If any question text or answer option differs from the questionnaire.js version, this is a content error introduced during extraction. Log as High severity.**

④ Open one of the JSON files (start with questions.json) in a text editor. Read the first 5 questions. Verify they match the Refined Questionnaire document exactly.

✓ Behavior identical to questionnaire.js version. Content verified against Refined Questionnaire document.

**PHASE 3.6 — Sprint 3 Close**

**S3-6.1 HUMAN Full Expert tier walkthrough — all 79 questions** *[1.5h]*

① Complete entire Expert tier from welcome to completion screen. Verify all 9 badges award correctly. Verify curiosity hooks appear. Verify completion screen shows correct results. Verify JSON config files are the content source (questionnaire.js is retired).

✓ Complete Expert tier completion successful. JSON migration confirmed.

**S3-6.2 BOTH Sprint 3 Review + Retrospective + Sprint 4 Planning** *[You: 30min]*

① Review: complete experience demonstration. Retrospective + Risk Register update. Sprint 4 planning: confirm dashboard and QA stories.

✓ Sprint 4 backlog confirmed.

**S3-GATE GATE Sprint 3 Gate**

✓ All 79 questions functional across all 3 tiers.

✓ All 12 Module 5 routes verified against 84-path test matrix.

✓ Tier upgrade prompts work correctly.

✓ All 9 SVG badges award at correct triggers.

✓ Curiosity hooks appear at end of each episode.

✓ Completion screen shows personal results and aggregate comparison.

✓ Full visual design applied to all screens.

✓ Phase 1b JSON extraction complete — application reads from JSON config files. ★

✓ Configuration validator working — malformed JSON produces clear error. ★

✓ All Sprint 3 High and Medium bugs resolved.

**SPRINT 4 — MANAGEMENT DASHBOARD + POLISH + QA**

**Weeks 9–10 · Your time: 8–10 hours · 2 new steps added**

*SPRINT GOAL: SHIFT+CTRL+A overlay complete. Playwright visual regression. Downtime contingency screen. Full QA. UAT Script ready.*

↑ UPDATED v2.0: Sprint 4 has 2 new steps in v2.0: S4-2.7 Supabase downtime contingency screen and S4-2.8 Playwright visual regression setup.

**PHASE 4.1 — Management Dashboard**

**SM-CHECK-S4 BOTH Scrum Master Sprint Start — 5-minute methodology checklist** *[15 min]* **★ NEW**

① AI Developer acts as Scrum Master and runs a structured 5-minute checklist at the start of this sprint session before any delivery work begins.

② Checklist: (1) Are all previous sprint gate conditions confirmed? (2) Is the Epic/Feature/Story hierarchy correct for this sprint — are stories correctly parented to Features? (3) Is the Definition of Ready satisfied for all stories entering this sprint? (4) Are there any methodology conflicts or impediments? (5) Is the Use Case model current — do Use Cases still accurately describe the system being built?

③ Any impediment found must be resolved before sprint work begins. Impediments are logged in the Risk Register if systemic.

④ First occurrence: Sprint 1. Recurring: every sprint (S2 through S6).

✓ Checklist run. Any impediments documented. Sprint work may begin.

**S4-1.1 AI Build SHIFT+CTRL+A trigger and overlay** *[AI: 1h]*

① AI builds: Three-key shortcut listener active on all screens. Overlay slides in from right. Dismiss via Escape or click outside. Tabbed navigation for 9 panels. PostHog events: dashboard\_opened, dashboard\_panel\_viewed for each panel.

✓ AI confirms trigger and overlay architecture complete.

**S4-1.2 AI Build Response Overview, Intent Distribution, and Planning Horizon panels** *[AI: 2h]*

① AI builds: Panel 1 — Response Overview with three-state session distinction (new in v5.0): (a) complete (is\_complete = true), (b) active incomplete (is\_complete = false, resume event within 72h), (c) abandoned (is\_complete = false, no resume event within 72h of last response). Abandoned sessions excluded from participation rate numerator — displayed separately. Minimum-data warning: when complete session count < 5, all panels display 'Warning: fewer than 5 sessions — patterns shown are preliminary and should not be treated as reliable.' Warning included in PDF export header. Panel 2 — donut chart of 12 intent categories with tier filter. Panel 3 — bar chart of planning horizon distribution. ★ UPDATED v5.0: Panel 1 enhanced per Backlog v3.1 S4-01 ACs from UC Specs v2.0 UC-02 Extension 3 and UC-03 Extension 3.

② All charts read from Supabase via analytics service functions. Real-time updates.

✓ AI confirms 3 panels complete.

**S4-1.3 AI Build Expectation Priorities, Competitive Threat Map, and Service Spectrum panels** *[AI: 2h]*

① AI builds: Panel 4 — top 3 expectations per intent category with segment filter. Panel 5 — Q8 alternatives by segment. Panel 6 — Q31 service interaction distribution.

✓ AI confirms 3 panels complete.

**S4-1.4 AI Build Value Reference, None Flags, and Raw Data panels** *[AI: 2h]*

① AI builds: Panel 7 — Q57 value reference framework. Panel 8 — questions with highest 'None of these' rates. Panel 9 — raw data table.

② PostHog events: dashboard\_exported\_csv, dashboard\_exported\_pdf.

✓ AI confirms all 9 panels complete.

**S4-1.5 AI Build CSV export and PDF summary report** *[AI: 2h]*

① AI builds: CSV download from all sessions and responses. PDF one-page summary report generated client-side with Recharts. Export failure handling (new in v5.0): if generation fails (zero-byte file, JavaScript error, or download does not trigger), export button shows error state with Retry button — Sentry.captureException() called with context (session count, browser, error type). If retry fails: fallback instruction shown directing user to Supabase Table Editor directly. Lead Researcher receives Sentry alert. ★ UPDATED v5.0: Export failure handling added per Backlog v3.1 S4-02 AC from UC Specs v2.0 UC-03 Extension 2.

✓ Both exports functional.

**S4-1.6 HUMAN Test management dashboard — SHIFT+CTRL+A** *[1.5h]*

① Open app. Press SHIFT+CTRL+A. Verify overlay opens. Navigate all 9 panels. Verify data appears.

ℹ Complete at least 10 test sessions with varied Q1 answers before testing dashboard.

③ Test CSV: click Export CSV, verify file downloads, open in Excel, verify all columns and data present.

④ Test PDF: click Export PDF, verify report downloads and opens correctly. ⑤ Test export failure handling (new v5.0): AI provides one-line code change to break export. Click Export CSV — verify error state with Retry button and fallback Supabase Table Editor instruction appears. Restore function, verify retry succeeds. Check Sentry for captured error. ★ NEW v5.0 ⑥ Test abandoned session display (new v5.0): Create test session — answer one question, close browser. Set updated\_at back 73h via Supabase SQL. Open dashboard — verify Panel 1 shows session in abandoned bucket (not active incomplete) and excludes it from participation rate. ★ NEW v5.0

⑤ Press Escape: verify overlay closes without disrupting underlying screen.

✓ All 9 panels showing data. Both exports working. PostHog dashboard\_opened event visible in PostHog.

**PHASE 4.2 — Quality Assurance**

**S4-2.1 HUMAN Cross-browser testing — Edge** *[45 min]*

① Complete full Amateur flow in Edge. Press SHIFT+CTRL+A. Note any visual or functional differences.

✓ App fully functional in Edge. Issues logged.

**S4-2.2 HUMAN Cross-browser testing — Chrome** *[45 min]*

① Complete full Professional flow in Chrome. Verify session resume in Chrome. Press SHIFT+CTRL+A.

✓ App fully functional in Chrome. Issues logged.

**S4-2.3 HUMAN Test on actual front desk PC** *[1h]*

① Take your laptop or USB drive to the hotel front desk. Open guestiq.github.io?property=PROP001 on one of the 3 front desk PCs in Edge.

② Complete the Amateur flow. Note: page load speed, text readability, button usability, layout correctness.

③ Test disambiguation: start session on PC-1, go to PC-2 and open same URL, verify fresh session starts with no disambiguation prompt (different device = different local storage).

✓ App functional on front desk PC. Display issues logged.

**S4-2.4 AI Accessibility audit and performance optimization** *[AI: 2h]*

① AI performs: WCAG 2.1 AA compliance check. Fixes any failures. Page load performance optimization targeting under 2 seconds on hotel broadband.

✓ No AA-level failures. Load time under 2 seconds.

**S4-2.5 AI Data integrity verification — second pass after Sprint 3 content** *[1h]*

① AI and Human: Complete 5 new sessions covering different intent categories. Trace each session from UI selection through Supabase record. Verify all module 5 branching produced correct records.

✓ 5 sessions traced end-to-end. All answer codes match UI selections.

**S4-2.6 AI Verify Sentry and PostHog instrumentation completeness** *[AI: 1h]*

① AI audits: All 27 PostHog events verified firing in PostHog dashboard. Sentry performance traces showing page load metrics. Sentry error capture verified by deliberately triggering a test error and confirming it appears in Sentry.

✓ All 27 PostHog events confirmed. Sentry performance metrics visible. Error capture working.

**S4-2.7 AI Build Supabase downtime contingency screen** *[AI: 1h]* **★ NEW**

① NEW\_PLACEHOLDER

**★ AI builds: Supabase connectivity check on application load and every 30 seconds during an active session.**

**★ If Supabase is unreachable for more than 60 seconds after the offline queue activates: a full-screen friendly message replaces the loading state: 'GuestIQ is temporarily unavailable. Your answers are saved. Please try again in 30 minutes.' with a Retry button.**

**★ Retry button manually triggers a connectivity check. If Supabase is back, the application resumes from the last saved state.**

**★ PostHog event fires if downtime screen is shown (supplementary event beyond the 27 — supabase\_downtime\_shown).**

✓ AI confirms downtime screen builds and displays correctly when Supabase is simulated as unreachable.

**S4-2.8 AI Configure Playwright visual regression testing** *[AI: 4h]* **★ NEW**

① NEW\_PLACEHOLDER

**★ AI installs Playwright and configures it to take screenshots of 8 key screens: welcome hook, tier selection, active question (multiple choice), active question (scale), episode complete, completion/results, management overlay.**

**★ Baseline screenshots captured at the end of Sprint 4 after full visual design is confirmed correct.**

**★ Any subsequent deployment that changes the visual appearance of these screens is detected by comparing new screenshots against the baseline.**

**★ AI produces Playwright configuration file and screenshot baseline set.**

ℹ Visual regression is run automatically as part of the GitHub Actions deployment pipeline from this point forward. Any visual regression is flagged in the Actions log.

✓ Playwright installed. Baseline screenshots captured. GitHub Actions pipeline updated to run visual regression on every deployment.

**S4-2.9 AI Fix all Sprint 4 QA bugs** *[AI: variable]*

① All High and Medium bugs from cross-browser testing, front desk PC test, accessibility audit, data integrity, and instrumentation audit fixed.

✓ All fixes deployed and verified against Playwright baseline.

**PHASE 4.3 — UAT and Deployment Documentation**

**S4-3.1 AI Produce User Acceptance Testing Script** *[AI: 1h]*

① AI produces: Step-by-step UAT script for 2–3 front desk team members. Plain English — no technical language. Covers: opening app, selecting tier, completing questionnaire, viewing results. 3 feedback questions: experience rating 1–5, question clarity rating 1–5, open comment.

✓ UAT Script received.

**S4-3.2 BOTH Review UAT Script** *[You: 20min]*

① Verify language is appropriate for your front desk team. Verify feedback questions will capture the information you need.

✓ Approved version in Approved folder.

**S4-3.3 AI Produce Deployment Checklist, Go-Live Runbook, and Bug Reporting Guide** *[AI: 1.5h]*

① AI produces: Deployment Checklist — every step to push final version to GitHub Pages. Go-Live Runbook — pilot launch day order of operations including Teams message template. Bug Reporting Guide — one-page plain English guide for front desk team: 'If something looks wrong, take a screenshot and send it to [name] via Teams. We will fix it within 24 hours.'

✓ All 3 documents received and placed in Approved folder.

**PHASE 4.4 — Sprint 4 Close**

**S4-4.1 BOTH Sprint 4 Review + Retrospective + Sprint 5 Planning** *[You: 30min]*

① Review: walk through complete prototype. Retrospective + Risk Register update. Sprint 5 planning: confirm UAT approach.

✓ Sprint 5 backlog confirmed. Prototype ready for UAT.

**S4-GATE GATE Sprint 4 Gate — Prototype Complete**

✓ SHIFT+CTRL+A overlay opens on all screens.

✓ All 9 dashboard panels display correct data.

✓ CSV export produces valid Excel-compatible file.

✓ PDF summary report generates correctly.

✓ App fully functional in Edge and Chrome.

✓ App functional on actual front desk PC.

✓ No WCAG 2.1 AA accessibility failures.

✓ Page loads in under 2 seconds (confirmed by Sentry performance traces).

✓ All 27 PostHog events confirmed firing. ★

✓ Sentry error capture and performance monitoring confirmed. ★

✓ Playwright visual regression baseline captured. ★

✓ Supabase downtime contingency screen functional. ★

✓ UAT Script approved.

✓ Deployment Checklist, Go-Live Runbook, and Bug Reporting Guide approved. ★

✓ All Sprint 4 High and Medium bugs resolved.

**SPRINT 5 — UAT + PILOT LAUNCH**

**Weeks 11–12 · Your time: 8–10 hours · 1 new step added**

*SPRINT GOAL: UAT complete. Critical fixes applied. Pilot launched to full front desk team via MS Teams. Bug reporting process active.*

↑ UPDATED v2.0: Sprint 5 has 1 new step in v2.0: S5-2.6 Distribute bug reporting guide to pilot team.

**PHASE 5.1 — User Acceptance Testing**

**SM-CHECK-S5 BOTH Scrum Master Sprint Start — 5-minute methodology checklist** *[15 min]* **★ NEW**

① AI Developer acts as Scrum Master and runs a structured 5-minute checklist at the start of this sprint session before any delivery work begins.

② Checklist: (1) Are all previous sprint gate conditions confirmed? (2) Is the Epic/Feature/Story hierarchy correct for this sprint — are stories correctly parented to Features? (3) Is the Definition of Ready satisfied for all stories entering this sprint? (4) Are there any methodology conflicts or impediments? (5) Is the Use Case model current — do Use Cases still accurately describe the system being built?

③ Any impediment found must be resolved before sprint work begins. Impediments are logged in the Risk Register if systemic.

④ First occurrence: Sprint 1. Recurring: every sprint (S2 through S6).

✓ Checklist run. Any impediments documented. Sprint work may begin.

**S5-1.1 HUMAN Select and brief UAT participants** *[30 min]*

① Choose 2–3 front desk team members. Include one senior and one junior team member. Brief them: 'I need your help testing a research tool before sharing it with the whole team. Takes 20–30 minutes and your feedback directly shapes the final version.'

② Schedule individual 30-minute sessions.

✓ 2–3 UAT participants confirmed and sessions scheduled.

**S5-1.2 HUMAN Facilitate UAT sessions** *[2h]*

① Sit with each participant at a front desk PC. Give them the UAT Script. Do not explain what to do — let them read and follow it.

② Watch for: confusion, hesitation, unexpected selections, spontaneous comments.

③ After completion ask the 3 feedback questions verbally.

ℹ Do not defend the design if they criticize it. Note everything.

✓ All sessions facilitated. Notes taken for each.

**S5-1.3 BOTH Compile UAT findings and prioritize fixes** *[You: 1h]*

① Write UAT Findings document: what happened, which question, how many participants affected, recommended fix.

② Categorize: Critical / Important / Minor.

✓ UAT Findings document complete. Fix proposals reviewed.

**S5-1.4 AI Implement UAT fixes** *[AI: variable]*

① All Critical fixes implemented before pilot launch. Important fixes if time allows. Minor fixes logged for Phase 2.

② Playwright visual regression run after fixes — verify no baseline regressions.

✓ All Critical issues resolved. Playwright passing.

**S5-1.5 HUMAN Verify UAT fixes** *[30 min]*

① Repeat the specific test steps that failed for each fixed issue.

✓ All Critical issues confirmed resolved on live URL.

**PHASE 5.2 — Pilot Launch**

**S5-2.1 HUMAN Final pre-launch verification** *[30 min]*

① Open guestiq.github.io?property=PROP001 on each of the 3 front desk PCs. Verify app loads correctly on all 3. Press SHIFT+CTRL+A on each — verify dashboard opens. Open Supabase dashboard — verify tables accessible.

✓ App confirmed live and functional on all 3 front desk PCs.

**S5-2.2 HUMAN Send pilot launch message via MS Teams** *[20 min]*

① AI provides exact message text. Open MS Teams. Navigate to front desk team channel. Paste and send the message including the guestiq.github.io link.

② Message includes: what it is, why you need help, suggested tier (Professional), time estimate, deadline for completing at least Professional tier.

✓ Message sent and link confirmed working.

ℹ Send at the start of a shift when the team is likely to see it.

**S5-2.3 HUMAN Daily monitoring — 15 minutes per day** *[15 min/day]*

① Every working day — two SQL checks and one PostHog check: SQL 1 (session status): SELECT tier, is\_complete, COUNT(\*) FROM sessions WHERE property\_id = 'PROP001' GROUP BY tier, is\_complete ORDER BY tier, is\_complete SQL 2 (abandoned sessions — new v5.0): SELECT COUNT(\*) as abandoned FROM sessions WHERE property\_id = 'PROP001' AND is\_complete = false AND updated\_at < NOW() - INTERVAL '72 hours' PostHog check (new v5.0): open https://app.posthog.com → verify app\_loaded → tier\_selected → session\_completed funnel. Note any episode with >40% drop-off. ★ UPDATED v5.0 per UC Specs v2.0 UC-02 Extension 3

② This shows sessions started and completed per tier.

③ Check PostHog: URL: https://app.posthog.com — verify new events are flowing from real respondents.

④ If after 3 days fewer than 3 members have started: send a follow-up Teams message.

✓ Daily monitoring log entry made each day.

**S5-2.4 HUMAN Mid-pilot check-in — Day 5** *[20 min]*

① Spend 10 minutes informally checking in with the front desk team. Ask: Has anyone tried it? What did you think? Anything confusing?

② Note all feedback.

✓ Check-in complete. Feedback noted.

**S5-2.5 AI Mid-pilot patch if needed** *[AI: as needed]*

① Any issues affecting completion fixed within 24 hours of being reported.

② Playwright visual regression run after any patch — verify no regressions.

✓ Any critical mid-pilot issues resolved within 24 hours.

**S5-2.6 HUMAN Distribute bug reporting guide to pilot team** *[15 min]* **★ NEW**

① NEW\_PLACEHOLDER

**★ Print or share digitally the Bug Reporting Guide produced in S4-3.3.**

**★ The guide is one page in plain English: 'If something looks wrong or stops working during GuestIQ: (1) Take a screenshot — press Windows key + Print Screen. (2) Send the screenshot to [your name] via MS Teams with a brief description of what happened. (3) We will fix it within 24 hours and let you know.'**

**★ Share via MS Teams message to the front desk team channel immediately after the launch message.**

**★ Pin the bug reporting guide message to the Teams channel so it is easily findable during the 2-week pilot.**

✓ Bug reporting guide shared via MS Teams. Message pinned to channel.

**S5-GATE GATE Sprint 5 Gate**

✓ All UAT Critical issues resolved.

✓ Pilot launch message sent.

✓ App confirmed working on all 3 front desk PCs.

✓ At least 3 team members have started the questionnaire by end of Sprint 5.

✓ Daily monitoring log maintained.

✓ Bug reporting guide distributed and pinned in Teams channel. ★

✓ No unresolved Critical bugs reported by team members.

**SPRINT 6 — PILOT MONITORING + DEBRIEF**

**Weeks 13–14 · Your time: 6–8 hours · 1 new step added**

*SPRINT GOAL: Pilot runs to completion. Weekly CSV backup. Full data export. Debrief report. Phase 2 recommendations. Project close.*

↑ UPDATED v2.0: Sprint 6 has 1 new step in v2.0: S6-1.4 weekly CSV export to OneDrive data backup protocol.

**PHASE 6.1 — Pilot Completion**

**SM-CHECK-S6 BOTH Scrum Master Sprint Start — 5-minute methodology checklist** *[15 min]* **★ NEW**

① AI Developer acts as Scrum Master and runs a structured 5-minute checklist at the start of this sprint session before any delivery work begins.

② Checklist: (1) Are all previous sprint gate conditions confirmed? (2) Is the Epic/Feature/Story hierarchy correct for this sprint — are stories correctly parented to Features? (3) Is the Definition of Ready satisfied for all stories entering this sprint? (4) Are there any methodology conflicts or impediments? (5) Is the Use Case model current — do Use Cases still accurately describe the system being built?

③ Any impediment found must be resolved before sprint work begins. Impediments are logged in the Risk Register if systemic.

④ First occurrence: Sprint 1. Recurring: every sprint (S2 through S6).

✓ Checklist run. Any impediments documented. Sprint work may begin.

**S6-1.1 HUMAN Continue daily monitoring** *[15 min/day]*

① Continue 15-minute daily monitoring. Check Supabase session counts. Check PostHog for new events. If participation below target by Day 10: send second Teams message.

✓ Daily monitoring log maintained.

**S6-1.2 HUMAN PostHog funnel analysis — mid-pilot review** *[30 min]*

*🔗 https://app.posthog.com/insights*

② Create a funnel: app\_loaded → tier\_selected → episode\_started (E1) → episode\_completed (E4) → session\_completed.

③ This shows the drop-off rate at each stage. If more than 40% drop off between Episode 1 and Episode 4 for any tier, this is an engagement insight to include in the debrief.

✓ Funnel analysis created and screenshot saved to Sprint 6 folder.

**S6-1.3 HUMAN Sentry performance review — mid-pilot** *[20 min]*

*🔗 https://sentry.io — open your guestiq-pilot project*

② Click Performance. Review the page load time distribution across real user sessions.

③ Note: What is the median load time? What is the 95th percentile? Are there any particularly slow sessions that correlate with specific front desk PCs?

✓ Performance review complete. Findings noted.

**S6-1.4 HUMAN Weekly CSV export to OneDrive — data backup protocol** *[10 min total]* **★ NEW**

① NEW\_PLACEHOLDER

**★ At the end of Week 13 (Day 7 of the pilot): open the app at guestiq.github.io?property=PROP001. Press SHIFT+CTRL+A. Click Export CSV.**

**★ Save the file to your OneDrive with filename: guestiq-pilot-backup-week1-[date].csv**

**★ At the end of Week 14 (Day 14 of the pilot — final day): repeat the same export.**

**★ Save: guestiq-pilot-backup-week2-[date].csv**

**★ Verify both files open correctly in Excel and contain readable data.**

**⚠ Supabase free-tier projects can be accidentally deleted or paused after extended inactivity. These two CSV exports ensure no pilot data is lost regardless of what happens to the Supabase project after the pilot ends.**

✓ Two CSV backup files saved to OneDrive. Both open correctly in Excel.

**S6-1.5 HUMAN Final data export on Day 14** *[20 min]*

① Open the app. Press SHIFT+CTRL+A. Click Export CSV. Save as: guestiq-pilot-FINAL-[date].csv to 06-Sprint-6 / Human-Outputs folder.

✓ Final CSV downloaded and saved.

**S6-1.6 AI Produce Pilot Debrief Report** *[AI: 2h]*

① AI receives the final CSV export and PostHog funnel analysis.

② AI produces: Complete debrief report with participation rates by tier, completion rates, intent distribution, top expectation priorities by segment, competitive threat map, service interaction spectrum, value reference framework, none\_flags frequency, PostHog funnel drop-off analysis, Sentry performance summary.

③ Includes: 3–5 key operational insights, management recommendations, Phase 2 questions raised.

✓ Debrief Report received.

**S6-1.7 BOTH Review Debrief Report** *[You: 45min]*

① Add qualitative observations from UAT and mid-pilot check-in not captured in quantitative data.

② Identify findings for the debrief meeting presentation.

✓ Reviewed and annotated version ready.

**PHASE 6.2 — Debrief Meeting**

**S6-2.1 HUMAN Schedule and prepare debrief meeting** *[45 min]*

① Schedule 45-minute meeting with hotel management.

② Prepare: 3 key findings, 2–3 operational recommendations, Phase 2 question.

✓ Meeting scheduled. Preparation complete.

**S6-2.2 HUMAN Conduct debrief meeting** *[45 min]*

① Present findings with supporting data. Ask: does this match your intuition? What surprises you? Agree on 2–3 operational changes and Phase 2 continuation decision.

✓ Meeting complete. Decisions noted.

**PHASE 6.3 — Project Close**

**S6-3.1 AI Produce Phase 2 Recommendations Document** *[AI: 1.5h]*

① AI produces: Scope recommendations — visual admin CMS, authentication, multi-property, multi-language, guest-facing deployment. Instrument refinements from none\_flags analysis and UAT feedback. PostHog funnel insights for gamification optimization. Release Plan for Phase 2 (new in v5.0): before approaching a second property, produce a Release Plan covering the multi-property deployment model, versioning strategy, hotfix process, rollback procedure, and mechanism for managing breaking content changes across properties running different versions. IRB path confirmation: document which IRB scenario was selected and whether Phase 2 scope changes require a new submission. ★ UPDATED v5.0: Release Plan and IRB path confirmation added.

✓ Document received.

**S6-3.2 BOTH Review Phase 2 Recommendations and agree scope** *[You: 45min]*

① Decide: accept, defer, or reject each recommendation. Update Product Backlog.

✓ Phase 2 scope agreed. Product Backlog updated.

**S6-3.3 BOTH Final project retrospective** *[You: 30min]*

① Answer: What went well across the whole project? What would you do differently from Sprint 0? What is the single most valuable thing the project produced?

✓ Final retrospective complete.

**S6-3.4 HUMAN Archive all project documents** *[30 min]*

① Verify all 44 artifacts are in their sprint Approved folders. Create a zip file of the entire GuestIQ Research Project folder. Save to OneDrive.

✓ All documents archived. Backup confirmed.

**S6-3.5 AI Produce Velocity Review and Burndown Chart** *[AI: 45min]*

① AI produces: Sprint-by-sprint velocity chart and final burndown. Comparison of estimated vs. actual velocity.

✓ Charts received and filed.

**S6-3.6 AI Produce PostHog and Sentry analytics summary for research record** *[AI: 1h]*

① AI produces: Export and narrative summary of all PostHog funnel data, event counts, and session replay insights. Sentry performance and error summary. Both become part of the permanent research record.

✓ Analytics summary received and filed.

**S6-GATE GATE Project Complete — Phase 1 Prototype**

✓ Pilot run for minimum 10 calendar days.

✓ Two weekly CSV backups saved to OneDrive. ★

✓ Final CSV export downloaded from Supabase.

✓ Debrief Report produced and reviewed.

✓ Debrief meeting conducted with hotel management.

✓ Phase 2 scope agreed.

✓ Final project retrospective complete.

✓ All 44 project artifacts in Approved folders.

✓ Project folder archived and backed up to OneDrive.

✓ Product Backlog updated with Phase 2 items.

✓ PostHog and Sentry analytics summary produced. ★

# COMPLETE ARTIFACT REGISTRY — ALL 44 DOCUMENTS

The v2.0 artifact registry now includes 38 documents — 34 original plus 4 new Sprint 0 architecture documents added in v2.0. New documents are marked with ★.

| **Artifact** | **Owner** | **Delivered When** |
| --- | --- | --- |
| Project Charter v2.0 | AI + Human | Sprint 0 |
| Stakeholder Register | AI + Human | Sprint 0 |
| RACI Matrix | AI + Human | Sprint 0 |
| Definition of Done + Ready | AI + Human | Sprint 0 |
| Risk Register | AI + Human | Sprint 0 — updated each sprint |
| SRS — Functional Requirements | AI + Human | Sprint 0 |
| SRS — Non-Functional Requirements | AI + Human | Sprint 0 |
| Product Backlog | AI + Human | Sprint 0 — living document |
| Use Case Specifications (UC-01 to UC-07) | AI + Human | Sprint 0 |
| Test Plan | AI + Human | Sprint 0 |
| **★ Visual Identity and Design System Document** | AI + Human | Sprint 0 — NEW v2.0 |
| **★ Observability and Analytics Specification** | AI + Human | Sprint 0 — NEW v2.0 |
| **★ Content Management Strategy Document** | AI + Human | Sprint 0 — NEW v2.0 |
| **★ Production Readiness Architecture Document** | AI + Human | Sprint 0 — NEW v2.0 |
| System Architecture Document | AI + Human | Sprint 1 |
| Information Architecture Diagram | AI + Human | Sprint 1 |
| Data Flow Diagram | AI + Human | Sprint 1 |
| Entity Relationship Diagram | AI + Human | Sprint 1 |
| Application State Diagram | AI + Human | Sprint 1 |
| ESLint + Prettier Configuration | AI | Sprint 1 ★ |
| Branching Logic Specification + 84-path Test Matrix | AI + Human | Sprint 1 — CRITICAL PATH |
| questionnaire.js Data Structure Specification | AI + Human | Sprint 1 ★ |
| UI/UX Wireframes | AI + Human | Sprint 1 |
| Visual Design System | AI + Human | Sprint 1 |
| API Specification | AI + Human | Sprint 1 |
| Sprint Plans (6 total) | Both | Start of each sprint |
| Sprint Backlogs (6 total) | Both | Start of each sprint |
| Sprint Review Notes (6 total) | Both | End of each sprint |
| Sprint Retrospective Notes (6 total) | Both | End of each sprint |
| Velocity Tracker + Burndown Chart | AI | After each sprint |
| Test Cases — Sprints 2–4 | AI | Each sprint |
| Bug Report Log | Human | Sprint 2 onwards |
| User Acceptance Testing Script | AI + Human | Sprint 4 |
| Deployment Checklist | AI | Sprint 4 |
| Go-Live Runbook | AI | Sprint 4 |
| Bug Reporting Guide for Pilot Team | AI ★ | Sprint 4 — NEW v2.0 |
| UAT Findings Document | Both | Sprint 5 |
| Pilot Debrief Report | AI + Human | Sprint 6 |
| Phase 2 Recommendations Document | AI + Human | Sprint 6 |
| PostHog + Sentry Analytics Summary | AI ★ | Sprint 6 — NEW v2.0 |

# MASTER DECISION LOG — COMPLETE AND FINAL

Every confirmed decision across the entire planning phase. This log supersedes the decision log in v1.0.

| **Category** | **Decision** | **Confirmed** |
| --- | --- | --- |
| Research Instrument | 79-question refined questionnaire across 3 tiers | ✓ |
| Research Instrument | Amateur: 8 questions 5 min / Professional: 18 questions 8 min / Expert: 79 questions 16 min | ✓ |
| Research Instrument | Tier labels: Amateur / Professional / Expert — identity-based behavioral design | ✓ |
| Research Instrument | Welcome: Option B confirmed — single unified screen, hook text + tier cards simultaneously, voluntary participation notice and Not now link (FR-008 v2.0) ★ UPDATED v5.0 | ✓ |
| Research Instrument | IRB path decision Decision required before pilot launch: Scenario A (internal only), B (IRB exemption — voluntary language in FR-008), or C (expedited review — consent mechanism needed). See UC Specs v2.0 Section 5. PENDING ★ NEW v5.0 Tense routing: retrospective vs. anticipatory from routing gate QR1 | ✓ |
| Research Instrument | Sensitive segments: behavioral and indirect framing only | ✓ |
| Research Instrument | Escape valve: None of these fit my situation — no open text | ✓ |
| Application Design | Application name: GuestIQ | ✓ |
| Application Design | Visual direction: Concept C — Modern Engagement | ✓ |
| Application Design | Respondent canvas: deep near-black #0D0D12 | ✓ |
| Application Design | Dashboard canvas: dark navy #0B1120 — distinct from respondent | ✓ |
| Application Design | Tier colors: Amateur green / Professional blue / Expert purple — locked | ✓ |
| Application Design | Badges: 9 SVG badges designed to GuestIQ design system | ✓ |
| Application Design | Platform: PWA — React 18 + Vite, Windows desktop primary | ✓ |
| Application Design | Hosting: GitHub Pages at guestiq.github.io?property=PROP001 | ✓ |
| Content Management | Phase 1a: hardcoded questionnaire.js — Strangler Fig Pattern | ✓ |
| Content Management | Phase 1b: JSON config files after Sprint 3 testing | ✓ |
| Content Management | Phase 2: Supabase CMS + visual admin interface at /admin | ✓ |
| Content Management | Components accept content as properties — never contain content | ✓ |
| Content Management | 6 config files: questions, episodes, tiers, ui-copy, branching, taxonomy | ✓ |
| Production Readiness | Supabase Auth in bypass mode — active in Phase 2 via feature flag | ✓ |
| Production Readiness | Environment configuration file — all credentials and feature flags | ✓ |
| Production Readiness | Service layer — all Supabase calls through src/services/ | ✓ |
| Production Readiness | Supabase Migrations for schema version control from Sprint 1 | ✓ |
| Production Readiness | Dashboard caching via materialized views — Phase 2 | ✓ |
| Observability | Sentry: error tracking + performance monitoring — free tier | ✓ |
| Observability | PostHog: product analytics + session replay — free tier | ✓ |
| Observability | 27 named PostHog events instrumented from Sprint 2 | ✓ |
| Observability | IP anonymization enabled on both platforms — no PII | ✓ |
| Code Quality | ESLint + Prettier configured in Sprint 1 before any code | ✓ |
| Code Quality | Radix UI headless components — saves ~10h build time | ✓ |
| Code Quality | Playwright visual regression — Sprint 4 | ✓ |
| Testing | 84-path branching logic test matrix — Sprint 1 deliverable | ✓ |
| Testing | Data integrity: 5 sessions traced end-to-end in Sprint 2 and Sprint 4 | ✓ |
| Testing | Offline queue: Chrome DevTools throttling test in Sprint 2 | ✓ |
| Operational | Bug reporting guide for pilot team — one page plain English | ✓ |
| Operational | Weekly CSV backup to OneDrive during Sprint 6 pilot | ✓ |
| Operational | Supabase downtime contingency screen — Sprint 4 | ✓ |
| Operational | SHIFT+CTRL+A management overlay | ✓ |
| Scope | Single property prototype, multi-property architecture built in | ✓ |
| Scope | No login in prototype — open access | ✓ |
| Scope | English only — i18n-ready architecture | ✓ |
| Scope | Total direct cost: $0 | ✓ |

**— END OF MASTER DEVELOPMENT TIMELINE v5.0 —**

*Work through this document sequentially. Do not skip steps. Do not skip gates. Every step exists for a reason.*

178 sequential steps · 44 artifacts · 14 weeks · $0 direct cost · v5.0

**CONFIDENTIAL — INTERNAL PROJECT DOCUMENT**