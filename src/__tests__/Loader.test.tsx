import React from "react";
import { render } from "@testing-library/react";
import Loader from "../components/Loader"; // Adjust the path based on your folder structure

describe("Loader Component", () => {
  test("renders the loading spinner", () => {
    // Render the Loader component
    const { container } = render(<Loader />);

    // Check if the spinner (the div with animate-spin class) is in the document
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();

    // Ensure that the spinner has the correct size and styles
    expect(spinner).toHaveClass(
      "rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"
    );
  });
});
