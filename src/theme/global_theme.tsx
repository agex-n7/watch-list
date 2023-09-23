import { Global, css } from "@emotion/react";
import { colors } from "./colors";
import * as React from "react";

const GlobalTheme = React.memo(() => (
  <Global
    styles={css`
      body {
        --color-primary: ${colors.primary};
        --color-primary-dark: ${colors.primaryDark};
        --color-negative: ${colors.negative};
        --color-negative-dark: ${colors.negativeDark};

        --font-light: ${colors.fontLight};

        --background: ${colors.background};
        --background-content: ${colors.backgroundContent};

        color: var(--font-light);
        font-family: "Lato";
        font-size: 14px;

        background: var(--background);
      }

      * {
        color: var(--font-light);
      }

      main {
        padding: 0;
      }

      input,
      select {
        background: #00000033;
        height: 24px;
        border-radius: 4px;
        padding: 0 6px;
        border: solid 1px #bfbfbf;
      }

      select {
        padding: 0 4px;
      }
    `}
  />
));

export { GlobalTheme };
