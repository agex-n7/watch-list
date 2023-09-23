import { css } from "@emotion/css";
import { composeClassNames } from "../../utils/style_utils";
import { commonButtonStyle, getButtonTypeStyle } from "./button.style";
import { Icon, IconComponent } from "../icon";
import { ButtonType } from "./button";
import * as React from "react";

export interface IconButtonProps {
  icon: Icon;
  tooltip: string;
  onClick: () => void;
}

export const IconButton = React.memo(function IconButton(
  props: IconButtonProps
): JSX.Element {
  const { icon, tooltip } = props;
  return (
    <button
      title={tooltip}
      className={composeClassNames(
        "icon-button",
        commonButtonStyle,
        getButtonTypeStyle(ButtonType.GHOST),
        css`
          &.icon-button {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            .icon {
              margin: 0;
            }
          }
        `
      )}
      onClick={props.onClick}
    >
      <IconComponent icon={icon} size={20} />
    </button>
  );
});
