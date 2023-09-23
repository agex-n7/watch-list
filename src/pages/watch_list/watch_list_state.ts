import * as React from "react";
import { useAtom } from "jotai";
import { mediaCollectionAtom } from "../../state/media_store";
import { original } from "immer";
import { MediaData } from "../../state/media_types";
import {
  openDeleteAllMediaItemiModal,
  openDeleteMediaItemModal
} from "./delete_media_modals";
import type { Draft } from "immer";
import {
  openAddMediaItemModal,
  openEditMediaItemModal
} from "./edit_media_modals";

export type MediaItemChangeProducer = (draft: Draft<MediaData>) => void;

export const useWatchListState = () => {
  const [mediaItems, setMediaItems] = useAtom(mediaCollectionAtom);
  const deleteMediaItem = React.useCallback(
    async (mediaItem: MediaData) => {
      const { confirmed } = await openDeleteMediaItemModal(mediaItem);
      if (confirmed) {
        setMediaItems((draft) => {
          const itemIndex = draft.findIndex(
            (draftItem) => original(draftItem) === mediaItem
          );
          draft.splice(itemIndex, 1);
        });
      }
    },
    [setMediaItems]
  );

  const deleteAllMediaItems = React.useCallback(async () => {
    const { confirmed } = await openDeleteAllMediaItemiModal({
      itemCount: mediaItems.length
    });
    if (confirmed) {
      setMediaItems((draft) => {
        draft.splice(0, mediaItems.length);
      });
    }
  }, [setMediaItems, mediaItems]);

  const addMediaItem = React.useCallback(async () => {
    const result = await openAddMediaItemModal();
    if (result) {
      setMediaItems((draft) => {
        draft.push(result);
      });
    }
  }, [setMediaItems]);

  const editMediaItem = React.useCallback(
    async (item: MediaData) => {
      const result = await openEditMediaItemModal(item);
      if (result) {
        setMediaItems((draft) => {
          const itemIndex = draft.findIndex(
            (draftItem) => original(draftItem) === item
          );
          draft.splice(itemIndex, 1, result);
        });
      }
    },
    [setMediaItems]
  );

  const changeMediaItem = React.useCallback(
    async (mediaItem: MediaData, producer: MediaItemChangeProducer) => {
      setMediaItems((draft) => {
        const draftItem = draft.find((item) => original(item) === mediaItem)!;
        producer(draftItem);
      });
    },
    [setMediaItems]
  );

  return {
    mediaItems,
    addMediaItem,
    editMediaItem,
    deleteMediaItem,
    deleteAllMediaItems,
    changeMediaItem
  };
};
