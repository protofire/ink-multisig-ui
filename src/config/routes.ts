export const ROUTES = {
  Home: "/",
  Welcome: "/welcome",
  New: "/new",
  Load: "/load",
  Connect: "/connect",
  App: "/app",
  AddressBook: "/app/address-book",
  TxBuilder: "/app/transaction-builder",
  Settings: "/app/settings",
  Assets: "/app/assets",
  TxDetails: "/app/transaction-details",
  NewTx: "/app/new-transaction",
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];

export const routeValues: RouteValue[] = Object.values(ROUTES);
