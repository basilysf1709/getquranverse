import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import {v4 as uuidv4} from 'uuid';


export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { username, game_id } = await req.json();
    const player_uuid = uuidv4()

    const { data, error } = await supabase.rpc("join_game_session", {
      uuid_param: game_id,
      player_uuid_param: player_uuid,
      username_param: username,
    });
    if (error) {
      console.error(error);
      throw error;
    }
    return new Response(
      JSON.stringify({ message: "User Added!", data: data, game_id: game_id, player_id: player_uuid }),
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
