import Link from "next/link";

export const JoinGame = () => {
  return (
    <Link
      href="join"
      className="w-3/4 text-center focus:outline-none text-white bg-custom-red hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
    >
      Join Game
    </Link>
  );
};


