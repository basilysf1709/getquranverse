'use client';
import { useSearchParams } from "next/navigation";
export default function Congrats() {
  const searchParams = useSearchParams();
  const score = searchParams.get("score");
  return (
    <main className="flex justify-center items-center flex-col h-screen">
      <h1>
        Congrats on completing! May Allah increase your knowledge of the Quran.
      </h1>
      <h1>Your score: {score}/10 🎉</h1>
    </main>
  );
}
