import { combineEpics } from "redux-observable";
import { fetchPlacesEpic, updateVisitedEpic } from "./placesEpics";

export const rootEpic = combineEpics(fetchPlacesEpic, updateVisitedEpic);
