"use client";
import { useSearchParams, useRouter } from "next/navigation";
export default function Congrats() {
  const searchParams = useSearchParams();
  const score = searchParams.get("score");
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <main className="flex justify-center items-center flex-col h-screen">
      <h1 className="mb-8">
        Congrats on completing! May Allah increase your knowledge of the Quran.
      </h1>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs border text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-12 py-3">
                User #1
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
        <button
          onClick={handleClick}
          className="w-full mt-5 text-white bg-custom-light-green hover:bg-hover-green focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Play Again
        </button>
      </div>
    </main>
  );
}
