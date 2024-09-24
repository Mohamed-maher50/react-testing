import { render, screen, waitFor } from "@testing-library/react";
import LoginButton from "../../src/components/LoginButton";
import userEvent from "@testing-library/user-event";

const loginWithRedirect = vi.fn();
vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    loginWithRedirect: loginWithRedirect,
  }),
}));

describe("LoginButton", () => {
  it("should render Login Button", () => {
    render(<LoginButton />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveTextContent(/Log In/i);
  });

  it("should call loginWithRedirect", async () => {
    render(<LoginButton />);
    const btn = screen.getByRole("button");
    await userEvent.click(btn);
    await waitFor(async () => {
      expect(loginWithRedirect).toHaveBeenCalled();
    });
  });
});
