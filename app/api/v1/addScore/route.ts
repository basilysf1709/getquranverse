import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { username, game_id, score } = await req.json();
    const { data, error } = await supabase.rpc("update_player_score", {
      game_id_param: game_id,
      username_param: username,
      addscore: score
    });
    if (error) {
      console.error(error);
      throw error;
    }
    return new Response(
      JSON.stringify({ message: `Added score for ${username}`, data: data }),
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
