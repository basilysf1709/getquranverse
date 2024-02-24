"use client";

import { Loading } from "@/components/Loading/Loading";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import "./game.css";

export default function Game() {
  const searchParams = useSearchParams();
  const game_id = searchParams.get("game_id");
  console.log(game_id);

  const questions = [
    {
      question: "What type of framework is Next.js?",
      answerOptions: [
        { answer: "Surah Yasin" },
        { answer: "Surah Hashr" },
        { answer: "Surah Fath", isCorrect: true },
        { answer: "Surah Ghafir" },
      ],
    },
    {
      question: "When was Next.js released?",
      answerOptions: [
        { answer: "20 September 2019" },
        { answer: "14 January 2017" },
        { answer: "25 October 2016", isCorrect: true },
        { answer: "28 March 2018" },
      ],
    },
    {
      question: "Which CSS Framework are we using?",
      answerOptions: [
        { answer: "Bootstrap" },
        { answer: "TailwindCSS", isCorrect: true },
        { answer: "Chakra UI" },
        { answer: "Bulma CSS" },
      ],
    },
    {
      question:
        "Which class in Tailwind is used to set flex direction of column?",
      answerOptions: [
        { answer: "col" },
        { answer: "col-flex" },
        { answer: "flex-col", isCorrect: true },
        { answer: "None of the above" },
      ],
    },
  ];

  return (
    <Suspense>
      <div className="flex flex-col w-screen px-5 h-screen justify-center items-center">
        <Loading />
        <div className="flex flex-col items-start w-full">
          <h4 className="mt-10 text-xl text-white/60">Question 1 of 5</h4>
          <div className="mt-4 text-2xl text-white">
            What is my favorite Surah of the Quran?
          </div>
          <div className="flex flex-col w-full">
            {questions[0].answerOptions.map((answer, index) => (
              <div
                key={index}
                className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl"
              >
                <input type="radio" className="w-6 h-6" />
                <p className="ml-6 text-white">{answer.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
