import { Card, CardProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { forwardRef, PropsWithChildren } from "react";

export interface WidgetCardProps
  extends PropsWithChildren<Pick<CardProps, "sx" | "elevation">> {
  border: boolean;
}

const CardStyled = styled(Card)<CardProps & { hasborder: string }>(
  ({ hasborder }) => ({
    minHeight: "5rem",
    border: hasborder === "true" ? "1px solid" : "none",
    borderRadius: 8,
  })
);

export const WidgetCard: React.FC<WidgetCardProps> = forwardRef<
  HTMLDivElement,
  WidgetCardProps
>(function RefMainCard({ children, border, ...props }, ref) {
  return (
    <CardStyled hasborder={border.toString()} ref={ref} {...props}>
      {children}
    </CardStyled>
  );
});
