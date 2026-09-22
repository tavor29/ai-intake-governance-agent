import { tools, type SeededTool, type ToolCategory } from '../data/meridian-dynamics';

// Generic words that show up across nearly every tool description and would
// otherwise inflate overlap scores without signaling an actual duplicate.
const STOPWORDS = new Set([
	'that',
	'this',
	'with',
	'from',
	'into',
	'internal',
	'tool',
	'tools',
	'system',
	'systems',
	'using',
	'about',
	'their',
	'which',
	'there',
	'across',
]);

function meaningfulWords(text: string): Set<string> {
	return new Set(
		text
			.toLowerCase()
			.split(/[^a-z0-9]+/)
			.filter((w) => w.length > 3 && !STOPWORDS.has(w))
	);
}

/**
 * Tier 2 (simulated): matches the plain-language request against the seeded
 * app/tool catalog by keyword overlap, standing in for a real CMDB/SaaS
 * inventory lookup. Requires at least two overlapping meaningful words to
 * count as a match at all, category match only breaks ties in ranking, it's
 * too weak a signal on its own (most requests in a department share a
 * category with several unrelated tools).
 */
export function findDuplicates(description: string, category: ToolCategory): SeededTool[] {
	const words = meaningfulWords(description);

	const scored = tools.map((tool) => {
		const toolWords = meaningfulWords(`${tool.name} ${tool.description}`);
		const overlap = [...toolWords].filter((w) => words.has(w)).length;
		const categoryMatch = tool.category === category ? 1 : 0;
		return { tool, overlap, categoryMatch };
	});

	return scored
		.filter((s) => s.overlap >= 2)
		.sort((a, b) => b.overlap - a.overlap || b.categoryMatch - a.categoryMatch)
		.slice(0, 3)
		.map((s) => s.tool);
}
