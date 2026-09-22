export interface JiraIssueInput {
	summary: string;
	department: string;
	riskBand: string;
	routedTeam: string;
	duplicateNames: string[];
}

export interface JiraIssueResult {
	issueKey: string;
	url: string;
	stubbed: boolean;
}

function toAdf(input: JiraIssueInput) {
	const lines = [
		`Department: ${input.department}`,
		`Risk band: ${input.riskBand}`,
		`Routed to: ${input.routedTeam}`,
		input.duplicateNames.length
			? `Possible duplicates: ${input.duplicateNames.join(', ')}`
			: 'No duplicates found in the catalog.',
	];
	return {
		type: 'doc',
		version: 1,
		content: lines.map((text) => ({ type: 'paragraph', content: [{ type: 'text', text }] })),
	};
}

/**
 * Live (Tier 1): creates a real Jira ticket via POST /rest/api/3/issue.
 * Until JIRA_* env vars are set (see .env.example / README), this stays
 * stubbed: it logs the payload it would send and returns a fake issue key
 * so the rest of the flow (and the on-page log) still works end to end.
 */
export async function createIssue(input: JiraIssueInput): Promise<JiraIssueResult> {
	const baseUrl = process.env.JIRA_BASE_URL;
	const email = process.env.JIRA_EMAIL;
	const apiToken = process.env.JIRA_API_TOKEN;
	const projectKey = process.env.JIRA_PROJECT_KEY;

	if (!baseUrl || !email || !apiToken || !projectKey) {
		const fakeKey = `GOV-${Math.floor(1000 + Math.random() * 9000)}`;
		console.log('[jira:stub] would create issue', { projectKey: '(unset)', ...input });
		return { issueKey: fakeKey, url: '#jira-not-configured', stubbed: true };
	}

	const response = await fetch(`${baseUrl}/rest/api/3/issue`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`,
		},
		body: JSON.stringify({
			fields: {
				project: { key: projectKey },
				summary: input.summary,
				issuetype: { name: 'Task' },
				description: toAdf(input),
			},
		}),
	});

	if (!response.ok) {
		throw new Error(`Jira create issue failed: ${response.status} ${await response.text()}`);
	}

	const data = (await response.json()) as { key: string };
	return { issueKey: data.key, url: `${baseUrl}/browse/${data.key}`, stubbed: false };
}
