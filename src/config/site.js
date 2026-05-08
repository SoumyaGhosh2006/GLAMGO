export const siteMeta = {
  name: "GLAMGO",
  title: "GLAMGO | Premium Innerwear & Everyday Essentials",
  description:
    "GLAMGO manufactures premium innerwear, sportswear, vests, track pants, and everyday essentials with comfort-first construction and dependable quality.",
  url: (import.meta.env.VITE_SITE_URL || "https://glamgo.vercel.app").replace(
    /\/+$/,
    "",
  ),
  image: "/preview.jpg",
  email: "info@maftimpexglobal.com",
};

export function absoluteUrl(path = "/") {
  try {
    return new URL(path, `${siteMeta.url}/`).toString();
  } catch {
    return siteMeta.url;
  }
}

export function canonicalUrl(path = "/") {
  return absoluteUrl(path.startsWith("/") ? path : `/${path}`);
}

export function formatPrice(value) {
  const price = Number(value);

  if (!Number.isFinite(price) || price <= 0) {
    return "Price on request";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
