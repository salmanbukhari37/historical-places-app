import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PlaceItem from "../components/PlaceItem";

const mockPlace = {
  id: 1,
  name: "Beautiful Place",
  visited: false,
  imageUrl: "/images/place.jpg",
  description: "Testing beautiful place",
};

const mockMarkVisited = jest.fn();

describe("PlaceItem Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders place name and image", () => {
    render(
      <BrowserRouter>
        <PlaceItem place={mockPlace} markVisited={mockMarkVisited} />
      </BrowserRouter>
    );

    // Check that the place name is displayed
    const placeName = screen.getByText(mockPlace.name);
    expect(placeName).toBeInTheDocument();

    // Check that the image is rendered
    const image = screen.getByAltText(mockPlace.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      `${process.env.REACT_APP_IMAGE_URL}${mockPlace.imageUrl}`
    );
  });

  test("renders the switch with correct state (initially unvisited)", () => {
    render(
      <BrowserRouter>
        <PlaceItem place={mockPlace} markVisited={mockMarkVisited} />
      </BrowserRouter>
    );

    // Check that the switch is in the correct initial state (unvisited)
    const switchLabel = screen.getByText("Mark as Visited");
    expect(switchLabel).toBeInTheDocument();
  });

  test("marks place as visited when switch is toggled", () => {
    render(
      <BrowserRouter>
        <PlaceItem place={mockPlace} markVisited={mockMarkVisited} />
      </BrowserRouter>
    );

    // Toggle the switch
    const switchElement = screen.getByRole("switch");
    fireEvent.click(switchElement);

    // Check that the switch label is updated and markVisited is called
    const switchLabel = screen.getByText("Marked as Visited");
    expect(switchLabel).toBeInTheDocument();
    expect(mockMarkVisited).toHaveBeenCalledWith(mockPlace.id);
  });

  test('renders "Marked as Visited" when place is visited', () => {
    render(
      <BrowserRouter>
        <PlaceItem
          place={{ ...mockPlace, visited: true }}
          markVisited={mockMarkVisited}
        />
      </BrowserRouter>
    );

    // Check that the switch is in the correct state (visited)
    const switchLabel = screen.getByText("Marked as Visited");
    expect(switchLabel).toBeInTheDocument();
  });
});
