export const IS_DEVELOPMENT =
  process.env.NODE_ENV === ("development" as string) ||
  process.env.VERCEL_ENV === "preview" ||
  process.env.VERCEL_ENV === "development";
