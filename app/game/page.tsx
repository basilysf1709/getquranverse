"use client";

import { Loading } from "@/components/Loading/Loading";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import "./game.css";

export default function Game() {
  const searchParams = useSearchParams();
  const [colors, setColors] = useState<string[]>(Array(4).fill("white/10"));
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [show, setShow] = useState<boolean>(true);
  const [questions, setQuestions] = useState<any>();
  const game_id = searchParams.get("game_id");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/v1/getQuestions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ game_id }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const { data } = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error(
          "An error occurred while trying to fetch game session data:",
          error
        );
      }
    };
    fetchQuestions();
    const timeId = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  const handleOnClick = (index: number) => {
    if (questions !== undefined && questions[0].answer_in === index) {
      const updatedColors = [...colors];
      updatedColors[index - 1] = "green-600";
      console.log("correct");
      setColors(updatedColors);
      console.log(updatedColors);
    } else {
      const updatedColors = [...colors];
      updatedColors[index - 1] = "blue-300";
      console.log("wrong");
      setColors(updatedColors);
    }
    setQuestionNumber(questionNumber + 1);
  };

  return (
    <div className="flex flex-col w-screen px-5 h-screen justify-center items-center">
      {show ? <Loading /> : <></>}
      <div className="flex flex-col items-start w-full">
        <h4 className="mt-10 text-xl text-white/60">
          Question {questionNumber + 1} of 5
        </h4>
        {questions !== undefined ? (
          <>
            <div className="mt-4 text-2xl text-white">
              What is him? He&apos;s him
            </div>
            <div className="flex flex-col w-full">
              <button
                className={`flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-${colors[0]} rounded-xl`}
                onClick={() => handleOnClick(1)}
              >
                <span className="button-style w-6 h-6" />
                <p className="ml-6 text-white">{questions[0].option_1}</p>
              </button>
              <button
                className={`flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-${colors[1]} rounded-xl`}
                onClick={() => handleOnClick(2)}
              >
                <span className="button-style w-6 h-6" />
                <p className="ml-6 text-white">{questions[0].option_2}</p>
              </button>
              <button
                className={`flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-${colors[2]} rounded-xl`}
                onClick={() => handleOnClick(3)}
              >
                <span className="button-style w-6 h-6" />
                <p className="ml-6 text-white">{questions[0].option_3}</p>
              </button>
              <button
                className={`flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-${colors[3]} rounded-xl`}
                onClick={() => handleOnClick(4)}
              >
                <span className="button-style w-6 h-6" />
                <p className="ml-6 text-white">{questions[0].option_4}</p>
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
