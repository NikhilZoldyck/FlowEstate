import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/client"

// GET - Fetch all properties for sale
export async function GET() {
  try {
    const { data: properties, error } = await supabase
      .from("properties")
      .select("*")
      .eq("is_for_sale", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching properties:", error)
      return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
    }

    return NextResponse.json({ properties })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create a new property
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, address, description, square_footage, price, image_url, token_id, owner_address } = body

    // Validate required fields
    if (!name || !address || !description || !square_footage || !price || !image_url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data: property, error } = await supabase
      .from("properties")
      .insert([
        {
          name,
          address,
          description,
          square_footage: Number.parseInt(square_footage),
          price: Number.parseFloat(price),
          image_url,
          token_id: token_id ? Number.parseInt(token_id) : null,
          owner_address,
          is_for_sale: true,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating property:", error)
      return NextResponse.json({ error: "Failed to create property" }, { status: 500 })
    }

    return NextResponse.json({ property }, { status: 201 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
