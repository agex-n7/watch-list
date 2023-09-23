import { withImmer } from "jotai-immer";
import { atomWithStorage } from "jotai/utils";
import { initialMediaData } from "../data/dummy_media_data";
import { MediaData } from "./media_types";

export const mediaCollectionAtom = withImmer(
  atomWithStorage<MediaData[]>("media_data", initialMediaData)
);
