# Feature Spec: Signal Layer

## Overview
The Signal Layer is responsible for fetching external demand signals to ground the qualitative analysis in quantitative data. It is currently a **Stretch Goal**, but the architecture must support it from Day 1.

## API Strategy
- **Primary Source:** Google Trends (via `google-trends-api` or a similar wrapper).
- **Keyword Extraction:** Performed by a "Pass 1" LLM call (see `analysis-engine.md`).

## Implementation Details

### 1. Keyword Extraction (LLM Pass 1)
The system must not search for the raw user idea. It must extract 1-3 optimized search keywords.
- **Goal:** Broad enough for volume, specific enough for relevance.
- **Example:** "AI summaries for support tickets" -> `["customer support automation", "support ticket insights"]`.

### 2. Google Trends Fetching
- **Interest Over Time:** Fetch data for the last 12 months.
- **Related Queries:** Fetch "Top" and "Rising" related queries.
- **Regional Data (Optional):** Limit to "Worldwide" or "United States" for simplicity.

### 3. Normalization (Signal Score)
The Signal Layer must return a `signalStrength` (1-10) and a `momentumSummary`.
- **10/10:** Significant upward trend ("Breakout" status) and high volume.
- **5/10:** Stable interest with moderate volume.
- **1/10:** Declining interest or extremely low volume.

## Logic Flow
1. **Receive SearchKeywords:** From Analysis Engine (LLM Pass 1).
2. **Fetch Trends Data:** (Async/Parallel) Request interest over time and related queries.
3. **Handle Timeouts:** Max 5-second timeout for external fetches.
4. **Apply Zero Signal Policy:** If no data is found, return the neutral default (see `scoring-engine.md`).
5. **Format for Report:** Map the raw API response to the `DemandSignals` interface in `data-model.md`.

## Constraints & Edge Cases
- **Rate Limiting:** Google Trends is sensitive to frequent requests. Implement caching for common keywords or a retry strategy with exponential backoff.
- **Broad Keywords:** If keywords are too broad (e.g., "AI"), the signal may be misleadingly high. The keyword extraction prompt should prioritize "problem-space" terms.
- **Zero Results:** New or hyper-niche markets will return empty sets. The `momentumSummary` must explain that "Lack of historical data suggests a pioneer or highly niche market."

## Implementation Notes
- Use the `google-trends-api` library if available, or a standard `fetch` call to a reliable proxy.
- Ensure the Signal Layer failure does not block the generation of the rest of the report.
