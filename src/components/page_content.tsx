import { css } from "@emotion/css";
import React from "react";

const pageContentStyle = css`
  display: flex;
  justify-content: center;

  > * {
    margin: 0 20px;
    width: 1200px;
    max-width: 1200px;

    @media only screen and (min-width: 800px) {
      margin: 0 32px;
    }
  }
`;

export const PageContent = React.memo(function PageContent(props: {
  children: React.ReactNode;
}): JSX.Element {
  return <main className={pageContentStyle}>{props.children}</main>;
});
