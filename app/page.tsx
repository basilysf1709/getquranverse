import { HostGame } from "@/components/HostGame";
import { JoinGame } from "@/components/JoinGame";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="flex justify-center items-center flex-col h-screen">
      <h1 className="p-8 text-4xl font-extrabold leading-none tracking-tight text-white">Ramadan Mubarak 🎉</h1>
      <JoinGame />
      <HostGame />
      <Testimonials />
    </main>
  );
}
