import { render, screen } from "@testing-library/react";

import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("render TermsAndConditions", async () => {
  it("should render Terms And Conditions", async () => {
    render(<TermsAndConditions />);
    // const user = userEvent.setup();
    const checkboxInput = screen.getByRole("checkbox", {
      name: /i accept the terms and conditions/i,
    });
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxInput).not.toBeChecked();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
  it("should submit button un disabled when user agree and when checkbox already checked", async () => {
    render(<TermsAndConditions />);
    const checkboxInput = screen.getByRole("checkbox", {
      name: /i accept the terms and conditions/i,
    });
    const submitButton = screen.getByRole("button", { name: /submit/i });
    const user = userEvent.setup();
    await user.click(checkboxInput);
    expect(checkboxInput).toBeChecked();
    expect(submitButton).toBeEnabled();
  });
});
