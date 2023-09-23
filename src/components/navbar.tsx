import { css } from "@emotion/css";
import * as React from "react";

const NAV_HEIGHT = "48px;";

const navbarStyle = css`
  height: ${NAV_HEIGHT};

  nav {
    background: var(--color-primary);
    height: ${NAV_HEIGHT};
    display: flex;
    gap: 4px;
    padding: 0 16px;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
  }
`;

export const Navbar = React.memo(function Navbar(props: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element {
  return (
    <div className={navbarStyle}>
      <nav>{props.children}</nav>;
    </div>
  );
});
