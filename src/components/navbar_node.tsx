import { css } from "@emotion/css";
import { commonButtonStyle, getButtonTypeStyle } from "./buttons/button.style";
import { Link, useRoute } from "wouter";
import { composeClassNames } from "../utils/style_utils";
import { ButtonType } from "./buttons/button";
import * as React from "react";

const nodeStyle = css`
  text-decoration: none;
  font-size: 18px;

  &.active {
    background: rgba(0, 0, 0, 0.1);
  }

  &:hover,
  &.active:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`;

export const NavbarNode = React.memo(function NavbarNode(props: {
  href: string;
  children: JSX.Element | string;
}): JSX.Element {
  const { href } = props;
  const [isActive] = useRoute(href);

  return (
    <Link
      href={href}
      className={composeClassNames(
        nodeStyle,
        commonButtonStyle,
        getButtonTypeStyle(ButtonType.GHOST),
        isActive ? "active" : null
      )}
    >
      {props.children}
    </Link>
  );
});
