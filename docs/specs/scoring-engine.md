# Feature Spec: Scoring Engine

## Overview
The Scoring Engine is responsible for translating the qualitative analysis and quantitative data (from the Signal Layer) into a consistent, "investor-style" rubric.

## Scoring Rubric

Each of the five dimensions is scored on a scale of **1–10**.

| Dimension | Description | Scoring Logic |
| :--- | :--- | :--- |
| **Monetization Potential** | Does this solve a painful enough problem that money could realistically change hands? | **10:** High pain/B2B/Clear ROI; **1:** Low pain/Generic/Hard to monetize. |
| **Buyer Clarity** | Is it clear who has the problem and who might buy a solution? | **10:** Highly specific segment/persona; **1:** "Anyone/Everyone" target. |
| **Demand Signal** | Evidence of interest in the broader problem area or associated topic. | **10:** Strong upward trend/High search volume; **1:** Stagnant/No signal. |
| **Buildability** | Can a useful MVP be built quickly by a solo/small team? | **10:** Simple API/No complex R&D; **1:** Deep tech/Hard infrastructure. |
| **Competition Density** | How crowded the space appears and how hard it is to differentiate. | **10:** Blue ocean/Weak incumbents; **1:** Hyper-crowded/Commoditized. |

## Weighted Calculation

The overall score is a weighted average of the five dimensions.

| Dimension | Weight |
| :--- | :--- |
| **Monetization Potential** | 30% |
| **Buyer Clarity** | 25% |
| **Demand Signal** | 20% |
| **Buildability** | 15% |
| **Competition Density** | 10% |

### Calculation Formula
`OverallScore = (Monetization * 0.30) + (Buyer * 0.25) + (Demand * 0.20) + (Buildability * 0.15) + (Competition * 0.10)`

The final score should be rounded to **one decimal place**.

---

## Policies & Edge Cases

### 1. Zero Signal Policy (Demand Signal)
If the Signal Layer returns no quantitative data (e.g., Google Trends returns an empty set or error), the system follows this policy:
- **Label:** "Unknown/Emerging"
- **Default Score:** **5/10**
- **Explanation:** The score reflects a pioneer market where no data exists yet. The user is not penalized for early-market ideas, but also not given an unearned high score.

### 2. Competition Penalty
A high competition density (many strong competitors) should result in a **lower** score. 
- **10/10 Competition Score:** Means *Low* competition (advantageous).
- **1/10 Competition Score:** Means *High* competition (disadvantageous).

### 3. Buildability vs. Long-term Vision
The buildability score should focus exclusively on the **MVP scope**, not the long-term vision. Complex AI research or heavy infra requirements should lower this score significantly.

---

## Persona & Tone: "Skeptical but Fair Investor"
The Scoring Engine's explanations should be:
- **Direct:** No fluff.
- **Analytical:** Explain *why* a score was given based on specific factors from the analysis.
- **Fair:** Highlight the potential upside even when giving a low score.

### Example Scoring Explanation (Monetization Potential)
> **Score: 4/10** — While the problem exists, it primarily affects non-paying personal users. Monetization would likely require a significant shift toward a B2B angle or high-volume consumer adoption, which is not clear in the current MVP scope.

---

## Implementation Notes
- Scoring logic should reside in a standalone module `src/features/scoring/score.ts`.
- Weighted calculations should be easily adjustable in a separate `src/features/scoring/weights.ts` file.
- The Engine must accept both the `AnalysisEngine` output and the `SignalLayer` data.
