import { css } from "@emotion/css";
import { composeClassNames } from "../utils/style_utils";
import * as React from "react";

// More icons can be found here:
// https://fonts.google.com/icons?icon.style=Rounded
export enum Icon {
  ADD = "add",
  EDIT = "edit",
  DELETE = "delete",
  DELETE_SWEEP = "delete_sweep",
  SAVE = "save",
  CLOSE = "close",
  MOVIE = "movie",
  THEATER_COMEDY = "theater_comedy",
  TASK_ALT = "task_alt",
  FILTER_ALT = "filter_alt",
  SORT = "sort",
  ARROW_DOWNWARD = "arrow_downward",
  ARROW_UPWARD = "arrow_upward",
  FILTER_LIST_OFF = "filter_list_off"
}

export interface IconProps {
  icon: Icon;
  size?: number;
}

export const IconComponent = React.memo(function IconComponent(
  props: IconProps
): JSX.Element {
  const { icon, size = 20 } = props;

  const iconStyle = React.useMemo(
    () =>
      css`
        font-size: ${size}px;
      `,
    [size]
  );

  return (
    <span
      className={composeClassNames("icon", "material-icons-round", iconStyle)}
    >
      {icon}
    </span>
  );
});
