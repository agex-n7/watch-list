import { ButtonType } from "../../components/buttons/button";
import { Icon } from "../../components/icon";
import { openModal } from "../../components/modals/modal";
import { MediaData } from "../../state/media_types";

export function openDeleteMediaItemModal(
  mediaItem: MediaData
): Promise<{ confirmed: boolean }> {
  return openModal({
    header: "Are you sure?",
    content: (
      <div>
        <div>You about to delete "{mediaItem.title}".</div>
        <div> This action cannot be undone!</div>
      </div>
    ),
    confirmButton: {
      type: ButtonType.NEGATIVE,
      children: "Delete",
      icon: Icon.DELETE
    },
    cancelButton: {
      children: "Cancel"
    }
  });
}

export function openDeleteAllMediaItemiModal(props: {
  itemCount: number;
}): Promise<{ confirmed: boolean }> {
  const { itemCount } = props;
  return openModal({
    header: "Are you sure?",
    content: (
      <div>
        <div>
          You are about to delete {itemCount}{" "}
          {itemCount === 1 ? "entry" : "entries"} from your watch list.
        </div>
        <div> This action cannot be undone!</div>
      </div>
    ),
    confirmButton: {
      type: ButtonType.NEGATIVE,
      children: "Delete all",
      icon: Icon.DELETE_SWEEP
    },
    cancelButton: {
      children: "Cancel"
    }
  });
}
