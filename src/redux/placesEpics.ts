import { ofType } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { Place } from "../dto/types";
import {
  fetchPlacesFailure,
  fetchPlacesStart,
  fetchPlacesSuccess,
  updateVisitedFailure,
  updateVisitedStart,
  updateVisitedSuccess,
} from "./placesSlice";

const apiUrl = process.env.REACT_APP_API_URL;

type PlacesAction =
  | ReturnType<typeof fetchPlacesStart>
  | ReturnType<typeof fetchPlacesSuccess>
  | ReturnType<typeof fetchPlacesFailure>
  | ReturnType<typeof updateVisitedStart>
  | ReturnType<typeof updateVisitedSuccess>
  | ReturnType<typeof updateVisitedFailure>;

export const fetchPlacesEpic: any = (action$: Observable<PlacesAction>) =>
  action$.pipe(
    ofType(fetchPlacesStart.type),
    mergeMap(() =>
      fetch(`${apiUrl}/place`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch places");
          }
          return response.json();
        })
        .then((data: Place[]) => fetchPlacesSuccess(data))
        .catch((error) => {
          console.error("Fetch error:", error.message);
          const errorMsg = error.message || "Failed to fetch data";
          console.log("Dispatching fetchDataFailure with message:", errorMsg);
          return of(fetchPlacesFailure(errorMsg));
        })
    )
  );

// Epic for updating the visited status
export const updateVisitedEpic: any = (action$: Observable<PlacesAction>) =>
  action$.pipe(
    ofType(updateVisitedStart.type),
    mergeMap((action: any) =>
      fetch(`${apiUrl}/place/${action.payload.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ visited: action.payload.visited }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update place");
          }
          return response.json();
        })
        .then((updatedPlace: Place) => updateVisitedSuccess(updatedPlace))
        .catch((error) =>
          of(updateVisitedFailure({ id: action.payload, error: error.message }))
        )
    )
  );
