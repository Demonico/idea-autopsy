# Startup Opportunity Deconstruction Engine — Product Spec

## Overview

Build a web application that takes a rough startup idea or problem statement and produces a structured opportunity brief.

The product should help users answer a practical question:

**Is this idea worth exploring further?**

The application is not meant to definitively validate a startup. Its purpose is to help a founder, builder, or operator think more clearly by breaking the idea down into consistent sections, grounding parts of the analysis in observable signals, and surfacing the biggest assumptions and risks.

The output should feel closer to an investor-style or founder-style opportunity memo than a generic AI chat response.

---

## Goal

Create a single polished flow that:

1. Accepts a rough startup idea from the user
2. Analyzes the idea using a repeatable framework
3. Pulls in demand signals where possible
4. Generates a concise opportunity brief
5. Scores the idea across a fixed set of dimensions

For the hackathon version, the focus is not breadth. The focus is a strong demo with a clear input, a clear analysis pipeline, and a strong output artifact.

---

## Primary User

The primary user is a founder, solo builder, product-minded engineer, or operator who has a rough idea and wants structured feedback quickly.

Typical motivations:

* sanity check an idea before investing more time
* sharpen thinking around customer, scope, and risk
* compare a few ideas using a consistent rubric
* generate a brief they can refine or share

---

## Core User Flow

1. User enters a startup idea, problem statement, or product concept
2. System interprets the input and identifies the core problem area
3. System analyzes the opportunity using a fixed framework
4. System gathers supporting demand signals such as Google Trends
5. System produces a scored opportunity brief
6. User reviews the output and decides whether the idea is worth exploring further

Example inputs:

* AI that summarizes support tickets into product insights
* Tool that automatically organizes a developer’s downloads folder
* A service that converts meeting transcripts into product specs

---

## Product Requirements

### 1. Idea Input

The system must accept a freeform text idea from the user.

Input expectations:

* one sentence to a short paragraph
* rough, messy input is acceptable
* the system should not require the user to structure their idea first

Example UI:

* large text area
* single CTA such as **Analyze Idea**

---

### 2. Structured Opportunity Brief

The system must generate a response using a fixed output structure.

The brief should include the following sections.

#### A. Problem Definition

Purpose:
Clarify the real problem behind the idea.

Should answer:

* What problem exists?
* Why does it matter?
* What workflow or pain point is affected?
* Why might solving this matter enough for someone to care?

#### B. Likely Buyer / Customer

Purpose:
Identify the most plausible target customer.

Should include:

* likely customer segment
* role or persona
* environment where the problem occurs
* who feels the pain directly versus who may pay

Examples:

* SaaS companies with 5–50 support agents
* solo developers managing personal automation workflows
* product managers at early-stage B2B startups

#### C. Demand Signals

Purpose:
Ground the idea in observable external signals when possible.

Primary source for V1:

* Google Trends

Possible outputs:

* interest over time summary
* related queries
* breakout queries
* momentum interpretation

Important constraint:
Demand signals are signals, not proof of demand.

The product should avoid overstating this section.

#### D. Competitive Landscape

Purpose:
Summarize likely alternatives already available to the customer.

This can include:

* existing SaaS products
* manual workflows
* in-house tools
* adjacent tools that partially solve the problem

The goal is not exhaustive market research. The goal is to show the user that alternatives likely exist and frame where the idea may fit.

#### E. MVP Scope

Purpose:
Describe the smallest useful version of the product.

Should include:

* core user action or workflow
* minimum required features
* simplest architecture path
* first usable product, not long-term vision

Example:

1. Upload support ticket export
2. Cluster tickets by topic
3. Generate weekly insight summary
4. Display top recurring issues

#### F. Key Risks

Purpose:
Identify the assumptions that could cause the idea to fail.

Examples:

* unclear buyer
* weak urgency
* crowded market
* hard-to-prove ROI
* low switching incentive
* too broad for an MVP

Include a subsection:

**Idea Kill Shot**

This should identify the single assumption that, if false, would most seriously weaken the opportunity.

#### G. Opportunity Score

Purpose:
Provide a consistent scoring framework across ideas.

Initial scoring dimensions:

* Demand Signal
* Buyer Clarity
* Monetization Potential
* Competition Density
* Buildability

Each dimension should:

* be scored on a 1–10 scale
* include a brief explanation

The system should also produce:

* Overall Opportunity Score: X / 10

The overall score should be derived from the component scores, not invented separately.

#### H. Final Verdict

Purpose:
Give the user a concise bottom-line interpretation.

Should answer:

* Does this idea appear promising?
* Under what conditions might it succeed?
* What should be tested first?

The tone should be analytical and practical, not overconfident.

---

## Non-Goals

The hackathon version should not attempt to:

* fully validate market demand
* generate full business plans
* provide legal or financial advice
* maintain user accounts
* support collaboration
* build a complex dashboard
* offer a full CRM or idea tracking system

This is an analysis tool, not a startup operating system.

---

## Functional Requirements

