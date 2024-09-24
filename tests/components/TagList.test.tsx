import { render, waitFor, screen } from "@testing-library/react";
import TagList from "../../src/components/TagList";

import delay from "delay";
vi.mock("delay");
describe("tagList", () => {
  it("should render a list of tags", async () => {
    const dummytags = ["tag1", "tags2", "tags3"];

    render(<TagList />);

    const tags = screen.queryAllByRole("listitem");
    expect(tags.length).toEqual(0);

    await waitFor(
      () => {
        const tags = screen.getAllByRole("listitem");
        console.log(tags.length);
        expect(tags.length).toBe(dummytags.length);
        //   dummytags.forEach((tag, index) => {
        //     expect(tags[index]).toHaveTextContent(tag);
        //   });
      },
      {
        timeout: 600,
      }
    );
  });
});
