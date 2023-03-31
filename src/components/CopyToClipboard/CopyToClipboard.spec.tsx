import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi } from "vitest";
import { CopyToClipboard } from "./";
describe("CopyToClipboard", () => {
  const mockClipboard = vi.fn();
  beforeEach(() => {
    vi.stubGlobal("navigator", {
      clipboard: { writeText: mockClipboard },
    });
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("No act error in yarn", async () => {
    const value = "clip";
    render(<CopyToClipboard value={value} />);
    const button = screen.getByRole("button");
    userEvent.click(button); // without await, wrong because it's a promise
    await waitFor(() => expect(mockClipboard).toHaveBeenCalledWith(value)); // with waitfor
    expect(button).toHaveTextContent(/copiado/i);
    await act(() => vi.advanceTimersByTime(1500));
    expect(button).toHaveTextContent(/copiar/i);
  });

  it("Act error in yarn", async () => {
    const value = "clip";
    render(<CopyToClipboard value={value} />);
    const button = screen.getByRole("button");
    await userEvent.click(button); // with await
    expect(mockClipboard).toHaveBeenCalledWith(value); // without waitFor
    expect(button).toHaveTextContent(/copiado/i);
    await act(() => vi.advanceTimersByTime(1500));
    expect(button).toHaveTextContent(/copiar/i);
  });

  it("Act error in yarn 2", async () => {
    const value = "clip";
    render(<CopyToClipboard value={value} />);
    const button = screen.getByRole("button");
    await userEvent.click(button); // with await
    await waitFor(() => expect(mockClipboard).toHaveBeenCalledWith(value)); // with waitFor
    expect(button).toHaveTextContent(/copiado/i);
    await act(() => vi.advanceTimersByTime(1500));
    expect(button).toHaveTextContent(/copiar/i);
  });
});
