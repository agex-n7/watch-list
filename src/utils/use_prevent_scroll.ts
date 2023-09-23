import * as React from "react";

export function usePreventScroll(): void {
  React.useEffect(() => {
    const { position, top, width } = document.body.style;
    const { scrollY } = window;
    document.body.style.top = `-${scrollY}px`;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = position;
      document.body.style.top = top;
      document.body.style.width = width;
      window.scrollTo(0, scrollY);
    };
  }, []);
}
