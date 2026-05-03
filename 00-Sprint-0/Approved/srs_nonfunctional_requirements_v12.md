**SOFTWARE REQUIREMENTS SPECIFICATION**

**NON-FUNCTIONAL REQUIREMENTS**

|  |  |
| --- | --- |
| **Document ID** | S0-2.3 — Sprint 0 Artifact |
| **Document Version** | 1.1 — Research Data Integrity category added (NFR-043, NFR-044, NFR-045) |
| **Document Status** | APPROVED v1.0 — v1.2 PENDING RE-APPROVAL |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Review Due** | Within 48 hours — Lead Researcher review commitment |
| **Total NFRs** | 45 non-functional requirements across 10 categories |
| **Priority Split** | MUST: 33 · SHOULD: 9 · COULD: 0 |
| **Related Documents** | SRS Functional Requirements (S0-2.1) · Project Charter v2.0 (S0-1.2) · Observability Spec (S0-3.3) · Production Readiness Architecture (S0-3.7) |
| **Document Location** | 00-Sprint-0 / AI-Outputs / SRS-Non-Functional-Requirements-v1.2.docx |

ℹ Non-functional requirements define how the system behaves — quality attributes, constraints, and operational standards — not what it does (which is covered in S0-2.1). Every NFR in this document has a specific, testable acceptance criterion. Where a metric is cited (e.g. load time under 2 seconds) it is a hard pass/fail criterion, not a guideline.

🤖 AI DEVELOPER: AI DEVELOPER: Read all NFRs in this document before writing Sprint 2 code. NFRs are architectural constraints that affect every component — not afterthoughts applied at the end. NFR violations discovered late cost significantly more to fix than design-time compliance.

# 1. INTRODUCTION

## 1.1 Purpose

This document specifies all non-functional requirements for GuestIQ. Non-functional requirements define the quality standards, operational constraints, and system properties the application must meet — independent of specific features. They govern performance, security, accessibility, reliability, browser compatibility, scalability, privacy, maintainability, and observability.

## 1.2 Relationship to Functional Requirements

This document is a companion to the SRS Functional Requirements (S0-2.1). Where the functional SRS defines what the system does, this document defines how well and under what constraints it does it. Both documents must be satisfied for the prototype to be considered complete. At every sprint gate, both MUST-level functional requirements and MUST-level non-functional requirements must be verified before the gate passes.

## 1.3 How to Read This Document

Each NFR entry shows: the requirement ID (NFR-XXX), priority (MUST / SHOULD / COULD), the requirement statement, a rationale explaining why it exists, a specific test method for verifying compliance, and the sprint in which it is implemented and verified. Requirements are organized into 9 categories. A summary traceability table appears in Section 11.

**2. Performance**

*How fast the application loads and responds under realistic conditions*

Performance requirements are measured from the perspective of a real front desk team member on a real hotel PC — not a developer laptop on fibre broadband. All performance targets are verified by Sentry performance traces collected from actual user sessions, not synthetic benchmarks from the development environment.

**NFR-001 MUST**  Initial page load time is under 2 seconds on a standard hotel broadband connection (10–50 Mbps download), measured from navigation start to Largest Contentful Paint (LCP).

|  |  |  |
| --- | --- | --- |
| **Rationale:** Hotel PCs are mid-range Windows machines. Hotel broadband is shared infrastructure. 2 seconds is the threshold beyond which abandonment rates increase significantly. This target must be met on the actual front desk hardware — not only on development machines. | **Test:** Sentry Performance dashboard: p50 LCP across all real user sessions during Sprint 4 testing on front desk PCs. Pass = p50 LCP ≤ 2000ms. | **Sprint 4** |

**NFR-002 MUST**  Time to Interactive (TTI) is under 3 seconds on a standard hotel broadband connection. The respondent must be able to interact with the tier selection screen within 3 seconds of navigation start.

|  |  |  |
| --- | --- | --- |
| **Rationale:** TTI after LCP because interactive readiness matters for task completion — a rendered but unresponsive page is worse than a slow one, as it creates an illusion of readiness. | **Test:** Sentry Performance: p50 TTI across real user sessions. Pass = p50 TTI ≤ 3000ms. | **Sprint 4** |

**NFR-003 MUST**  Question-to-question transition time (from answering a question to the next question rendering) is under 300 milliseconds on any supported device.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Respondents answering 79 questions will feel every sluggish transition. 300ms is the threshold below which transitions feel instant. Above this, the survey feels slow and respondents disengage. | **Test:** Manual test: answer 10 consecutive questions and observe. Sentry custom span wrapping the question render logic. Pass = no visible lag between answer and next question render. | **Sprint 3** |

**NFR-004 MUST**  The management dashboard overlay (SHIFT+CTRL+A) renders all 9 panels within 5 seconds of activation when up to 100 session records exist in Supabase.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Dashboard queries aggregate data across all sessions. With 100 sessions (well above pilot scale), all panels must load within a time that feels reasonable to a manager opening the overlay mid-shift. | **Test:** Manual test: open dashboard with 20+ test sessions in Supabase. Time from SHIFT+CTRL+A to all 9 panels showing data. Pass = ≤ 5 seconds. | **Sprint 4** |

**NFR-005 SHOULD**  The application JavaScript bundle size is under 500KB gzipped after build optimization.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Smaller bundles load faster on slow connections and reduce initial parse time. 500KB gzipped is achievable with code splitting and tree shaking on the confirmed technology stack. | **Test:** Vite build output: check dist/ folder after production build. Pass = total JS ≤ 500KB gzipped. | **Sprint 4** |

**3. Reliability and Availability**

*How consistently the application operates without failure*

Reliability requirements define the application's expected uptime and recovery behavior. Because GuestIQ is hosted on GitHub Pages and backed by Supabase — both external services — this document defines the application's behavior during outages, not the uptime of the underlying platforms.

