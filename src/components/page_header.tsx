import { css } from "@emotion/css";
import * as React from "react";

const pageHeaderStyle = css`
  display: flex;
  h1 {
    font-size: 20px;
    line-height: 1.5em;
    margin: 16px 0;
  }

  .right-items {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const PageHeader = React.memo(function PageHeader(props: {
  rightItems?: JSX.Element | JSX.Element[];
  children: React.ReactNode;
}): JSX.Element {
  const { rightItems } = props;

  return (
    <div className={pageHeaderStyle}>
      <h1>{props.children}</h1>
      {rightItems && <span className="right-items">{rightItems}</span>}
    </div>
  );
});
