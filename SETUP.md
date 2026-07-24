# Account Planning Assessment — Setup

This is now a small web app rather than a single file, because real
authentication and saved progress both need a backend. Here's exactly what
to do, in order.

## 1. Put this project on GitHub

Vercel can deploy from a single dragged-in file, but a multi-file app with
serverless functions works far more reliably imported from a Git repo. If
you don't already have a GitHub account, create one (free), then:

1. Create a new empty repository (any name, e.g. `rm-account-assessment`)
2. Upload this whole folder's contents into that repository (GitHub's web
   UI lets you drag a folder of files in directly — you don't need the
   command line)

## 2. Create a Resend account (for sending login-code emails)

1. Go to **resend.com** and sign up (free tier is plenty for this)
2. Go to **API Keys** and create one — copy it, you'll need it in step 4
3. You can start sending immediately using Resend's shared test address
   (`onboarding@resend.dev`) — no domain setup required. If you'd rather
   emails come from a BCG-branded address, Resend has a "Domains" section
   to verify your own sending domain, but that's optional.

## 3. Import the project into Vercel

1. Go to **vercel.com → Add New → Project**
2. This time, instead of drag-and-drop, choose **Import Git Repository**
   and select the repo you created in step 1
3. Vercel will detect it's a Next.js app automatically — leave the default
   build settings as they are
4. **Don't click Deploy yet** — first add the environment variables below,
   or the app won't work correctly on first deploy

## 4. Add a Vercel KV store (for storing codes, sessions, and progress)

1. Still on the import screen (or afterward, from your project's dashboard)
   go to the **Storage** tab
2. Click **Create Database → KV**, give it any name, and connect it to
   this project
3. Vercel automatically adds the right environment variables for you
   (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, etc.) — you don't need to type
   these in yourself

## 5. Add the remaining environment variables

In the project's **Settings → Environment Variables**, add:

| Name | Value |
|---|---|
| `SESSION_SECRET` | Any long random string. On a Mac/Linux terminal: `openssl rand -base64 32`. If you don't have a terminal handy, any random 40+ character string works. |
| `ADMIN_PASSWORD` | Whatever password you want to use to view results at `/admin` |
| `RESEND_API_KEY` | The API key from step 2 |
| `EMAIL_FROM` | `Account Planning Assessment <onboarding@resend.dev>` (or your own verified address) |

## 6. Deploy

Click **Deploy**. Give it a minute or two.

## 7. Try it

- Visit your new `.vercel.app` URL — it should send you to `/login`
- Enter an `@bcg.com` email, check that inbox for the 6-digit code
- After verifying, you land on `/assessment`
- Visit `/admin` on the same site, enter your `ADMIN_PASSWORD`, and you'll
  see a running list of everyone who's completed the assessment and their
  score

## How saved progress works

Every time someone submits an answer or moves between questions, their
current position and all their answers so far are saved to the KV store,
tied to their email. If they close the tab and come back later, logging
in again with a fresh code will drop them back exactly where they left
off — same randomized questions, same answers, same position — rather
than starting over.

Clicking **"New randomized attempt"** on the results screen clears that
saved progress and rolls an entirely fresh randomized draw.

## A couple of things worth knowing

- **Sessions end when the browser fully closes** (not just the tab, if
  other tabs of the same browser are still open elsewhere — that's a
  browser-level limitation, not something a website can control more
  precisely than that).
- **Only the most recent completed attempt per person is kept** in the
  admin view — if someone does a "New randomized attempt" and finishes
  again, their earlier result is replaced by the new one, not kept as a
  separate row. If you'd rather keep a full history of every attempt,
  that's a small change I can make.
- Scoring happens in the browser and is then reported to the server. For
  an internal training tool this is a reasonable trade-off, but it does
  mean a technically sophisticated person could tamper with their own
  score before it's sent. If this ever needs to be tamper-proof (e.g. for
  a certification with real stakes), scoring would need to move to the
  server — happy to do that if it becomes a real requirement.
