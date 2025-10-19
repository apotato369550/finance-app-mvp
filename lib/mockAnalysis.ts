export interface QuizAnswers {
  occupation: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  hasBankAccount: boolean;
  essayResponse: string;
}

export interface AnalysisResult {
  userType: 'Student' | 'Professional' | 'Business Owner';
  financialHealth: 'Beginner' | 'Growing' | 'Stable';
  recommendations: string[];
  riskProfile: 'Conservative' | 'Moderate' | 'Aggressive';
}

export function mockAnalyzeUser(answers: QuizAnswers): AnalysisResult {
  // Determine user type based on occupation
  let userType: AnalysisResult['userType'];
  if (answers.occupation === 'Student') {
    userType = 'Student';
  } else if (answers.occupation === 'Self-employed') {
    userType = 'Business Owner';
  } else {
    userType = 'Professional';
  }

  // Determine financial health based on income and expenses
  const savingsRate = answers.monthlyIncome > 0
    ? ((answers.monthlyIncome - answers.monthlyExpenses) / answers.monthlyIncome) * 100
    : 0;

  let financialHealth: AnalysisResult['financialHealth'];
  if (savingsRate < 10) {
    financialHealth = 'Beginner';
  } else if (savingsRate < 30) {
    financialHealth = 'Growing';
  } else {
    financialHealth = 'Stable';
  }

  // Determine risk profile based on financial health and essay response
  let riskProfile: AnalysisResult['riskProfile'];
  const essayLower = answers.essayResponse.toLowerCase();
  const hasInvestmentKeywords = essayLower.includes('invest') ||
                                  essayLower.includes('stock') ||
                                  essayLower.includes('business') ||
                                  essayLower.includes('crypto');
  const hasSavingsKeywords = essayLower.includes('save') ||
                              essayLower.includes('bank') ||
                              essayLower.includes('emergency');

  if (financialHealth === 'Beginner') {
    riskProfile = 'Conservative';
  } else if (hasInvestmentKeywords && financialHealth === 'Stable') {
    riskProfile = 'Aggressive';
  } else if (hasSavingsKeywords || financialHealth === 'Growing') {
    riskProfile = 'Moderate';
  } else {
    riskProfile = 'Moderate';
  }

  // Generate recommendations based on analysis
  const recommendations: string[] = [];

  if (!answers.hasBankAccount) {
    recommendations.push('Open a bank account to start managing your finances securely');
  }

  if (financialHealth === 'Beginner') {
    recommendations.push('Focus on building an emergency fund covering 3-6 months of expenses');
    recommendations.push('Track your spending habits to identify areas where you can save more');
  }

  if (savingsRate < 20 && answers.monthlyIncome > 0) {
    recommendations.push('Try to save at least 20% of your monthly income for long-term goals');
  }

  if (userType === 'Student') {
    recommendations.push('Consider part-time opportunities or freelancing to increase income');
    recommendations.push('Learn about personal finance basics through free online resources');
  } else if (userType === 'Business Owner') {
    recommendations.push('Separate personal and business finances for better money management');
    recommendations.push('Consider diversifying income streams to reduce financial risk');
  } else {
    recommendations.push('Explore employer benefits like retirement contributions or health savings');
  }

  if (financialHealth === 'Stable' || financialHealth === 'Growing') {
    recommendations.push('Consider investing in low-risk funds to grow your wealth over time');
  }

  if (recommendations.length < 3) {
    recommendations.push('Set clear financial goals and review them quarterly');
    recommendations.push('Educate yourself on different investment vehicles available in the Philippines');
  }

  // Return only 3-5 recommendations
  return {
    userType,
    financialHealth,
    recommendations: recommendations.slice(0, 5),
    riskProfile,
  };
}
