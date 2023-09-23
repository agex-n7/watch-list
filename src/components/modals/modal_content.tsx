import { css } from "@emotion/css";
import { useCallback } from "react";
import { Button, ButtonProps } from "../buttons/button";
import * as React from "react";
import { usePreventScroll } from "../../utils/use_prevent_scroll";

interface ModalButtonProps extends Omit<ButtonProps, "onClick"> {}

export interface ModalProps {
  header: JSX.Element | string;
  content: JSX.Element | string;
  confirmButton: ModalButtonProps & {
    onBeforeConfirm?: () => PromiseLike<{ abortConfirm: boolean }>;
  };
  cancelButton: ModalButtonProps;
}

export interface ModalPropsInternal extends ModalProps {
  onClose: (confirmed: boolean) => void;
}

const modalContentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;

  background: var(--background-content);
  border: none;

  margin: 40px;
  padding: 24px;
  border-radius: 4px;
  gap: 24px;

  .header {
    font-size: 18px;
  }

  .footer {
    display: flex;
    justify-content: end;
    gap: 8px;
  }
`;

export const ModalContent = React.memo(function ModalComponent(
  props: ModalPropsInternal
): JSX.Element {
  const { content, header, cancelButton, confirmButton, onClose } = props;

  usePreventScroll();

  const onConfirm = useCallback(async () => {
    const onBeforeResult = await confirmButton.onBeforeConfirm?.();
    if (!onBeforeResult?.abortConfirm) {
      onClose(true);
    }
  }, [confirmButton, onClose]);
  const onCancel = useCallback(() => {
    onClose(false);
  }, [onClose]);

  return (
    <dialog className={modalContentStyle}>
      <div className="header">
        <span className="title">{header}</span>
      </div>
      {content}
      <div className="footer">
        <Button {...cancelButton} onClick={onCancel} />
        <Button {...confirmButton} onClick={onConfirm} />
      </div>
    </dialog>
  );
});
