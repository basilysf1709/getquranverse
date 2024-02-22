import Link from "next/link";

export const HostGame = () => {
  return (
    <Link
      href="host"
      className="w-3/4 text-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
    >
      Host Game
    </Link>
  );
};
