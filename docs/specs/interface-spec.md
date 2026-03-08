# Feature Spec: Interface Spec

## Overview
Defines the user experience and visual design requirements for the Startup Opportunity Deconstruction Engine. The goal is a professional, report-style interface that feels analytical, not like a chat.

## Visual Direction: "The Opportunity Report"
- **Typography:** Serif for headings (trust/authority), Sans-serif for body (readability).
- **Colors:** Neutral background (light gray or cream) with high-contrast text. Accent colors for scores:
  - **Green (8-10):** High Potential
  - **Yellow (5-7):** Moderate/Mixed
  - **Red (1-4):** Low/Critical Risk
- **Layout:** Single-column centered container (max-width: 800px).

---

## 1. Landing / Input Screen
- **Minimal Header:** Just the logo and a one-sentence tagline.
- **Large Textarea:** Focused input area (min-height: 200px) with a character counter.
- **Primary CTA:** "Analyze Idea" button (prominent and high-contrast).
- **Examples:** 3-4 clickable "Try an idea" cards below the CTA.

---

## 2. Loading State (Phased Feedback)
Since the pipeline has multiple steps, the UI must show progress:
1. **"Deconstructing idea..."** (Analysis Engine Pass 1)
2. **"Scanning market signals..."** (Signal Layer - Parallel)
3. **"Analyzing risks and ROI..."** (Analysis Engine Pass 2)
4. **"Finalizing report..."** (Scoring Engine)

---

## 3. The Opportunity Brief (Results)

### Header Section
- **Overall Opportunity Score:** Large circular gauge or prominent number (e.g., "7.4 / 10").
- **Idea Summary:** 1-2 sentences summarizing the core concept.
- **Bottom-Line Verdict:** High-level summary of the "Final Verdict" (is it promising?).

### Scorecard Component
- A grid of the 5 dimensions from `scoring-engine.md`.
- Each dimension shows:
  - **Score (1-10)**
  - **Dimension Name**
  - **Brief Explanation** (condensed for mobile).

### Detailed Sections
The sections from `data-model.md` rendered as clean, separated blocks:
1. **Problem Definition:** Clear "Pain Point" and "Urgency" indicators.
2. **Target Customer:** Persona and environment details.
3. **Competitive Landscape:** A list of alternatives with brief descriptions.
4. **MVP Scope:** Bulleted feature list and "Time-to-Value" estimate.
5. **Key Risks:** The "Idea Kill Shot" must be visually distinct (e.g., a callout box with a subtle red border).

### Demand Signals Block (Signal Layer)
- If available, show a small line chart (Google Trends interest over time).
- List of related/breakout queries.
- "Momentum Summary" interpreting the data.

---

## 4. Portability & Actions
- **Copy to Clipboard:** Markdown format for easy sharing.
- **Download as MD:** A `.md` file download.
- **Regenerate:** A secondary action to re-run the analysis (optional).

---

## Technical Constraints (UI)
- **Framework:** Next.js + Tailwind CSS.
- **Responsiveness:** Mobile-first design; the report must look great on phones and desktops.
- **Accessibility:** High contrast ratios for all scoring indicators.
