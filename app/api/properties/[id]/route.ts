import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/client"

// DELETE - Remove a property (when purchased)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase.from("properties").update({ is_for_sale: false }).eq("id", params.id)

    if (error) {
      console.error("Error updating property:", error)
      return NextResponse.json({ error: "Failed to update property" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
