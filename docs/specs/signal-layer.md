# Feature Spec: Signal Layer

## Overview
The Signal Layer fetches external demand signals to ground the qualitative analysis in quantitative data.

## API Strategy
- **Primary Source:** Google Trends (via `google-trends-api` or similar).
- **Secondary Source (Fallback):** Search API (Serper or Tavily) for "Search Result Counts" or "Related Searches".

## Logic Flow
1. **Input Reception:** Receive raw user idea.
2. **Analysis Init (LLM Pass 1):** Analysis Engine extracts search keywords and begins deconstruction.
3. **Signal Fetching (Parallel):** Signal Layer uses keywords to fetch external data (Google Trends).
4. **Final Assembly (LLM Pass 2):** Combine signal results with preliminary analysis to produce the final scored report.

## Fallback Logic
- If Trends data is unavailable, attempt to fetch search volume or related search density from the Secondary Source.
- If no quantitative data can be found, the Analysis Engine must provide a qualitative demand analysis based on market common knowledge.
