import Link from "next/link";

export const SoloGame = () => {
  return (
    <Link
      href="solo"
      className="w-3/4 text-center focus:outline-none text-white bg-emerald-800 hover:bg-hover-green focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
    >
      Solo
    </Link>
  );
};


