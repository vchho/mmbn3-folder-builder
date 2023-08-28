import { Home } from "../pages/Home";
import { it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Test } from "../pages/Test";
import { NotFound } from "../pages/NotFound";
import { MemoryRouter } from "react-router-dom";
import { PropsWithChildren } from "react";
import Create from "../pages/Create";

function wrapper({ children }: PropsWithChildren<unknown>) {
  return <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>;
}

describe("Test.tsx", () => {
  it("Check if Test.tsx renders", () => {
    {
      render(<Test />);
    }
  });
  it("Check if Home.tsx renders", async () => {
    {
      render(<Home />, { wrapper });
      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1).toBeInTheDocument();

      // userEvent.click(screen.getByRole("link", { name: /create a folder!/i }));
      // await screen.debug();
    }
  });
  it("Check if Create.tsx renders", () => {
    {
      render(<Create />, { wrapper });
    }
  });
  it("Check if NotFound.tsx renders", () => {
    {
      render(<NotFound />, { wrapper });
      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1).toBeInTheDocument();
    }
  });
});
