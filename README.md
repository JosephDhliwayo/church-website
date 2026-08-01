# Church Website (Zimbabwe) — Online Giving

Next.js site for a church in Zimbabwe with online giving for tithes, offerings, and other
funds. Church name/details are placeholders in [`lib/config.ts`](lib/config.ts) — update them
before launch.

## Giving Flow

- **Mobile Money (EcoCash / OneMoney)** and **Card / ZimSwitch** — via [Pesepay](https://pesepay.com), Zimbabwe's local payment gateway
- **International Card** — via [Stripe](https://stripe.com), for diaspora/overseas givers paying in USD

Every donation attempt is recorded in a `donations` table (Postgres, via Drizzle ORM) as
`pending`, then flipped to `paid`/`failed` once the gateway confirms the transaction.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — a Postgres connection string (e.g. [Neon](https://neon.tech) or Vercel Postgres)
   - `PESEPAY_INTEGRATION_KEY` / `PESEPAY_ENCRYPTION_KEY` — from your Pesepay merchant dashboard ([pesepay.com](https://pesepay.com))
   - `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` — from your Stripe dashboard
   - `NEXT_PUBLIC_SITE_URL` — the public URL of the site (used to build payment redirect/callback URLs)
3. Push the database schema:
   ```bash
   npm run db:push
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```

## Testing Payments Locally

- **Pesepay**: use your Pesepay sandbox/test integration credentials. Pesepay's result URL
  webhook needs to reach your machine — use a tunnel (e.g. `ngrok http 3000`) and set
  `NEXT_PUBLIC_SITE_URL` to the tunnel URL while testing.
- **Stripe**: use test mode keys, and forward webhooks locally with:
  ```bash
  stripe listen --forward-to localhost:3000/api/payments/stripe/webhook
  ```

## Not Yet Implemented

- Emailed giving receipts (add once an email provider — e.g. Resend — is chosen)
- Admin dashboard for viewing/exporting donations (the `donations` table already has everything needed)
- Donor accounts/login (giving is currently guest-checkout style)

## Deploy on Vercel

The easiest way to deploy is the [Vercel Platform](https://vercel.com/new). Set the same
environment variables above in your Vercel project settings, and point the Pesepay/Stripe
webhook URLs at your production domain.
