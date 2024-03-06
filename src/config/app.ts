export const IS_DEVELOPMENT =
  process.env.NODE_ENV === ("development" as string) ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "development";

export const DOCS_URL =
  process.env.NEXT_PUBLIC_DOCS_URL || "https://docs.xsigners.io/";

export const ANALYTICS_ID = (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ||
  "") as string;
