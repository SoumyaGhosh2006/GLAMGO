import { supabase } from "./supabase"

const FALLBACK_PRODUCTS = [
  { name: "Classic Vest", price: 499 },
  { name: "Mojo T-Shirt", price: 899 },
  { name: "Track Pant", price: 1199 }
]

// simple in-memory cache
let cache = null
let lastFetchTime = 0

const CACHE_TTL = 1000 * 60 * 5 // 5 minutes

export async function getProducts() {
  const now = Date.now()

  // ✅ 1. Return cache if fresh
  if (cache && now - lastFetchTime < CACHE_TTL) {
    return cache
  }

  try {
    // ⏱️ 2. Timeout protection
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const { data, error } = await supabase
      .from("products")
      .select("name, price")

    clearTimeout(timeout)

    if (error) throw error

    // ✅ 3. Save cache
    cache = data
    lastFetchTime = now

    return data

  } catch (err) {
    console.error("❌ Supabase failed:", err)

    // ⚠️ 4. Fallback logic
    if (cache) {
      console.log("⚡ Using cached data")
      return cache
    }

    console.log("🛟 Using fallback data")
    return FALLBACK_PRODUCTS
  }
}