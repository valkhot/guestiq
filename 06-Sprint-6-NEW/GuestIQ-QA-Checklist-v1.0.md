# GuestIQ · Pre-Pilot QA Checklist (v1.0)

Run this methodically before UAT/pilot. Check `[ ] → [x]` as you go. If something fails, note it and tell me — don't fix blind. Test on the **desktop** browser first (primary), then the **iPad pass** at the end.

**Setup:** fresh browser session (or Incognito to avoid extension noise). Have the **desk PIN** handy. Do this on the **live site** (`https://valkhot.github.io/guestiq/`) *and* locally if you can — the deploy can behave differently.

---

## A · First run & badge (Welcome → BadgeClaim)
- [ ] App loads to the **Welcome** screen (no console errors on load — F12 → Console).
- [ ] Proceed to **badge claim**: 12 coins show with real animal art.
- [ ] Claim a coin → animation plays → greeting reads **"Let's begin, [animal]"**.
- [ ] **Reload** the page → returning greeting reads **"Welcome back, [animal]"** (badge persisted).
- [ ] Try to claim an **already-claimed** coin (2nd browser/incognito) → it's not offered / handled gracefully.

## B · Coverage picker (GuestSelect)
- [ ] Picker shows all guest types with coverage bands ("Do you know them? / Started / Known well").
- [ ] Your **own badge** appears pinned where you've read.
- [ ] **Gaps-first** ordering makes sense (unread/under-read surface first).
- [ ] At **≥3** reads a "that's plenty" affordance appears; behaves correctly.

## C · The read — all 5 question types (ReadScreen + QuestionBody)
Do one full read and confirm **each** renders and records:
- [ ] **single** (pick one) — Continue advances only after a choice.
- [ ] **observer** (pick one, observer framing) — records.
- [ ] **multi** (pick several) — multiple selections hold; Continue works.
- [ ] **kano** (functional/dysfunctional pair) — both sides answerable.
- [ ] **scale5** (1–5) — selection records.
- [ ] **verbatim** (free text) — typing works; empty is allowed where optional.
- [ ] The **count-or-quote** free-text box appears where expected; no auto-advance (must click Continue).
- [ ] No question can be skipped by accident; back/forward is consistent.

## D · Depth fork (Option-3 rule)
- [ ] After the core set, the **depth fork** is offered ("go deeper" vs "see your read").
- [ ] **See your read** → goes straight to end-of-read.
- [ ] **Go deeper** → asks the **expert** questions (confirm you actually get more questions), then the **"Complete ✓"** seal appears (brass, inert) at EXPERT.
- [ ] Re-entering a core-read guest to go deeper **skips CORE**, goes to deeper questions (confirm modal behaves).

## E · End-of-read (5 beats + story)
- [ ] **Threshold** beat shows.
- [ ] **Dossier** rows show your actual answers (quiet complaint / room to keep from / delight / asks-for / book-instead).
- [ ] **Story paragraph** renders under "You got down N things…" — reads well, woven from *your* answers, correct **a/an** grammar.
- [ ] Story phrasing **varies across different guests** (opening/closing differ); **identical** on re-reading the same guest.
- [ ] **Quotes** show where you typed free-text.
- [ ] **Constellation** shows honest counts ("You're first on record" / "You and N others…") — matches reality.
- [ ] **Gallery + gratitude** beat; **"Read another guest →"** returns to picker.
- [ ] Read is now **completed** (verify in Console coverage later).

## F · Offline queue (US-2.5)
- [ ] F12 → Network → set **Offline**. A **bottom banner** appears ("your work is being saved on this device…").
- [ ] Continue a read **while offline** — answer questions, complete it. No errors block you.
- [ ] Set back to **No throttling** → banner changes to "Reconnecting — syncing…" then disappears.
- [ ] Confirm the offline read's data **arrived** (Console → Refresh, or Supabase) — nothing lost, no duplicates.

