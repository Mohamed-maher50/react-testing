import { render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";
describe("Greet", () => {
  it("should render", () => {
    render(<Greet name="maher" />);
    const btn = screen.getByRole("heading");
    expect(btn).toHaveTextContent(/maher/i);
  });
  it("should render button instead of heading when name is not provided", () => {
    render(<Greet />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveTextContent(/login/i);
    screen.debug();
  });
});
