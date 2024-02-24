"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { supabase } from "@/utils/supabase/client";
import { Loading } from "@/components/Loading/Loading";

export default function Lobby() {
  const game_id: string = usePathname().replace(/^\//, "");
  const [participants, setParticipants] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      fetchPlayers();
      console.log("Table Updated!", payload);
    };
    const channel = supabase
      .channel("game_sessions")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          filter: `game_id=eq.${game_id}`,
          table: "game_sessions",
        },
        handleUpdates
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <h2 className="text-left mb-4 text-4xl font-extrabold dark:text-white">
        Waiting Lobby:
      </h2>
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
                  <CiCircleCheck size={30} fill="rgb(126 34 206)" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button className="w-7/12 m-4 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm text-center mx-4 py-2.5">
        Start Game
      </button>
    </div>
  );
}
