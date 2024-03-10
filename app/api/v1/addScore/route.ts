import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { game_id, player_id, score } = await req.json();
    const { data, error } = await supabase.rpc("add_score", {
      game_id_param: game_id,
      player_id_param: player_id,
      score_param: score
    });
    
    if (error) {
      console.error(error);
      throw error;
    }
    return new Response(
      JSON.stringify({ message: `Added score for ${player_id}`, data: data }),
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
