import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import axios from 'axios';
import {
  FETCH_PLACES,
  fetchPlacesSuccess,
  fetchPlacesFailure,
} from './places.actions';
import { Place } from './places.types';

export const fetchPlacesEpic = (action$: any) => {
  return action$.pipe(
    ofType(FETCH_PLACES),
    mergeMap(() => {
      return from(
        axios.get<Place[]>(
          `https://my-json-server.typicode.com/yeong0809/mbb-assessment/places`,
        ),
      ).pipe(
        map((response) => {
          return fetchPlacesSuccess(response.data);
        }),
        catchError((error) => {
          return of(fetchPlacesFailure(error.message));
        }),
      );
    }),
  );
};
