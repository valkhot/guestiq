# GuestIQ — Questionnaire v4.2 (Complete · Gold-Tagged Option Pass)

| | |
|---|---|
| **Document** | GuestIQ-Questionnaire — v4.2 (complete conversion + gold-tagging) |
| **Supersedes** | v4.1 · the v4.2 Conversion Pass note (folds it in) |
| **Implements** | GM Priors & Gold Map **v0.4** (the obviousness filter — every option is tagged) |
| **What this is** | Every converted/structured item with **persona-tuned, gold-tagged** option lists. Unchanged `single`/`kano`/`rank`/`scale5` items carry from v4.1. |
| **Key design calls** | (1) **Persona-tuning lives in the battery blocks**, not the core spine (the spine stays comparable across personas). (2) Every option carries a hidden **gold tag**; table-stakes are demoted to a **CONFIRM-sink** that's collected but suppressed from findings. (3) **Two new personas** (crew, VIP) get L1 entries + full battery blocks. |

---

## Gold-tag legend *(hidden from the agent; used by the report engine)*
- **BS** — blind-spot (GM has no prior; a pick here is gold)
- **CON** — contradiction (GM believes the opposite; a pick overturns a prior)
- **MW** — mis-weight (right idea, wrong segment/size)
- **CF-sink** — table-stakes "usual stuff" (collected so the menu is complete; **suppressed from findings** per GoldMap §8)
- High-value picks marked **BS⁺**.

**Rule:** every structured question carries 1 CF-sink "the usual…" option + 9–10 gold-tagged options + *other* (verbatim residual). `observer` example fields are now **optional**.

---

## Routing (L1 updated: 7 → 9)

**L1** — Why is this guest staying with you? Pick one.
A. Business · B. Early flight / late arrival · C. Holiday · D. Cruise · E. Event · F. Medical · **G. Airline crew** *(new)* · **H. Executive / VIP** *(new)* · I. Other

*(L2 party routing unchanged.)*

---

## Core spine (generic, gold-tagged — answered AS the chosen persona)

**P1b** `observer` — Where do they book instead? Pick one.
`a cheaper hotel nearby` CF · `a nicer hotel` CF · `a hotel closer to where they're going` BS · `a chain they're loyal to` CF · `an Airbnb / short-let` BS · `a cruise or package deal` BS · `a place with parking or a shuttle` BS · `they didn't book elsewhere — just didn't come` CON · `not sure` · `other`

**P2** `observer · FREQ` *(example optional)* — Silent complaints (GoldMap §4 ★).
`noise / poor sleep — 5am HVAC, corridor` BS⁺ · `not clean` CF · `waiting at check-in` MW · `a surprise charge` BS · `how a staff member treated them` BS · `room too hot / cold` BS · `something broken` CF · `promised but not given` BS · `early-morning disturbance` BS⁺ · `slow or no response to a request` BS · `other`

**P3** `observer` *(example optional)* — Rooms you avoid giving (GoldMap §4 room assignment).
`too noisy (street, lift, air-con)` BS · `weak air-con / heat` BS · `too small` CF · `old or worn` CF · `bad view / dark` CF · `far from the lift` MW · `near early-morning noise (kitchen, service)` BS⁺ · `near the event / party floor` BS · `no — any room is fine` CF · `other`

**P4b** `observer` — If not the restaurant, where do they eat? (GoldMap §6 ★★).
`nearby restaurants / cafés` CF · `fast food / takeaway` BS · `grab-and-go / convenience food` BS · `in the room (delivery)` BS · `the ship / venue / hospital` BS · `out with clients or hosts` MW · `skips meals — too early` BS · `only grabs coffee` BS · `brings or cooks their own` BS · `other`

**P7** `observer` *(example optional)* — Small free thing that delights (GoldMap §9 ★).
`a warm welcome by name` MW · `noticing what they needed early` BS⁺ · `a small free item (coffee, water, snack)` BS · `bending a rule for them` BS · `a local tip` MW · `remembering what they like` BS · `early coffee before the café opens` BS⁺ · `a quiet, ready room without asking` BS⁺ · `handling their luggage` BS · `other`

