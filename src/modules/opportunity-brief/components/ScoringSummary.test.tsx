import { Scoring } from '@/shared/types';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { ScoringSummary } from './ScoringSummary';

describe('ScoringSummary', () => {
  const mockScoring: Scoring = {
    overallScore: 7.5,
    scoreExplanation: 'This is a solid idea with good potential.',
    dimensions: {
      monetizationPotential: {
        score: 8,
        explanation: 'High monetization potential due to B2B nature.',
      },
      buyerClarity: {
        score: 7,
        explanation: 'Clear target segment identified.',
      },
      demandSignal: {
        score: 9,
        explanation: 'Strong market demand seen in trends.',
      },
      buildability: {
        score: 6,
        explanation: 'Requires some initial infrastructure.',
      },
      competitionDensity: {
        score: 4,
        explanation: 'Relatively crowded space.',
      },
    },
  };

  it('renders the overall score correctly', async () => {
    const screen = await render(<ScoringSummary scoring={ mockScoring }/>);

    await expect.element(screen.getByText('7.5')).toBeInTheDocument();
    await expect.element(screen.getByText('7.5')).toHaveClass('text-amber-700');
  });

  it('renders all dimension scores and labels', async () => {
    const screen = await render(<ScoringSummary scoring={ mockScoring }/>);

    await expect.element(screen.getByText('Opportunity Scorecard')).toBeInTheDocument();

    await expect.element(screen.getByRole('heading', { name: 'Monetization Potential' })).toBeInTheDocument();
    await expect.element(screen.getByText('8/10')).toBeInTheDocument();
    await expect.element(screen.getByText('High monetization potential due to B2B nature.')).toBeInTheDocument();

    await expect.element(screen.getByRole('heading', { name: 'Buyer Clarity' })).toBeInTheDocument();
    await expect.element(screen.getByText('7/10')).toBeInTheDocument();

    await expect.element(screen.getByRole('heading', { name: 'Demand Signal' })).toBeInTheDocument();
    await expect.element(screen.getByText('9/10')).toBeInTheDocument();

    await expect.element(screen.getByRole('heading', { name: 'Buildability' })).toBeInTheDocument();
    await expect.element(screen.getByText('6/10')).toBeInTheDocument();

    await expect.element(screen.getByRole('heading', { name: 'Competition Density' })).toBeInTheDocument();
    await expect.element(screen.getByText('4/10')).toBeInTheDocument();
  });

  it('renders the investor summary', async () => {
    const screen = await render(<ScoringSummary scoring={ mockScoring }/>);

    await expect.element(screen.getByText('“This is a solid idea with good potential.”')).toBeInTheDocument();
  });

  it('applies correct color classes for different scores', async () => {
    const lowScoring: Scoring = {
      ...mockScoring,
      overallScore: 3.2,
      dimensions: {
        ...mockScoring.dimensions,
        monetizationPotential: { score: 2, explanation: 'Low' }
      }
    };

    const screen = await render(<ScoringSummary scoring={ lowScoring }/>);

    await expect.element(screen.getByText('3.2')).toHaveClass('text-rose-700');
    await expect.element(screen.getByText('2/10')).toHaveClass('text-rose-700');
  });

  it('applies emerald color for high scores', async () => {
    const highScoring: Scoring = {
      ...mockScoring,
      overallScore: 9.1,
    };

    const screen = await render(<ScoringSummary scoring={ highScoring }/>);

    await expect.element(screen.getByText('9.1')).toHaveClass('text-emerald-700');
  });
});
