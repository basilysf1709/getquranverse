"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Congrats() {
  const searchParams = useSearchParams();
  const [participants, setParticipants] = useState<any>([]);
  const game_id = searchParams.get("game_id");
  const router = useRouter()

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/v1/getPlayers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ game_id }),
        });
        const { data } = await response.json();
        const sortedData = data.sort((a: any, b: any) => b.score - a.score);
        setParticipants(sortedData);
      } catch (error) {
        console.error(
          "An error occurred while trying to fetch player data:",
          error
        );
      } 
    };
    fetchPlayers();
  }, []);
  const handleClick = () => {
    router.push("/");
  }
  return (
    <main className="flex justify-center items-center flex-col h-screen">
      <h1 className="mb-8">
        Congrats on completing! May Allah increase your knowledge of the Quran.
      </h1>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs border text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-12 py-3">
                Rank
              </th>
              <th scope="col" className="px-12 py-3">
                Username
              </th>
              <th scope="col" className="px-12 py-3">
                Final Score
              </th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant: any, index: number) => (
              <tr key={participant.username} className="border">
                <td className="px-12 py-4">{index + 1}</td>
                <td className="px-12 py-4">{participant.username}</td>
                <td className="px-12 py-4">{participant.score}/10</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleClick}
          className="w-full mt-5 text-white bg-custom-light-green hover:bg-hover-green focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Play Again
        </button>
      </div>
    </main>
  );
}
