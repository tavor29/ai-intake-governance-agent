import { teams, type Department, type Team } from '../data/meridian-dynamics';

const CAPACITY_RANK: Record<Team['capacity'], number> = { high: 2, medium: 1, low: 0 };

/**
 * Routes to the requesting department's highest-capacity team. A real
 * production version would also weigh current queue depth and the request's
 * category, this MVP keeps it to one signal (see the project's honest
 * limitation).
 */
export function recommendRouting(department: Department): Team {
	const inDepartment = teams.filter((t) => t.department === department);
	return [...inDepartment].sort((a, b) => CAPACITY_RANK[b.capacity] - CAPACITY_RANK[a.capacity])[0];
}
