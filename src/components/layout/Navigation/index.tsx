import {
  ButtonProps,
  Link as MuiLink,
  ListItemIcon,
  MenuItem as MuiMenuItem,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import NextLink from "next/link";

import { MENU_ITEMS, NavLink } from "./NavLink";

export const MenuItemStyled = styled(MuiMenuItem)<ButtonProps>(({ theme }) => ({
  "& p": {
    color: theme.palette.common.white,
    padding: "0.6rem",
    fontSize: "0.875rem",
    fontWeight: "700",
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.background,
    borderRadius: "0.4rem",
    p: {
      color: theme.palette.primary.main,
    },
    svg: {
      color: theme.palette.primary.main,
    },
  },
  "&.Mui-selected:hover": {
    color: theme.palette.common.white,
  },
}));

const NavItem = (props: NavLink & { currentPath: string }) => {
  const { title, icon: IconTag, url, currentPath } = props;

  return (
    <NextLink href={url}>
      <MenuItemStyled LinkComponent={MuiLink} selected={currentPath === url}>
        <ListItemIcon>
          <IconTag />
        </ListItemIcon>
        <Typography>{title}</Typography>
      </MenuItemStyled>
    </NextLink>
  );
};

const Navigation = ({ currentPath }: { currentPath: string }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Paper sx={{ width: "100%", background: "transparent" }}>
        {MENU_ITEMS.map((item, index) => (
          <NavItem key={index} currentPath={currentPath} {...item} />
        ))}
      </Paper>
    </Stack>
  );
};

export default Navigation;
