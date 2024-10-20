import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { createEpicMiddleware } from "redux-observable";
import { Helmet } from "react-helmet";
import PlaceDetail from "../components/PlaceDetail";
import { fetchPlacesStart } from "../redux/placesSlice";
import { rootEpic } from "../redux/rootEpic"; // Import your root epic
import { MemoryRouter } from "react-router-dom";

jest.mock("../components/Loader", () => () => <div>Loading...</div>);
jest.mock("../components/NotFound", () => () => <div>Not Found</div>);

describe("PlaceDetail Component with Redux Observable", () => {
  let store: any;
  let placeMock;
  let epicMiddleware: any;

  beforeEach(() => {
    placeMock = {
      id: 1,
      name: "Sample Place",
      description: "This is a sample place description.",
      imageUrl: "/sample.jpg",
      visited: false,
    };

    epicMiddleware = createEpicMiddleware(); // Create the epic middleware

    const mockStore = configureMockStore([epicMiddleware]); // Pass epic middleware
    store = mockStore({
      places: {
        places: [placeMock],
        loading: false,
        error: null,
      },
    });

    // Run the epic middleware with root epic
    epicMiddleware.run(rootEpic);

    jest.clearAllMocks();
  });

  test("dispatches fetchPlacesStart on mount", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/place/1"]}>
          <PlaceDetail />
        </MemoryRouter>
      </Provider>
    );

    const actions = store.getActions();
    expect(actions).toContainEqual(fetchPlacesStart());
  });

  test("renders the NotFound component when place is not found", () => {
    store = configureMockStore([epicMiddleware])({
      places: {
        places: [],
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/place/999"]}>
          <PlaceDetail />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Not Found")).toBeInTheDocument();
  });
});
