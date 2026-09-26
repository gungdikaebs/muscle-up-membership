/**
 * Normalized base URL with a guaranteed trailing slash.
 * Ensures URLs like `${base}coaches/${slug}` or `${base}#home` resolve correctly
 * regardless of whether BASE_URL is `/` (local) or `/muscle-up-membership` (GitHub Pages).
 */
export const base = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;
