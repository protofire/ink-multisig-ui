import {
  Book,
  BuildSharp as IconTxBuilder,
  HomeRounded,
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
  Book,
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
];
