import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { IdeaInputForm } from './IdeaInputForm';

// Mock next/navigation router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('IdeaInputForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Stub fetch globally in the browser environment
    vi.stubGlobal('fetch', vi.fn());

    // Stub sessionStorage globally in the browser environment
    const storageMock = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value
        },
        clear: () => {
          store = {}
        },
        removeItem: (key: string) => {
          delete store[key]
        },
        key: (index: number) => Object.keys(store)[index] || null,
        get length() {
          return Object.keys(store).length
        }
      };
    })();
    vi.stubGlobal('sessionStorage', storageMock);
  });

  it('should disable the analyze button when input is less than 20 characters', async () => {
    const screen = await render(<IdeaInputForm/>);

    const textarea = screen.getByPlaceholder('Describe your startup idea or a problem you want to solve...');
    const button = await vi.waitFor(() => screen.getByRole('button'));

    await expect.element(button).toBeDisabled();

    await textarea.fill('Short idea');
    await expect.element(button).toBeDisabled();

    await textarea.fill('This is a long enough idea that should enable the button.');
    await vi.waitFor(async () => {
      await expect.element(button).not.toBeDisabled();
    });
  });

  it('should show a validation error message if the input is invalid', async () => {
    const screen = await render(<IdeaInputForm/>);

    const textarea = screen.getByPlaceholder('Describe your startup idea or a problem you want to solve...');
    const button = await vi.waitFor(() => screen.getByRole('button'));

    await textarea.fill('This is a startup idea that is extremely aaaaaaaaaaaaaaaaaa repetitive');

    await vi.waitFor(async () => {
      await expect.element(button).not.toBeDisabled();
    });

    await button.click();

    await expect.element(screen.getByText('Entry seems too repetitive')).toBeInTheDocument();
  });

  it('should show a loading state on the button when analysis is in progress', async () => {
    const screen = await render(<IdeaInputForm/>);

    const textarea = screen.getByPlaceholder('Describe your startup idea or a problem you want to solve...');
    const button = await vi.waitFor(() => screen.getByRole('button'));

    vi.stubGlobal('fetch', vi.fn().mockImplementation(() => new Promise(resolve =>
            setTimeout(() => resolve({
              ok: true,
              json: () => Promise.resolve({ id: '123' })
            }), 100)
    )));

    await textarea.fill('This is a very good and valid startup idea for testing purposes.');

    await vi.waitFor(async () => {
      await expect.element(button).not.toBeDisabled();
    });

    await button.click();

    await vi.waitFor(async () => {
      await expect.element(screen.getByText('Analyzing Idea...')).toBeInTheDocument();
      await expect.element(button).toBeDisabled();
    });
  });
});
