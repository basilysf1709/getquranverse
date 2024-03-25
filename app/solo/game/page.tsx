"use client";

import { Loading } from "@/components/Loading/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {v4 as uuidv4} from 'uuid';
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
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());

  useEffect(() => {
    setStartTime(new Date());
  }, [questionNumber]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const limit_value = searchParams.get('questions');
        const randomiser_uuid = uuidv4();
        const response = await fetch("/api/v1/getQuestions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ randomiser_uuid, limit_value }),
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
  }, []);
  useEffect(() => {
    if (endTime) {
      const duration = calculateDuration();
      console.log(`Time taken to answer: ${duration} milliseconds`);
    }
  }, [endTime]);

  const handleOnClick = (index: number) => {
    if (animationLock.current) return;
    setEndTime(new Date());
    const currentTime = new Date();

    animationLock.current = true;
    let isCorrect =
      questions !== undefined &&
      questions[questionNumber - 1].answer_index === index;

    const timeTaken = currentTime.getTime() - startTime.getTime();

    let scoreToAdd = 0;
    if (isCorrect) {
      const timeInSeconds = timeTaken / 1000;
      scoreToAdd = 100 - Math.floor(timeInSeconds); // Subtract 1 point for each second
      scoreToAdd = Math.max(scoreToAdd, 10); // Ensure score doesn't fall below 10
    }
    setScore(score + scoreToAdd);
    const updatedColors = [...colors];
    updatedColors[index - 1] = isCorrect ? "blink-green" : "blink-red";
    setColors(updatedColors);

    setTimeout(() => {
      animationLock.current = false;
      if (questionNumber === questions) {
        router.push(`/solo/congrats?score=${score}`);
      }
      setQuestionNumber(questionNumber + 1);
      setWaiting(true);
      setTimeout(() => {
        const resetColors = colors.map(() => "border-white/10");
        setColors(resetColors);
        setWaiting(false);
      }, 1000);
    }, 2000);
  };

  const calculateDuration = () => {
    if (startTime && endTime) {
      return endTime.getTime() - startTime.getTime();
    }
    return 0;
  };
  if (waiting === true) {
    return (
      <main className="flex justify-center items-center flex-col h-screen">
        <h1 className="mb-8">Current scores:</h1>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs border text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-12 py-3">
                  You
                </th>
                <th scope="col" className="px-12 py-3">
                  Final Score
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <td className="px-12 py-4">User #1</td>
                <td className="px-12 py-4">{score}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    );
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
