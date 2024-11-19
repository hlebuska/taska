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
            className="w-full rounded-md resize-none leading-none bg-transparent"
            value={value}
            onChange={onChange}
            minRows={1}
          ></TextareaAutosize>
        ) : (
          <p className="w-full h-[19px] whitespace-pre-wrap leading-none">
            {value}
          </p>
        )}
      </>
    );
  },
);

ActivatedInput.displayName = "ActivatedInput";

export default ActivatedInput;
