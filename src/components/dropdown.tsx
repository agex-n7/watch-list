import * as React from "react";
import { css } from "@emotion/css";
import { Card } from "./card";

const dropdownWrapperStyle = css`
  display: flex;
  flex-direction: column;
  .dropdown-parent {
    position: relative;
  }
`;

const dropdownStyle = css`
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--color-primary-dark);
`;

const Dropdown = React.memo(function Dropdown(props: {
  children: React.ReactNode;
}): JSX.Element {
  return <Card className={dropdownStyle}>{props.children}</Card>;
});

export const DropdownWrapper = React.memo(function DropdownWrapper(props: {
  isOpen: boolean;
  dropdownContent: JSX.Element;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className={dropdownWrapperStyle}>
      {props.children}
      {props.isOpen && (
        <div className="dropdown-parent">
          <Dropdown>{props.dropdownContent}</Dropdown>
        </div>
      )}
    </div>
  );
});
