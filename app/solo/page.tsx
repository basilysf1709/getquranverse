"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Join() {
  const router = useRouter();
  const [selectedQuestions, setSelectedQuestions] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<string>("easy");
  const selectQuestions = (number: number) => {
    setSelectedQuestions(number);
  };
  const selectDifficulty = (level: string) => {
    setDifficulty(level);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      router.push(`/solo/game?questions=${selectedQuestions}&difficulty=${difficulty}`);
    } catch (error) {
      console.error("An error occurred while trying to join solo game", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center flex-col h-screen w-screen"
    >
      <div className="mb-5 w-3/4">
        <label
          htmlFor="difficulty"
          className="block mt-4 text-sm font-medium text-white"
        >
          Difficulty
        </label>
        <div className="flex">
          {["easy", "medium", "hard"].map((level) => (
            <button
              key={level}
              className={`flex justify-center w-1/3 py-3 m-2 ml-0 space-x-2 border-2 cursor-pointer rounded-xl ${
                difficulty === level ? "border-green-700" : "border-white/10"
              }`}
              onClick={() => selectDifficulty(level)}
              type="button"
            >
              <p className="text-white">
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </p>
            </button>
          ))}
        </div>
        <label
          htmlFor="username"
          className="block mt-4 text-sm font-medium text-white"
        >
          Number of Questions
        </label>
        <div className="flex">
          {[10, 20, 30].map((number) => (
            <button
              key={number}
              className={`flex justify-center w-1/3 py-3 m-2 ml-0 space-x-2 border-2 cursor-pointer rounded-xl ${
                selectedQuestions === number
                  ? "border-green-700"
                  : "border-white/10"
              }`}
              onClick={() => selectQuestions(number)}
              type="button"
            >
              <p className="text-white">{number}</p>
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="w-full mt-5 text-white bg-custom-light-green hover:bg-hover-green font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Start Game
        </button>
      </div>
    </form>
  );
}
