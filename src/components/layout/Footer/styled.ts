import { styled } from "@mui/material/styles";

export const FooterContainer = styled("footer")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  boxSizing: "border-box",
  fontSize: "1.2rem",
  padding: "1rem 0 1rem 15.5rem",
  flex: "1 1 auto",
  color: theme.palette.text.secondary,
  width: "100%",
  justifyContent: "center",
  margin: "0",
  gap: "1rem",
}));
