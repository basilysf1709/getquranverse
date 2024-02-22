'use client'

import { useRouter } from "next/navigation";

export default function Join() {
  const router = useRouter()
  const handleSubmit = (event: any) => {
    event.preventDefault(); 
    router.push("/lobby");
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
          placeholder="Asfandyaar Talhat"
          required
        />
        <label
          htmlFor="id"
          className="block mb-2 text-sm font-medium text-white"
        >
          Game ID
        </label>
        <input
          type="id"
          id="id"
          className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5"
          placeholder="Game ID..."
          required
        />
        <button
          type="submit"
          className="w-full mt-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Join Game Session
        </button>
      </div>
    </form>
  );
};
