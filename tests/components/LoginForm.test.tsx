import { render, screen, waitFor } from "@testing-library/react";

import LoginForm from "../../src/components/LoginForm";
import userEvent from "@testing-library/user-event";

describe("LoginForm", () => {
  const fn = vi.fn();
  it("should render Form", async () => {
    render(<LoginForm onSubmit={fn} />);
    const emailInput = screen.getByRole("textbox", {
      name: /Email/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", {
      name: /Submit/i,
    });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it("should submit when data is correct", async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    const emailInput = screen.getByRole("textbox", {
      name: /Email/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", {
      name: /Submit/i,
    });
    expect(submitButton).toBeInTheDocument();
    const user = userEvent.setup();

    await user.type(passwordInput, "maher123123mm");
    await user.type(emailInput, "mm2517608@gmail.com");
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        email: "mm2517608@gmail.com",
        password: "maher123123mm",
      });
    });
  });
  it("should show error message for email with invalid email", async () => {
    render(<LoginForm onSubmit={fn} />);
    const emailInput = screen.getByRole("textbox", { name: /Email/i });
    const submitButton = screen.getByRole("button", { name: /Submit/i });
    // Ensure email input and submit button are in the document
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);
    const message = screen.getByText(/Please enter your email/i);
    expect(message).toBeInTheDocument();
    await userEvent.click(emailInput);
    await userEvent.type(emailInput, "maher123123");
    await userEvent.click(submitButton);
    const errorMessage = screen.getByText(/Please provide a valid email/i);
    expect(errorMessage).toBeInTheDocument();
  });
  it("should show error message for password with invalid password", async () => {
    render(<LoginForm onSubmit={fn} />);
    const submitButton = screen.getByRole("button", { name: /Submit/i });
    await userEvent.click(submitButton);
    const message = screen.getByText(/Please enter a password/i);
    expect(message).toBeInTheDocument();
  });
});
