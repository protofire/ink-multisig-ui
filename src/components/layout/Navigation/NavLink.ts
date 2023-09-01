import {
  BuildSharp as IconSettings,
  HomeRounded,
  Layers as IconTxBuilder,
  SvgIconComponent,
} from "@mui/icons-material";

import { ROUTES } from "@/config/routes";

export type NavLink = {
  id: string;
  title: string;
  type: string;
  url: string;
  icon: SvgIconComponent;
  target: boolean;
};

const icons = {
  HomeRounded,
  IconTxBuilder,
  IconSettings,
};

export const MENU_ITEMS: NavLink[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    url: ROUTES.App,
    icon: icons.HomeRounded,
    target: true,
  },
  {
    id: "tx-builder",
    title: "Tx Builder",
    type: "item",
    url: ROUTES.TxBuilder,
    icon: icons.IconTxBuilder,
    target: true,
  },
  {
    id: "settings",
    title: "Settings",
    type: "item",
    url: ROUTES.Settings,
    icon: icons.IconSettings,
    target: true,
  },
];
