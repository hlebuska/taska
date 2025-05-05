import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { useEffect, useRef, useState } from "react";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

interface UseEditModeProps {
  text: string;
  onClickOutside: () => void;
  onEnter: () => void;
}

/**
 * Custom hook for managing edit mode behavior.
 * Allows toggling edit mode, tracking text changes, and handling clicks outside the edit area.
 *
 * ### Parameters:
 * @param {string} params.text - The initial text value to display in edit mode.
 * @param {() => void} params.onClickOutside - Callback invoked when a click is detected outside the edit area.
 * @param {() => void} params.onEnter - Callback invoked when the Enter key is pressed.
 *
 * ### Returns (State and methods):
 * @returns {string} textValue - The current value of the text.
 * @returns {React.Dispatch<React.SetStateAction<string>>} setTextValue - Function to update the text value.
 * @returns {boolean} isEdit - Indicates if the edit mode is active.
 * @returns {() => void} turnOnEdit - Function to activate edit mode.
 * @returns {() => void} turnOffEdit - Function to deactivate edit mode.
 * @returns {React.RefObject<HTMLElement | null>} wrapperRef - Ref for the edit mode wrapper element.
 * @returns {React.RefObject<HTMLDivElement | null>} wrapperRef - Ref for the edit mode wrapper element.
 *
 */

export function useEditMode({
  text,
  onClickOutside,
  onEnter,
}: UseEditModeProps) {
  const [textValue, setTextValue] = useState<string>(text);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const turnOnEdit = () => {
    setIsEdit(true);
  };

  const turnOffEdit = () => {
    setIsEdit(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).classList.contains("ignoreOutside")
    ) {
      turnOffEdit();
      onClickOutside();
    }
  };

  const handleEnter = (event: KeyboardEvent) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      wrapperRef.current &&
      wrapperRef.current.contains(event.target as Node)
    ) {
      event.preventDefault();
      turnOffEdit();
      onEnter();
    }
  };

  useEffect(() => {
    setTextValue(text);
  }, [text]);

  useEffect(() => {
    if (isEdit && inputRef.current) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEnter);

      if (inputRef.current) {
        inputRef.current.focus();
        const length = textValue.length;
        inputRef.current.setSelectionRange(length, length);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEnter);
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
