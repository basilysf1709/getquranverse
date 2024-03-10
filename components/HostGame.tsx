import Link from "next/link";

export const HostGame = () => {
  return (
    <Link
      href="host"
      className="w-3/4 text-center focus:outline-none text-white bg-custom-green hover:bg-hover-green focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
    >
      Host Game
    </Link>
  );
};