**P8** `observer` *(example optional)* — Asked too late (GoldMap §13 timing).
`early room / early check-in` BS · `a certain room or floor` MW · `food late at night` BS · `a ride / late-night help` BS · `setting up a special day` MW · `a quiet room` BS · `an extra / connecting room` CF · `luggage hold` BS · `a wake-up / early-departure help` BS · `other`

**P9** `observer` *(example optional)* — What they ask for that you don't have (GoldMap §6 ★★ — generic spine; persona detail is in the battery).
`something forgot (charger, toiletries)` BS⁺ · `food / drink you don't sell` BS · `help finding something nearby (pharmacy, cash, late food)` BS · `something to do at night when nothing's open` BS · `early coffee before the café opens` BS⁺ · `printing / a document` BS · `a ride at an odd hour` BS · `luggage hold` BS · `a quiet place to work or wait` MW · `other`

**P9b** `observer` — What do they do instead? (GoldMap §3 turnaway).
`go out and get it themselves` BS · `ask you where to find it` BS · `do without — disappointed` CON · `order delivery` BS · `improvise` BS · `complain` CF · `quietly won't come back` CON · `borrow from the desk` BS · `wait until they leave` BS · `other`

**P10** `observer` *(example optional)* — Needs others don't (GoldMap §12 under-planned).
`a certain item others ignore` BS · `a time need (very early / late / 24h)` BS⁺ · `privacy or safety` BS · `more space / room layout` MW · `a food or culture need` BS · `extra help / clear info` MW · `quiet for rest or recovery` BS · `discretion — not being noticed` BS · `daytime sleep` BS · `other`

---

## Pro / Expert (generic)

**P14** `observer` — Rule you most apologise for. *(P-level)*
`check-in / check-out times` BS · `deposit / pre-authorisation` CF · `cancellation policy` MW · `parking fees or availability` BS · `no early / late flexibility` BS · `extra-guest / room limits` CF · `pet / smoking rules` CF · `the destination fee` MW *(demote — brand-level)* · `a booking rule` CF · `other`

**P17** `observer` — Pre-arrival asks (GoldMap §13/§9).
`parking` BS · `early check-in / luggage hold` BS⁺ · `directions / transport` BS · `room type / a request` MW · `restaurant / food` CF · `the bill / a deal` CF · `local tips` MW · `early departure / wake-up` BS · `accessibility / special need` BS · `other`

**P18** `observer` *(example optional)* — arrival/parking (carry v4.1 categories; example now optional).

