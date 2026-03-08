# Feature Spec: Analysis Engine

## Overview
The Analysis Engine is responsible for the core logic of deconstructing a startup idea into a structured opportunity brief. It uses an LLM to perform qualitative analysis based on a fixed framework.

## Analysis Schema
The core data structure is defined in [data-model.md](./data-model.md). The Analysis Engine is responsible for populating the `OpportunityBrief` object.

## Implementation Details
- **Primary Model:** OpenAI GPT-4o or Claude 3.5 Sonnet.
- **Output Format:** JSON (using structured output mode or Zod schema).


## Prompt Engineering
- **System Persona:** A skeptical but fair startup investor. Avoid AI-typical "enthusiastic" language.
- **Scoring Focus:**
  - **Buildability:** Prioritize "Time-to-Value" for solo/small teams.
  - **Competition:** Be critical of "crowded" markets unless a wedge is clearly defined.
- **Constraints:** Maximize specificity. Ground the "Kill Shot" risk in the single most fragile assumption.

## Implementation Notes
- Use Vercel AI SDK or LangChain for LLM orchestration.
- Implement robust error handling for LLM timeouts or malformed JSON.
