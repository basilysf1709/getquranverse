import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { generateRandomString } from "@/utils/util_functions";

export async function GET() {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const gameSessionString = generateRandomString(6);
    const playersData = {
      player1: "Basil",
    };

    const { data, error } = await supabase
      .from("game_sessions")
      .insert([{ game_id: gameSessionString, players: playersData }]);
    console.log(data)
    console.error(error)
    return new Response(JSON.stringify({ message: "200" }), {
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
