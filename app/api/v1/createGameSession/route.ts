import { createClient } from "@/utils/supabase/server";
import { PlayersData } from "@/types/types";
import { cookies } from "next/headers";
import { generateRandomString } from "@/utils/util_functions";
import { NextRequest } from "next/server";
import {v4 as uuidv4} from 'uuid';


export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { username } = await req.json();
    const uuid = uuidv4()
    const player_uuid = uuidv4()

    const { error } = await supabase.rpc("create_game_session", {
      uuid_param: uuid,
      player_uuid_param: player_uuid,
      username_param: username
    });
    if (error) {
      console.error(error);
      throw error;
    }
    return new Response(JSON.stringify({ message: "Game session created!", player_uuid: player_uuid, game_id: uuid }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
