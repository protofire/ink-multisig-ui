import { Card, CardProps, styled, useTheme } from "@mui/material";
import { forwardRef, PropsWithChildren } from "react";

interface Props extends PropsWithChildren<Pick<CardProps, "sx" | "elevation">> {
  border: boolean;
}

const CardStyled = styled(Card)<CardProps & { hasborder: string }>(
  ({ hasborder }) => ({
    minHeight: "5rem",
    border: hasborder === "true" ? "1px solid" : "none",
    borderRadius: 8,
  })
);

export const WidgetCard: React.FC<Props> = forwardRef<HTMLDivElement, Props>(
  function RefMainCard({ children, border, ...props }, ref) {
    const theme = useTheme();
    //   boxShadow = theme.palette.mode === "dark" ? boxShadow || true : boxShadow;

    return (
      <CardStyled hasborder={border.toString()} ref={ref} {...props}>
        {children}
      </CardStyled>
    );
  }
);
