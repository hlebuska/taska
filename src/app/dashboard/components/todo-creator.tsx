import { useEditMode } from "@/lib/hooks";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "../../../components/ui/button";
import ActivatedInput from "../../../components/ui/activated-input";
import { addTask } from "@/lib/utils";

interface IProps {
  listID: string;
}

/**
 * ## ToDoCreator Component
 *
 * This component allows the user to create new tasks. It provides an input field for entering
 * task text and a button to trigger the task creation process.
 *
 * - The component uses the `useEditMode` hook to manage its edit mode behavior.
 * - When the user presses Enter or clicks outside the input field, the task is added via the `onAdd` callback.
 *
 * ## Parameters
 * @param {IProps} props - The props object for the component.
 *
 * ## Props
 * @typedef {Object} IPropsan
 *
 * ## Returns
 * @returns {JSX.Element} - A JSX element representing the task creation UI.
 */

export default function ToDoCreator({ listID }: IProps) {
  const { textValue, setTextValue, isEdit, turnOnEdit, wrapperRef, inputRef } =
    useEditMode({
      text: "",
      onClickOutside: () => {
        setTextValue("");
      },
      onEnter: () => addTask(listID, textValue),
    });

  return (
    <div
      ref={wrapperRef}
      className={`bg-white border border-opacity-20 border-white  flex mt-3 flex-col justify-start rounded-md ${isEdit ? "bg-opacity-90" : " bg-opacity-50"}`}
    >
      <Button
        variant={"ghost"}
        onClick={() => turnOnEdit()}
        className="h-8 w-full flex mt-0 py-1 justify-start text-xs"
      >
        <AddIcon /> Add task
      </Button>
      {isEdit && (
        <div className="p-2">
          <ActivatedInput
            ref={inputRef}
            active={isEdit}
            value={textValue}
            onChange={(event) => setTextValue(event.target.value)}
          />
        </div>
      )}
    </div>
  );
}
