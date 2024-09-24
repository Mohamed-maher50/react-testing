import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  it("check is user account rendered and display user name ", () => {
    const user: User = {
      id: 1,
      name: "John Doe",
      isAdmin: true,
    };
    render(<UserAccount user={user} />);
    screen.getByText(user.name);
  });
  it("should show edit button when user is admin", () => {
    const user: User = {
      id: 1,
      name: "John Doe",
      isAdmin: true,
    };
    render(<UserAccount user={user} />);
    const btn = screen.getByRole("button", { name: /Edit/i });
    expect(btn).toBeInTheDocument();
  });
  it("should't show edit button when user is not admin", () => {
    const user: User = {
      id: 1,
      name: "John Doe",
      isAdmin: false,
    };
    render(<UserAccount user={user} />);
    const btn = screen.queryByRole("button", { name: /Edit/i });
    expect(btn).equal(null);
  });
});
