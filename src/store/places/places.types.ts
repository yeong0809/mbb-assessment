export interface Place {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface PlacesState {
  list: Place[];
  visitedIds: number[];
  loading: boolean;
  error: string | null;
}
