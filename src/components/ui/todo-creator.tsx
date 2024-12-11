import { useEditMode } from "@/lib/hooks";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "./button";
import ActivatedInput from "./activated-input";

interface IProps {
  onAdd: (text: string) => void;
}

export default function ToDoCreator({ onAdd }: IProps) {
  const { textValue, setTextValue, isEdit, turnOnEdit, wrapperRef, inputRef } =
    useEditMode({
      text: "",
      onSave: (newValue) => {
        setTextValue("");
      },
    });

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setTextValue("");
      onAdd(textValue);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`bg-white border border-opacity-20 border-white  flex mt-3 flex-col justify-start rounded-md ${isEdit ? "bg-opacity-90" : " bg-opacity-50"}`}
      onKeyDown={handleKeyDown}
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
