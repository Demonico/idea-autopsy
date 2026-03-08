export interface OpportunityBrief {
  id: string; // Unique identifier for the analysis
  inputIdea: string; // The original user input
  createdAt: string; // ISO timestamp
  
  problemDefinition: ProblemDefinition;
  targetCustomer: TargetCustomer;
  demandSignals: DemandSignals;
  competitiveLandscape: CompetitiveLandscape;
  mvpScope: MVPScope;
  keyRisks: KeyRisks;
  scoring: Scoring;
  finalVerdict: FinalVerdict;
}

export interface ProblemDefinition {
  coreProblem: string; // What problem exists?
  painPoint: string; // Why does it matter?
  affectedWorkflows: string[]; // What workflows or pain points are affected?
  urgency: 'Low' | 'Medium' | 'High'; // Qualitative assessment of the pain
}

export interface TargetCustomer {
  segment: string; // Likely customer segment (e.g., "SaaS companies")
  persona: string; // Role or persona (e.g., "Support Manager")
  environment: string; // Environment where the problem occurs
  buyerVsUser: string; // Who pays vs. who feels the pain
}

export interface DemandSignals {
  source: 'Google Trends' | 'Qualitative' | 'Unknown';
  trendData?: {
    keywords: string[]; // Keywords used for the search
    interestOverTime: { date: string; value: number }[]; // Normalized trend values
    relatedQueries: string[];
    breakoutQueries: string[];
  };
  momentumSummary: string; // Interpretation of the signal
  signalStrength: number; // 1-10 normalized score for "Demand Signal"
}

export interface CompetitiveLandscape {
  alternatives: {
    name: string;
    type: 'SaaS' | 'Manual' | 'In-house' | 'Adjacent';
    description: string;
  }[];
  marketContext: string; // General overview of the space
}

export interface MVPScope {
  coreAction: string; // The single most important action the user takes
  features: string[]; // Minimal required feature list
  simplifiedArchitecture: string; // Simplest path to first usable product
  timeToValue: 'Days' | 'Weeks' | 'Months';
}

export interface KeyRisks {
  assumptions: {
    assumption: string;
    riskLevel: 'Low' | 'Medium' | 'High';
  }[];
  killShot: string; // The single assumption that could invalidate the idea
}

export interface Scoring {
  dimensions: {
    demandSignal: ScoreDimension;
    buyerClarity: ScoreDimension;
    monetizationPotential: ScoreDimension;
    competitionDensity: ScoreDimension;
    buildability: ScoreDimension;
  };
  overallScore: number; // Weighted aggregate (1-10)
  scoreExplanation: string; // Brief summary of why the total score is X
}

export interface ScoreDimension {
  score: number; // 1-10
  explanation: string;
}

export interface FinalVerdict {
  isPromising: boolean;
  successConditions: string[]; // Under what conditions might it succeed?
  firstTest: string; // What should a founder test first?
  bottomLine: string; // Concise final summary
}
