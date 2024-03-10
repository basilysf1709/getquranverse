"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Loading } from "@/components/Loading/Loading";
import { useState } from "react";

export default function Host() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const hostGameSession = async (username: string) => {
    const response = await fetch("/api/v1/createGameSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    return response.json();
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const username = event.target.username.value;
      const { game_id, player_uuid } = await hostGameSession(username);
      router.push(`${game_id}?player_id=${player_uuid}`);
    } catch (error) {
      console.error(
        "An error occurred while trying to create game session:",
        error
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col h-screen w-screen"
        >
          <div className="mb-5 w-3/4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your Username
            </label>
            <input
              type="username"
              id="username"
              className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5"
              placeholder="Your username..."
              required
            />
            {<button
              type="submit"
              className="w-full mt-5 text-white bg-custom-light-green hover:bg-hover-green focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create Game Session
            </button>}
          </div>
        </form>
      )}
    </>
  );
}
