import { useEditMode } from "../../../lib/hooks";
import AddIcon from "@mui/icons-material/Add";  
import { Button } from "../../../components/ui/button";
import ActivatedInput from "../../../components/ui/activated-input";
import { addList } from "../../../lib/utils";
import { ChangeEvent } from "react";

export default function ToDoListCreator() {
  const { textValue, setTextValue, isEdit, turnOnEdit, wrapperRef, inputRef } =
    useEditMode({
      text: "",
      onClickOutside: () => {
        setTextValue("");
      },
      onEnter: () => {
        addList(textValue);
        setTextValue("");
      },
    });

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  return (
    <div
      ref={wrapperRef}
      className={`bg-white border border-opacity-20 border-white h-8 flex mt-3 flex-col justify-start rounded-md ${isEdit ? "bg-opacity-90" : " bg-opacity-50"}`}
    >
      <Button
        variant={"ghost"}
        onClick={() => turnOnEdit()}
        className="h-8 w-full flex mt-0 py-1 justify-start text-xs"
      >
        <AddIcon /> Add list
      </Button>
      {isEdit && (
        <div className="p-2">
          <ActivatedInput
            ref={inputRef}
            active={isEdit}
            value={textValue}
            onChange={(event) => handleTextChange(event)}
          />
        </div>
      )}
    </div>
  );
}
