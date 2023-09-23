import { MediaData, MediaType, WatchState } from "../state/media_types";

export const initialMediaData: MediaData[] = [
  {
    title: "Game of Thrones",
    genre: "Fantasy",
    type: MediaType.SERIES,
    watchState: WatchState.WATCHED
  },
  {
    title: "Succession",
    genre: "Comedy/Drama",
    type: MediaType.SERIES,
    watchState: WatchState.PLANNED
  },
  {
    title: "The Banshees of Inisherin",
    genre: "Comedy/Drama",
    type: MediaType.SERIES,
    watchState: WatchState.WATCHED
  },
  {
    title: "Spider-Man: Into the Spider-Verse",
    genre: "Action/Adventure",
    type: MediaType.MOVIE,
    watchState: WatchState.WATCHED
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    genre: "Action/Adventure",
    type: MediaType.MOVIE,
    watchState: WatchState.PLANNED
  },
  {
    title: "The Little Mermaid",
    genre: "Fantasy",
    type: MediaType.MOVIE,
    watchState: WatchState.REJECTED
  }
];
