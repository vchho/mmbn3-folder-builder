import { it, describe } from "vitest";
import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { PropsWithChildren } from "react";
import Create from "../pages/Create";
import userEvent from "@testing-library/user-event";

function wrapper({ children }: PropsWithChildren<unknown>) {
  return <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>;
}

describe("Create test suite", () => {
  it("Check if Create.tsx renders", () => {
    {
      render(<Create />, { wrapper });
    }
  });
  it("check if total cards are 0 / 30", () => {
    {
      render(<Create />, { wrapper });

      expect(screen.getByText("Total: 0 / 30")).toBeInTheDocument();
    }
  });
  it("check if standard cards are 0 / 30", () => {
    {
      render(<Create />, { wrapper });
      expect(screen.getByText("Standard: 0 / 30")).toBeInTheDocument();

    }
  });
  it("check if mega cards are 0 / 7", () => {
    {
      render(<Create />, { wrapper });

      expect(screen.getByText("Mega: 0 / 7")).toBeInTheDocument();
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
  // it("should be able to click on dropdown, click on a option, and have a chip be displayed", () => {
  //   // Arrange
  //   const { getByTestId } = render(<Create />, { wrapper });
  //
  //   // Act
  //   userEvent.selectOptions(getByTestId("select"), "Code");
  //
  //   // Assert
  //   expect(screen.getByText("Cannon A")).toBeInTheDocument();
  // });
});
