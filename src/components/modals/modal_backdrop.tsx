import { css } from "@emotion/css";
import * as React from "react";

const modalBackdropStyle = css`
  width: 100vw;
  height: 100vh;
  background: #00000080;
  justify-content: center;
  align-items: center;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;

export const ModalBackdrop = React.memo(function ModalBackdrop(props: {
  children?: JSX.Element;
}): JSX.Element {
  return (
    <div className={modalBackdropStyle}>
      <div>{props.children}</div>
    </div>
  );
});
