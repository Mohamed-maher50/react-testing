import { render } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";
import { screen } from "@testing-library/react";
describe("Product Image Gallery", () => {
  it("should render nothing when if given an empty array", () => {
    const imageUrls: string[] = [];
    const { container } = render(<ProductImageGallery imageUrls={imageUrls} />);
    const images = screen.queryAllByRole("img");
    expect(images.length).toEqual(0);
    expect(container).toBeEmptyDOMElement();
  });
  it("should render the product image gallery", () => {
    const imageUrls = [
      "https://dummyimage.com/300x200/000/fff",
      "https://dummyimage.com/300x200/000/000",
      "https://dummyimage.com/400x300/00ff00/000",
    ];
    render(<ProductImageGallery imageUrls={imageUrls} />);
    const images = screen.getAllByRole("img");
    images.forEach((image, idx) => {
      expect(image).toHaveAttribute("src", imageUrls[idx]);
    });
  });
});
