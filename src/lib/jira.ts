export interface JiraIssueInput {
	summary: string;
	requesterName: string;
	department: string;
	riskBand: string;
	routedTeam: string;
	duplicateNames: string[];
}

/** The issue exactly as it would be sent, shared by the live call and the on-page preview. */
export interface JiraIssueDraft {
	projectKey: string;
	issueType: string;
	summary: string;
	labels: string[];
	descriptionLines: string[];
}

export interface JiraIssueResult {
	issueKey: string;
	url: string;
	stubbed: boolean;
	draft: JiraIssueDraft;
}

export function buildIssue(input: JiraIssueInput, projectKey = 'GOV'): JiraIssueDraft {
	return {
		projectKey,
		issueType: 'Task',
		summary: input.summary,
		labels: ['ai-intake', `risk-${input.riskBand.toLowerCase()}`],
		descriptionLines: [
			`Requested by: ${input.requesterName} (${input.department})`,
			`Risk band: ${input.riskBand}`,
			`Routed to: ${input.routedTeam}`,
			input.duplicateNames.length
				? `Possible duplicates: ${input.duplicateNames.join(', ')}`
				: 'No duplicates found in the catalog.',
		],
	};
}

function toAdf(lines: string[]) {
	return {
		type: 'doc',
		version: 1,
		content: lines.map((text) => ({ type: 'paragraph', content: [{ type: 'text', text }] })),
	};
}

/**
 * Simulated by default: this demo intentionally runs without Jira credentials,
 * so it returns a fake issue key plus the exact draft it would have sent, and
 * the page renders that draft as a preview. Setting the JIRA_* env vars (see
 * .env.example / README) switches the same draft to a real
 * POST /rest/api/3/issue call.
 */
export async function createIssue(input: JiraIssueInput): Promise<JiraIssueResult> {
	const baseUrl = process.env.JIRA_BASE_URL;
	const email = process.env.JIRA_EMAIL;
	const apiToken = process.env.JIRA_API_TOKEN;
	const projectKey = process.env.JIRA_PROJECT_KEY;

	if (!baseUrl || !email || !apiToken || !projectKey) {
		const draft = buildIssue(input);
		const fakeKey = `${draft.projectKey}-${Math.floor(1000 + Math.random() * 9000)}`;
		return { issueKey: fakeKey, url: '#simulated', stubbed: true, draft };
	}

	const draft = buildIssue(input, projectKey);
	const response = await fetch(`${baseUrl}/rest/api/3/issue`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`,
		},
		body: JSON.stringify({
			fields: {
				project: { key: draft.projectKey },
				summary: draft.summary,
				issuetype: { name: draft.issueType },
				labels: draft.labels,
				description: toAdf(draft.descriptionLines),
			},
		}),
	});

	if (!response.ok) {
		throw new Error(`Jira create issue failed: ${response.status} ${await response.text()}`);
	}

	const data = (await response.json()) as { key: string };
	return { issueKey: data.key, url: `${baseUrl}/browse/${data.key}`, stubbed: false, draft };
}
