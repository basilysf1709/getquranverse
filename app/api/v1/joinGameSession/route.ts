import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { username, game_id } = await req.json();
    const { data, error } = await supabase.rpc("join_game_session", {
      uuid_param: game_id,
      username_param: username,
    });
    if (error) {
      console.error(error);
      throw error;
    }
    return new Response(
      JSON.stringify({ message: "User Added!", data: data, game_id: game_id }),
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
