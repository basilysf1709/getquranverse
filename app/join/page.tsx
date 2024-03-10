'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Join() {
  const router = useRouter()
  const joinGameSession = async (username: string, game_id: string) => {
    const response = await fetch("/api/v1/joinGameSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, game_id }),
    });
    return response.json();
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const username = event.target.username.value;
      const game_id = event.target.game_id.value;
      const {player_id} = await joinGameSession(username, game_id);
      router.push(`${game_id}?player_id=${player_id}`);
    } catch (error) {
      console.error(
        "An error occurred while trying to join game session:",
        error
      );
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col h-screen w-screen">
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
          className="mb-2 w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5"
          placeholder="Your username..."
          required
        />
        <label
          htmlFor="id"
          className="block mb-2 text-sm font-medium text-white"
        >
          Game ID
        </label>
        <input
          type="game_id"
          id="game_id"
          className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5"
          placeholder="Game ID..."
          required
        />
        <button
          type="submit"
          className="w-full mt-5 text-white bg-custom-light-green hover:bg-hover-green focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Join Game Session
        </button>
      </div>
    </form>
  );
};
