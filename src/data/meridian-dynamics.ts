/**
 * Shared fictional seed data for Meridian Dynamics, a ~6,000-employee fictional
 * company used only inside Project 1 (AI Project Intake & Governance Agent) and
 * Project 2 (Citizen Development Governance Model), never in the case studies,
 * blog, or Open Source & Tools section (see CLAUDE.md's Ground truth).
 *
 * This file is the single authored source of truth. Project 1 and Project 2
 * each live in their own repo (see CLAUDE.md's "Secrets and hosting for live
 * integrations"), so when those repos are created in Blocks 3-4, copy this
 * file into each verbatim rather than re-deriving it, and keep the copies
 * identical, don't let them drift.
 */

export const departments = ['IT/Engineering', 'R&D', 'Finance', 'Operations', 'HR'] as const;

export type Department = (typeof departments)[number];

export interface Team {
	id: string;
	name: string;
	department: Department;
	/** Rough open capacity for Project 1's intake routing recommendation. */
	capacity: 'low' | 'medium' | 'high';
}

export const teams: Team[] = [
	{ id: 'eng-platform', name: 'Platform Engineering Team', department: 'IT/Engineering', capacity: 'medium' },
	{ id: 'eng-infra-cloud', name: 'Infrastructure & Cloud Team', department: 'IT/Engineering', capacity: 'low' },
	{ id: 'eng-service-desk', name: 'IT Service Desk Team', department: 'IT/Engineering', capacity: 'high' },
	{ id: 'rd-platform', name: 'Platform Team', department: 'R&D', capacity: 'medium' },
	{ id: 'rd-applied-ai', name: 'Applied AI Team', department: 'R&D', capacity: 'low' },
	{ id: 'rd-qa-tooling', name: 'QA & Tooling Team', department: 'R&D', capacity: 'high' },
	{ id: 'fin-fpa', name: 'FP&A Team', department: 'Finance', capacity: 'medium' },
	{ id: 'fin-procurement', name: 'Procurement Team', department: 'Finance', capacity: 'high' },
	{ id: 'fin-accounting-ops', name: 'Accounting Operations Team', department: 'Finance', capacity: 'medium' },
	{ id: 'ops-global-ops', name: 'Global Operations Team', department: 'Operations', capacity: 'medium' },
	{ id: 'ops-supply-chain', name: 'Supply Chain Team', department: 'Operations', capacity: 'low' },
	{ id: 'ops-facilities', name: 'Facilities & Workplace Team', department: 'Operations', capacity: 'high' },
	{ id: 'hr-talent-acquisition', name: 'Talent Acquisition Team', department: 'HR', capacity: 'medium' },
	{ id: 'hr-people-ops', name: 'People Operations Team', department: 'HR', capacity: 'high' },
	{ id: 'hr-ld', name: 'L&D Team', department: 'HR', capacity: 'medium' },
];

export interface Employee {
	id: string;
	name: string;
	department: Department;
	teamId: string;
}

/** Seeded requesters/contributors, reused across both projects rather than invented per-project. */
export const employees: Employee[] = [
	{ id: 'maya-chen', name: 'Maya Chen', department: 'R&D', teamId: 'rd-applied-ai' },
	{ id: 'daniel-ruiz', name: 'Daniel Ruiz', department: 'IT/Engineering', teamId: 'eng-platform' },
	{ id: 'priya-patel', name: 'Priya Patel', department: 'R&D', teamId: 'rd-platform' },
	{ id: 'james-oconnell', name: "James O'Connell", department: 'Finance', teamId: 'fin-fpa' },
	{ id: 'aisha-bakr', name: 'Aisha Bakr', department: 'Operations', teamId: 'ops-global-ops' },
	{ id: 'tom-nakamura', name: 'Tom Nakamura', department: 'HR', teamId: 'hr-people-ops' },
	{ id: 'sofia-rossi', name: 'Sofia Rossi', department: 'R&D', teamId: 'rd-qa-tooling' },
	{ id: 'ben-whitfield', name: 'Ben Whitfield', department: 'IT/Engineering', teamId: 'eng-infra-cloud' },
	{ id: 'lena-kowalski', name: 'Lena Kowalski', department: 'Finance', teamId: 'fin-procurement' },
	{ id: 'marcus-webb', name: 'Marcus Webb', department: 'Operations', teamId: 'ops-supply-chain' },
	{ id: 'grace-okafor', name: 'Grace Okafor', department: 'HR', teamId: 'hr-talent-acquisition' },
	{ id: 'noah-fischer', name: 'Noah Fischer', department: 'IT/Engineering', teamId: 'eng-service-desk' },
	{ id: 'hana-suzuki', name: 'Hana Suzuki', department: 'R&D', teamId: 'rd-applied-ai' },
	{ id: 'diego-alvarez', name: 'Diego Alvarez', department: 'Finance', teamId: 'fin-accounting-ops' },
	{ id: 'ellie-sandberg', name: 'Ellie Sandberg', department: 'Operations', teamId: 'ops-facilities' },
	{ id: 'ravi-menon', name: 'Ravi Menon', department: 'HR', teamId: 'hr-ld' },
];

