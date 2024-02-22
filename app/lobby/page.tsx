'use client'
import { useRouter } from "next/navigation";
import { CiCircleCheck } from "react-icons/ci";

export default function Lobby() {
  const router = useRouter()
  const participants = [
    { name: "Asfandyaar Talhat", imageSrc: "/assets/1.png" },
    { name: "Ahmad Farag", imageSrc: "/assets/2.png" },
    { name: "Sauudagar", imageSrc: "/assets/3.png" },
    { name: "Basil Yusuf", imageSrc: "/assets/4.png" },
    { name: "Ahmed Yusuf", imageSrc: "/assets/5.png" },
  ];

  const handleOnClick = (event : any) => {
    event.preventDefault()
    router.push("/game")
  }
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <h2 className="text-left mb-4 text-4xl font-extrabold dark:text-white">Waiting Lobby:</h2>
      <ul className="w-3/4 py-8 px-16 divide-y divide-gray-200">
      {participants.map((participant, index) => (
          <li key={index} className="py-3 sm:pt-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full"
                src={participant.imageSrc}
                alt={participant.name}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{participant.name}</p>
            </div>
            <div className="inline-flex items-center text-base font-semibold">
              <CiCircleCheck size={30} fill="rgb(126 34 206)" />
            </div>
          </div>
        </li>
        ))}
      </ul>
      <button
          onClick={handleOnClick}
          className="w-7/12 m-4 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm text-center mx-4 py-2.5"
        >
          Join Game Session
        </button>
    </div>
  );
}
