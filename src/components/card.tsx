import * as React from "react";
import { css } from "@emotion/css";
import { composeClassNames } from "../utils/style_utils";

const cardStyle = css`
  padding: 16px;
  border-radius: 8px;
  background: var(--background-content);
`;

export const Card = React.memo(function Card(props: {
  className?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className={composeClassNames(props.className, cardStyle)}>
      {props.children}
    </div>
  );
});
