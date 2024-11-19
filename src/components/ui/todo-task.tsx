"use client";
import { useEffect, useRef, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import ActivatedInput from "@/components/ui/activated-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface IProps {
  text: string;
  id: string;
  index: number;
  onUpdate: (id: string, text: string) => void;
}

export default function ToDoTask({ text, id, index, onUpdate }: IProps) {
  const [textValue, setTextValue] = useState<string>(text);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLElement | null>(null);
  const textFieldRef = useRef<HTMLInputElement | null>(null);

  function handleClickOutside(event: MouseEvent) {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsEdit(false);
    }
  }

  const turnIsEdit = (): void => {
    setIsEdit(true);
    setTimeout(() => {
      if (textFieldRef.current) {
        textFieldRef.current.focus();
        const length = textValue.length;
        textFieldRef.current.setSelectionRange(length, length);
      }
    }, 50);
  };

  const updateTextValue = (text: string): void => {
    setTextValue(text);
    onUpdate(id, text);
  };

  useEffect(() => {
    setTextValue(text);
  }, [text]);

  useEffect(() => {
    if (isEdit) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isEdit]);

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(dragProvided) => (
        <div
          {...dragProvided.dragHandleProps}
          {...dragProvided.draggableProps}
          ref={dragProvided.innerRef}
        >
          <div
            elevation={3}
            onClick={() => turnIsEdit()}
            ref={wrapperRef}
            className="flex items-start gap-2 border mt-3 rounded-md border-white bg-white bg-opacity-90 backdrop-blur-sm bg  px-2 py-3 text-gray-900 shadow-inner shadow-white/10 font-normal "
          >
            <Checkbox />
            <div className="w-48 flex flex-col gap-1">
              {
                <ActivatedInput
                  ref={textFieldRef}
                  value={textValue}
                  active={isEdit}
                  onChange={(event) => updateTextValue(event.target.value)}
                ></ActivatedInput>
              }
              <div className="mt-2 flex gap-1">
                <Button variant="outline" size={"xxs"} className="text-xs">
                  Tommorow
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
