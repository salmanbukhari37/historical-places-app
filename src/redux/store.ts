import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import placesReducer from "./placesSlice";
import { PlacesState } from "./placesSlice";
import { rootEpic } from "./rootEpic";

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: {
    places: placesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});

export type RootState = {
  places: PlacesState;
};

// Run the root epic
epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;

export default store;
