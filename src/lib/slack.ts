export interface SlackNotifyInput {
	summary: string;
	requesterName: string;
	department: string;
	routedTeam: string;
	riskBand: string;
	duplicateNames: string[];
	jiraIssueKey: string;
	jiraUrl: string;
}

/**
 * The message exactly as it would be posted, in Slack mrkdwn (*bold*,
 * <url|label> links). Shared by the live webhook call and the on-page preview.
 */
export function buildMessage(input: SlackNotifyInput): string {
	return [
		`New intake request: *${input.summary}*`,
		`From ${input.requesterName} (${input.department}) · Risk: *${input.riskBand}* · Routed to *${input.routedTeam}*`,
		input.duplicateNames.length
			? `Possible duplicate: ${input.duplicateNames.join(', ')}. Check before building.`
			: 'No duplicates in the catalog.',
		`<${input.jiraUrl}|${input.jiraIssueKey}>`,
	].join('\n');
}

/**
 * Simulated by default: without SLACK_WEBHOOK_URL this returns the message it
 * would have posted, and the page renders it as a preview. With the env var
 * set, the same message goes to a Slack incoming webhook (a single
 * POST {"text": "..."}, no auth header).
 */
export async function notify(input: SlackNotifyInput): Promise<{ stubbed: boolean; text: string }> {
	const webhookUrl = process.env.SLACK_WEBHOOK_URL;
	const text = buildMessage(input);

	if (!webhookUrl) {
		return { stubbed: true, text };
	}

	const response = await fetch(webhookUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ text }),
	});

	if (!response.ok) {
		throw new Error(`Slack webhook failed: ${response.status} ${await response.text()}`);
	}

	return { stubbed: false, text };
}
