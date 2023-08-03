import { Theme } from "@mui/material";

import Badge from "./Badge";
import Button from "./Button";
import CardContent from "./CardContent";
import IconButton from "./IconButton";
import ListItemIcon from "./ListItemIcon";
import Typography from "./Typography";

// ==============================|| OVERRIDES ||============================== //

function ComponentsOverrides(theme: Theme) {
  const badge = Badge(theme);
  const button = Button(theme);
  const cardContent = CardContent();
  const iconButton = IconButton(theme);
  const typography = Typography();

  return Object.assign(
    badge,
    button,
    cardContent,
    iconButton,
    ListItemIcon,
    typography
  );
}

export default ComponentsOverrides;
