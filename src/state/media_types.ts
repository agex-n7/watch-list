export interface MediaData {
  title: string;
  genre: string;
  type: MediaType;
  watchState: WatchState;
}

export enum MediaType {
  MOVIE = "Movie",
  SERIES = "Series"
}

export enum WatchState {
  PLANNED = "Planned",
  WATCHED = "Watched",
  REJECTED = "Will not watch"
}
