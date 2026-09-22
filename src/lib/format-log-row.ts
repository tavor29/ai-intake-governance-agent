import { employees, teams, type Department } from '../data/meridian-dynamics';

export interface LogRow {
	id: string;
	date: string;
	requesterName: string;
	department: Department;
	description: string;
	riskBand: 'Low' | 'Medium' | 'High';
	routedTeamName: string;
	jiraIssueKey: string;
	jiraUrl?: string;
}

export interface LogRowInput {
	id: string;
	date: string;
	requesterId: string;
	department: Department;
	description: string;
	riskBand: 'Low' | 'Medium' | 'High';
	routedTeamId: string;
	jiraIssueKey: string;
	jiraUrl?: string;
}

/** Shared by the server-rendered seed rows and the client script's new rows, so both format identically. */
export function toLogRow(entry: LogRowInput): LogRow {
	const requester = employees.find((e) => e.id === entry.requesterId);
	const team = teams.find((t) => t.id === entry.routedTeamId);
	return {
		id: entry.id,
		date: entry.date,
		requesterName: requester?.name ?? 'Unknown',
		department: entry.department,
		description: entry.description,
		riskBand: entry.riskBand,
		routedTeamName: team?.name ?? 'Unassigned',
		jiraIssueKey: entry.jiraIssueKey,
		jiraUrl: entry.jiraUrl,
	};
}
