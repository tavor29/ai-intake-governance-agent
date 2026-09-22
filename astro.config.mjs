// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Default static output; only src/pages/api/intake.ts opts into on-demand
// rendering (export const prerender = false) so it can run server-side with
// the Jira/Slack credentials. See README for the Vercel env vars it needs.
export default defineConfig({
	output: 'static',
	adapter: vercel(),
});
