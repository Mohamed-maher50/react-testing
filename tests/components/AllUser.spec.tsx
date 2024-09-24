import { render, screen, waitFor } from "@testing-library/react";
import { Mock } from "vitest";
import AllUsers from "../../src/components/AllUsers";
describe("AllUser", () => {
  global.fetch = vi.fn();

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it.only("should show loading ", async () => {
    (fetch as Mock).mockResolvedValue({
      json: () => Promise.resolve([]),
    });

    render(<AllUsers />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText("No users available.")).toBeInTheDocument();
    });
  });

  it("should show Error message when request is Rejected", async () => {
    (fetch as Mock).mockRejectedValueOnce(new Error("Failed to fetch"));
    render(<AllUsers />);

    await waitFor(() => {
      expect(screen.getByText(`Error Failed to fetch`)).toBeInTheDocument();
    });
  });
});
