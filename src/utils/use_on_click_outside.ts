import React from "react";

function isElementOrParent(
  target: HTMLElement | null,
  element: HTMLElement
): boolean {
  if (!target) {
    return false;
  }
  if (target === element) {
    return true;
  }
  return isElementOrParent(target.parentElement, element);
}

export function useOnClickOutside(
  element: React.RefObject<HTMLElement>,
  callback: () => void
) {
  const callbackRef = React.useRef(callback);
  callbackRef.current = callback;

  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const wasClickInside = isElementOrParent(
        event.target as HTMLElement,
        element.current!
      );

      if (!wasClickInside) {
        callbackRef.current();
      }
    };

    window.addEventListener("click", onClick);

    return () => window.removeEventListener("click", onClick);
  }, [element]);
}
