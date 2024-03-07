"use client";

import { Loading } from "@/components/Loading/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./game.css";

export default function Game() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const animationLock = useRef(false);
  const [colors, setColors] = useState<string[]>(
    Array(4).fill("border-white/10")
  );
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [show, setShow] = useState<boolean>(true);
  const [questions, setQuestions] = useState<any>();
  const [waiting, setWaiting] = useState<boolean>();
  const [score, setScore] = useState<number>(0);

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
    }, 10000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  const handleOnClick = (index: number) => {
    if (animationLock.current) return;

    animationLock.current = true;
    let isCorrect =
      questions !== undefined &&
      questions[questionNumber - 1].answer_index === index;
    if (isCorrect) {
      setScore(score + 1);
    }
    const updatedColors = [...colors];
    updatedColors[index - 1] = isCorrect ? "blink-green" : "blink-red";
    setColors(updatedColors);

    setTimeout(() => {
      animationLock.current = false;
      if (questionNumber === 10) {
        router.push(`/congrats?score=${score}`);
      }
      setQuestionNumber(questionNumber + 1);
      setWaiting(true);
      setTimeout(() => {
        setWaiting(false);
        const resetColors = colors.map(() => "border-white/10");
        setColors(resetColors);
      }, 1000);
    }, 2000);
  };
  if (waiting === true) {
    return <p>Waiting for other players...</p>;
  } else {
    return (
      <div className="flex flex-col w-screen px-5 h-screen justify-center items-center">
        {show ? <Loading /> : <></>}
        <div className="flex flex-col items-start w-full">
          {questions !== undefined ? (
            <>
              <h4 className="mt-10 text-xl text-white/60">
                Question {questionNumber} of {questions.length}
              </h4>
              <audio
                autoPlay
                controls
                id="song"
                className="block w-full max-w-md mx-auto"
                src={questions[questionNumber - 1].audio_clip}
              ></audio>
              <div className="mt-4 text-2xl text-white">
                {questions[questionNumber - 1].question}
              </div>
              <div className="flex flex-col w-full">
                <button
                  className={`flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer ${colors[0]} rounded-xl`}
                  onClick={() => handleOnClick(1)}
                >
                  <span className="button-style w-6 h-6" />
                  <p className="ml-6 text-white">
                    {questions[questionNumber - 1].option_1}
                  </p>
                </button>
                <button
                  className={`flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer ${colors[1]} rounded-xl`}
                  onClick={() => handleOnClick(2)}
                >
                  <span className="button-style w-6 h-6" />
                  <p className="ml-6 text-white">
                    {questions[questionNumber - 1].option_2}
                  </p>
                </button>
                <button
                  className={`flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer ${colors[2]} rounded-xl`}
                  onClick={() => handleOnClick(3)}
                >
                  <span className="button-style w-6 h-6" />
                  <p className="ml-6 text-white">
                    {questions[questionNumber - 1].option_3}
                  </p>
                </button>
                <button
                  className={`flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer ${colors[3]} rounded-xl`}
                  onClick={() => handleOnClick(4)}
                >
                  <span className="button-style w-6 h-6" />
                  <p className="ml-6 text-white">
                    {questions[questionNumber - 1].option_4}
                  </p>
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
}
