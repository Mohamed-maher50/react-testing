import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "../../src/providers/language/LanguageProvider";
import Label from "../../src/components/Label";
import LanguageSelector from "../../src/components/LanguageSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";
describe("LanguageProvider", () => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();

  it("should render welcome when default lang is en", () => {
    render(
      <LanguageProvider language="en">
        <Label labelId="welcome" />
      </LanguageProvider>
    );

    const label = screen.getByText("Welcome");
    expect(label).toBeInTheDocument();
  });
  it("should render Bienvenidos when default lang is ES", async () => {
    render(
      <LanguageProvider language="en">
        <Theme>
          <Label labelId="welcome" />
          <LanguageSelector />
        </Theme>
      </LanguageProvider>
    );

    const trigger = screen.getByRole("combobox", {
      name: "languages",
    });
    expect(trigger).toBeInTheDocument();
    // await act(async () => {
    await userEvent.click(trigger);
    // });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("option", { name: "ES" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("option", { name: "ES" }));

    const label = screen.getByText("Bienvenidos");
    expect(label).toBeInTheDocument();
  });
});
