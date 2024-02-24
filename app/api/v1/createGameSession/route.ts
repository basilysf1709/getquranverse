import { createClient } from "@/utils/supabase/server";
import { PlayersData } from "@/types/types";
import { cookies } from "next/headers";
import { generateRandomString } from "@/utils/util_functions";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const gameSessionString = generateRandomString(6);
    const { username } = await req.json();
    const playersData : PlayersData = [{ username: username, score: 0, isHost: true }]

    const { data } = await supabase
      .from("game_sessions")
      .insert([{ game_id: gameSessionString, players: playersData }]);

    return new Response(JSON.stringify({ message: "Game session created!", data: data, gameId: gameSessionString }), {
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
