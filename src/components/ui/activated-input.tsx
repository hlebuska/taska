import React, { forwardRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface IProps {
  active: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ActivatedInput = forwardRef<HTMLTextAreaElement, IProps>(
  ({ active, value, onChange }, ref) => {
    return (
      <>
        {active ? (
          <TextareaAutosize
            ref={ref}
            className="w-full resize-none leading-none bg-transparent text-sm"
            value={value}
            onChange={onChange}
            minRows={1}
          ></TextareaAutosize>
        ) : (
          <p className="break-normal w-full leading-none whitespace-pre-line text-sm min-h-[16px]">
            {value}
          </p>
        )}
      </>
    );
  },
);

ActivatedInput.displayName = "ActivatedInput";

export default ActivatedInput;
