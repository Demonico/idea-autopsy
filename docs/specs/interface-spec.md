# Feature Spec: Interface Spec

## Overview
Defines the user experience and visual design requirements for the Startup Opportunity Deconstruction Engine.

## Idea Input
- **Textarea:** Large, focused input area.
- **Character Limit:** Hard limit of 1000 characters.
- **Validation:** Visual indicator of text length; error message for empty or incoherent strings.

## Loading States
Since the analysis pipeline is optimized for speed, the UI should reflect the parallelized tasks:
- **Phase 1 (Instant):** "Deconstructing idea and extracting keywords..."
- **Phase 2 (Parallel):** "Fetching trends..." + "Analyzing market landscape..."
- **Phase 3 (Finalizing):** "Calculating investor-grade scores..."

## Example Ideas
Provide a "Try an example" section on the landing page:
- "AI that summarizes support tickets into product insights."
- "A tool that automatically organizes a developer’s downloads folder."
- "A service that converts meeting transcripts into product specs."

## Report Portability
- **Copy to Clipboard:** Markdown format for easy pasting into docs.
- **Download as Markdown:** Trigger a file download of the full brief as `opportunity-autopsy-[timestamp].md`.
- **Shareable URL (Optional):** Encode the analysis ID or data in the URL for quick sharing.
