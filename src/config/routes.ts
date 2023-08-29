export const ROUTES = {
  Home: "/",
  Welcome: "/welcome",
  New: "/new",
  Load: "/load",
  Connect: "/connect",
  App: "/app",
  TxBuilder: "/app/transaction-builder",
  AddressBook: "/app/address-book",
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];

export const routeValues: RouteValue[] = Object.values(ROUTES);
