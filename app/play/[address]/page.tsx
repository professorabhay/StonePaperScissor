"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/navbar";
import useGame from "@/hooks/useGames";
import { Wait } from "./(ui)/WaitOrTimeout";
import { useAccount } from "wagmi";
import { PlayerRole } from "@/types/types";
import { Player2 } from "./(ui)/Player2";
import { Player1 } from "./(ui)/Player1";
import { GameOver } from "./(ui)/GameOver";
import { formatEther } from "viem";

const formSchema = z.object({
  move: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "You need to select a your move.",
  }),
});

export default function Page({
  params,
}: {
  params: { address: `0x${string}` };
}) {
  const { playerRole, c2, stake } = useGame(params.address);
  const { status } = useAccount();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      move: "1",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {}
  return (
    <div>
      <Navbar />
      {status == "connected" && (
        <div className="flex min-h-screen flex-col items-center justify-between p-4">
          <div>
            <div>
              {stake !== undefined && (
                <Card className="flex flex-col items-center justify-betweeen mb-2">
                  <CardHeader>
                    <CardTitle>
                      The Bet Amount Is {String(formatEther(stake!))} ETH{" "}
                    </CardTitle>
                  </CardHeader>
                </Card>
              )}

              {!!c2 && !stake ? (
                <GameOver />
              ) : (
                <>
                  {playerRole == PlayerRole.PLAYER2 && (
                    <Player2 GameAddress={params.address} />
                  )}
                  {playerRole == PlayerRole.PLAYER1 && (
                    <Player1 GameAddress={params.address} />
                  )}
                  {playerRole == PlayerRole.AUDIENCE && (
                    <Wait GameAddress={params.address} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
