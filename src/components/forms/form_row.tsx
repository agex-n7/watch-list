import { css } from "@emotion/css";
import * as React from "react";

const formRowStyle = css`
  display: flex;

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  label {
    display: inline-block;
    width: 60px;
    margin-right: 12px;
  }

  input,
  select {
    width: 160px;
    box-sizing: border-box;
    flex: 1 1 auto;
  }
`;

export const FormRow = React.memo(function FormRow(props: {
  name: string;
  label: string;
  children: JSX.Element;
}): JSX.Element {
  return (
    <div className={formRowStyle}>
      <label htmlFor={props.label}>{props.name}</label>
      {props.children}
    </div>
  );
});
