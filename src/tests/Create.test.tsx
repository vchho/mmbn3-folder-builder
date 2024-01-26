import { it, describe } from "vitest";
import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { PropsWithChildren } from "react";
import Create from "../pages/Create";
import userEvent from "@testing-library/user-event";

function wrapper({ children }: PropsWithChildren<unknown>) {
  return <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>;
}

describe("Test.tsx", () => {
  it("Check if Create.tsx renders", () => {
    {
      render(<Create />, { wrapper });
    }
  });
  it("check if Cannon A chip is on the screen", async () => {
    {
      render(<Create />, { wrapper });

      expect(await screen.getByText("Cannon A")).toBeInTheDocument();
    }
  });
  it("check if total cards are 0 / 30", async () => {
    {
      render(<Create />, { wrapper });

      expect(await screen.getByText("Total: 0 / 30")).toBeInTheDocument();
    }
  });
  it("check if standard cards are 0 / 30", async () => {
    {
      render(<Create />, { wrapper });
      //   console.log("element", element);

      //   element.debug();
      expect(await screen.getByText("Standard: 0 / 30")).toBeInTheDocument();

      //   expect(screen.getByText("Standard: 0 / 30")).toBeInTheDocument();
    }
  });
  it("check if mega cards are 0 / 7", async () => {
    {
      render(<Create />, { wrapper });

      expect(await screen.getByText("Mega: 0 / 7")).toBeInTheDocument();
    }
  });

  it("should be able to click on toggle from ascending to descending", async () => {
    // Arrange
    render(<Create />, { wrapper });

    // Act
    userEvent.click(screen.getByRole("checkbox"));

    // Assert
    expect(await screen.findByText(/descending/i)).toBeInTheDocument();
  });
  it("should be able to click on dropdown, click on a option, and have a chip be displayed", async () => {
    // Arrange
    const { getByTestId } = render(<Create />, { wrapper });

    // Act
    userEvent.selectOptions(getByTestId("select"), "Code");

    // Assert
    expect(await screen.getByText("Cannon *")).toBeInTheDocument();
  });
});
