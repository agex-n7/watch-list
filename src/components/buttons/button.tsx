import { composeClassNames } from "../../utils/style_utils";
import { Icon, IconComponent } from "../icon";
import { commonButtonStyle, getButtonTypeStyle } from "./button.style";
import * as React from "react";

export enum ButtonType {
  GHOST = "ghost",
  GHOST_PRIMARY = "ghost_primary",
  PRIMARY = "primary",
  NEGATIVE = "negative"
}

export interface ButtonProps {
  icon?: Icon;
  children: JSX.Element | string;
  type?: ButtonType;
  alignLeft?: boolean;
  active?: boolean;
  onClick: () => void;
}

export const Button = React.memo(function Button(
  props: ButtonProps
): JSX.Element {
  const { icon, active, alignLeft, type = ButtonType.GHOST } = props;
  return (
    <button
      className={composeClassNames(
        "button",
        commonButtonStyle,
        getButtonTypeStyle(type),
        icon ? "has-icon" : undefined,
        active ? "active" : undefined,
        alignLeft ? "align-left" : undefined
      )}
      onClick={props.onClick}
    >
      {icon && <IconComponent icon={icon} size={18} />}
      {props.children}
    </button>
  );
});
