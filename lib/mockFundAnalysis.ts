export interface FundAnalysisResult {
  fundName: string;
  fundamentalScore: number; // 1-10
  strengths: string[];
  weaknesses: string[];
  recommendation: "Strong Buy" | "Buy" | "Hold" | "Avoid";
  summary: string;
}

const recommendations: Array<"Strong Buy" | "Buy" | "Hold" | "Avoid"> = [
  "Strong Buy",
  "Buy",
  "Hold",
  "Avoid",
];

const strengthTemplates = [
  "Strong historical performance with consistent returns",
  "Low expense ratio compared to industry average",
  "Well-diversified portfolio across multiple sectors",
  "Experienced fund management team with proven track record",
  "High liquidity with easy redemption options",
  "Strong focus on blue-chip stocks with stable growth",
  "Excellent risk-adjusted returns",
  "Transparent reporting and regular investor updates",
  "Low volatility compared to benchmark index",
  "Strategic positioning in growth sectors",
];

const weaknessTemplates = [
  "Higher management fees compared to similar funds",
  "Limited track record in bear markets",
  "Concentration risk in specific sectors",
  "Recent underperformance compared to benchmark",
  "Higher volatility during market downturns",
  "Limited dividend yield for income investors",
  "Relatively high minimum investment requirement",
  "Lack of international diversification",
];

const summaryTemplates = [
  "This fund demonstrates solid fundamentals with a balanced approach to growth and stability. It is suitable for investors seeking moderate returns with controlled risk exposure. The fund's performance aligns well with its stated investment objectives.",
  "A well-managed fund with consistent performance across different market conditions. The fund shows strong potential for long-term growth, though short-term volatility should be expected. Recommended for investors with a medium to long-term investment horizon.",
  "This fund offers exposure to quality assets with a focus on capital preservation and steady growth. While returns may be modest compared to aggressive growth funds, the risk profile is appropriate for conservative investors seeking stability.",
  "An actively managed fund with a strategic approach to value investing. The fund has shown resilience during market corrections and offers good potential for capital appreciation. Best suited for investors who understand market cycles.",
  "This fund provides a balanced mix of growth and income opportunities. The management team has demonstrated strong stock selection skills, resulting in above-average risk-adjusted returns. Consider this fund as a core holding in a diversified portfolio.",
];

export function mockAnalyzeFund(fundName: string): FundAnalysisResult {
  // Generate deterministic but seemingly random results based on fund name
  const seed = fundName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Generate score (5-9 range for more realistic results)
  const fundamentalScore = 5 + (seed % 5) + Math.floor(Math.random() * 1.5);

  // Select recommendation based on score
  let recommendation: FundAnalysisResult['recommendation'];
  if (fundamentalScore >= 8.5) {
    recommendation = "Strong Buy";
  } else if (fundamentalScore >= 7) {
    recommendation = "Buy";
  } else if (fundamentalScore >= 6) {
    recommendation = "Hold";
  } else {
    recommendation = "Avoid";
  }

  // Select 3-5 strengths
  const numStrengths = 3 + (seed % 3);
  const strengths: string[] = [];
  const usedStrengthIndices = new Set<number>();

  while (strengths.length < numStrengths) {
    const index = Math.floor(Math.random() * strengthTemplates.length);
    if (!usedStrengthIndices.has(index)) {
      strengths.push(strengthTemplates[index]);
      usedStrengthIndices.add(index);
    }
  }

  // Select 2-4 weaknesses
  const numWeaknesses = 2 + (seed % 3);
  const weaknesses: string[] = [];
  const usedWeaknessIndices = new Set<number>();

  while (weaknesses.length < numWeaknesses) {
    const index = Math.floor(Math.random() * weaknessTemplates.length);
    if (!usedWeaknessIndices.has(index)) {
      weaknesses.push(weaknessTemplates[index]);
      usedWeaknessIndices.add(index);
    }
  }

  // Select a summary
  const summaryIndex = seed % summaryTemplates.length;
  const summary = summaryTemplates[summaryIndex];

  return {
    fundName,
    fundamentalScore: Math.min(10, fundamentalScore),
    strengths,
    weaknesses,
    recommendation,
    summary,
  };
}
