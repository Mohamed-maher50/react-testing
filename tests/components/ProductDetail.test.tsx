import { render, screen, waitFor } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";

describe("ProductDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show loading message before fetch data", async () => {
    render(<ProductDetail productId={1} />);
    await waitFor(async () => {
      const messageElement = screen.getByText("Loading...");
      expect(messageElement).toBeInTheDocument();
    });
  });
  it("should render ", () => {
    render(<ProductDetail productId={0} />);
  });
});
