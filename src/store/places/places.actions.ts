import { Place } from './places.types';

export const FETCH_PLACES = `FETCH_PLACES`;
export const FETCH_PLACES_SUCCESS = `FETCH_PLACES_SUCCESS`;
export const FETCH_PLACES_FAILURE = `FETCH_PLACES_FAILURE`;
export const TOGGLE_VISITED = `TOGGLE_VISITED`;

interface FetchPlacesAction {
  type: typeof FETCH_PLACES;
}

interface FetchPlacesSuccessAction {
  type: typeof FETCH_PLACES_SUCCESS;
  payload: Place[];
}

interface FetchPlacesFailureAction {
  type: typeof FETCH_PLACES_FAILURE;
  payload: string;
}

interface ToggleVisitedAction {
  type: typeof TOGGLE_VISITED;
  payload: number; // place ID
}

export type PlacesActionTypes =
  | FetchPlacesAction
  | FetchPlacesSuccessAction
  | FetchPlacesFailureAction
  | ToggleVisitedAction;

export const fetchPlaces = (): FetchPlacesAction => {
  return { type: FETCH_PLACES };
};
export const fetchPlacesSuccess = (
  places: Place[],
): FetchPlacesSuccessAction => {
  return {
    type: FETCH_PLACES_SUCCESS,
    payload: places,
  };
};
export const fetchPlacesFailure = (error: string): FetchPlacesFailureAction => {
  return {
    type: FETCH_PLACES_FAILURE,
    payload: error,
  };
};
export const toggleVisited = (id: number): ToggleVisitedAction => {
  return {
    type: TOGGLE_VISITED,
    payload: id,
  };
};
