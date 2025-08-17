import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Property = {
  id: string
  name: string
  address: string
  description: string
  square_footage: number
  price: number
  image_url: string
  token_id?: number
  owner_address?: string
  is_for_sale: boolean
  created_at: string
  updated_at: string
}
