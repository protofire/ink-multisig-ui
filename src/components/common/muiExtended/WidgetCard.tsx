import { Card, CardProps, styled, useTheme } from "@mui/material";
import { forwardRef, PropsWithChildren } from "react";

interface Props extends PropsWithChildren<Pick<CardProps, "sx" | "elevation">> {
  border: boolean;
}

const CardStyled = styled(Card)<CardProps & { hasborder: string }>(
  ({ hasborder }) => ({
    border: hasborder === "true" ? "1px solid" : "none",
    borderRadius: 2,
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
