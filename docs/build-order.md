

# Build Order (Vertical Slices)

This project should be built in **vertical slices**. Each slice should deliver a complete piece of user-visible functionality that cuts through the UI, route handling, analysis logic, and formatting layers.

The goal is to reach a working end‑to‑end demo as quickly as possible and then progressively improve the system.

---

# Slice 1 — Idea Input → Basic Report

Goal: A user can paste an idea and receive a complete structured opportunity brief.

Deliverables:

- Landing page with textarea
- "Analyze Idea" CTA
- `/api/analyze` route
- Basic analysis pipeline
- Results page
- All report sections present
- Placeholder or simple heuristic scoring
- No external signals

Outcome:

```
User Input → Analysis → Opportunity Brief
```

Once this works, the product has a complete demo loop.

---

# Slice 2 — Structured Scoring

Goal: Make the output feel more analytical and product-like.

Deliverables:

- Score for each dimension
  - Demand Signal
  - Buyer Clarity
  - Monetization Potential
  - Competition Density
  - Buildability

- Score explanations
- Weighted overall opportunity score
- Scorecard UI component

Outcome:

```
User Input → Brief + Scorecard
```

This slice dramatically improves clarity and perceived product value.

---

# Slice 3 — Analysis Quality Improvements

Goal: Improve the usefulness and credibility of the generated analysis.

Deliverables:

- Stronger prompt structure
- Section-specific constraints
- Clearer buyer identification
- Sharper MVP scope
- Better "Idea Kill Shot"
- Persona tuning: "Skeptical but Fair Investor"

This slice focuses primarily on improving analysis quality rather than UI changes.

---

# Slice 4 — Report Polish

Goal: Make the output feel polished and demo-ready.

Deliverables:

- Improved report layout
- Typography and section hierarchy
- Score emphasis
- Loading states
- Error states
- Copy-to-clipboard
- Optional Markdown export
- **Shareable URL:** Implementation of stateless sharing via URL encoding (Base64).

Outcome:

A polished report that feels shareable and productized.

---

# Stretch Goals

## Slice 5 — Optional Demand Signals

Goal: Enrich the brief with external context without introducing system dependency.

Deliverables:

- Keyword extraction from the idea
- Signal adapter (e.g., Google Trends)
- Timeout handling
- Zero-signal fallback policy
- Demand signal UI block

The system must still produce a complete report if signals are unavailable.

---

# Suggested Feature Structure

```
src/
  features/

    idea-input/
      components/
      schema.ts
      actions.ts

    opportunity-brief/
      components/
      formatters.ts
      model.ts

    analysis-engine/
      generateBrief.ts
      normalizeIdea.ts
      prompts.ts
      sections.ts

    scoring/
      score.ts
      weights.ts
      explanations.ts

    demand-signals/
      keywords.ts
      googleTrends.ts
      fallback.ts
      components/

  shared/
    ui/
    utils/
    types/
```

This organization allows features to evolve independently while keeping the architecture compatible with vertical slice development.

---

# Implementation Rule

For each slice:

1. Define the user-visible outcome
2. Build the UI shell
3. Wire the route or action
4. Stub the backend response
5. Replace the stub with real logic
6. Polish only enough to support the next slice

Avoid building deep abstractions before they are required by the slices.

---

# Initial Priority

Start with:

1. Submission flow
2. Opportunity brief generation
3. Scorecard

External signals should only be implemented after the core product loop is stable.
