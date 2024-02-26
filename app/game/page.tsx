"use client";

import { Loading } from "@/components/Loading/Loading";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import "./game.css";

export default function Game() {
  const searchParams = useSearchParams();
  const [colors, setColors] = useState<string[]>(Array(4).fill("white/10"));
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [show, setShow] = useState<boolean>(true)
  const game_id = searchParams.get("game_id");
  const handleOnClick = (index: number, answer: string) => {
    const updatedColors = [...colors];
    updatedColors[index] = 'green-200';
    setColors(updatedColors);
    setQuestionNumber(questionNumber + 1)
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false)
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
  }, []);

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
      question: "What type of framework is Next.js?",
      answerOptions: [
        { answer: "Surah Hashr" },
        { answer: "Surah Yasin" },
        { answer: "Surah Fath", isCorrect: true },
        { answer: "Surah Ghafir" },
      ],
    },
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
      question: "What type of framework is Next.js?",
      answerOptions: [
        { answer: "Surah Yasin" },
        { answer: "Surah Hashr" },
        { answer: "Surah Fath", isCorrect: true },
        { answer: "Surah Ghafir" },
      ],
    },
    {
      question: "What type of framework is Next.js?",
      answerOptions: [
        { answer: "Surah Yasin" },
        { answer: "Surah Hashr" },
        { answer: "Surah Fath", isCorrect: true },
        { answer: "Surah Ghafir" },
      ],
    },
  ];

  return (
    <Suspense>
      <div className="flex flex-col w-screen px-5 h-screen justify-center items-center">
        {show ? <Loading /> : <></>}
        <div className="flex flex-col items-start w-full">
          <h4 className="mt-10 text-xl text-white/60">Question {questionNumber + 1} of 5</h4>
          <div className="mt-4 text-2xl text-white">
            {questions[questionNumber].question}
          </div>
          <div className="flex flex-col w-full">
            {questions[questionNumber].answerOptions.map((answer, index) => (
              <button
                key={index}
                className={`flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-${colors[index]} rounded-xl`}
                onClick={() => handleOnClick(index, answer.answer)}
              >
                <span className="button-style w-6 h-6" />
                <p className="ml-6 text-white">{answer.answer}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
