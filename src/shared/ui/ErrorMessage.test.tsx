import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { ErrorMessage } from './ErrorMessage';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('ErrorMessage', () => {
  it('should render title and message', async () => {
    const screen = await render(
            <ErrorMessage
                    title="Custom Title"
                    message="This is a detailed error message."
            />
    );

    await expect.element(screen.getByText('Custom Title')).toBeInTheDocument();
    await expect.element(screen.getByText('This is a detailed error message.')).toBeInTheDocument();
  });

  it('should use default title when none provided', async () => {
    const screen = await render(
            <ErrorMessage
                    message="Simple error message"
            />
    );

    await expect.element(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should call onRetry when retry button clicked', async () => {
    const onRetry = vi.fn();
    const screen = await render(
            <ErrorMessage
                    message="Retry needed"
                    onRetry={ onRetry }
            />
    );

    const retryBtn = await vi.waitFor(() => screen.getByRole('button', { name: 'Retry' }));
    await retryBtn.click();

    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('should call onBack when back button clicked', async () => {
    const onBack = vi.fn();
    const screen = await render(
            <ErrorMessage
                    message="Back needed"
                    onBack={ onBack }
            />
    );

    const backBtn = screen.getByRole('button', { name: 'Go back home' });
    await backBtn.click();

    expect(onBack).toHaveBeenCalledOnce();
  });

  it('should navigate back home by default when back button clicked', async () => {
    mockPush.mockClear();
    const screen = await render(
            <ErrorMessage
                    message="Default back"
            />
    );

    const backBtn = screen.getByRole('button', { name: 'Go back home' });
    await backBtn.click();

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('should not show retry button when onRetry is not provided', async () => {
    const screen = await render(
            <ErrorMessage message="No retry button should be here"/>
    );

    const buttons = screen.getByRole('button');
    expect(buttons.length).toBe(1);
    expect(screen.getByText('Go back home')).toBeInTheDocument();
  });
});
