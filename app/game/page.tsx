"use client";

import { Loading } from "@/components/Loading/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/utils/supabase/client";
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
  const [participants, setParticipants] = useState<any>([]);

  const game_id = searchParams.get("game_id");
  const player_id = searchParams.get("player_id");

  const options = useEffect(() => {
    setStartTime(new Date());
  }, [questionNumber]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const limit_value = 10;
        const difficulty = "easy";
        const response = await fetch("/api/v1/getQuestions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ game_id, limit_value, difficulty }),
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

    const channel_game_session = supabase
      .channel("game_sessions")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          filter: `session_id=eq.${game_id}`,
          table: "game_sessions",
        },
        handleUpdates
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel_game_session);
    };
  }, [supabase]);
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
    updateScore(scoreToAdd);
    const updatedColors = [...colors];
    updatedColors[index - 1] = isCorrect ? "blink-green" : "blink-red";
    setColors(updatedColors);

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

    setTimeout(() => {
      animationLock.current = false;
      if (questionNumber === 10) {
        router.push(`/congrats?game_id=${game_id}`);
      }
      setQuestionNumber(questionNumber + 1);
      setWaiting(true);
      setTimeout(() => {
        const resetColors = colors.map(() => "border-white/10");
        setColors(resetColors);
      }, 1000);
    }, 2000);
  };
  const handleUpdates = (payload: any) => {
    if (payload?.new?.total_turns % payload?.new?.total_players === 0) {
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
      setTimeout(() => {
        setWaiting(false);
      }, 5000);
    }
  };
  const updateScore = async (newScore: number) => {
    try {
      const response = await fetch("/api/v1/addScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          game_id,
          player_id,
          score: newScore,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update score");
      }
    } catch (error) {
      console.error("Error updating score:", error);
    }
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
        <h1 className="mb-8">Waiting for other players, current scores:</h1>
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
                  <td className="px-12 py-4">{participant.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {questions &&
          questionNumber > 0 &&
          questionNumber <= questions.length && (
            <h1 className="py-4">
              Correct Answer: {
                questions[questionNumber - 2][
                  `option_${questions[questionNumber - 2].answer_index}`
                ]
              }
            </h1>
          )}
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
