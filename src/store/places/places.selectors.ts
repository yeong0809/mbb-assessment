import { RootState } from '../index';

/** Places list */
export const selectPlaces = (state: RootState) => {
  return state.places.list;
};

/** Loading state */
export const selectPlacesLoading = (state: RootState) => {
  return state.places.loading;
};

/** Error state */
export const selectPlacesError = (state: RootState) => {
  return state.places.error;
};

/** Visited IDs */
export const selectVisitedIds = (state: RootState) => {
  return state.places.visitedIds;
};

export const selectUnvisitedPlaces = (state: RootState) => {
  const { list, visitedIds } = state.places;
  return list.filter((place) => {
    return !visitedIds.includes(place.id);
  });
};

/** Check if a place is visited */
export const selectIsPlaceVisited = (placeId: number) => {
  return (state: RootState): boolean => {
    return state.places.visitedIds.includes(placeId);
  };
};

/** Get place by ID */
export const selectPlaceById = (placeId: number) => {
  return (state: RootState) => {
    return state.places.list.find((p) => {
      return p.id === placeId;
    });
  };
};
