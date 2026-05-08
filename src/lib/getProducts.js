import { products as fallbackProducts } from "../data/products";
import { isSupabaseConfigured, supabase } from "./supabase";

let cache = null;
let lastFetchTime = 0;

const CACHE_TTL = 1000 * 60 * 5;
const REQUEST_TIMEOUT = 5000;

function slugify(value) {
  return String(value || "product")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeSizes(sizes, fallbackSizes = []) {
  if (Array.isArray(sizes)) return sizes.filter(Boolean);

  if (typeof sizes === "string") {
    return sizes
      .split(",")
      .map((size) => size.trim())
      .filter(Boolean);
  }

  return fallbackSizes;
}

function createFallbackResult(source = "local", error = null) {
  return {
    products: normalizeProducts(fallbackProducts),
    source,
    error,
  };
}

export function normalizeProducts(rows = []) {
  const productRows = Array.isArray(rows) ? rows : [];

  const fallbackById = new Map(
    fallbackProducts.map((product) => [product.id, product]),
  );
  const fallbackByName = new Map(
    fallbackProducts.map((product) => [product.name.toLowerCase(), product]),
  );

  return productRows
    .map((row, index) => {
      const name = row.name || row.title;
      const fallback =
        fallbackById.get(row.id) ||
        fallbackByName.get(String(name || "").toLowerCase()) ||
        {};

      const productName = name || fallback.name || `Product ${index + 1}`;
      const price = Number(row.price ?? fallback.price ?? 0);
      const baseSlug = slugify(productName);
      const finalSlug = row.slug || fallback.slug || baseSlug;

      return {
        ...fallback,
        ...row,
        id: row.id || fallback.id || baseSlug,
        slug: finalSlug,
        name: productName,
        price: Number.isFinite(price) ? price : fallback.price || 0,
        image: row.image_url || row.image || fallback.image,
        category: row.category || fallback.category || "Uncategorized",
        description:
          row.description || fallback.description || "Premium GLAMGO apparel.",
        fabric: row.fabric || row.material || fallback.fabric || "Premium Fabric",
        sizes: normalizeSizes(row.sizes, fallback.sizes || []),
      };
    })
    .filter((product) => product.name && product.image && product.slug);
}

export async function getProducts() {
  const now = Date.now();

  if (cache && now - lastFetchTime < CACHE_TTL) {
    return {
      products: cache,
      source: "cache",
      error: null,
    };
  }

  if (!isSupabaseConfigured || !supabase) {
    return createFallbackResult("missing-config");
  }

  const controller = new AbortController();
  const timeout = globalThis.setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT,
  );

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .abortSignal(controller.signal);

    if (error) throw error;

    const normalizedProducts = normalizeProducts(data);

    if (!normalizedProducts.length) {
      return createFallbackResult("empty-table");
    }

    cache = normalizedProducts;
    lastFetchTime = now;

    return {
      products: normalizedProducts,
      source: "supabase",
      error: null,
    };
  } catch (error) {
    if (cache) {
      return {
        products: cache,
        source: "stale-cache",
        error,
      };
    }

    return createFallbackResult("fallback", error);
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

export function subscribeToProductUpdates(onUpdate) {
  if (!supabase || typeof onUpdate !== "function") return null;

  return supabase
    .channel("products-realtime")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "products",
      },
      onUpdate,
    )
    .subscribe((status) => {
      if (
        import.meta.env.DEV &&
        ["CHANNEL_ERROR", "TIMED_OUT"].includes(status)
      ) {
        console.warn("Supabase realtime subscription status:", status);
      }
    });
}
