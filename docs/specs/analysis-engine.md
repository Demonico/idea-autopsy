# Feature Spec: Analysis Engine

## Overview
The Analysis Engine is the core intelligence of the system. It deconstructs a raw startup idea into the structured sections of the `OpportunityBrief` (defined in `data-model.md`).

## Implementation Details
- **Primary Model:** OpenAI GPT-4o or Claude 3.5 Sonnet.
- **Output Format:** JSON via Structured Output (e.g., Vercel AI SDK `generateObject` with Zod).

## Persona: "The Skeptical but Fair Investor"
The LLM must adopt a specific persona to ensure the output feels analytical and high-value:
- **Tone:** Direct, professional, and evidence-based.
- **Anti-Patterns:** Avoid "This is a revolutionary idea!", "The possibilities are endless!", or generic AI optimism.
- **Core Value:** Provide clarity, not encouragement. A "No" with a good reason is more valuable than a generic "Yes".

## Analysis Framework (Prompt Strategy)

### Phase 1: Idea Deconstruction
The system uses a single long-form prompt or a series of smaller prompts to populate the sections.

#### System Prompt Template
```markdown
You are a skeptical but fair early-stage startup investor. Your goal is to deconstruct a raw idea into a structured opportunity brief.

CRITICAL RULES:
1. Be specific. Avoid generic business advice.
2. Ground analysis in the "Time-to-Value" for an MVP.
3. Identify the "Kill Shot" risk—the single most likely reason this fails.
4. If the input is messy or vague, use your knowledge to infer the most plausible high-value direction.
5. Score each dimension based on the provided rubric.

OUTPUT SECTIONS:
- Problem Definition: Be clinical about the pain.
- Target Customer: Be hyper-specific about the persona.
- MVP Scope: What can a solo dev build in 2 weeks?
- Competitive Landscape: Focus on incumbents AND "manual status quo".
- Key Risks: Focus on "Unclear Buyer" or "Low Switching Incentive".
```

### Phase 2: Keyword Extraction
Before the full analysis, the engine must extract keywords for the **Signal Layer**.

```typescript
// Example Extraction Output
{
  "primary": "AI ticket clustering",
  "alternatives": ["support ticket automation", "customer support insights"],
  "category": "Customer Support Software"
}
```

## Prompt Engineering for Scoring
The Analysis Engine provides the **qualitative** scores and explanations.
- **Monetization:** Look for high-frequency problems or high-value business outcomes.
- **Buyer Clarity:** Penalize "everyone can use this" ideas. Reward "this is for support managers at 50-person SaaS companies".
- **Buildability:** High score if it's a CRUD app with an LLM wrapper; Low score if it requires custom computer vision or high-accuracy robotics.

## Implementation Flow
1. **Sanitize & Validate:** Ensure input is between 20-1000 characters.
2. **Extract Keywords:** Run a fast LLM pass to get search terms.
3. **Trigger Signal Layer:** (Parallel) Fetch external data.
4. **Generate Brief:** Run the main analysis pass, incorporating signals if available.
5. **Normalize:** Ensure the final JSON matches the `OpportunityBrief` schema.
