import {
  Box,
  Button,
  ButtonProps,
  Link as MuiLink,
  ListItemIcon,
  MenuItem as MuiMenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { ROUTES } from "@/config/routes";

import { MENU_ITEMS, NavLink } from "./NavLink";

export const MenuItemStyled = styled(MuiMenuItem)<ButtonProps>(({ theme }) => ({
  borderRadius: "0.4rem",
  margin: "0.4rem",
  "& p": {
    color: theme.palette.common.white,
    padding: "0.4rem",
    fontSize: "0.875rem",
    fontWeight: "600",
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.background,
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
  const router = useRouter();
  return (
    <Stack direction="column" spacing={2}>
      <Box display="flex" m={0.5}>
        <Button
          onClick={() => router.replace(ROUTES.NewTx)}
          color="primary"
          variant="contained"
          sx={{ width: "100%" }}
        >
          New transaction
        </Button>
      </Box>
      <Paper sx={{ width: "100%", background: "transparent" }}>
        {MENU_ITEMS.map((item, index) => (
          <NavItem key={index} currentPath={currentPath} {...item} />
        ))}
      </Paper>
    </Stack>
  );
};

export default Navigation;
