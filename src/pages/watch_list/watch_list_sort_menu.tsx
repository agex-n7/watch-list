import { IconButton } from "../../components/buttons/icon_button";
import { Icon } from "../../components/icon";
import * as React from "react";
import { DropdownWrapper } from "../../components/dropdown";
import { Button, ButtonType } from "../../components/buttons/button";
import { css } from "@emotion/css";
import { useOnClickOutside } from "../../utils/use_on_click_outside";

const drowdownContentStyle = css`
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
`;

export enum SortOption {
  NONE = "NONE",
  TITLE_ASCENDING = "TITLE_ASCENDING",
  TITLE_DESCENDING = "TITLE_DESCENDING"
}

export const WatchListSortMenu = React.memo(function WatchListSortMenu(props: {
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
}): JSX.Element {
  const { sortBy, onSortChange } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const handleClickOutside = React.useCallback(() => setIsOpen(false), []);
  useOnClickOutside(wrapperRef, handleClickOutside);

  const renderSortButton = React.useCallback(
    (props: { title: string; icon: Icon; sortOption: SortOption }) => (
      <Button
        alignLeft
        type={ButtonType.GHOST_PRIMARY}
        active={props.sortOption === sortBy}
        icon={props.icon}
        onClick={() => onSortChange(props.sortOption)}
      >
        {props.title}
      </Button>
    ),
    [onSortChange, sortBy]
  );

  return (
    <div ref={wrapperRef}>
      <DropdownWrapper
        isOpen={isOpen}
        dropdownContent={
          <div className={drowdownContentStyle}>
            <div className="sort-label">Sort by:</div>
            {renderSortButton({
              title: "No sorting",
              icon: Icon.FILTER_LIST_OFF,
              sortOption: SortOption.NONE
            })}
            {renderSortButton({
              title: "Title (descending)",
              icon: Icon.ARROW_DOWNWARD,
              sortOption: SortOption.TITLE_DESCENDING
            })}
            {renderSortButton({
              title: "Title (ascending)",
              icon: Icon.ARROW_UPWARD,
              sortOption: SortOption.TITLE_ASCENDING
            })}
          </div>
        }
      >
        <IconButton
          icon={Icon.SORT}
          tooltip="Sort entries"
          onClick={() => setIsOpen((current) => !current)}
        />
      </DropdownWrapper>
    </div>
  );
});
