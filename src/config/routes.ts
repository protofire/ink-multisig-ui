export const ROUTES = {
  Home: "/",
  Welcome: "/welcome",
  New: "/new",
  Load: "/load",
  Connect: "/connect",
  App: "/app",
  AddressBook: "/app/address-book",
  TxBuilder: "/app/transaction-builder",
  AddressBook: "/app/address-book",
  Settings: "/app/settings",
  Assets: "/app/assets",
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];

export const routeValues: RouteValue[] = Object.values(ROUTES);