**NFR-006 MUST**  The application handles Supabase connectivity failures gracefully. When Supabase is unreachable, the offline response queue activates. Questionnaire responses are stored locally and retried every 30 seconds. No response data is lost during outages of up to 60 minutes.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Research data integrity is non-negotiable. Losing a respondent's answers because of a momentary network issue would undermine trust in the tool and in the research data. | **Test:** Chrome DevTools throttling test (Sprint 2 step S2-3.5): set network to Offline, answer 5 questions, restore network, verify all 5 responses appear in Supabase within 60 seconds. Pass = zero data loss. | **Sprint 2** |

**NFR-007 MUST**  When Supabase is unreachable for more than 60 consecutive seconds, the downtime contingency screen is shown with a 'Try Again' button. The screen must display within 5 seconds of the 60-second threshold being reached.

|  |  |  |
| --- | --- | --- |
| **Rationale:** A loading state that never resolves is worse than a clear 'temporarily unavailable' message. Respondents must always know the application's state. | **Test:** Manual test: block Supabase in Chrome DevTools, wait 65 seconds, verify contingency screen appears. Pass = screen appears within 5 seconds of 65-second mark. | **Sprint 4** |

**NFR-008 MUST**  Session data survives browser refresh. Closing and reopening the browser at any point during an incomplete session preserves the session. The disambiguation screen appears on the next visit and the respondent can resume from the last answered question.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Front desk PCs may be shared between multiple staff members. Sessions are interrupted by shift changes, PC restarts, and accidental browser closure. Data survival is critical. | **Test:** Manual test: start session, answer 10 questions, close browser entirely, reopen URL. Pass = disambiguation screen appears and resume option restores session to question 11. | **Sprint 2** |

**NFR-009 SHOULD**  The GitHub Pages URL is available with no action required from the Lead Researcher or any hotel IT staff at all times during the pilot window. Zero maintenance interventions are expected or required.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Zero IT involvement is a core project constraint. If the hosting requires any maintenance action, it violates the operational model. | **Test:** Monitor GitHub Pages availability status throughout Sprint 5 and 6. Pass = no downtime requiring manual intervention during the 2-week pilot. | **Sprint 5–6** |

**4. Security**

*Data protection, credential management, and access control*

Security requirements for the prototype are primarily about protecting credentials, ensuring data is transmitted securely, and ensuring the management overlay cannot be accessed by unauthorized parties. Full authentication is deferred to Phase 2 — the security posture here is appropriate for an internal staff-facing prototype, not a public consumer application.

**NFR-010 MUST**  All communication between the application and Supabase uses HTTPS. The application is served over HTTPS via GitHub Pages. No data is transmitted over unencrypted HTTP at any point.

|  |  |  |
| --- | --- | --- |
| **Rationale:** HTTPS is the baseline security requirement for any web application handling research data. GitHub Pages enforces HTTPS automatically. | **Test:** Verify: open the application URL — browser address bar shows padlock icon and https://. Supabase client configuration uses the HTTPS project URL. Pass = all network calls in Chrome DevTools Network tab show https:// URLs. | **Sprint 2** |

**NFR-011 MUST**  All credentials (Supabase URL, Supabase anon key, PostHog API key, Sentry DSN) are stored in a .env file. The .env file is listed in .gitignore. No credential value appears anywhere in the committed codebase — not in JavaScript files, not in HTML, not in comments.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Credentials committed to a public or semi-public Git repository are a security incident. The .gitignore check is a Sprint 2 gate condition. | **Test:** GitHub repository review: search the codebase for any known credential value. Check .gitignore includes .env. Pass = zero credential values in any committed file. | **Sprint 2** |

**NFR-012 MUST**  Supabase Row Level Security (RLS) is enabled on all four tables (sessions, responses, scale\_responses, none\_flags). RLS policies allow the anon key to insert records and read aggregate data only. No policy allows reading another respondent's individual session data via the anon key.

|  |  |  |
| --- | --- | --- |
| **Rationale:** RLS ensures that even if the anon key is exposed (e.g. visible in browser DevTools), an attacker cannot read other respondents' individual response data. | **Test:** Supabase dashboard: Authentication → Policies. Verify RLS is enabled on all 4 tables. Verify policies are restricted to insert and aggregate select only. Pass = RLS enabled, no unrestricted select policy exists. | **Sprint 2** |

**NFR-013 MUST**  The management dashboard overlay (SHIFT+CTRL+A) is the only management access mechanism in the prototype. There is no /admin URL, no separate login page, and no publicly documented method of accessing aggregate data.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Security through obscurity is not strong security, but for an internal prototype where the audience is known hotel staff, the SHIFT+CTRL+A mechanism provides adequate access control without requiring authentication infrastructure. | **Test:** Verify: navigate to /admin — page not found or redirects to welcome screen. Open browser DevTools — no dashboard data visible without triggering the keyboard shortcut. Pass = no alternative access path to dashboard data exists. | **Sprint 4** |

**NFR-014 MUST**  No personally identifiable information is collected, stored, or transmitted at any point. The application does not collect: names, email addresses, employee IDs, IP addresses, device identifiers, or any other data that could identify an individual respondent.

|  |  |  |
| --- | --- | --- |
| **Rationale:** PII collection without appropriate consent and data protection measures is a legal and ethical risk. The research instrument is designed to collect anonymous professional opinions — not personal data. | **Test:** Code review: verify no PII fields exist in any Supabase table schema. PostHog configuration: ip: false. Sentry configuration: verify no user identification calls exist. Pass = zero PII in any data store. | **Sprint 2** |

