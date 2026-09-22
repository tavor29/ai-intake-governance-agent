# AI Project Intake & Governance Agent

**Fictional demo, synthetic data.** Built for a fictional company, Meridian Dynamics, never real client data. Part of [Tavor Ben Shahar](https://github.com/tzavor29)'s portfolio; the real work this generalizes from is Case study A, Part 1 (AI tool governance and intake at Keshet Media Group), on the portfolio site.

## Problem

In most organizations, requests for new software or AI tools arrive over chat and hallway conversations with no consistent process. That creates duplicate purchases, unmanaged risk, and no clear owner for follow-up.

## What it does

An agent that interviews the requester, turns a plain-language ask into a structured technical spec, checks it against an existing app and tool catalog for duplicates, scores risk across a few dimensions (PII exposure, financial system access, integration surface), and routes it to the right owner based on team capacity.

## What it demonstrates

Governance design thinking, not just coding. The interesting part is the decision logic, not the chat interface, this is the generalized, fully-built version of the system Tavor scoped for real at Keshet.

## Rejected alternative

I considered a model where a single reviewer approved or rejected every request by hand. I rejected it because a single gatekeeper doesn't scale past a small team, and it creates exactly the kind of bottleneck this problem is trying to remove.

## Honest limitation

This assumes a single identity provider and a relatively flat approval structure. A multi-entity organization with separate security domains would need a more complex routing and approval model than this MVP handles. The "past intakes" log is also demo-only: it's seeded plus whatever you submit in your own browser session, not a real database, it resets on reload.

## Integration map

| System | This demo | In production |
| --- | --- | --- |
| Jira | Live (free-tier project, real ticket created) | Same, against the org's real instance |
| Slack | Live (webhook to a test channel for routing notifications) | Same |
| App/tool catalog | Simulated (seeded fake dataset, `src/data/meridian-dynamics.ts`) | Real CMDB or SaaS inventory system |
| Identity/risk signals (PII classification) | Simulated, schema modeled on a real API's docs (see `src/lib/risk-score.ts`) | Real data classification service |

## Running it locally

```sh
npm install
npm run dev
```

Without any env vars set, Jira and Slack calls are stubbed: they log what they would send to the console and the app still works end to end (fake issue key, on-page log still updates).

## Live integrations

To make the Jira/Slack calls real, copy `.env.example` to `.env` (locally) or set these in the Vercel project's environment variables:

- `JIRA_BASE_URL` — your Jira Cloud site, e.g. `https://your-site.atlassian.net`
- `JIRA_EMAIL` — the Atlassian account email tied to the API token
- `JIRA_API_TOKEN` — created at [id.atlassian.com](https://id.atlassian.com) under Security → API tokens
- `JIRA_PROJECT_KEY` — the project the ticket gets created in
- `SLACK_WEBHOOK_URL` — an incoming webhook URL from a Slack app installed to a test channel

## Non-goals

Actual provisioning, SSO/identity integration, and multi-approver workflow are documented as out of scope, not built here.

## Stack

Astro (static output) with `@astrojs/vercel`; only `src/pages/api/intake.ts` runs on-demand (`export const prerender = false`), everything else is static. No UI framework, the intake form and log view are vanilla TypeScript/DOM. Shares design tokens and Meridian Dynamics seed data with the rest of the portfolio (copied, not imported across repos, see the portfolio's `CLAUDE.md`).
