export const ROUTES = {
  Home: "/",
  New: "/new",
  Load: "/load",
  Connect: "/connect",
} as const;

export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];

export const routeValues: RouteValue[] = Object.values(ROUTES);
