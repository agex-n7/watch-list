import { ModalContent, ModalProps } from "./modal_content";
import { getModalRoot, unmountModal } from "./modal_root";
import { ModalBackdrop } from "./modal_backdrop";

export interface ModalResult {
  confirmed: boolean;
}

export function openModal(props: ModalProps): Promise<ModalResult> {
  return new Promise((resolve, reject) => {
    getModalRoot().render(
      <ModalBackdrop>
        <ModalContent
          {...props}
          onClose={(confirmed) => {
            unmountModal();
            resolve({ confirmed });
          }}
        />
      </ModalBackdrop>
    );
  });
}
