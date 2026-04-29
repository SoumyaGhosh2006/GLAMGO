import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://halurkpbyopedqxwwzsb.supabase.co"
const supabaseKey = "sb_publishable_M2EqOjtoogumG9YUx17HXw_5HXC-uAZ"

export const supabase = createClient(supabaseUrl, supabaseKey)