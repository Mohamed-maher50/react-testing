import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const text =
    "lorem ipsum dolor sit amet, consectetur asdf sdfsdf dsfd adip si port tincidunt et justol lorem  et   accusam et justo eu et accusam et justo eu et accusam et justo eu et accusam et justo   eu et accusam et justo eu et accusam et justo   eu et accusam et justo eu";
  it("should show article given text more then 255 character ", () => {
    render(<ExpandableText text={text} />);
    const article = screen.getByRole("article");

    const submitButton = screen.getByTestId("submitButton");
    expect(article).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    if (text.length > limit) {
      const expectedText = `${text.substring(0, limit)}...`;
      expect(article).toHaveTextContent(expectedText, {
        normalizeWhitespace: false,
      });
    } else {
      expect(article).toHaveTextContent(text, {
        normalizeWhitespace: false,
      });
    }
  });
  it("should extend article when use click on extend button", async () => {
    render(<ExpandableText text={text} />);
    const article = screen.getByRole("article");
    const user = userEvent.setup();
    const submitButton = screen.getByTestId("submitButton");
    if (text.length > limit) {
      const expectedText = `${text.substring(0, limit)}...`;
      expect(article).toHaveTextContent(expectedText, {
        normalizeWhitespace: false,
      });
      await user.click(submitButton);
      expect(article).toHaveTextContent(text, {
        normalizeWhitespace: false,
      });
      await user.click(submitButton);
      expect(article).toHaveTextContent(expectedText, {
        normalizeWhitespace: false,
      });
    }
  });
});
