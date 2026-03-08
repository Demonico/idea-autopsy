import { describe, it, expect } from 'vitest';
import { generateMarkdown } from './markdown';
import { OpportunityBrief } from '@/shared/types';
import goldenBrief from '@/tests/fixtures/golden-deconstruction.json';

describe('markdown generation', () => {
  const brief = goldenBrief as unknown as OpportunityBrief;

  it('should generate markdown containing the main idea as a heading', () => {
    const md = generateMarkdown(brief);
    expect(md).toContain(`# Opportunity Brief: ${brief.inputIdea}`);
  });

  it('should include overall score in the scorecard section', () => {
    const md = generateMarkdown(brief);
    expect(md).toContain(`**Overall Score: ${brief.scoring.overallScore} / 10**`);
  });

  it('should include all scoring dimensions with their scores and explanations', () => {
    const md = generateMarkdown(brief);
    
    // Check for table structure and dimension data
    expect(md).toContain('| Dimension | Score | Explanation |');
    expect(md).toContain(`| Demand Signal | ${brief.scoring.dimensions.demandSignal.score} | ${brief.scoring.dimensions.demandSignal.explanation} |`);
    expect(md).toContain(`| Buyer Clarity | ${brief.scoring.dimensions.buyerClarity.score} | ${brief.scoring.dimensions.buyerClarity.explanation} |`);
    expect(md).toContain(`| Monetization | ${brief.scoring.dimensions.monetizationPotential.score} | ${brief.scoring.dimensions.monetizationPotential.explanation} |`);
    expect(md).toContain(`| Competition | ${brief.scoring.dimensions.competitionDensity.score} | ${brief.scoring.dimensions.competitionDensity.explanation} |`);
    expect(md).toContain(`| Buildability | ${brief.scoring.dimensions.buildability.score} | ${brief.scoring.dimensions.buildability.explanation} |`);
  });

  it('should include problem definition and pain point', () => {
    const md = generateMarkdown(brief);
    expect(md).toContain(`**Core Problem:** ${brief.problemDefinition.coreProblem}`);
    expect(md).toContain(`**Pain Point:** ${brief.problemDefinition.painPoint}`);
    brief.problemDefinition.affectedWorkflows.forEach(w => {
      expect(md).toContain(`- ${w}`);
    });
  });

  it('should include target customer segment and persona', () => {
    const md = generateMarkdown(brief);
    expect(md).toContain(`**Segment:** ${brief.targetCustomer.segment}`);
    expect(md).toContain(`**Persona:** ${brief.targetCustomer.persona}`);
  });

  it('should include MVP scope and features', () => {
    const md = generateMarkdown(brief);
    expect(md).toContain(`**Core Action:** ${brief.mvpScope.coreAction}`);
    brief.mvpScope.features.forEach(f => {
      expect(md).toContain(`- ${f}`);
    });
    expect(md).toContain(`**Architecture:** ${brief.mvpScope.simplifiedArchitecture}`);
  });

  it('should include the kill shot risk', () => {
    const md = generateMarkdown(brief);
    expect(md).toContain('### THE KILL SHOT');
    expect(md).toContain(`> **${brief.keyRisks.killShot}**`);
  });

  it('should include the final verdict and first test', () => {
    const md = generateMarkdown(brief);
    expect(md).toContain(`**Bottom Line:** ${brief.finalVerdict.bottomLine}`);
    expect(md).toContain(`> ${brief.finalVerdict.firstTest}`);
  });

  it('should handle dates correctly', () => {
    const md = generateMarkdown(brief);
    const dateStr = new Date(brief.createdAt).toLocaleDateString();
    expect(md).toContain(`Generated on: ${dateStr}`);
  });
});
