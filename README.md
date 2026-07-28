# RM Account Planning — Training & Assessment Platform

A self-serve web app that trains Access Bank Ghana Relationship Managers on the
Commercial Excellence account-planning framework, then tests whether it landed.

Full flow: **Login → Home hub → Training (7 modules, sequential) → Assessment (30
randomized questions) → Results**, plus a separate **Admin dashboard**.

Access is restricted to email addresses ending in `@bcg.com` or
`@accessbankplc.com` — enforced in **two** places, `app/api/auth/request-code/route.js`
and `app/api/auth/verify-code/route.js` (login is checked at both the
code-request and code-verify steps, so both need updating together if this
ever changes).

See `01_Architecture_Schematic.html` (in the handover package) for a visual map
of the whole system with every access condition labeled. This file is the
technical reference for whoever maintains the code day to day.

## Stack

- **Next.js 14** (App Router), deployed on **Vercel**
- **Vercel KV** (Redis) for all storage — no separate database
- **Resend** for login-code emails and completion notifications
- **Anthropic API** (optional) for real AI grading in one training exercise

## File map — where things actually live

```
app/
  login/page.js              Email + code entry
  home/page.js                Hub: Training card + Assessment card
  training/page.js            Training hub: 7 module cards, sequential unlock, server-rendered
  training/TrainingTopBar.js  Home/Logout bar for the training page
  assessment/page.js          Gated on training completion; loads quiz-engine.js
  assessment/LogoutBar.js     Home/Logout bar for the assessment page
  admin/page.js                Password-gated participation analytics dashboard
  admin/login/page.js
  api/
    auth/                     request-code, verify-code, logout
    training/                 complete, progress, module-complete, evaluate-prompt
    results/                  submit an assessment result
    admin/                    admin login, participants data
    cron/                     daily certified-report (schedule in vercel.json)
lib/
  kv.js                       Every KV read/write in the app — the data layer
  mailer.js                   Resend wrapper (login codes + completion + daily report emails)
  session.js                  Signed session cookies (Web Crypto, Edge-safe)
public/
  quiz-engine.js / .css       The entire assessment — a self-contained vanilla-JS app
  training-modules/*.html     THE CURRENT TRAINING SYSTEM — 7 independent, fully
                               self-contained module files (own HTML/CSS/JS each, no
                               shared engine). Sequential access is enforced in
                               middleware.js, not just hidden in the UI.
  training-engine.js / .css   DORMANT — the old 8-module merged-engine training
                               system. Left in the repo on request, in case of a
                               revert. Nothing currently references it.
lib/trainingMarkup.js          DORMANT for the same reason as above.
middleware.js                  Route protection for every gated page, PLUS
                                sequential-unlock enforcement for /training-modules/*
vercel.json                     Cron schedule for the daily certified-report email
```

**Why the training system changed architecture entirely:** the original
8-module system was one shared JS "engine" file with every module's logic
namespaced and merged together — powerful, but fragile (this exact coupling
caused the same class of bug three separate times across this project's
history). The current 7-module system is the opposite design: each module is
a fully independent, self-contained file, built by a different process
entirely (Action Mapping instructional design, a fictional client so no real
client data appears anywhere in training content, accessibility verified by
contrast calculation, not eyeballing). The trade-off: each standalone file
only knows how to write to `localStorage`, not this app's backend — so a
small snippet was added to each file's completion trigger to report back to
`/api/training/module-complete`, and the sequential lock is enforced in
`middleware.js` by intercepting requests to the static files directly, not
just by hiding links on the hub page. **If you edit a module file's
completion logic, make sure the `fetch('/api/training/module-complete', ...)`
call survives the edit** — it's easy to accidentally delete while changing
the screen-transition logic around it.

**Why `quiz-engine.js` isn't React:** it was built as a single self-contained
vanilla-JS file that manages its own state and DOM directly, loaded via
`<Script>` into a nearly-empty page — a deliberate choice that let 150
questions and their branching logic be built independently of the Next.js
shell around it.

## Environment variables

| Variable | Required? | Purpose |
|---|---|---|
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Yes (auto-set by Vercel KV) | All data storage |
| `SESSION_SECRET` | Yes | Signs login session cookies |
| `ADMIN_PASSWORD` | Yes | Gates `/admin` |
| `RESEND_API_KEY` | Yes | Sends login codes |
| `EMAIL_FROM` | Yes | Sender address for emails |
| `UNIVERSAL_CODE` | Recommended | Shared backup login code, bypasses email delivery entirely |
| `ADMIN_NOTIFY_EMAIL` | Optional | Real-time email on every completed assessment, and recipient of the daily certified-people report |
| `CRON_SECRET` | Recommended | Protects the daily report's cron endpoint from being triggered by anyone who finds the URL |
| `ANTHROPIC_API_KEY` | Optional | Real AI grading in Module 7's capstone exercise |

Full setup walkthrough with links: `04_Rebuild_Guide.html`.

## Known limitations — by design, not oversight

- **Each of the 7 training modules tracks its own internal progress in
  `localStorage`, not on the server.** Only whole-module completion reaches
  the server (via the fetch call added to each file). If someone closes the
  browser mid-module, that module's `localStorage` state may still let them
  resume mid-way in the *same browser* — but the server has no visibility
  into that, and a different browser/device starts that module from zero.
- **`UNIVERSAL_CODE` is a deliberate security trade-off.** Since it works for
  any email, someone who knows it could type in a colleague's address and log
  in as them. Accepted for an internal training tool; would not be
  appropriate for anything higher-stakes.
- **Module 6's AI-verification exercise is entirely content-based, not a live
  AI call** — unlike the old Module 7's AI grading (see the dormant system
  below), this module teaches AI verification through fixed scenarios, no
  `ANTHROPIC_API_KEY` involved.
- **The question bank (150 items) lives inside `quiz-engine.js`, not a
  database.** Editing a question means editing that file directly and
  redeploying. `03_Question_Bank.xlsx` is a human-readable mirror of the exact
  same data for review purposes — it is not the source of truth and editing
  it does not change the live app.
- **The assessment's drag-and-drop questions have a tap-to-select fallback**
  for touchscreens, since native HTML5 drag events don't fire there at all.
  The 7 training modules don't need this — they were built without native
  drag-and-drop in the first place, using only real `<button>` elements
  throughout, so this isn't a gap in the new system.
- **The daily certified-report cron job is defined in `vercel.json`**,
  currently set to run at 7am UTC (`"0 7 * * *"`). Vercel's free Hobby plan
  supports cron jobs but limits how many/how often — daily is safely within
  that limit. If it ever stops firing, check Project → Cron Jobs in the
  Vercel dashboard for the actual invocation log, not just the code.

## If something breaks

1. Check the Vercel deployment log first — most failures name the exact
   missing file or env var in the first few lines.
2. Check the browser console (F12 → Console) for client-side errors — most
   "nothing happens when I click X" issues show a red error there.
3. **`quiz-engine.js` and `quiz-engine.css` are a tightly coupled pair** — if
   they ever seem out of sync (content appears unstyled, or a button does
   nothing), replace both together, never just one.
4. **If a training module's "Finish" button seems to complete locally but
   never appears on the admin dashboard**, check that module's file still
   has its `fetch('/api/training/module-complete', ...)` call intact — this
   is the one piece connecting an otherwise fully offline-capable file back
   to the server, and it's easy to lose in a future edit.
5. **If someone reports a module "unlocking" that shouldn't be possible yet**,
   check `middleware.js`'s `matcher` config still includes
   `/training-modules/:path*` — this is the actual enforcement point for
   sequential access, not the hub page's UI.
