import { render, screen, waitFor } from "@testing-library/react";
import ProductList from "../../src/components/ProductList";
import axios from "axios";

vi.mock("axios");
describe("productList", () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks between tests
  });
  it("should be display loading message when data is loading", async () => {
    render(<ProductList />);

    await waitFor(() => {
      const loadingMessage = screen.getByText(/loading/i);
      expect(loadingMessage).toBeInTheDocument();
    });
  });
  it("should show no products message when API returns empty array", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: [],
    });
    render(<ProductList />);
    //Wait for the component to fetch data and re-render
    await waitFor(() => {
      expect(screen.getByText("No products available.")).toBeInTheDocument();
    });
  });
  it("should be display Error message when request is rejected", async () => {
    vi.spyOn(axios, "get").mockRejectedValueOnce(new Error("Network Error"));
    render(<ProductList />);
    await waitFor(() => {
      expect(
        screen.getByText("Error: An unexpected error occurred")
      ).toBeInTheDocument();
    });
  });
  it("should be display Error message when request is rejected", async () => {
    vi.spyOn(axios, "AxiosError").mockRejectedValue(new Error("Network Error"));
    render(<ProductList />);
    await waitFor(() => {
      expect(
        screen.getByText("Error: An unexpected error occurred")
      ).toBeInTheDocument();
    });
  });

  it("should be display products when request is resolved", async () => {
    const products = [
      { categoryId: 1, id: 1, name: "test", price: 10 },
      {
        categoryId: 1,
        id: 3,
        name: "test",
        price: 10,
      },
      {
        categoryId: 4,
        id: 2,
        name: "test",
        price: 10,
      },
    ];
    vi.spyOn(axios, "get").mockResolvedValue({ data: products });
    render(<ProductList />);
    await waitFor(() => {
      const lis = screen.queryAllByRole("listitem");
      expect(lis.length).toBe(products.length);
      products.forEach((p, idx) => {
        expect(lis[idx]).toHaveTextContent(p.name);
      });
    });
  });
});
