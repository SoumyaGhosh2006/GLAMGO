import { products as fallbackProducts } from "../data/products";
import { isSupabaseConfigured, supabase } from "./supabase";

let cache = null;
let lastFetchTime = 0;

const CACHE_TTL = 1000 * 60 * 5; // 5 min cache
const REQUEST_TIMEOUT = 5000;

// 🔥 Slug generator
function slugify(value) {
  return String(value || "product")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// 🧠 Normalize sizes
function normalizeSizes(sizes, fallbackSizes = []) {
  if (Array.isArray(sizes)) return sizes.filter(Boolean);

  if (typeof sizes === "string") {
    return sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return fallbackSizes;
}

// 🧯 Fallback system
function createFallbackResult(source = "local", error = null) {
  return {
    products: fallbackProducts,
    source,
    error,
  };
}

// 🔥 Normalize products (CORE)
function normalizeProducts(rows = []) {
  const productRows = Array.isArray(rows) ? rows : [];

  const fallbackById = new Map(
    fallbackProducts.map((p) => [p.id, p])
  );

  const fallbackByName = new Map(
    fallbackProducts.map((p) => [p.name.toLowerCase(), p])
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

      // 🔥 FINAL SLUG LOGIC (correct + SEO safe)
      const baseSlug = slugify(productName);

      const finalSlug =
        row.slug || // ✅ DB slug priority
        fallback.slug || // ✅ fallback slug
        (row.id
          ? `${baseSlug}-${String(row.id).slice(0, 4)}`
          : `${baseSlug}-${index}`);

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
          row.description ||
          fallback.description ||
          "Premium GLAMGO apparel.",
        fabric:
          row.fabric ||
          row.material ||
          fallback.fabric ||
          "Premium Fabric",

        sizes: normalizeSizes(row.sizes, fallback.sizes || []),
      };
    })
    .filter((product) => product.name && product.image);
}

// 🚀 Fetch products
export async function getProducts() {
  const now = Date.now();

  // ⚡ Cache hit
  if (cache && now - lastFetchTime < CACHE_TTL) {
    return {
      products: cache,
      source: "cache",
      error: null,
    };
  }

  // ⚠️ Supabase not configured
  if (!isSupabaseConfigured || !supabase) {
    return createFallbackResult("missing-config");
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .abortSignal(controller.signal);

    console.log("SUPABASE DATA:", data);
    console.log("SUPABASE ERROR:", error);

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
    // 🧠 fallback to stale cache
    if (cache) {
      return {
        products: cache,
        source: "stale-cache",
        error,
      };
    }

    return createFallbackResult("fallback", error);
  } finally {
    window.clearTimeout(timeout);
  }
}

// 🔄 REALTIME (PROPER VERSION)
export function subscribeToProductUpdates(onUpdate) {
  if (!supabase) return null;

  const channel = supabase
    .channel("products-realtime")
    .on(
      "postgres_changes",
      {
        event: "*", // 🔥 listen to ALL changes
        schema: "public",
        table: "products",
      },
      (payload) => {
        console.log("REALTIME EVENT:", payload);

        onUpdate(payload);
      }
    )
    .subscribe((status) => {
      console.log("REALTIME STATUS:", status);
    });

  return channel;
}