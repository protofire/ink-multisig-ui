// InputWithMax.tsx
import { Button, TextFieldProps } from "@mui/material";
import React, { useEffect, useState } from "react";

import { StyledNumberTextField } from "./styled";

type InputWithMaxProps = {
  maxValue: string;
  defaultValue?: string;
  value: string;
  onValueChange: (value: string, error: string) => void;
} & Omit<TextFieldProps, "onChange" | "value">;

const InputWithMax: React.FC<InputWithMaxProps> = ({
  maxValue,
  onValueChange,
  defaultValue,
  value,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue ?? "");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!value) return;
    setInputValue(value);
  }, [maxValue, value]);

  const validateInput = (value: string): string => {
    let error = "";
    if (Number(value) > Number(maxValue) || Number(value) < 0 || !value) {
      error = "Invalid amount";
    }

    if (Number(value) === 0) {
      error = "Amount must be greater than 0";
    }

    return error;
  };

  const handleMaxClick = (): void => {
    const error = validateInput(maxValue);
    setInputValue(maxValue);
    setError(error);
    onValueChange(maxValue, error);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    const error = validateInput(value);
    setError(error);
    setInputValue(value);
    onValueChange(value, error);
  };

  return (
    <div>
      <StyledNumberTextField
        {...props}
        value={inputValue}
        onChange={handleChange}
        type="number"
        error={!!error}
        helperText={error}
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
