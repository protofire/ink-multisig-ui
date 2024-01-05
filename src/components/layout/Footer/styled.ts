import { styled } from "@mui/material/styles";

export const FooterContainer = styled("footer")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
  fontSize: "1.2rem",
  padding: "2.4rem 1.6rem 4rem",
  flex: "1 1 auto",
  color: theme.palette.text.secondary,
  width: "100%",
  justifyContent: "space-around",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));
