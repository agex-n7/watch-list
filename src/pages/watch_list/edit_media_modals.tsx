import { ButtonType } from "../../components/buttons/button";
import { Icon } from "../../components/icon";
import { openModal } from "../../components/modals/modal";
import { MediaData, MediaType, WatchState } from "../../state/media_types";
import { useForm } from "react-hook-form";
import { FormRow } from "../../components/forms/form_row";
import { SingularEvent } from "../../utils/singular_event";
import React from "react";

type SubmitEvent = SingularEvent<null, Promise<MediaData | null>>;

const EditMediaItemForm = (props: {
  initialItem?: MediaData;
  submitEvent: SubmitEvent;
}): JSX.Element => {
  const {
    submitEvent,
    initialItem = { watchState: WatchState.PLANNED }
  } = props;
  const { register, handleSubmit } = useForm<MediaData>({
    defaultValues: initialItem
  });

  React.useEffect(() => {
    submitEvent.subscribe(async () => {
      return new Promise((resolve) =>
        handleSubmit(
          (data) => resolve(data),
          () => resolve(null)
        )()
      );
    });

    return () => submitEvent.unsubscribe();
  }, [handleSubmit, submitEvent]);

  return (
    <form
      onSubmit={handleSubmit(() => {
        throw new Error("Form should not submit itself");
      })}
    >
      <FormRow label="title" name="Title">
        <input {...register("title", { required: true, minLength: 3 })} />
      </FormRow>
      <FormRow label="genre" name="Genre">
        <input {...register("genre", { required: true })} />
      </FormRow>
      <FormRow label="type" name="Type">
        <select {...register("type", { required: true })}>
          {Object.values(MediaType).map((mediaType) => (
            <option key={mediaType} value={mediaType}>
              {mediaType}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="watchState" name="Watched">
        <select {...register("watchState", { required: true })}>
          {Object.values(WatchState).map((watchOption) => (
            <option key={watchOption} value={watchOption}>
              {watchOption}
            </option>
          ))}
        </select>
      </FormRow>
    </form>
  );
};

function openMediaItemModal(props: {
  title: string;
  confirmButtonLabel: string;
  confirmButtonIcon: Icon;
  initialItem?: MediaData;
}): Promise<MediaData | null> {
  const { title, confirmButtonLabel, confirmButtonIcon, initialItem } = props;
  const submitEvent: SubmitEvent = new SingularEvent();

  return new Promise<MediaData | null>((resolve) =>
    openModal({
      header: title,
      content: (
        <EditMediaItemForm
          submitEvent={submitEvent}
          initialItem={initialItem}
        />
      ),
      confirmButton: {
        type: ButtonType.PRIMARY,
        children: confirmButtonLabel,
        icon: confirmButtonIcon,
        onBeforeConfirm: async () => {
          const submitResult = await submitEvent.fire(null);
          if (submitResult) {
            resolve(submitResult);
            return { abortConfirm: false };
          } else {
            return { abortConfirm: true };
          }
        }
      },
      cancelButton: {
        children: "Cancel"
      }
    }).then((closeResult) => {
      if (!closeResult.confirmed) {
        resolve(null);
      }
    })
  );
}

export function openAddMediaItemModal(): Promise<MediaData | null> {
  return openMediaItemModal({
    title: "Add a new entry!",
    confirmButtonLabel: "Add",
    confirmButtonIcon: Icon.ADD
  });
}

export function openEditMediaItemModal(
  initialItem: MediaData
): Promise<MediaData | null> {
  return openMediaItemModal({
    title: `Edit "${initialItem.title}"!`,
    confirmButtonLabel: "Save",
    confirmButtonIcon: Icon.SAVE,
    initialItem
  });
}
