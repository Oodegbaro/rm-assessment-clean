# RM Account Planning — Training & Assessment Platform

A self-serve web app that trains Access Bank Ghana Relationship Managers on the
Commercial Excellence account-planning framework, then tests whether it landed.

Full flow: **Login → Home hub → Training (8 modules) → Assessment (30 randomized
questions) → Results**, plus a separate **Admin dashboard**.

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
  training/page.js            Thin wrapper; loads the static training engine
  training/TrainingTopBar.js  Home/Logout bar for the training page
  assessment/page.js          Gated on training completion; loads quiz-engine.js
  assessment/LogoutBar.js     Home/Logout bar for the assessment page
  admin/page.js                Password-gated participation dashboard
  admin/login/page.js
  api/
    auth/                     request-code, verify-code, logout
    training/                 complete, progress, evaluate-prompt
    results/                  submit an assessment result
    admin/                    admin login, participants data
lib/
  kv.js                       Every KV read/write in the app — the data layer
  mailer.js                   Resend wrapper (login codes + completion emails)
  session.js                  Signed session cookies (Web Crypto, Edge-safe)
  trainingMarkup.js           The training pages' static HTML, as an exported string
public/
  quiz-engine.js / .css       The entire assessment — a self-contained vanilla-JS app
  training-engine.js / .css   The entire training flow — same pattern, separate app
  training-slides/*.jpg       Real slides pulled from the original workshop deck
middleware.js                  Route protection (session checks) for every gated page
```

**Why `quiz-engine.js` and `training-engine.js` aren't React:** both were built as
single self-contained vanilla-JS files that manage their own state and DOM directly,
loaded via `<Script>` into a nearly-empty page. This was a deliberate choice —
it let the interactive content (drag-and-drop, branching logic, 150 questions)
be built and iterated on independently of the Next.js app shell around it.
**If you're extending either file:** every module inside `training-engine.js` is
wrapped in its own `(function(){ ... })();` and explicitly exposes only the
functions its HTML actually calls via `window.functionName = functionName`.
This is load-bearing — without it, two modules defining a same-named function
(e.g. `checkSort`) will silently overwrite each other, since plain `<script>`
tags share one global scope for function declarations (though not for `let`/`const`,
which get their own scope per script). If you add a new function that's called
from an `onclick` attribute, it must go through this same expose pattern.

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

- **Training progress is saved for 30 days, at module granularity only.** If
  someone closes the browser mid-module, they resume at the start of that
  module, not the exact question. Full mid-module resume would require each
  of the 8 modules to persist its own internal state — a real project on its
  own if it's ever needed.
- **`UNIVERSAL_CODE` is a deliberate security trade-off.** Since it works for
  any email, someone who knows it could type in a colleague's address and log
  in as them. Accepted for an internal training tool; would not be
  appropriate for anything higher-stakes.
- **Module 7's AI grading needs `ANTHROPIC_API_KEY`.** Without it, that one
  exercise transparently falls back to a keyword-matching "Demo mode" —
  labeled as such on screen, never silently wrong.
- **The question bank (150 items) lives inside `quiz-engine.js`, not a
  database.** Editing a question means editing that file directly and
  redeploying. `03_Question_Bank.xlsx` is a human-readable mirror of the exact
  same data for review purposes — it is not the source of truth and editing
  it does not change the live app.
- **Mobile/tablet support:** every drag-and-drop interaction (both training
  and assessment) has a tap-to-select fallback, since native HTML5 drag
  events don't fire on touchscreens at all. Both paths call the same
  underlying logic, so they can't drift out of sync with each other.
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
3. If `training-engine.js` and `lib/trainingMarkup.js` (or `quiz-engine.js`
   and `quiz-engine.css`) ever seem out of sync — e.g. content appears
   unstyled, or a button does nothing — replace **both halves of the pair
   together**, never just one. They're tightly coupled.
