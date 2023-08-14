import styled from "@emotion/styled";
import { MenuItem, MenuItemProps, Select, SelectProps } from "@mui/material";

export const StyledSelect = styled(Select)<SelectProps>(() => ({
  color: "white",
  padding: "0",
  margin: "0 0.5rem",
  borderRadius: "0.5rem",
  width: "202px",
  height: "2.88em",
  display: "flex",

  "&.Mui-focused": {
    backgroundColor: "#3A3334",
  },

  "& fieldset": {
    borderColor: "#1a1a1a",
    top: "0",
  },

  "& p": {
    marginLeft: "0.5rem",
    paddingTop: "0.5rem",
  },

  "& legend": {
    display: "none",
  },

  "& img": {
    width: "auto",
    height: "auto",
  },
}));

export const StyledMenuItem = styled(MenuItem)<MenuItemProps>(() => ({
  color: "white",
  "& p": {
    marginLeft: "1rem",
    paddingTop: "0.5rem",
  },
  "& img": {
    width: "auto",
    height: "auto",
    fontWeight: "600",
  },
}));
