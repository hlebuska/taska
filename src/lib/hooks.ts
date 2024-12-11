import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { useEffect, useRef, useState } from "react";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

interface UseEditModeProps {
  text: string; // Initial text value
  onSave: (value: string) => void; // Callback to save the edited value
}

export function useEditMode({ text, onSave }: UseEditModeProps) {
  const [textValue, setTextValue] = useState<string>(text);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const turnOnEdit = () => {
    setIsEdit(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const length = textValue.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }, 50);
  };

  const turnOffEdit = () => {
    setIsEdit(false);
    onSave(textValue); // Trigger the save callback when editing stops
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      turnOffEdit();
    }
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
  }, [isEdit, textValue]);

  return {
    textValue,
    setTextValue,
    isEdit,
    turnOnEdit,
    turnOffEdit,
    wrapperRef,
    inputRef,
  };
}
