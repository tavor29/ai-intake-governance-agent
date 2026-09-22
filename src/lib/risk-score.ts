export type PiiExposure = 'none' | 'some' | 'extensive';
export type FinancialAccess = 'none' | 'read-only' | 'read-write';
export type IntegrationSurface = 'none' | 'one-or-two' | 'three-plus';

export interface RiskInput {
	pii: PiiExposure;
	financial: FinancialAccess;
	integrations: IntegrationSurface;
}

export type RiskBand = 'Low' | 'Medium' | 'High';

export interface RiskResult {
	score: number;
	band: RiskBand;
}

/**
 * Tier 2 (simulated): a real identity/risk-classification service would return
 * something closer to Microsoft Purview's sensitivity-label shape (an id, a
 * name, and a sensitivity tier per piece of content). This app doesn't call
 * one, it just scores the three dimensions the requester self-reports below.
 */
const PII_WEIGHTS: Record<PiiExposure, number> = { none: 0, some: 2, extensive: 3 };
const FINANCIAL_WEIGHTS: Record<FinancialAccess, number> = { none: 0, 'read-only': 1, 'read-write': 3 };
const INTEGRATION_WEIGHTS: Record<IntegrationSurface, number> = { none: 0, 'one-or-two': 1, 'three-plus': 2 };

export function scoreRisk(input: RiskInput): RiskResult {
	const score =
		PII_WEIGHTS[input.pii] + FINANCIAL_WEIGHTS[input.financial] + INTEGRATION_WEIGHTS[input.integrations];

	const band: RiskBand = score <= 2 ? 'Low' : score <= 5 ? 'Medium' : 'High';

	return { score, band };
}
