# Startup Idea Deconstruction Engine

## Project Overview

Build a web application that takes a rough startup idea or problem description and generates a structured analysis of
the opportunity.

Instead of simply generating startup ideas, the system should **deconstruct the idea using a repeatable evaluation
framework**, similar to how a founder, product leader, or investor might think through a potential opportunity.

The output should resemble a **short opportunity brief** rather than a generic AI response.

The system should analyze the idea across several dimensions, including the problem being solved, the likely customer,
the scope of a realistic MVP, potential risks, and an overall opportunity score.

Where possible, the system should incorporate **external demand signals** such as Google Trends to ground the analysis
in observable data.

---

# Core Objective

The goal of the application is to help users quickly answer:

> "Is this idea worth exploring further?"

The system should not attempt to definitively validate ideas. Instead, it should provide **structured reasoning and
supporting signals** that help users evaluate the opportunity more clearly.

---

# Primary User Flow

1. User enters a rough idea, prompt, or problem statement.

Example inputs:

* "AI that summarizes support tickets into product insights"
* "Tool that automatically organizes a developer’s downloads folder"
* "A service that converts meeting transcripts into product specs"

2. The system analyzes the input.

3. The system gathers supporting signals (e.g., Google Trends).

4. The system generates a structured breakdown of the idea.

5. The system assigns a multi-factor opportunity score.

6. The system produces a short opportunity brief.

---

# Core Output Structure

Each analysis should produce the following sections.

## 1. Problem Definition

Clarify the underlying problem the idea attempts to solve.

Output should answer:

* What problem exists?
* Why does it matter?
* What workflows are affected?

---

## 2. Likely Buyer / Customer

Identify the most plausible customer for the product.

Output should include:

* customer segment
* role or persona
* environment where the problem occurs

Example:

* SaaS companies with 5–50 support agents
* solo developers managing personal automation workflows

---

## 3. Demand Signals

Use external signals when possible.

Primary signal source:

Google Trends.

Possible outputs:

* trend chart
* related search queries
* trend momentum summary

The system should treat trends as **signals, not proof of demand**.

---

## 4. Competitive Landscape

Briefly summarize possible alternatives or competitors.

Examples:

* existing SaaS tools
* manual workflows
* internal solutions
* adjacent products

---

## 5. MVP Scope

Describe the simplest version of the product that could be built.

This should include:

* core features
* minimal architecture
* simplest path to first usable product

Example:

MVP

1. Upload support ticket export
2. Cluster tickets by topic
3. Generate weekly insight summary
4. Dashboard of common issues

---

## 6. Key Risks

Identify the assumptions that could cause the idea to fail.

Examples:

* unclear buyer
* crowded market
* weak differentiation
* low urgency problem

Include a short section such as:

**Idea Kill Shot**
The single assumption that could invalidate the idea.

---

## 7. Opportunity Score

Provide a multi-factor score that evaluates the idea.

Example scoring dimensions:

* Demand Signal
* Buyer Clarity
* Monetization Potential
* Competition Density
* Buildability

Example output:

Demand Signal: 7
Buyer Clarity: 8
Monetization: 6
Competition: 5
Buildability: 9

Overall Opportunity Score: 7.0 / 10

Each score should include a short explanation.

---

## 8. Final Verdict

Provide a concise summary answering:

* Does this idea appear promising?
* Under what conditions might it succeed?
* What should a founder test first?

---

# External Data Integration

## Google Trends

Use Google Trends to provide demand signals.

Relevant data may include:

* interest over time
* related queries
* breakout searches

Trend data should be used to help answer questions like:

* Is interest rising?
* Are related searches expanding?
* Is the problem gaining attention?

---

# Product Philosophy

The tool should focus on **structured reasoning**, not magical AI answers.

Key principles:

1. Deconstruct ideas instead of generating them.
2. Provide consistent output structure.
3. Show reasoning behind scores.
4. Ground analysis in signals where possible.
5. Help users think clearly about opportunities.

---

# Success Criteria

The application is successful if users feel that it:

* helps them think more clearly about an idea
* produces structured opportunity briefs
* provides useful signals and reasoning
* feels like an analytical tool rather than a gimmick

---

# Scope Constraints (24-Hour Hackathon)

Focus on building a **single polished analysis flow**.

Minimum viable functionality:

* idea input
* structured analysis generation
* scoring system
* Google Trends signal integration
* clear report-style output

Avoid building unnecessary features such as:

* accounts
* persistence
* collaboration tools
* complex dashboards

The priority is **a strong demo and clear output artifact**.

---

# Ideal Demo Story

Example pitch:

This tool takes a rough startup idea and deconstructs it the way a founder or investor might. It analyzes the underlying
problem, identifies the likely customer, proposes a realistic MVP, highlights the biggest risks, and scores the
opportunity using demand signals like Google Trends.
