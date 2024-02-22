import { HostGame } from "@/components/HostGame";
import { JoinGame } from "@/components/JoinGame";

export default function Home() {
  return (
    <main className="flex justify-center items-center flex-col h-screen">
      <JoinGame />
      <HostGame />
      {/* <Loading /> */}
    </main>
  );
}
