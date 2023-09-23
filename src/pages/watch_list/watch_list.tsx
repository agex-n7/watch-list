import { css } from "@emotion/css";
import { PageHeader } from "../../components/page_header";
import { MediaCard } from "./media_card";
import { useWatchListState } from "./watch_list_state";
import { IconButton } from "../../components/buttons/icon_button";
import { Icon } from "../../components/icon";
import { MediaData } from "../../state/media_types";
import * as React from "react";
import { SortOption, WatchListSortMenu } from "./watch_list_sort_menu";
import { Button, ButtonType } from "../../components/buttons/button";

const contentStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;

  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

function getSortByCompareFn(
  sortBy: SortOption
): (a: MediaData, b: MediaData) => number {
  switch (sortBy) {
    case SortOption.NONE:
      return (a, b) => 0;

    case SortOption.TITLE_ASCENDING:
      return (a, b) => (a.title < b.title ? 1 : -1);

    case SortOption.TITLE_DESCENDING:
      return (a, b) => (a.title > b.title ? 1 : -1);
  }
}

export const WatchList = React.memo(function WatchList(): JSX.Element {
  const {
    mediaItems,
    addMediaItem,
    editMediaItem,
    deleteMediaItem,
    deleteAllMediaItems,
    changeMediaItem
  } = useWatchListState();

  const [sortBy, setSortBy] = React.useState(SortOption.NONE);
  const onSortChane = React.useCallback(
    (option: SortOption) => {
      setSortBy(option);
    },
    [setSortBy]
  );

  const sortedMediaItems = React.useMemo(() => {
    return [...mediaItems].sort(getSortByCompareFn(sortBy));
  }, [sortBy, mediaItems]);

  return (
    <div>
      <PageHeader
        rightItems={
          <>
            <WatchListSortMenu sortBy={sortBy} onSortChange={onSortChane} />
            <IconButton
              icon={Icon.ADD}
              tooltip="Add an entry"
              onClick={addMediaItem}
            />
            <IconButton
              icon={Icon.DELETE_SWEEP}
              tooltip="Delete all entries"
              onClick={deleteAllMediaItems}
            />
          </>
        }
      >
        Watch List
      </PageHeader>
      <div className={contentStyle}>
        {sortedMediaItems.map((mediaItem: MediaData) => (
          <MediaCard
            // Should be an id, if we had one
            key={mediaItem.title}
            item={mediaItem}
            onDeleteClick={deleteMediaItem}
            onEditClick={editMediaItem}
            onChange={changeMediaItem}
          />
        ))}
        {mediaItems.length ? null : (
          <div className="no-data">
            <p>Your watch list is empty! Start by adding your first entry:</p>
            <div>
              <Button
                icon={Icon.ADD}
                type={ButtonType.PRIMARY}
                onClick={addMediaItem}
              >
                Add entry
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
