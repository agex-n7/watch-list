import * as React from "react";
import { css } from "@emotion/css";
import { Card } from "../../components/card";
import { IconButton } from "../../components/buttons/icon_button";
import { Icon, IconComponent } from "../../components/icon";
import { MediaData, WatchState } from "../../state/media_types";
import type { Draft } from "immer";

export interface MediaCardProps {
  item: MediaData;
  onDeleteClick: (item: MediaData) => void | Promise<void>;
  onEditClick: (item: MediaData) => void | Promise<void>;
  onChange: (
    item: MediaData,
    producer: (draft: Draft<MediaData>) => void
  ) => void;
}

const mediaCardStyle = css`
  min-width: 160px;

  .header {
    display: flex;
    align-items: center;
  }

  .title {
    font-size: 18px;
    font-weight: 700;
    margin-right: auto;
  }

  .meta-info-block {
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;

    .meta-info {
      display: inline-flex;
      align-items: center;

      .icon {
        margin-right: 8px;
      }
    }
  }

  .state-select {
    background: #00000033;
    height: 24px;
    border-radius: 4px;
    padding-left: 4px;
  }
`;

const MetaInfo = (props: { children: React.ReactNode }) => (
  <span className="meta-info">{props.children}</span>
);

export const MediaCard = React.memo(function MediaCard(
  props: MediaCardProps
): JSX.Element {
  const { item, onEditClick, onDeleteClick, onChange } = props;

  const handleEditClick = React.useCallback(() => {
    onEditClick(item);
  }, [item, onEditClick]);
  const handleDeleteClick = React.useCallback(() => {
    onDeleteClick(item);
  }, [item, onDeleteClick]);
  const handleWatchStateChange = React.useCallback(
    (newState: WatchState) => {
      onChange(item, (draft) => (draft.watchState = newState));
    },
    [item, onChange]
  );

  return (
    <Card className={mediaCardStyle}>
      <div className="header">
        <div className="title">{item.title}</div>
        <IconButton
          icon={Icon.EDIT}
          tooltip="Edit entry"
          onClick={handleEditClick}
        />
        <IconButton
          icon={Icon.DELETE}
          tooltip="Delete entry"
          onClick={handleDeleteClick}
        />
      </div>
      <div className="meta-info-block">
        <MetaInfo>
          <IconComponent icon={Icon.MOVIE} size={18} />
          {item.type}
        </MetaInfo>
        <MetaInfo>
          <IconComponent icon={Icon.THEATER_COMEDY} size={18} />
          {item.genre}
        </MetaInfo>
        <MetaInfo>
          <IconComponent icon={Icon.TASK_ALT} size={18} />
          <select
            className="state-select"
            value={item.watchState}
            onChange={(changeEvent) =>
              handleWatchStateChange(changeEvent.target.value as WatchState)
            }
          >
            {Object.values(WatchState).map((watchOption) => (
              <option key={watchOption} value={watchOption}>
                {watchOption}
              </option>
            ))}
          </select>
        </MetaInfo>
      </div>
    </Card>
  );
});
