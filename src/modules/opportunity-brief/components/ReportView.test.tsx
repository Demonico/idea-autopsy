import { OpportunityBrief } from '@/shared/types';
import goldenBrief from '@/tests/fixtures/golden-deconstruction.json';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { encodeBrief } from '../utils/sharing';
import { ReportView } from './ReportView';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('ReportView', () => {
  const brief = goldenBrief as unknown as OpportunityBrief;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
    // For download test
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn().mockReturnValue('blob:mock-url'),
      revokeObjectURL: vi.fn(),
    });
  });

  it('should render the report when brief is provided', async () => {
    const screen = await render(<ReportView brief={ brief }/>);

    await expect.element(screen.getByText(brief.inputIdea)).toBeInTheDocument();
    await expect.element(screen.getByText(`${ brief.scoring.overallScore }`)).toBeInTheDocument();
  });

  it('should copy shared link to clipboard when "Share" is clicked', async () => {
    const screen = await render(<ReportView brief={ brief }/>);
    const encoded = encodeBrief(brief);

    const shareBtn = await vi.waitFor(() => screen.getByRole('button', { name: 'Share' }));
    await shareBtn.click();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
            expect.stringContaining(`?data=${ encoded }`)
    );
    await expect.element(screen.getByText('Copied Link!')).toBeInTheDocument();
  });

  it('should copy markdown to clipboard when "Copy MD" is clicked', async () => {
    const screen = await render(<ReportView brief={ brief }/>);

    const copyMdBtn = await vi.waitFor(() => screen.getByRole('button', { name: 'Copy MD' }));
    await copyMdBtn.click();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
            expect.stringContaining(`# Opportunity Brief: ${ brief.inputIdea }`)
    );
    await expect.element(screen.getByText('Copied MD!')).toBeInTheDocument();
  });

  it('should trigger download when "Download" is clicked', async () => {
    const screen = await render(<ReportView brief={ brief }/>);

    const downloadBtn = await vi.waitFor(() => screen.getByRole('button', { name: 'Download' }));

    // Use a real element but mock the click to avoid navigation
    const mockAnchor = document.createElement('a');
    const clickSpy = vi.spyOn(mockAnchor, 'click').mockImplementation(() => {});
    const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(mockAnchor);
    const appendSpy = vi.spyOn(document.body, 'appendChild').mockImplementation((node) => node);
    const removeSpy = vi.spyOn(document.body, 'removeChild').mockImplementation((node) => node);

    await downloadBtn.click();

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockAnchor.download).toBe(`idea-autopsy-${ brief.id }.md`);
    expect(clickSpy).toHaveBeenCalledOnce();

    createElementSpy.mockRestore();
    appendSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('should navigate back home when clicking "New Idea"', async () => {
    const screen = await render(<ReportView brief={ brief }/>);
    const newIdeaBtn = screen.getByText('← New Idea');
    await newIdeaBtn.click();
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
