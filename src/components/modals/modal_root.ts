import { createRoot, Root } from "react-dom/client";

const MODAL_ROOT_ID = "modal-root";

let modalRoot: Root | null;
export function getModalRoot(): Root {
  let modalRootElement: HTMLElement | null = document.getElementById(
    MODAL_ROOT_ID
  );
  if (!modalRootElement) {
    modalRootElement = document.createElement("div");
    modalRootElement.id = MODAL_ROOT_ID;
    document.body.prepend(modalRootElement);
  }

  if (modalRoot) {
    console.error(
      `Trying to mount another modal before the previous want was unmounted!`
    );
    return modalRoot;
  }
  modalRoot = createRoot(modalRootElement);

  return modalRoot;
}

export function unmountModal(): void {
  if (modalRoot) {
    modalRoot.unmount();
    modalRoot = null;
  }
}