**Verbatim (quote-only) — unchanged wording, designated quotes (no coding):**
P13 (the unofficial trick) · P15 (what a rival does) · P16 (the repeated fix) · P20b (what's missing) · P21 (the one free change) · P23 (real problem behind the complaint) · P24 (surprises new staff) · P25b (spot them early).

---

## Battery blocks — persona-tuned, gold-tagged

### A · Business *(GoldMap §6/§9/§10)*
BUS-1 `kano` · BUS-2 `single` — carry from v4.1.
**BUS-3** `observer` `deep` — One thing to save them time. *Pick one.*
`fast / express check-in & out` BS · `grab-and-go breakfast` BS⁺ · `coffee before dawn` BS⁺ · `a ready, quiet room without asking` BS⁺ · `the bill ready / sorted` BS · `a quick ride` BS · `printing / scanning` BS · `luggage hold for a late flight` BS · `late check-out to finish work` BS · `the usual (good Wi-Fi)` CF-sink · `other`
**BUS-4** `multi:2` `deep` — Most-forgotten items (all gold — the sundries market).
`phone charger` BS · `laptop charger` BS · `plug adapter` BS · `toothbrush / toiletries` BS · `razor / shaving kit` BS · `a tie / belt / formal item` BS · `iron or steamer` BS · `medication` BS · `something to print` BS · `umbrella` BS · `other`

### B · Early flight *(GoldMap §4/§9/§13)*
TRN-1 `kano` · TRN-2 `single` — carry from v4.1.
**TRN-3** `observer` `deep` — Late/early need when nothing's open. *Pick one.*
`coffee / hot food before dawn` BS⁺ · `a sure early wake-up` BS⁺ · `a packed breakfast to go` BS · `an early airport ride` BS · `hot food on a late arrival` BS · `luggage hold` BS · `a quiet short-sleep room` BS · `express pre-dawn check-out` BS · `a quiet room away from 5am noise` BS⁺ · `the usual (clean room)` CF-sink · `other`

### C · Holiday *(GoldMap: mostly CONFIRM — gold-thin, honestly)*
LEI-1 `kano` · LEI-2 `single` — carry from v4.1.
**LEI-3** `observer` `deep` — Wish they'd known / packed for Seattle. *Pick one.*
`rain gear / umbrella` BS · `warm layers` BS · `comfortable walking shoes` BS · `local transport info` MW · `what's worth seeing` MW · `weather expectations` BS · `tickets booked ahead` MW · `a late check-out` BS · `dining booked ahead` CF · `the usual (good location)` CF-sink · `other`

### D · Cruise *(GoldMap §2/§3/§6 — richest vein)*
CRU-1 `multi:3` · CRU-2 `single` — carry from v4.1.
**CRU-3** `multi:3` `deep` — Items they ask the desk for.
`sea-sickness pills` BS · `sunscreen` BS · `rain poncho / umbrella` BS · `a warm layer` BS · `luggage hold during the cruise` BS⁺ · `a port shuttle / ride` BS · `snacks / water for the port` BS · `early or packed breakfast` BS⁺ · `a quick shop before boarding` BS · `the usual (clean room)` CF-sink · `other`
**CRU-4** `observer` `deep` — Why a cruise guest picks a cruise-friendlier hotel. *Pick one (GoldMap §3 high).*
`free / cheap park-and-cruise` BS⁺ · `a port shuttle` BS⁺ · `early breakfast before they leave` BS · `luggage hold during the cruise` BS⁺ · `a cruise package deal` BS · `closer to the port` BS · `early check-in on arrival` BS · `a late check-out on return` BS · `cruise-line coordination` BS · `the usual (price)` CF-sink · `other`

### E · Event *(GoldMap §3/§4/§9)*
EVT-1 `multi:3` · EVT-2 `single` — carry from v4.1.
**EVT-3** `multi:3` `deep` — What you do differently on a busy event night.
`hold luggage` BS · `faster / pre-done check-in` BS · `extra late-night food / help` BS · `manage a group block` MW · `keep noise / quiet managed` BS · `later check-out` BS · `extra desk staff` MW · `coordinate venue transport` BS · `a quiet room from the crowd` BS · `the usual (location)` CF-sink · `other`

### F · Medical *(GoldMap §4 — fridge/late-food/quiet "Y, high")*
MED-1 `multi:3` · MED-2 `single` — carry from v4.1.
**MED-3** `observer` `deep` — Medical item or errand they need. *Pick one.*
`a thermometer` BS · `a heating pad / ice pack` BS · `a fridge for medicine` BS⁺ · `a pharmacy run / info` BS · `simple food late or 24h` BS⁺ · `a ride to the hospital` BS · `a quiet recovery room` BS⁺ · `accessible / mobility help` MW · `soft / special-diet food` BS · `the usual (clean room)` CF-sink · `other`

### G · Airline crew *(NEW — GoldMap §14 · conditional gold)*
**CREW-1** `kano` `core` — Mark each: a dark quiet room for daytime sleep · food at odd hours · a reliable odd-hour wake-up · uniform pressing · fast in-and-out check-in · the gym
**CREW-2** `single` `core` — When do they mostly sleep? A. Daytime · B. Night · C. Varies. *(example optional)*
**CREW-3** `observer` `deep` — What crew need that you're not set up for. *Pick all you've seen.*
`a truly dark daytime room` BS · `enforced do-not-disturb (no housekeeping knock)` BS⁺ · `a guaranteed odd-hour wake-up` BS⁺ · `hot food at 2am / 2pm` BS · `uniform pressing / laundry` BS · `a quiet floor from day noise` BS · `a packed meal to go` BS · `a fast odd-hour ride` BS · `gym at odd hours` MW · `the usual (clean room)` CF-sink · `other`
**CREW-4** `single` `deep` — **Is crew a real, recurring guest type for you?** A. Yes, regularly · B. Occasionally · C. Almost never. *(the segment-existence check — GoldMap §14; gates all crew findings)*

### H · Executive / VIP *(NEW — GoldMap §15 · the discretion contradiction)*
**VIP-1** `kano` `core` — Mark each: discretion / privacy · a single personal contact · a private / side entrance · the best room or upgrade · a welcome amenity · being recognised and greeted
**VIP-2** `single` `core` — What do they value MORE? A. Discretion and privacy · B. Recognition and being celebrated · C. Depends on the guest. *(the contradiction, head-on — example optional)*
**VIP-3** `observer` `deep` — What they need that you're not set up for. *Pick all you've seen.*
`a private / side entrance` BS · `discreet, fast check-in` BS · `a single trusted contact` BS · `staff briefed NOT to make a fuss` BS⁺ · `extra privacy / security` BS · `off-menu / in-room food` BS · `a last-minute request handled` BS · `something booked off-site discreetly` BS · `to NOT be upgraded loudly / announced` CON · `the usual (a nice room)` CF-sink · `other`
**VIP-4** `single` `deep` — When you give the full "VIP treatment" (amenity, greeting, announced upgrade), how do they react? A. They love it · B. Some want less fuss · C. They prefer to be left alone. *(tests the recognition-vs-discretion contradiction directly — GoldMap §15)*

---

## Family / Group add-ons

**F3** `observer` PRO — Harder for a family than a couple. *Pick one.*
`checking in with tired kids` BS · `meal times / kids' food` BS · `noise (theirs or others')` MW · `safety (pool, windows)` BS · `enough space / beds` MW · `early bedtimes vs hotel noise` BS · `bath / bedtime logistics` BS · `keeping kids occupied` MW · `cost of extras` CF · `the usual (a clean room)` CF-sink · `other`

**F4** `observer` PRO — Kids' item you don't have. *Pick one (all gold).*
`nappies / wipes` BS · `a night light` BS · `a bottle warmer` BS · `a cot / crib` MW · `kids' food / milk` BS · `toys / entertainment` BS · `a stroller` BS · `child-safety items (gate, socket cover)` BS · `a high chair` MW · `other`

**G1** `observer` PRO — Who you must keep happy. *Pick one.*
`the organiser / booker` BS · `the company / client` BS · `the travel agent` BS · `the on-site group leader` BS · `the person paying the bill` BS · `the guests themselves` CF · `other`

**G2** `observer` PRO — What goes wrong with groups. *Pick one.*
`noise / disturbance` MW · `check-in bottlenecks` BS · `billing confusion` BS · `room-block mix-ups` BS · `late-night issues` BS · `damage / extra cleaning` BS · `coordinating arrivals` BS · `one contact, many guests` BS · `the usual (a busier desk)` CF-sink · `other`

**G3** `observer` EXPERT — Problem a group causes other guests. *Pick one.*
`noise` MW · `taking over the lobby / common areas` BS · `crowding at check-in / lifts` BS · `pool / breakfast crowding` BS · `late-night disturbance` BS · `monopolising staff` BS · `other`

---

## Notes & impact

- **Item count:** L1 7→9; +2 battery blocks (CREW, VIP, 4 items each); ~18 items now carry gold-tagged structured options; 8 verbatim items remain; observer examples optional.
- **GoldMap dependency:** every tag traces to GoldMap **v0.4**; the report engine uses tags to grade confirm-vs-diverge and to **suppress CF-sink picks** from findings.
- **Honest limits:** Holiday is gold-thin (mostly CONFIRM — not faked). **Crew gold is gated by CREW-4** (if "almost never," crew findings are suppressed — that's the integrity rule, not a gap). VIP gold rides on execs + incognito-important guests; the celebrity slice is thin.
- **Downstream:** Data Model (option sets + tags), Output-Spec (tag-driven grading; CF-sink suppression), Architecture (deterministic engine — no AI). Agent story = RosaeNLG (local).

---

*GuestIQ · Questionnaire v4.2 · Gold-tagged · Persona-tuned in the battery · CF-sink suppresses table-stakes · Implements GoldMap v0.4*
