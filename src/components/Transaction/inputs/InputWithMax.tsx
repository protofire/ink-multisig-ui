// InputWithMax.tsx
import { Button, TextField, TextFieldProps } from "@mui/material";
import React, { useState } from "react";

type InputWithMaxProps = {
  maxValue: string;
  defaultValue?: string;
  onValueChange: (value: string) => void;
} & Omit<TextFieldProps, "onChange" | "value">;

const InputWithMax: React.FC<InputWithMaxProps> = ({
  maxValue,
  onValueChange,
  defaultValue,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue ?? "");

  const handleMaxClick = (): void => {
    setInputValue(maxValue);
    onValueChange(maxValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
    onValueChange(event.target.value);
  };

  return (
    <div>
      <TextField
        {...props}
        value={inputValue}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <Button
              onClick={handleMaxClick}
              sx={{ height: "30px" }}
              variant="outlined"
            >
              MAX
            </Button>
          ),
          ...props.InputProps,
        }}
      />
    </div>
  );
};

export default InputWithMax;
