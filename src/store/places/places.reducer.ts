import { PlacesState } from './places.types';
import {
  PlacesActionTypes,
  FETCH_PLACES,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAILURE,
  TOGGLE_VISITED,
} from './places.actions';

const initialState: PlacesState = {
  list: [],
  visitedIds: [],
  loading: false,
  error: null,
};

export default function placesReducer(
  state = initialState,
  action: PlacesActionTypes,
): PlacesState {
  switch (action.type) {
    case FETCH_PLACES:
      return { ...state, loading: true, error: null };

    case FETCH_PLACES_SUCCESS:
      return { ...state, loading: false, list: action.payload };

    case FETCH_PLACES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case TOGGLE_VISITED:
      const id = action.payload;
      return {
        ...state,
        visitedIds: state.visitedIds.includes(id)
          ? state.visitedIds.filter((v) => {
              return v !== id;
            })
          : [...state.visitedIds, id],
      };

    default:
      return state;
  }
}
