import Box from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button {...props} disabled={isLoading} sx={{ position: "relative" }}>
      <Box
        sx={{
          visibility: isLoading ? "hidden" : "visible",
        }}
      >
        {children}
      </Box>
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px", // half of size
            marginLeft: "-12px", // half of size
          }}
        />
      )}
    </Button>
  );
};

export default LoadingButton;
