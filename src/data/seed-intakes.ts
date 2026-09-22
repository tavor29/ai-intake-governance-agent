import type { Department, ToolCategory } from './meridian-dynamics';

/**
 * Fake historical intake log so the demo doesn't open empty. This repo only
 * (not shared with Project 2). New submissions during a visit are appended
 * client-side on top of this list; nothing here is a real database, it
 * resets on reload, see the README's honest limitation.
 */
export interface IntakeLogEntry {
	id: string;
	date: string;
	requesterId: string;
	department: Department;
	description: string;
	category: ToolCategory;
	duplicateOf?: string;
	riskBand: 'Low' | 'Medium' | 'High';
	routedTeamId: string;
	jiraIssueKey: string;
}

export const seedIntakes: IntakeLogEntry[] = [
	{ id: 'intake-001', date: '2026-06-02', requesterId: 'priya-patel', department: 'R&D', description: 'A lightweight dashboard to track nightly ETL job status', category: 'reporting', riskBand: 'Low', routedTeamId: 'rd-qa-tooling', jiraIssueKey: 'GOV-101' },
	{ id: 'intake-002', date: '2026-06-05', requesterId: 'james-oconnell', department: 'Finance', description: 'Automated flagging of expense reports missing receipts', category: 'automation', duplicateOf: 'expenseecho', riskBand: 'Medium', routedTeamId: 'fin-procurement', jiraIssueKey: 'GOV-102' },
	{ id: 'intake-003', date: '2026-06-09', requesterId: 'noah-fischer', department: 'IT/Engineering', description: 'A bot that routes IT tickets automatically by keyword', category: 'automation', duplicateOf: 'ticketrelay', riskBand: 'Low', routedTeamId: 'eng-service-desk', jiraIssueKey: 'GOV-103' },
	{ id: 'intake-004', date: '2026-06-12', requesterId: 'aisha-bakr', department: 'Operations', description: 'Tool that pulls candidate resumes and scores them against a job description', category: 'data', riskBand: 'High', routedTeamId: 'hr-people-ops', jiraIssueKey: 'GOV-104' },
	{ id: 'intake-005', date: '2026-06-18', requesterId: 'diego-alvarez', department: 'Finance', description: 'A tool to pull vendor invoice PDFs into a searchable index', category: 'data', duplicateOf: 'invoiceindex', riskBand: 'Medium', routedTeamId: 'fin-procurement', jiraIssueKey: 'GOV-105' },
	{ id: 'intake-006', date: '2026-06-25', requesterId: 'ellie-sandberg', department: 'Operations', description: 'Chatbot that answers employee facilities questions in Slack', category: 'communication', riskBand: 'Low', routedTeamId: 'ops-facilities', jiraIssueKey: 'GOV-106' },
	{ id: 'intake-007', date: '2026-07-02', requesterId: 'hana-suzuki', department: 'R&D', description: 'Internal model that scores support tickets by urgency using account and billing data', category: 'data', riskBand: 'High', routedTeamId: 'rd-qa-tooling', jiraIssueKey: 'GOV-107' },
	{ id: 'intake-008', date: '2026-07-10', requesterId: 'grace-okafor', department: 'HR', description: 'A weekly digest of open requisitions sent to hiring managers', category: 'reporting', duplicateOf: 'recruitradar', riskBand: 'Low', routedTeamId: 'hr-people-ops', jiraIssueKey: 'GOV-108' },
	{ id: 'intake-009', date: '2026-07-15', requesterId: 'marcus-webb', department: 'Operations', description: 'A tool that syncs warehouse shift schedules with payroll', category: 'automation', riskBand: 'High', routedTeamId: 'fin-accounting-ops', jiraIssueKey: 'GOV-109' },
];
