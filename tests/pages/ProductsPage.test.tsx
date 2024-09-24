import { render, waitFor, screen, within } from "@testing-library/react";
import ProductListPage from "../../src/pages/ProductListPage";
import { Mock } from "vitest";
import { useQuery } from "react-query";
import { CartProvider } from "../../src/providers/CartProvider";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

vi.mock("react-query", () => ({
  useQuery: vi.fn(),
}));
describe("products page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display loading page when page is loading", async () => {
    (useQuery as Mock).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    });
    render(<ProductListPage />);
    await waitFor(() => {
      screen.debug();
      const loadingElement = screen.getByText("Loading...");
      expect(loadingElement).toBeInTheDocument();
    });
  });
  it("should display error  when page has error", async () => {
    (useQuery as Mock).mockReturnValue({
      data: undefined,
      error: new Error("con't fetch products"),
      isLoading: false,
    });
    render(<ProductListPage />);
    await waitFor(() => {
      const loadingElement = screen.getByText("Error: con't fetch products");
      expect(loadingElement).toBeInTheDocument();
    });
  });
  it("should display products ", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    (useQuery as Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });
    render(
      <CartProvider>
        <ProductListPage />
      </CartProvider>,
      {
        wrapper: BrowserRouter,
      }
    );

    const tbody = screen.getByTestId("tbody");
    const rows = within(tbody).getAllByRole("row");
    await waitFor(() => {
      expect(rows.length).toBe(mockProducts.length);
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });
  it("should interact with Quantity products ", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    (useQuery as Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
      error: null,
    });
    render(
      <CartProvider>
        <ProductListPage />
      </CartProvider>,
      {
        wrapper: BrowserRouter,
      }
    );

    const tbody = screen.getByTestId("tbody");
    const rows = within(tbody).getAllByRole("row");
    for (const row of rows) {
      const addToCartButton = within(row).getByRole("button", {
        name: /Add to Cart/i,
      });
      expect(addToCartButton).toBeInTheDocument();

      await userEvent.click(addToCartButton);
      await waitFor(async () => {
        expect(addToCartButton).not.toBeInTheDocument();
        const increaseButton = within(row).getByRole("button", {
          name: "+",
        });
        expect(increaseButton).toBeInTheDocument();
        await userEvent.click(increaseButton);
        await waitFor(async () => {
          const status = within(row).getByRole("status");
          expect(status).toHaveTextContent("2");
        });

        const decreaseButton = within(row).getByRole("button", {
          name: "-",
        });
        expect(decreaseButton).toBeInTheDocument();
        await userEvent.click(decreaseButton);
        await waitFor(async () => {
          const status = within(row).getByRole("status");
          expect(status).toHaveTextContent("1");
        });
        await userEvent.click(decreaseButton);
        await waitFor(() => {
          const addToCartButton = within(row).getByRole("button", {
            name: /Add to Cart/i,
          });
          expect(addToCartButton).toBeInTheDocument();
        });
      });
    }
  });
});
