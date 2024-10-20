import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "../components/NotFound";

describe("NotFound Component", () => {
  test("renders the 404 heading", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    const headingElement = screen.getByText(/404/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders the "Page Not Found" message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    const messageElement = screen.getByText(/Page Not Found/i);
    expect(messageElement).toBeInTheDocument();
  });

  test("renders the Go Home link with correct href", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    const linkElement = screen.getByRole("link", { name: /Go Home/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
