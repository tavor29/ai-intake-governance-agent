import type { APIRoute } from 'astro';
import { employees, type Department, type ToolCategory } from '../../data/meridian-dynamics';
import { findDuplicates } from '../../lib/duplication-check';
import { scoreRisk, type FinancialAccess, type IntegrationSurface, type PiiExposure } from '../../lib/risk-score';
import { recommendRouting } from '../../lib/routing';
import { createIssue } from '../../lib/jira';
import { notify } from '../../lib/slack';

export const prerender = false;

interface IntakeRequestBody {
	requesterId: string;
	department: Department;
	description: string;
	category: ToolCategory;
	pii: PiiExposure;
	financial: FinancialAccess;
	integrations: IntegrationSurface;
}

export const POST: APIRoute = async ({ request }) => {
	const body = (await request.json()) as IntakeRequestBody;

	const requester = employees.find((e) => e.id === body.requesterId);
	if (!requester || !body.description?.trim()) {
		return new Response(JSON.stringify({ error: 'Missing requester or description' }), { status: 400 });
	}

	const duplicates = findDuplicates(body.description, body.category);
	const risk = scoreRisk({ pii: body.pii, financial: body.financial, integrations: body.integrations });
	const routedTeam = recommendRouting(body.department);

	const jira = await createIssue({
		summary: body.description,
		department: body.department,
		riskBand: risk.band,
		routedTeam: routedTeam.name,
		duplicateNames: duplicates.map((d) => d.name),
	});

	const slack = await notify({
		summary: body.description,
		routedTeam: routedTeam.name,
		riskBand: risk.band,
		jiraUrl: jira.url,
	});

	return new Response(
		JSON.stringify({
			duplicates,
			risk,
			routedTeam,
			jiraIssueKey: jira.issueKey,
			jiraUrl: jira.url,
			stubbed: jira.stubbed || slack.stubbed,
		}),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	);
};