**NFR-015 SHOULD**  The application displays a brief privacy notice on the welcome screen before any data collection begins. The notice states: what data is collected (anonymous questionnaire responses), how it is used (internal research), and that no personal information is retained.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Transparency about data collection is good practice even for anonymous research. It builds respondent trust and reduces privacy-related concerns from front desk staff. | **Test:** Visual inspection of the welcome screen. Pass = privacy notice text visible before the respondent selects a tier. Text matches the approved statement from ui-copy.json. | **Sprint 2** |

**5. Accessibility**

*WCAG 2.1 AA compliance and inclusive design*

Accessibility requirements ensure the application is usable by respondents with a range of visual, motor, and cognitive needs. WCAG 2.1 AA is the legally recognized accessibility standard in the United Kingdom, European Union, and United States (ADA). Compliance is also a proxy for overall quality — a well-structured, accessible application is more reliable and maintainable than one that is not.

**NFR-016 MUST**  All text content meets WCAG 2.1 AA contrast ratio requirements: minimum 4.5:1 for body text (under 18pt / 14pt bold), minimum 3:1 for large text (18pt+ / 14pt+ bold) and UI component boundaries.

|  |  |  |
| --- | --- | --- |
| **Rationale:** The dark canvas design (#0D0D12 background) with colored tier accents must be verified — high contrast ratios are not guaranteed by dark-mode designs. Low contrast causes eye strain and makes text unreadable for users with visual impairments. | **Test:** Automated: run axe-core accessibility scanner on all screens (AI performs in Sprint 4). Manual: check tier accent colors against dark canvas in a contrast ratio calculator. Pass = zero AA contrast failures reported by axe-core. | **Sprint 4** |

**NFR-017 MUST**  All interactive elements (buttons, answer options, tier cards, CTA buttons, dashboard tabs) are keyboard navigable using Tab, Shift+Tab, Enter, Space, and Escape. Focus is visually indicated on every focusable element with a visible focus ring.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Keyboard navigation is required for WCAG 2.1 AA compliance and for users who cannot use a mouse. Radix UI (the headless component library) provides correct keyboard interaction patterns — the implementation must not override or suppress these. | **Test:** Manual test: navigate the complete Amateur flow using only the keyboard — no mouse. Pass = every interactive element is reachable by Tab, activatable by Enter/Space, and the current focus position is always visually visible. | **Sprint 4** |

**NFR-018 MUST**  All images, icons, and non-text content have appropriate text alternatives. SVG achievement badges have aria-label attributes describing the badge name and award condition. Decorative SVG elements have aria-hidden='true'.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Screen readers announce image content using alt text or aria-label. A badge without an aria-label is announced as 'image' — meaningless to a screen reader user. | **Test:** Automated: axe-core scan. Manual: open screen reader (Windows Narrator: Windows+Ctrl+Enter), navigate to the completion screen, verify each badge is announced by name. Pass = all badge aria-labels present and descriptive. | **Sprint 3** |

**NFR-019 MUST**  All form controls and interactive question elements are built using Radix UI primitives or standard HTML form elements. Custom interactive components that mimic radio buttons, checkboxes, or sliders must use the appropriate ARIA roles and attributes.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Radix UI provides correct ARIA patterns for all interactive element types. This requirement prevents the creation of custom components that look correct visually but fail for assistive technology users. | **Test:** Code review: verify no custom interactive elements use div or span with click handlers where a button or input would be semantically correct. Radix UI usage confirmed for all question types. Pass = no ARIA role violations in axe-core scan. | **Sprint 2** |

**NFR-020 SHOULD**  The application does not rely solely on color to convey information. Selected answer options are indicated by both color (tier accent) and a visible checkmark or filled indicator. Error states are indicated by both color and text.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Respondents with color blindness cannot distinguish red from green or differentiate tier colors reliably. Information conveyed by color alone is inaccessible. | **Test:** Manual test with color blindness simulation (Chrome DevTools Rendering → Emulate vision deficiencies). Pass = all selected/unselected states distinguishable without color perception. | **Sprint 3** |

**6. Browser Compatibility**

*Supported browser environments and rendering requirements*

Browser compatibility requirements reflect the actual hardware and software environment where GuestIQ will run. The confirmed deployment environment is Windows 10 or Windows 11 PCs at the hotel front desk, which have Microsoft Edge and Google Chrome available.

**⚠ Internet Explorer is not supported and must never be added to the support matrix. IE11 does not support ES modules, CSS custom properties, or most modern Web APIs used in the GuestIQ stack. If a front desk PC is found to run only IE, the resolution is to install Chrome — not to make the application IE-compatible.**

**NFR-021 MUST**  The application renders correctly and all features function without error in Microsoft Edge (current stable release) on Windows 10 and Windows 11.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Edge is the default browser on all Windows 10/11 machines and is pre-installed without any additional steps. It is the primary browser for the pilot. | **Test:** Manual test (Sprint 4): complete the full Amateur flow in Edge on a Windows 10/11 machine. Open SHIFT+CTRL+A dashboard. Pass = all features functional, zero console errors, visual design matches specification. | **Sprint 4** |

**NFR-022 MUST**  The application renders correctly and all features function without error in Google Chrome (current stable release) on Windows 10 and Windows 11.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Chrome is used for development and testing throughout the project. Secondary verification on the actual front desk hardware confirms no environment-specific regressions. | **Test:** Manual test (Sprint 4): complete the full Professional flow in Chrome on a front desk PC. Pass = all features functional, zero console errors. | **Sprint 4** |

**NFR-023 MUST**  The application functions correctly on the actual front desk PCs at the hotel property — not only on the development machine. This includes verifying: page load time on hotel broadband, rendering on the front desk monitor resolution, and touch/click interaction with the front desk mouse and keyboard.

|  |  |  |
| --- | --- | --- |
| **Rationale:** The development environment (developer laptop, home broadband, high-DPI display) is different from the deployment environment in ways that can expose real bugs: lower-resolution monitors may clip content, shared hotel broadband may be slower than expected, older PC hardware may have slower JavaScript execution. | **Test:** Sprint 4 step S4-2.3: Lead Researcher takes the application to the front desk and tests on each of the 3 PCs. Pass = application loads, all interactions work, content is not clipped or misaligned at the front desk monitor resolution. | **Sprint 4** |

**NFR-024 SHOULD**  The application is functional (not just readable) on modern mobile browsers — specifically Chrome for Android and Safari on iOS. All interactive elements are appropriately sized for touch interaction (minimum 44×44px touch target per WCAG 2.1 AA guideline 2.5.5).

|  |  |  |
| --- | --- | --- |
| **Rationale:** Mobile is a secondary priority but some front desk team members may prefer to complete the questionnaire on their personal phone. The application should not fail on mobile — it may not be visually optimised but must not break. | **Test:** Manual test on a modern Android phone (Chrome) and iOS device (Safari): complete the Amateur flow. Pass = all questions answerable, no elements unintentionally hidden or overlapping, form submission works. | **Sprint 3** |

**7. Privacy and Data Protection**

*Observability tool configuration and data handling standards*

Privacy requirements for GuestIQ extend beyond the application itself to the third-party observability tools — PostHog and Sentry. These tools must be configured to collect the minimum data necessary for their purpose, with all privacy-enhancing options enabled. This section defines the specific configuration requirements for both platforms.

**NFR-025 MUST**  PostHog is configured with IP anonymization enabled (ip: false in the PostHog initialization call). PostHog does not store or process the IP address of any respondent.

|  |  |  |
| --- | --- | --- |
| **Rationale:** IP addresses are personal data under GDPR and most privacy regulations. Even for anonymous research, collecting IP addresses without explicit consent is inappropriate and unnecessary. | **Test:** PostHog dashboard: Settings → Privacy → verify IP address collection is disabled. Code review: verify posthog.init() includes ip: false. Pass = PostHog settings confirm IP collection disabled. | **Sprint 2** |

**NFR-026 MUST**  PostHog session replay does not capture keystrokes. The PostHog configuration must include: mask\_all\_inputs: true in the session recording configuration. This ensures that any input the respondent types (e.g. the 'Other — please specify' free text field) is masked in session replays.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Session replay of keystroke data in a research context would capture free-text responses verbatim — a privacy concern even for an anonymous instrument. Masking inputs prevents this. | **Test:** PostHog dashboard: Recordings → open a test session replay → verify input fields are masked (shown as asterisks or blank). Code review: mask\_all\_inputs: true confirmed in configuration. Pass = input fields masked in all session replays. | **Sprint 2** |

**NFR-027 MUST**  Sentry is configured with IP anonymization enabled. Sentry error reports do not include respondent IP addresses. The Sentry configuration must include sendDefaultPii: false.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Sentry's default configuration captures IP addresses and user agent strings in error reports. sendDefaultPii: false disables this collection. | **Test:** Code review: verify Sentry.init() includes sendDefaultPii: false. Sentry dashboard: open any error report — verify no IP address field is present. Pass = IP field absent from all Sentry error reports. | **Sprint 2** |

**NFR-028 MUST**  Respondent session IDs used in PostHog and Sentry are anonymous UUIDs generated by the application (crypto.randomUUID()). No user account ID, employee ID, email address, or any other identifier linkable to an individual is used as a session identifier in either platform.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Anonymous UUIDs allow error diagnosis and session replay analysis without identifying the individual respondent. This is the correct balance between operational observability and privacy. | **Test:** Code review: verify session identifiers passed to PostHog and Sentry are UUID format only. Verify no employee or user identifier is passed. Pass = all identifiers in PostHog and Sentry are UUID strings with no linkable personal data. | **Sprint 2** |

**NFR-029 SHOULD**  PostHog data retention is set to the minimum period sufficient for the research project. The recommended setting is 1 year. Session replay recordings are deleted after 30 days.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Data minimization — retaining data only as long as necessary — is a GDPR principle and good privacy practice. Session replays are most useful in the immediate post-pilot period; retaining them indefinitely is unnecessary. | **Test:** PostHog dashboard: Settings → Data retention → verify. Pass = data retention ≤ 1 year, session replay retention ≤ 30 days. | **Sprint 2** |

**8. Scalability and Capacity**

*Future-proofing the architecture for Phase 2 expansion*

Scalability requirements govern how the application is architected to support Phase 2 expansion — specifically multi-property deployment and increased concurrent user volumes. These requirements do not require building multi-property features in Phase 1; they require that the architecture does not prevent them in Phase 2.

**NFR-030 MUST**  The property\_id field is present in every Supabase database record (sessions, responses, scale\_responses, none\_flags) and in every PostHog event. In Phase 1 it is always set to the value of the VITE\_PROPERTY\_ID environment variable (PROP001). Adding a second property in Phase 2 requires only a configuration change — no schema migration and no code change.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Multi-property expansion is the primary Phase 2 objective. Adding it to the architecture now (as a field that always exists but is currently constant) costs nothing and makes Phase 2 trivial. Retrofitting it later requires a schema migration and touching every database write operation. | **Test:** Database review: verify property\_id column exists in all 4 tables. Code review: verify property\_id is attached to every Supabase insert call via the service layer. Pass = property\_id present in 100% of database records and PostHog events. | **Sprint 2** |

**NFR-031 MUST**  The user\_id field is present in the sessions table as a nullable UUID column. In Phase 1 it is always null (auth bypass mode). In Phase 2, enabling authentication sets this field to the authenticated user ID with no schema change required.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Authentication is the primary Phase 2 security upgrade. The user\_id field must exist in Sprint 2 so that Phase 2 auth activation is a configuration change, not a schema migration across potentially many existing sessions. | **Test:** Database review: verify user\_id column exists in sessions table as UUID nullable. Pass = column present with null values in all Phase 1 sessions. | **Sprint 2** |

**NFR-032 MUST**  The Supabase database schema is implemented and maintained via Supabase Migrations from Sprint 2 onwards. Every schema change (table creation, column addition, index creation, policy change) is a versioned migration file committed to the Git repository. No manual SQL edits are made directly in the Supabase dashboard without a corresponding migration file.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Database migrations are the industry standard for schema version control. Without migrations, the schema state is undocumented and cannot be reliably reproduced for Phase 2 or for a new property. Manual SQL edits leave no audit trail and cannot be rolled back. | **Test:** Git repository: verify supabase/migrations/ directory exists and contains migration files for all tables and policies. Pass = every database object has a corresponding migration file. No schema object exists that is not in a migration. | **Sprint 2** |

**NFR-033 MUST**  The application supports a minimum of 50 concurrent users without performance degradation. This far exceeds the prototype pilot scale (10 users) and verifies that the architecture can handle a small multi-property deployment before Phase 2 infrastructure planning begins.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Supabase free tier supports up to 50,000 monthly active users and handles concurrent connections efficiently. GitHub Pages CDN handles concurrent static asset requests without issue. The 50-user target is a verification of the architecture, not a meaningful load limit. | **Test:** Not tested in production (scale not available in prototype). Verified by architecture review: confirm Supabase free tier limits and GitHub Pages CDN documentation confirm 50 concurrent users is within supported range. Pass = architecture review confirms no capacity bottleneck at 50 concurrent users. | **Sprint 1 (architecture review)** |

**NFR-034 SHOULD**  All text content in the application is stored in external locale files managed by i18next (src/locales/en.json and the questionnaire content files). No human-readable text is hardcoded in React components. Adding a second language in Phase 2 requires only creating a new locale file — no component changes.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Multi-language support is a Phase 2 objective. The i18n-ready architecture must be verified from the first Sprint 2 build — retrofitting i18n into an application with hardcoded strings is a large and error-prone refactor. | **Test:** Code review: search codebase for hardcoded user-facing strings in React components. Pass = zero hardcoded strings in component files. All text references i18next translation keys or questionnaire.js content. | **Sprint 2** |

**9. Maintainability and Code Quality**

*Standards that ensure the codebase can be understood, modified, and extended*

Maintainability requirements govern the structure and quality of the codebase. These requirements exist not to satisfy abstract engineering principles, but to ensure that the developer who works on Sprint 4 can understand the code written in Sprint 2, and that the Phase 2 developer can understand the code written across all 6 sprints.

**NFR-035 MUST**  ESLint passes with zero errors on every commit before deployment. The ESLint configuration is established in Sprint 1 and includes rules for: React hooks dependencies, accessibility violations (jsx-a11y plugin), unused variables, and import ordering. ESLint warnings are reviewed and accepted intentionally — they are not automatically suppressed.

|  |  |  |
| --- | --- | --- |
| **Rationale:** ESLint catches real bugs before they reach the browser. The React hooks dependency rule catches one of the most common sources of subtle bugs in React applications. The jsx-a11y plugin enforces accessibility requirements at code-write time. | **Test:** GitHub Actions pipeline: ESLint runs as part of every deployment. Pass = GitHub Actions deployment step shows zero ESLint errors. npm run lint in local development shows zero errors. | **Sprint 1 (configuration) + Sprint 2 onwards (enforcement)** |

**NFR-036 MUST**  Prettier auto-formatting is applied to all code files before every commit. The Prettier configuration is established in Sprint 1 and applies consistent formatting: 2-space indentation, single quotes, semicolons, 100-character line width.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Consistent formatting eliminates style discussions and makes code review focus on logic rather than formatting. When the AI Developer writes code in Sprint 2 and the Lead Researcher reviews it in Sprint 4, consistent formatting reduces cognitive load. | **Test:** Code review: verify all .js and .jsx files are formatted consistently. npm run format shows no changes needed after running. Pass = Prettier reports zero formatting differences on the committed codebase. | **Sprint 1 (configuration) + Sprint 2 onwards (enforcement)** |

**NFR-037 MUST**  All Supabase database calls are made exclusively through the service layer (src/services/supabase.js). No React component, hook, or utility file imports the Supabase client directly. All PostHog tracking calls are made through the analytics service (src/services/analytics.js).

|  |  |  |
| --- | --- | --- |
| **Rationale:** The service layer is the boundary between the application logic and external services. When Supabase changes an API in Phase 2, only the service layer file needs updating — not every component. This is the API versioning strategy for the prototype. | **Test:** Code review: grep the codebase for direct imports of the Supabase client and PostHog outside of the service files. Pass = zero direct imports of supabaseClient or posthog outside src/services/. | **Sprint 2 onwards** |

**NFR-038 SHOULD**  Complex logic — specifically the tier routing logic, Module 5 branching logic, and the offline queue management — is documented with inline comments explaining the intent. Comments explain why, not what (the code itself shows what).

|  |  |  |
| --- | --- | --- |
| **Rationale:** The branching logic and offline queue are the two areas most likely to require modification in Phase 2. Undocumented complex logic creates a knowledge dependency on the original developer — in an AI-developed codebase, this is an especially important risk to mitigate. | **Test:** Code review: verify inline comments exist in useQuestionnaire.js (routing logic) and the offline queue implementation. Pass = key decision points in complex logic have explanatory comments. | **Sprint 2 onwards** |

**10. Observability Standards**

*Completeness and quality of error tracking and analytics instrumentation*

Observability standards define the minimum quality bar for Sentry and PostHog instrumentation. These requirements complement the specific event specifications in the Functional Requirements (S0-2.1 Section 11) by defining how the instrumentation must behave, not just what it must track.

**NFR-039 MUST**  Sentry captures 100% of unhandled JavaScript errors in the prototype (tracesSampleRate: 1.0). Every Supabase API call failure is captured as a Sentry exception with structured context. No error is silently swallowed — every caught exception is either handled gracefully (with user feedback) or reported to Sentry.

|  |  |  |
| --- | --- | --- |
| **Rationale:** 100% error capture in the prototype is essential for understanding real-world behavior on hotel hardware. Sampling errors (e.g. capturing only 10%) would miss the long tail of environment-specific issues that only occur on specific PCs or browser configurations. | **Test:** Sentry dashboard: trigger a test error intentionally (e.g. temporarily misconfigure the Supabase URL) — verify it appears in Sentry within 60 seconds. Pass = test error visible in Sentry Issues within 60 seconds of triggering. | **Sprint 2** |

**NFR-040 MUST**  All 27 canonical PostHog events (as defined in S0-2.1 v2.0 Section 11.3 — updated for Option B UX redesign) are verified firing in the PostHog Events dashboard during Sprint 2 and Sprint 3 testing. Event names are exact — case-sensitive, underscore-separated, lowercase. No event name deviates from the specification. Note: event #4 was renamed from credentials\_completed (v1.0) to credentials\_enrichment\_completed (v2.0) to reflect the move of expert enrichment to a post-completion optional screen. This is the only event name change between v1.0 and v2.0 of the SRS Functional Requirements.

|  |  |  |
| --- | --- | --- |
| **Rationale:** PostHog funnels, cohorts, and dashboards are built on exact event names. A single character difference (e.g. tier\_Selected vs tier\_selected) means the event is invisible to all analytics queries built on the correct name. | **Test:** PostHog Events dashboard: filter by each of the 27 event names individually during Sprint 4 QA. Pass = all 27 events visible in PostHog with the exact names specified in S0-2.1 v2.0 Section 11.3. Verify specifically that event #4 is named credentials\_enrichment\_completed (not the v1.0 name credentials\_completed). Any mismatch in event naming breaks PostHog funnels and cohorts. | **Sprint 4** |

**NFR-041 MUST**  Sentry performance monitoring captures Core Web Vitals (LCP, FID/INP, CLS) for every real user session during the pilot. This data is used to verify NFR-001 and NFR-002 performance targets under real-world conditions.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Developer testing occurs on optimized hardware. Core Web Vitals from real user sessions on hotel PCs may reveal performance issues not visible in development. The Sentry performance data is the authoritative verification source for all performance NFRs. | **Test:** Sentry Performance dashboard: after Sprint 5 pilot launch, verify LCP and other Core Web Vitals are being collected. Pass = Core Web Vitals visible in Sentry Performance for at least 5 real user sessions. | **Sprint 5** |

**NFR-042 SHOULD**  PostHog session replay is enabled for the prototype pilot. Session replays provide qualitative insight into how respondents interact with the questionnaire — where they pause, where they scroll back, where they appear confused — that quantitative event data alone cannot capture.

|  |  |  |
| --- | --- | --- |
| **Rationale:** Session replays are the primary UX diagnostic tool for the pilot. They allow the Lead Researcher to watch representative sessions and identify friction points for Phase 2 improvement without needing to be physically present. | **Test:** PostHog dashboard: Recordings → verify session replays appear after Sprint 5 pilot launch. Pass = at least 3 session replays visible in PostHog within 3 days of pilot launch. | **Sprint 5** |

## 11. Research Data Integrity

*Quality standards for the research instrument layer — distinct from the software quality layer covered by other categories*

GuestIQ is simultaneously a software product and a research instrument. The software quality NFRs above cover performance, security, accessibility, and observability. This category covers the quality of the research data itself — the accuracy, integrity, and completeness of the data collected by the instrument. These three NFRs were added in v1.1 following the adoption of Academic Research Methodology as an active framework (S0-0.1 Methodology Document). They formalise requirements that were implicit throughout the project but had no formal quality standard.

ℹ AI DEVELOPER: These three NFRs are not software performance requirements — they are research data quality requirements. NFR-043 through NFR-045 must be verified during Sprint 2 (data integrity protocol) and Sprint 3 (routing fidelity). Failures in these NFRs do not produce application errors — they produce silent data quality problems that invalidate the research. Treat these with the same priority as MUST-level security NFRs.

**NFR-043 MUST ★ NEW Tense frame accuracy: the application delivers 100% of questions to each respondent in the correct tense frame (retrospective or anticipatory) as determined by their answer to QR1 at the start of the session. The tense\_frame field set at routing gate must be applied consistently to every question render, every Supabase response record, and every PostHog question\_answered event property throughout the entire session.**

|  |  |  |
| --- | --- | --- |
| **Rationale:** The dual-tense design is the primary methodological innovation of this instrument. A respondent who selected Retrospective (Answer A) receiving future-tense questions — or vice versa — generates invalid research data that cannot be used in the academic analysis. This failure would be silent: the data would look complete but be methodologically incorrect. | **Test:** Data integrity protocol (Sprint 2 S2-3.2): run 2 complete sessions with Answer A (Retrospective) and 2 with Answer B (Anticipatory). Verify tense\_frame field in sessions table matches QR1 selection. Verify question text rendered during session matches the correct tense version. Verify all PostHog question\_answered events carry the correct tense\_frame property. Pass = 100% match in all 4 sessions. | Sprint 2 + Sprint 3 |

**NFR-044 MUST ★ NEW Module 5 routing fidelity: the intent category routing applied during a session must match the respondent's Q1 answer\_code in 100% of complete sessions. Every respondent who selected intent category WORK-TRANS in Q1 must be shown the 5A Work and Business sub-section of Module 5. Every respondent who selected LEIS-PLAN must be shown 5B Leisure Stays. No respondent is ever shown a Module 5 sub-section that does not correspond to their Q1 answer.**

|  |  |  |
| --- | --- | --- |
| **Rationale:** Module 5 is the core of the research instrument — it captures intent-specific expectations for each of the 12 guest intent taxonomy categories. A routing error that shows, for example, the Transit sub-section to a Business respondent produces data that is taxonomically misclassified. This is a research validity failure, not a user experience failure. It cannot be corrected post-hoc because the respondent's answers are labelled with the wrong intent category. | **Test:** 84-path test matrix (Sprint 3): cross-reference the intent\_category field in the sessions table against the Q1 answer\_code in the responses table for all 84 paths in the test matrix. Pass = intent\_category matches Q1 answer\_code in 100% of the 84 test sessions. Any mismatch is a routing failure requiring immediate fix before the sprint gate passes. | Sprint 3 |

**NFR-045 MUST ★ NEW Research data integrity — none\_flag capture fidelity: the count of records in the none\_flags Supabase table must match the count of ‘None of these fit my situation’ selections visible in the respondent UI for all verified sessions. No none-flag selection may be silently lost between the UI interaction and the database record. The none\_flag table is a primary research instrument — it identifies which questions require instrument refinement in Phase 2.**

|  |  |  |
| --- | --- | --- |
| **Rationale:** None-flags are the instrument’s self-correction mechanism. A question with a none-flag rate above 15% signals that the answer options do not cover the respondent population’s actual experience. If none-flag records are silently dropped between the UI and the database, the instrument appears to perform better than it does — hiding exactly the data needed to improve it in Phase 2. This is a data completeness failure with direct academic consequences. | **Test:** Data integrity protocol (Sprint 2 S2-3.2): complete 3 test sessions deliberately selecting ‘None of these fit my situation’ on at least 5 known questions per session. Count the none-flag selections made in the UI. Open the none\_flags table in Supabase. Pass = record count in Supabase matches UI selection count exactly for all 3 test sessions. Any discrepancy is a data loss bug requiring immediate fix. | Sprint 2 + Sprint 3 |

# 12. REQUIREMENTS TRACEABILITY SUMMARY

All 45 non-functional requirements listed in order of ID (NFR-001 to NFR-045) with priority and verification sprint. Use this table during sprint gate reviews to confirm all MUST-level NFRs for the current sprint are verified before the gate passes.

| **NFR ID** | **Requirement Summary** | **Priority** | **Verified In Sprint** |
| --- | --- | --- | --- |
| **NFR-001** | Initial page load LCP ≤ 2 seconds (Sentry p50 from real user sessions) | **MUST** | Sprint 4 |
| **NFR-002** | Time to Interactive ≤ 3 seconds (Sentry p50 from real user sessions) | **MUST** | Sprint 4 |
| **NFR-003** | Question-to-question transition ≤ 300ms | **MUST** | Sprint 3 |
| **NFR-004** | Management dashboard renders all panels ≤ 5 seconds at 100 sessions | **MUST** | Sprint 4 |
| **NFR-005** | JavaScript bundle ≤ 500KB gzipped after build optimization | **SHOULD** | Sprint 4 |
| **NFR-006** | Offline queue: zero data loss during Supabase outage ≤ 60 minutes | **MUST** | Sprint 2 |
| **NFR-007** | Downtime screen appears within 5 seconds of 60-second Supabase outage | **MUST** | Sprint 4 |
| **NFR-008** | Session data survives browser close and reopen — resume from last question | **MUST** | Sprint 2 |
| **NFR-009** | GitHub Pages URL available throughout pilot with zero maintenance interventions | **SHOULD** | Sprint 5–6 |
| **NFR-010** | All communication uses HTTPS — no unencrypted HTTP at any point | **MUST** | Sprint 2 |
| **NFR-011** | Credentials in .env only — zero credentials in committed codebase | **MUST** | Sprint 2 |
| **NFR-012** | Supabase RLS enabled on all 4 tables — anon key restricted to insert and aggregate reads | **MUST** | Sprint 2 |
| **NFR-013** | Management overlay is only access path — no /admin URL or alternative route | **MUST** | Sprint 4 |
| **NFR-014** | Zero PII collected, stored, or transmitted at any point | **MUST** | Sprint 2 |
| **NFR-015** | Privacy notice displayed on welcome screen before data collection begins | **SHOULD** | Sprint 2 |
| **NFR-016** | WCAG 2.1 AA contrast ratios — minimum 4.5:1 body text, 3:1 large text and UI components | **MUST** | Sprint 4 |
| **NFR-017** | Full keyboard navigation — Tab, Shift+Tab, Enter, Space, Escape — visible focus ring | **MUST** | Sprint 4 |
| **NFR-018** | SVG badges have aria-label. Decorative elements have aria-hidden='true' | **MUST** | Sprint 3 |
| **NFR-019** | All interactive question elements use Radix UI primitives or correct ARIA roles | **MUST** | Sprint 2 |
| **NFR-020** | Color not used as sole indicator — selected states use color AND shape/icon | **SHOULD** | Sprint 3 |
| **NFR-021** | Fully functional in Microsoft Edge (current) on Windows 10/11 | **MUST** | Sprint 4 |
| **NFR-022** | Fully functional in Google Chrome (current) on Windows 10/11 | **MUST** | Sprint 4 |
| **NFR-023** | Fully functional on actual front desk PCs — verified on-site | **MUST** | Sprint 4 |
| **NFR-024** | Functional (not optimized) on Chrome Android and Safari iOS | **SHOULD** | Sprint 3 |
| **NFR-025** | PostHog IP anonymization enabled — ip: false in configuration | **MUST** | Sprint 2 |
| **NFR-026** | PostHog session replay masks all inputs — mask\_all\_inputs: true | **MUST** | Sprint 2 |
| **NFR-027** | Sentry IP anonymization enabled — sendDefaultPii: false | **MUST** | Sprint 2 |
| **NFR-028** | Session identifiers are anonymous UUIDs — no linkable personal data in PostHog or Sentry | **MUST** | Sprint 2 |
| **NFR-029** | PostHog data retention ≤ 1 year. Session replay retention ≤ 30 days | **SHOULD** | Sprint 2 |
| **NFR-030** | property\_id in all Supabase records and PostHog events — multi-property ready | **MUST** | Sprint 2 |
| **NFR-031** | user\_id nullable column in sessions table — auth bypass now, active in Phase 2 | **MUST** | Sprint 2 |
| **NFR-032** | All schema changes via Supabase Migrations — zero manual SQL dashboard edits | **MUST** | Sprint 2 |
| **NFR-033** | Architecture verified to support ≥ 50 concurrent users within free-tier limits | **MUST** | Sprint 1 |
| **NFR-034** | All text in i18next locale files — zero hardcoded strings in components | **SHOULD** | Sprint 2 |
| **NFR-035** | ESLint zero errors on every commit — enforced in GitHub Actions pipeline | **MUST** | Sprint 1 config + Sprint 2 enforcement |
| **NFR-036** | Prettier formatting applied to all files — zero formatting differences on commit | **MUST** | Sprint 1 config + Sprint 2 enforcement |
| **NFR-037** | All Supabase and PostHog calls through service layer — zero direct imports in components | **MUST** | Sprint 2 |
| **NFR-038** | Complex logic (routing, offline queue) documented with inline why-comments | **SHOULD** | Sprint 2 |
| **NFR-039** | Sentry 100% error capture (tracesSampleRate: 1.0) — every exception reported | **MUST** | Sprint 2 |
| **NFR-040** | All 27 PostHog events verified firing with exact names in PostHog Events dashboard — event #4 = credentials\_enrichment\_completed (v2.0 name) | **MUST** | Sprint 4 |
| **NFR-041** | Sentry Core Web Vitals captured for all real user sessions during pilot | **MUST** | Sprint 5 |
| **NFR-042** | PostHog session replay active and producing recordings during pilot | **SHOULD** | Sprint 5 |
| NFR-043 | Tense frame accuracy — 100% of questions delivered in correct retrospective/anticipatory frame throughout session ★ NEW | MUST | Sprint 2 + Sprint 3 |
| NFR-044 | Module 5 routing fidelity — intent category routing matches Q1 answer\_code in 100% of complete sessions ★ NEW | MUST | Sprint 3 |
| NFR-045 | None-flag capture fidelity — none\_flags Supabase count matches UI selection count in all verified sessions ★ NEW | MUST | Sprint 2 + Sprint 3 |

# 13. COMPLIANCE SUMMARY

The following table summarises all external standards and targets that GuestIQ must comply with, and how compliance is measured.

| **Requirement** | **Standard / Target** | **Measurement Method** | **Verified In** |
| --- | --- | --- | --- |
| **WCAG 2.1 AA** | Level AA compliance for all interactive content | axe-core automated scan + manual keyboard navigation test | Sprint 4 |
| **HTTPS everywhere** | All URLs use https:// — GitHub Pages enforces this automatically | Chrome DevTools Network tab — verify all requests are HTTPS | Sprint 2 |
| **Core Web Vitals** | LCP ≤ 2s, CLS ≤ 0.1, FID/INP ≤ 100ms (p75) | Sentry Performance dashboard — real user data from pilot | Sprint 5 |
| **GDPR-aligned privacy** | No IP addresses, no PII, data minimization, transparent notice | Code review + PostHog/Sentry configuration review | Sprint 2 |
| **Supabase RLS** | Row Level Security enabled on all tables with minimal anon access | Supabase Dashboard → Auth → Policies | Sprint 2 |
| **ESLint + Prettier** | Zero lint errors, consistent formatting on all commits | GitHub Actions pipeline — automated on every push | Sprint 1+2 |
| **Environment security** | Zero credentials in committed codebase — .env not in Git | GitHub repository search for credential values | Sprint 2 |
| **Supabase Migrations** | 100% of schema changes via versioned migration files | Git repository: supabase/migrations/ contains all schema history | Sprint 2 |

# 14. VERSION UPDATE LOG

| **Version** | **Date** | **Updated By** | **Change** |
| --- | --- | --- | --- |
| **v1.0** | [Sprint 0] | Claude / AI Developer | Initial version. 42 NFRs across 9 categories (Performance, Reliability, Security, Accessibility, Browser Compatibility, Privacy, Scalability, Maintainability, Observability). MUST: 33 · SHOULD: 9 · COULD: 0. Compliance summary and full traceability table included. |
| **v1.1** | [Sprint 0] | Claude / AI Developer | New category added: Research Data Integrity (Section 11). Three new MUST-level NFRs: NFR-043 Tense frame accuracy, NFR-044 Module 5 routing fidelity, NFR-045 None-flag capture fidelity. Total: 42 → 45 NFRs. MUST: 33 → 36. Categories: 9 → 10. Sections renumbered: old 11→12, 12→13, 13→14. Traceability table updated. All existing NFR content unchanged. |
| **v1.2** | [Sprint 0] | Claude / AI Developer | Single targeted fix: NFR-040 updated to reflect PostHog event #4 rename from credentials\_completed to credentials\_enrichment\_completed, following SRS Functional Requirements v2.0 Option B UX redesign. NFR-040 body text, test method, and traceability table row all updated. All other 44 NFRs (NFR-001 to NFR-039, NFR-041 to NFR-045) are confirmed unchanged — the Option B changes were UX/flow changes that do not affect quality attribute requirements. Total NFRs: 45. Categories: 10. MUST: 36. SHOULD: 9. All unchanged. |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**— END OF SRS NON-FUNCTIONAL REQUIREMENTS —**

*GuestIQ · SRS Non-Functional Requirements v1.2 · S0-2.3 · Sprint 0 Artifact · Confidential*