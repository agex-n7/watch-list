import { css } from "@emotion/css";
import { ButtonType } from "./button";

export function getButtonTypeStyle(type: ButtonType): string {
  switch (type) {
    case ButtonType.GHOST:
      return css`
        background: transparent;

        &.active {
          background: rgba(0, 0, 0, 0.25);
        }

        :hover,
        &.active:hover {
          background: rgba(0, 0, 0, 0.15);
        }
      `;
    case ButtonType.GHOST_PRIMARY:
      return css`
        background: transparent;

        &.active {
          background: var(--color-primary-dark);
        }

        :hover,
        &.active:hover {
          background: var(--color-primary-dark);
          opacity: 0.9;
        }
      `;

    case ButtonType.PRIMARY:
      return css`
        background: var(--color-primary);
        :hover {
          background: var(--color-primary-dark);
        }
      `;

    case ButtonType.NEGATIVE:
      return css`
        background: var(--color-negative);

        :hover {
          background: var(--color-negative-dark);
        }
      `;
  }
}

export const commonButtonStyle = css`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 32px;
  padding: 0 8px;
  border-radius: 4px;

  border: none;

  &.has-icon {
    padding-right: 12px;
  }

  &.align-left {
    justify-content: flex-start;
  }

  .icon {
    margin-right: 4px;
  }
`;
