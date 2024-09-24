import { render, screen } from "@testing-library/react";
import ProductDetailPage from "../../src/pages/ProductDetailPage";
import { Mock } from "vitest";
import { useQuery } from "react-query";

vi.mock("react-query", () => {
  return {
    useQuery: vi.fn(),
  };
});

describe("ProductDetailsPage", () => {
  it("should render the product details page", () => {
    (useQuery as Mock).mockReturnValue({
      isLoading: true,
      data: undefined,
      error: null,
    });
    render(<ProductDetailPage />);
    expect(screen.getByText("Loading..."));
  });
  it("should render the Error Message", () => {
    (useQuery as Mock).mockReturnValue({
      isLoading: false,
      data: undefined,
      error: new Error("can't get Product Detail"),
    });
    render(<ProductDetailPage />);
    expect(screen.getByText("Error: can't get Product Detail"));
  });
  it("should render not found message", () => {
    (useQuery as Mock).mockReturnValue({
      isLoading: false,
      data: undefined,
      error: undefined,
    });
    render(<ProductDetailPage />);
    expect(screen.getByText("The given product was not found."));
  });
  it("should render product Details", () => {
    const product = {
      id: 1,
      name: "The name of the product",
      price: 10.99,
    };
    (useQuery as Mock).mockReturnValue({
      isLoading: false,
      data: product,
      error: undefined,
    });
    render(<ProductDetailPage />);
    expect(
      screen.getByRole("heading", {
        name: product.name,
      })
    );
    expect(screen.getByText(`$${product.price}`));
  });
});
