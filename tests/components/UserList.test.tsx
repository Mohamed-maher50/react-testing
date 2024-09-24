import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
  it("should render no users when users array is empty", () => {
    const users: User[] = [
      //   {
      //     id: 1,
      //     name: "John Doe",
      //     isAdmin: false,
      //   },
    ];
    render(<UserList users={users} />);
    const message = screen.getByText("No users available.");
    const links = screen.queryAllByRole("link");
    expect(message).toBeInTheDocument();
    expect(links.length).equal(0);
  });
  it("should render users when there are users array ", () => {
    const users: User[] = [
      {
        id: 1,
        name: "mohamed Doe",
        isAdmin: false,
      },
      {
        id: 2,
        name: "mher Doe",
        isAdmin: false,
      },
      {
        id: 3,
        name: "add Doe",
        isAdmin: false,
      },
      {
        id: 4,
        name: "dd Doe",
        isAdmin: false,
      },
    ];
    render(<UserList users={users} />);
    users.forEach((u) => {
      const user = screen.getByRole("link", {
        name: u.name,
      });

      expect(user).toHaveAttribute("href", `/users/${u.id}`);
      expect(user).toBeInTheDocument();
    });
  });
});
