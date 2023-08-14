import { Theme } from "@mui/material";

export default function Button(theme: Theme) {
  const disabledStyle = {
    "&.Mui-disabled": {
      backgroundColor: theme.palette.grey[200],
    },
  };

  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: 600,
          padding: "0.5rem 0.8rem",
          borderRadius: "0.4rem",
          gap: "0.4rem",
          textTransform: "none",
          border: "2px solid transparent",
        },
        contained: {
          color: theme.palette.common.black,
        },
        outlined: {
          boxSizing: "border-box",
          border: "2px solid",
          "&:hover": {
            border: "2px solid",
          },
        },
      },
    },
  };
}
