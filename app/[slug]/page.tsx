"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { supabase } from "@/utils/supabase/client";
import { Loading } from "@/components/Loading/Loading";
import { useRouter } from "next/navigation";
import { FaRegCopy } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

export default function Lobby() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const player_id = searchParams.get("player_id");
  const game_id: string = usePathname().replace(/^\//, "");
  const [participants, setParticipants] = useState<any>([]);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [check, setCheck] = useState<boolean>(true);

  const handleOnClick = async (event: any) => {
    event.preventDefault();
    router.push(`/game?game_id=${game_id}&player_id=${player_id}`);
    const response = await fetch("/api/v1/startGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ game_id }),
    });
    await response.json();
  };

  const fetchPlayers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/getPlayers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ game_id }),
      });
      const { data } = await response.json();
      for(let player of data) {
        if (player.player_id === player_id && player.isHost === true) {
          setShowButton(true)
        }
      }
      const updatedParticipants = data.map(
        (participant: any, index: number) => ({
          ...participant,
          imageSrc: `/assets/${index + 1}.png`,
        })
      );
      setParticipants(updatedParticipants);
    } catch (error) {
      console.error(
        "An error occurred while trying to fetch game session data:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
    const handleUpdates = (payload: any) => {
      if (payload?.new?.game_started === true) {
        router.push(`/game?game_id=${game_id}&player_id=${player_id}`);
      } else {
        fetchPlayers();
      }
    };
    const channel_players = supabase
      .channel("players")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          filter: `session_id=eq.${game_id}`,
          table: "players",
        },
        handleUpdates
      )
      .subscribe();
    const channel_game_session = supabase
      .channel("game_sessions")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          filter: `session_id=eq.${game_id}`,
          table: "game_sessions",
        },
        handleUpdates
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel_players);
      supabase.removeChannel(channel_game_session);
    };
  }, [supabase]);

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <span className="text-left mb-4 text-4xl font-extrabold dark:text-white">
        Copy Lobby Code:
        <button
          className="p-4"
          onClick={() => {
            navigator.clipboard.writeText(game_id);
            setCheck(false);
          }}
        >
          {check ? (
            <FaRegCopy className="pt-1 w-8 h-8" />
          ) : (
            <FaCheck className="pt-1 w-8 h-8" />
          )}
        </button>
      </span>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <ul className="w-3/4 py-8 px-16 divide-y divide-gray-200">
          {participants.map((participant: any, index: number) => (
            <li key={index} className="py-3 sm:pt-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={participant.imageSrc}
                    alt={participant.name}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {participant.username}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold">
                  <CiCircleCheck size={30} fill="#588157" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showButton ? (
        <button
          onClick={handleOnClick}
          className="w-7/12 m-4 text-white bg-custom-light-green hover:bg-hover-green focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm text-center mx-4 py-2.5"
        >
          Start Game
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
