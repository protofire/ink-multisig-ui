import {
  Book,
  HomeRounded,
  Layers as IconTxBuilder,
  Settings as IconSettings,
  SvgIconComponent,
  Toll as IconAssets,
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
  Book,
  IconSettings,
  IconAssets,
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
    id: "assets",
    title: "Assets",
    type: "item",
    url: ROUTES.Assets,
    icon: icons.IconAssets,
    target: true,
  },
  {
    id: "docs",
    title: "Tx Builder",
    type: "item",
    url: ROUTES.TxBuilder,
    icon: icons.IconTxBuilder,
    target: true,
  },
  {
    id: "addressBook",
    title: "Address Book",
    type: "item",
    url: ROUTES.AddressBook,
    icon: icons.Book,
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
