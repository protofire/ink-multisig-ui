import { SelectChangeEvent } from "@mui/material";
import React from "react";

type OnChangeFn = (e: React.BaseSyntheticEvent) => Promise<void>;

export const transformSelectChangeEvent = (
  onChange: OnChangeFn,
  fieldName: string
) => {
  return (event: SelectChangeEvent<string>) => {
    const fakeEvent = {
      target: {
        value: event.target.value,
        name: fieldName,
      },
    };
    onChange(fakeEvent as unknown as React.BaseSyntheticEvent);
  };
};
