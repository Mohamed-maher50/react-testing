import { render, screen, waitFor } from "@testing-library/react";
import LogoutButton from "../../src/components/LogoutButton";
import userEvent from "@testing-library/user-event";

const logoutMock = vi.fn();
describe("LogOutButton", () => {
  vi.mock("@auth0/auth0-react", () => ({
    useAuth0: () => {
      return {
        logout: logoutMock,
      };
    },
  }));
  it("should render LogoutButton", () => {
    render(<LogoutButton />);
    const btn = screen.getByText(/Log Out/i);
    expect(btn).toBeInTheDocument();
  });
  it("should  call logout method", async () => {
    render(<LogoutButton />);
    const btn = screen.getByText(/Log Out/i);
    expect(btn).toBeInTheDocument();
    await userEvent.click(btn);
    await waitFor(() => {
      expect(logoutMock).toHaveBeenCalled();
      expect(logoutMock).toHaveBeenCalledWith({
        logoutParams: { returnTo: window.location.origin },
      });
    });
  });
});
