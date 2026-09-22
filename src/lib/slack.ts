export interface SlackNotifyInput {
	summary: string;
	routedTeam: string;
	riskBand: string;
	jiraUrl: string;
}

/**
 * Live (Tier 1): posts a routing notification via a Slack incoming webhook
 * (a single POST {"text": "..."}, no auth header). Until SLACK_WEBHOOK_URL
 * is set, this stays stubbed: it logs the message it would send.
 */
export async function notify(input: SlackNotifyInput): Promise<{ stubbed: boolean }> {
	const webhookUrl = process.env.SLACK_WEBHOOK_URL;
	const text = `New intake routed to *${input.routedTeam}* (risk: ${input.riskBand}): ${input.summary}\n${input.jiraUrl}`;

	if (!webhookUrl) {
		console.log('[slack:stub] would post', { text });
		return { stubbed: true };
	}

	const response = await fetch(webhookUrl, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ text }),
	});

	if (!response.ok) {
		throw new Error(`Slack webhook failed: ${response.status} ${await response.text()}`);
	}

	return { stubbed: false };
}