export const toolCategories = ['reporting', 'automation', 'data', 'communication'] as const;

export type ToolCategory = (typeof toolCategories)[number];

export interface SeededTool {
	id: string;
	name: string;
	category: ToolCategory;
	/** One line, kept generic per the confidentiality rule, no real vendor names. */
	description: string;
	department: Department;
	teamId: string;
	builtById: string;
}

/** Fake existing-app/tool catalog for Project 1's duplication check and Project 2's stage tracker. */
export const tools: SeededTool[] = [
	{ id: 'pulseboard', name: 'PulseBoard', category: 'reporting', description: 'Weekly ops metrics dashboard pulling from shared spreadsheets.', department: 'Operations', teamId: 'ops-global-ops', builtById: 'aisha-bakr' },
	{ id: 'spendsnap', name: 'SpendSnap', category: 'reporting', description: 'Ad hoc budget-vs-actual report generator for department heads.', department: 'Finance', teamId: 'fin-fpa', builtById: 'james-oconnell' },
	{ id: 'ticketrelay', name: 'TicketRelay', category: 'automation', description: 'Auto-routes support tickets to a queue by keyword matching.', department: 'IT/Engineering', teamId: 'eng-service-desk', builtById: 'noah-fischer' },
	{ id: 'onboardflow', name: 'OnboardFlow', category: 'automation', description: 'Sends new-hire paperwork reminders on a fixed schedule.', department: 'HR', teamId: 'hr-people-ops', builtById: 'tom-nakamura' },
	{ id: 'datastitch', name: 'DataStitch', category: 'data', description: 'Nightly job that merges two legacy exports into one table.', department: 'R&D', teamId: 'rd-platform', builtById: 'priya-patel' },
	{ id: 'modelwatch', name: 'ModelWatch', category: 'data', description: 'Tracks accuracy drift on a couple of internal models.', department: 'R&D', teamId: 'rd-applied-ai', builtById: 'maya-chen' },
	{ id: 'standupbot', name: 'StandupBot', category: 'communication', description: 'Posts a daily standup summary to a team channel.', department: 'R&D', teamId: 'rd-qa-tooling', builtById: 'sofia-rossi' },
	{ id: 'vendorping', name: 'VendorPing', category: 'communication', description: 'Sends contract renewal-date reminders to vendor owners.', department: 'Finance', teamId: 'fin-procurement', builtById: 'lena-kowalski' },
	{ id: 'shiftboard', name: 'ShiftBoard', category: 'reporting', description: 'Visualizes warehouse shift coverage for the week.', department: 'Operations', teamId: 'ops-supply-chain', builtById: 'marcus-webb' },
	{ id: 'accessaudit', name: 'AccessAudit', category: 'data', description: 'Monthly export of who has access to which internal system.', department: 'IT/Engineering', teamId: 'eng-infra-cloud', builtById: 'ben-whitfield' },
	{ id: 'expenseecho', name: 'ExpenseEcho', category: 'automation', description: 'Flags submitted expense reports that are missing a receipt.', department: 'Finance', teamId: 'fin-accounting-ops', builtById: 'diego-alvarez' },
	{ id: 'recruitradar', name: 'RecruitRadar', category: 'reporting', description: 'Pipeline funnel dashboard for open requisitions.', department: 'HR', teamId: 'hr-talent-acquisition', builtById: 'grace-okafor' },
	{ id: 'facilityfix', name: 'FacilityFix', category: 'automation', description: 'Routes maintenance requests to the right vendor contact.', department: 'Operations', teamId: 'ops-facilities', builtById: 'ellie-sandberg' },
	{ id: 'learnloop', name: 'LearnLoop', category: 'communication', description: 'Nudges employees about overdue training modules.', department: 'HR', teamId: 'hr-ld', builtById: 'ravi-menon' },
	{ id: 'codedigest', name: 'CodeDigest', category: 'communication', description: 'Weekly digest of merged pull requests across R&D repos.', department: 'R&D', teamId: 'rd-applied-ai', builtById: 'hana-suzuki' },
	{ id: 'capacitycast', name: 'CapacityCast', category: 'data', description: 'Forecasts infrastructure capacity needs from usage logs.', department: 'IT/Engineering', teamId: 'eng-platform', builtById: 'daniel-ruiz' },
	{ id: 'invoiceindex', name: 'InvoiceIndex', category: 'data', description: 'Searchable archive of scanned vendor invoices.', department: 'Finance', teamId: 'fin-procurement', builtById: 'lena-kowalski' },
	{ id: 'alertrelay', name: 'AlertRelay', category: 'communication', description: 'Forwards monitoring alerts to the on-call rotation.', department: 'IT/Engineering', teamId: 'eng-infra-cloud', builtById: 'ben-whitfield' },
];
