"use client";
import Dashboard from "./CreateOrJoin";
import { useAccount } from "wagmi";
import Navbar from "@/components/navbar";
import MyGames from "./MyGames";

export default function Home() {
  const { status } = useAccount();

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-between">
        <div className="grid grid-cols-1 mt-8 mx-2  lg:grid-cols-3 gap-16">
          {/* <div>{status === "connected" ? <Dashboard /> : <w3m-button />}</div> */}
          <div>
            <Dashboard />
          </div>
          <div className="col-span-2">
            <MyGames />
          </div>
        </div>
      </div>
    </div>
  );
}
