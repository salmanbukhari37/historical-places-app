import { createSlice } from "@reduxjs/toolkit";
import { Place } from "../dto/types";

export interface PlacesState {
  places: Place[];
  loading: boolean;
  error: string | null;
}

const initialState: PlacesState = {
  places: [],
  loading: false,
  error: null,
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    fetchPlacesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPlacesSuccess: (state, action) => {
      state.loading = false;
      state.places = action.payload;
    },
    fetchPlacesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    markVisited: (state, action) => {
      const place = state.places.find((place) => place.id === action.payload);
      if (place) {
        place.visited = !place.visited;
      }
    },
    updateVisitedStart: (state, action) => {
      const place = state.places.find((place) => place.id === action.payload);
      if (place) {
        place.visited = !place.visited;
      }
    },
    updateVisitedSuccess: (state, action) => {
      const index = state.places.findIndex(
        (place) => place.id === action.payload.id
      );
      if (index !== -1) {
        state.places[index] = action.payload;
      }
    },
    updateVisitedFailure: (state, action) => {
      const place = state.places.find(
        (place) => place.id === action.payload.id
      );
      if (place) {
        place.visited = !place.visited;
      }
      state.error = action.payload.error;
    },
  },
});

export const {
  fetchPlacesStart,
  fetchPlacesSuccess,
  fetchPlacesFailure,
  markVisited,
  updateVisitedStart,
  updateVisitedSuccess,
  updateVisitedFailure,
} = placesSlice.actions;
export default placesSlice.reducer;