## G · Study open/close toggle
- [ ] Console (Ctrl+Alt+R) → **Close the study** → pill turns red.
- [ ] Fresh agent tab → shows **"Reads are paused"** screen (no read flow).
- [ ] Console → **Reopen** → agent tab (refresh) → read flow returns.

## H · Admin access & security (locked access)
- [ ] **Ctrl+Alt+A** → PIN prompt → correct PIN → **GM Findings Report**.
- [ ] **Ctrl+Alt+R** → PIN prompt → correct PIN → **Researcher Console**.
- [ ] **Wrong PIN ×5** → 30-second lockout message.
- [ ] **Lock** button → returns to the **exact prior agent screen** (not the landing).
- [ ] Leave admin, re-enter → **re-prompts PIN** (PIN every open).
- [ ] Idle ~3 min in an admin screen → **auto-locks** back to the agent app.
- [ ] `?view=findings` in the URL → shows the **plain agent app** (dev preview retired).
- [ ] Header buttons (Print/PDF, Study console, Lock / Refresh) **don't overlap**.

## I · GM Findings Report (Ctrl+Alt+A)
- [ ] Header: "What the desk sees" + reads/guest-types/date line.
- [ ] **Persona nav** shows only guests actually read; tapping switches.
- [ ] Findings grouped **Blind spots / Contradictions / Mis-weights**, **Strong first** (brass badge), then Emerging.
- [ ] Counts read **"N of M reps"** — **never %**, **never names**.
- [ ] Thin personas show the **segment gate** ("not enough reads yet"), not a fake list.
- [ ] **Print / Save PDF** → clean document, **starts at the top** (no blank first page), findings intact.

## J · Researcher Console (Ctrl+Alt+R) — six lenses
- [ ] **01 Integrity** — guardrails strip + coverage table (Converged / Forming / Gap correct vs your reads).
- [ ] **02 Validation** — reads recorded, completion %, went-deeper %, converged count (numbers sane).
- [ ] **03 Agent activity** — per-badge counts (anonymous), matches who read.
- [ ] **04 App health** — errors last-24h / all-time / recent list (seed one via SQL to confirm it shows).
- [ ] **05 GM activity** — report opens + last-opened; open the report, **Refresh**, count **ticks up**.
- [ ] **06 What to change next** — nudges match coverage gaps.
- [ ] **Refresh** re-pulls live data; **Export findings (CSV)** downloads a sane file (guest/type/finding/tag/tier/count/reps).

## K · Data integrity & anonymity (spot-checks)
- [ ] Nowhere in any admin surface does a **guest name** or **raw row** appear — counts/quotes only.
- [ ] CF-sink / "table-stakes" answers **don't** appear as findings.
- [ ] Re-answering a question / re-reading a guest **doesn't** create duplicate rows or double counts.
- [ ] Constellation counts = distinct badges (same badge, many reads = 1).

## L · Responsive / iPad pass (do on a real iPad if possible)
- [ ] Agent flow (welcome → claim → picker → read → end-of-read) is **usable on iPad** — tap targets big enough, text readable, no clipped content.
- [ ] Free-text keyboard doesn't break layout.
- [ ] Admin surfaces (light dossier canvas) **degrade gracefully** on tablet (readable, not broken) — admin is desktop-primary, but shouldn't be unusable.
- [ ] Portrait **and** landscape both hold.
- [ ] The end-of-read light/glare on a real screen is acceptable.

## M · Deploy / live-site sanity
- [ ] Live site (`https://valkhot.github.io/guestiq/`) loads the **same build** as local (do a read there).
- [ ] If a deploy showed **red**, verify the live site actually updated (the deploy is flaky — check live, not just the badge).
- [ ] PWA installs / "add to home screen" works on the iPad (optional but nice for the pilot).

---

## How to report
For each fail, note: **which item (e.g. E-story)**, **what you expected**, **what happened**, and any **console error**. Send me the batch — I'll triage blockers vs. polish and fix in order. Don't change files to "fix" something mid-QA; capture it first so we keep a clean list.

*GuestIQ · Pre-Pilot QA Checklist · v1.0 · run desktop-first, then iPad · report fails as a batch*
