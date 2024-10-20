import configureMockStore from "redux-mock-store";
import { createEpicMiddleware } from "redux-observable"; // For Redux Observable middleware
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { rootEpic } from "../redux/rootEpic"; // Make sure your root epic is correctly imported
import PlaceList from "../components/PlaceList";
import { fetchPlacesStart, updateVisitedStart } from "../redux/placesSlice";

// Mock components
jest.mock("../components/Loader", () => () => <div>Loading...</div>);
jest.mock("../components/PlaceItem", () => ({ place, markVisited }: any) => (
  <div>
    <span>{place.name}</span>
    <button onClick={() => markVisited(place.id)}>Mark as Visited</button>
  </div>
));

const epicMiddleware = createEpicMiddleware(); // Create Epic middleware
const middlewares: any = [epicMiddleware]; // Add Redux Observable middleware to the list
const mockStore = configureMockStore(middlewares); // Create the mock store with middleware

describe("PlaceList Component with Redux Observable", () => {
  let store: any;
  let placesMock;

  beforeEach(() => {
    placesMock = [
      { id: 1, name: "Place 1", visited: false, imageUrl: "/image1.jpg" },
      { id: 2, name: "Place 2", visited: true, imageUrl: "/image2.jpg" },
    ];

    store = mockStore({
      places: {
        places: placesMock,
        loading: false,
        error: null,
      },
    });

    epicMiddleware.run(rootEpic); // Make sure the middleware is connected to the rootEpic
    jest.clearAllMocks();
  });

  test("dispatches fetchPlacesStart on mount", () => {
    render(
      <Provider store={store}>
        <PlaceList />
      </Provider>
    );

    const actions = store.getActions();
    expect(actions).toContainEqual(fetchPlacesStart());
  });

  // Add other tests (rendering, markVisited, etc.) here
});
