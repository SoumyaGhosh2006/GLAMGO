import { supabase } from "./supabase"

export async function testFetch() {
  const { data, error } = await supabase
    .from("products")
    .select("*")

  console.log("DATA:", data)
  console.log("ERROR:", error)
}