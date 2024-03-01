import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { game_id } = await req.json();
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("session_id", game_id);
    if (error) {
      console.error(error);
      throw error;
    }
    return new Response(
      JSON.stringify({ message: "Get Players!", data: data }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