### Input

* Accept freeform idea input
* Trigger analysis from a single CTA

### Analysis Pipeline

* Parse the user input into an internal analysis object
* Identify likely problem domain and user context
* Generate each section of the brief using a repeatable framework
* Pull demand signals from at least one external source in V1
* Apply the scoring rubric
* Produce a final structured report

### Output

* Render the opportunity brief in a readable report-style layout
* Clearly separate sections
* Display component scores and overall score prominently
* Present demand signals as supporting evidence, not certainty

---

## Data and Signal Requirements

### V1 External Signal Source

**Google Trends**

Use Google Trends to provide demand-related context.

Potential data used:

* interest over time
* related topics
* related queries
* breakout searches

Interpretation goals:

* Is interest stable, rising, or weak?
* Are related searches expanding?
* Is the language around the idea broadening?

Important note:
The system may need to transform the raw idea into one or more trend-searchable keywords. This keyword selection logic should be treated as part of the analysis pipeline.

---

## Scoring Framework

Each idea should be scored across multiple dimensions.

### Demand Signal

Question:
Is there evidence that the broader problem area or associated topic has meaningful interest?

### Buyer Clarity

Question:
Is it clear who has the problem and who might buy a solution?

### Monetization Potential

Question:
Does this appear to solve a painful enough problem that money could realistically change hands?

### Competition Density

Question:
How crowded does the space appear to be, and how hard might it be to differentiate?

Scoring note:
A more crowded space should generally lower the score unless a clear wedge is visible.

### Buildability

Question:
Can a useful MVP be built quickly and credibly by a small team or solo builder?

### Overall Opportunity Score

The overall score should be a derived aggregate of the above dimensions.

The output should include a brief explanation of why the total score landed where it did.

---

## UX Requirements

The product should feel like an analytical tool, not a chatbot.

### UX principles

* clean single-purpose interface
* clear input and output states
* report-style presentation
* minimal clutter
* fast path from idea to brief

### Suggested screens

#### 1. Landing / Input Screen

* title and one-sentence explanation
* textarea for startup idea
* analyze button

#### 2. Results Screen

* idea summary at top
* overall opportunity score
* section-by-section brief
* demand signal block
* final verdict

Optional stretch:

* copy/export report
* regenerate analysis
  n

---

## Technical Direction

### V1 Preferred Stack

* Next.js
* TypeScript
* server-side route handlers for analysis requests

### Architecture preference

Start as a single Next.js app.

Keep the code organized so that analysis logic and data provider adapters can be extracted later if needed.

Suggested internal boundaries:

* UI components
* analysis engine
* scoring logic
* signal adapters
* report formatting

A separate backend is not required in V1.

---

## System Components

### 1. Input Layer

Responsible for collecting and validating the user’s idea.

### 2. Analysis Engine

Responsible for deconstructing the idea into the fixed framework sections.

### 3. Signal Layer

Responsible for fetching and normalizing demand-related signals such as Google Trends.

### 4. Scoring Engine

Responsible for turning analysis outputs and signals into consistent opportunity scores.

### 5. Report Generator

Responsible for assembling the final brief into a readable structure for display.

---

## Output Quality Requirements

The analysis should:

* be specific rather than generic
* make reasonable assumptions explicit
* avoid pretending certainty where none exists
* show the logic behind scores
* remain concise enough to read quickly

The brief should ideally feel useful even when the idea is weak.

A weak idea should still generate a good analysis.

---

## Constraints

This is a 24-hour hackathon build.

That means priorities are:

* one polished end-to-end flow
* clear and consistent output structure
* basic external signal integration
* strong demo quality

That means lower priority items include:

* user accounts
* persistence
* multi-idea history
* collaboration
* robust settings or customization
* deep research workflows

---

## Success Criteria

The product is successful if users feel that it:

* helps them think more clearly about an idea
* produces a useful structured opportunity brief
* surfaces risks they had not considered
* provides a credible first-pass score
* feels more disciplined than a generic AI answer

For the hackathon demo, success means someone can type a rough idea, click one button, and receive a result that feels thoughtful, structured, and worth discussing.

---

## Ideal Demo Narrative

This tool takes a rough startup idea and deconstructs it the way a founder, product leader, or investor might. It clarifies the problem, identifies the likely customer, suggests the simplest MVP, highlights the main risks, and scores the opportunity using observable signals like Google Trends. Instead of giving a vague AI opinion, it produces a structured opportunity brief that helps the user decide whether the idea is worth exploring further.

---

## V1 Delivery Scope

The hackathon version should include:

* idea input form
* structured opportunity brief generation
* scoring system
* Google Trends signal integration
* clean report-style results page

That is enough for a strong first version.

---

## Future Extensions

Possible future additions after the hackathon:

* compare multiple ideas side by side
* save idea history
* export to PDF or Notion-style report
* add more signal sources such as Reddit or Hacker News
* allow user-adjustable scoring weights
* support founder profile or market context inputs
* add citations and source links in the final report
