# Idea Autopsy

A startup idea evaluation tool. Paste in a raw idea description, get back a structured opportunity brief with scored dimensions and a concrete verdict on whether it's worth building.

Built with Next.js 16, Vercel AI SDK, and OpenAI (gpt-5-mini). The UI is a single-page input form that posts to an API route, which returns a full `OpportunityBrief` JSON object rendered as a report.

## How the evaluation works

### System prompt design

The LLM is given the persona of a "Skeptical but Fair" early-stage startup investor. The system prompt establishes four principles that shape the output tone:

1. **Clinical language** -- no marketing fluff, no "revolutionary." Direct and evidence-based.
2. **Specificity over generality** -- if the input is vague, the model infers the most plausible high-value direction rather than hedging.
3. **Time-to-value orientation** -- everything is grounded in what can be proven or built quickly.
4. **Kill Shot identification** -- the model's primary job is finding the single most likely reason the idea fails.

The prompt includes detailed section instructions for each part of the brief (problem definition, target customer, MVP scope, competitive landscape, key risks, final verdict). These aren't just labels -- each section has specific constraints. For example, MVP scope is framed as "what can a solo developer build in exactly 2 weeks," and target customer requires distinguishing between the buyer (who signs the check) and the user (who feels the pain).

### Scoring rubric

Five dimensions, each scored 1-10 with explicit anchor descriptions in the prompt:

| Dimension | Weight | 10/10 anchor | 1/10 anchor |
|---|---|---|---|
| Monetization Potential | 30% | High-frequency, high-value problem with clear ROI or B2B budget | Generic nice-to-have for non-paying users |
| Buyer Clarity | 25% | Highly specific, reachable persona with clear mandate | "Anyone/Everyone" with no budget holder |
| Demand Signal | 20% | Strong upward trend, high search volume, existing market pull | Stagnant market, solution in search of a problem |
| Buildability | 15% | Simple CRUD/LLM wrapper, standard APIs, no complex R&D | Deep tech, custom hardware, high-accuracy R&D |
| Competition Density | 10% | Blue ocean or weak/outdated incumbents | Hyper-crowded with dominant, well-loved incumbents |

The overall score is a weighted average, calculated deterministically on the server after the LLM returns per-dimension scores:

```
overall = (monetization * 0.30) + (buyer * 0.25) + (demand * 0.20) + (buildability * 0.15) + (competition * 0.10)
```

Rounded to one decimal place.

### Structured output via Zod schema

The LLM call uses the Vercel AI SDK's `generateObject` with a Zod schema that mirrors the `OpportunityBrief` TypeScript interface. Each field in the schema includes a `.describe()` annotation that acts as a secondary prompt -- telling the model what kind of content to produce for that field. This means the output structure is enforced at the SDK level, not just requested in the prompt text.

The schema constrains enums (urgency levels, competitor types, time-to-value buckets), score ranges (`z.number().min(1).max(10)`), and array structures. The model can't return a score of 15 or skip the kill shot.

### Tradeoffs: LLM-scored rubrics vs. deterministic checks

The scoring is entirely LLM-generated. The model reads the rubric anchors in the system prompt and assigns scores. This means:

- **Scores are not reproducible.** The same idea submitted twice may get different scores. Temperature, prompt phrasing, and model version all affect output.
- **Anchors are suggestive, not binding.** The prompt says a 10/10 on Buildability means "simple CRUD/LLM wrapper," but the model interprets this -- it's not checking a feature list.
- **Calibration is implicit.** There's no training data or few-shot examples establishing what a "6" means across ideas. The model's sense of scale comes from the anchor descriptions and its pretraining.
- **The weighted average is deterministic.** Once the model returns five scores, the overall score is computed in code (`src/modules/scoring/score.ts`), not by the model. This prevents the model from producing an overall score inconsistent with its dimension scores.

The alternative -- deterministic scoring -- would require structured input (not free-text descriptions) and would lose the model's ability to infer market context, identify non-obvious risks, and adapt the analysis to vague inputs. The tradeoff is flexibility and depth of analysis at the cost of reproducibility and calibration.

## Output format

### API response

`POST /api/analyze` accepts `{ idea: string }` and returns an `OpportunityBrief` JSON object:

```typescript
{
  id: string;              // UUID
  inputIdea: string;       // Original input
  createdAt: string;       // ISO timestamp

  problemDefinition: {
    coreProblem: string;
    painPoint: string;
    affectedWorkflows: string[];
    urgency: 'Low' | 'Medium' | 'High';
  };

  targetCustomer: {
    segment: string;
    persona: string;
    environment: string;
    buyerVsUser: string;
  };

  demandSignals: {
    source: 'Qualitative';
    momentumSummary: string;
    signalStrength: number;  // 1-10
  };

  competitiveLandscape: {
    alternatives: {
      name: string;
      type: 'SaaS' | 'Manual' | 'In-house' | 'Adjacent';
      description: string;
    }[];
    marketContext: string;
  };

  mvpScope: {
    coreAction: string;
    features: string[];
    simplifiedArchitecture: string;
    timeToValue: 'Days' | 'Weeks' | 'Months';
  };

  keyRisks: {
    assumptions: {
      assumption: string;
      riskLevel: 'Low' | 'Medium' | 'High';
    }[];
    killShot: string;
  };

  scoring: {
    dimensions: {
      demandSignal:          { score: number; explanation: string };
      buyerClarity:          { score: number; explanation: string };
      monetizationPotential: { score: number; explanation: string };
      competitionDensity:    { score: number; explanation: string };
      buildability:          { score: number; explanation: string };
    };
    overallScore: number;
    scoreExplanation: string;
  };

  finalVerdict: {
    isPromising: boolean;
    successConditions: string[];
    firstTest: string;
    bottomLine: string;
  };
}
```

### UI export options

The report view provides three ways to export:

- **Share** -- encodes the full `OpportunityBrief` as Base64 into a URL query parameter (`/report?data=...`). The recipient sees the rendered report without hitting the API again. No server-side storage.
- **Copy MD** -- copies a Markdown-formatted version of the report to clipboard, with a scoring table and all sections.
- **Download** -- saves the same Markdown as a `.md` file (`idea-autopsy-{id}.md`).

## Setup

Requires Node.js and pnpm (10.5.2+).

```bash
pnpm install
```

Set `OPENAI_API_KEY` in your environment (the AI SDK reads it automatically).

```bash
pnpm dev        # Start dev server (http://localhost:3000)
pnpm build      # Production build
pnpm test       # Run tests (Vitest + Playwright browser)
pnpm lint       # ESLint
```
