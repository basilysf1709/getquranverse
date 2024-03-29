import { HostGame } from "@/components/HostGame";
import { JoinGame } from "@/components/JoinGame";
import { SoloGame } from "@/components/SoloGame";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="flex justify-center items-center flex-col h-screen">
      <h1 className="p-8 text-4xl font-extrabold leading-none tracking-tight text-white">
        Quran Verse 🎉
        <sub className="text-xs border border-gray-600 rounded px-1 align-baseline">
          Beta
        </sub>
      </h1>
      <JoinGame />
      <HostGame />
      <SoloGame />
      <Testimonials />
    </main>
  );
}
