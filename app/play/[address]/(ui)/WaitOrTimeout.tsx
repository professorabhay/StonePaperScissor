"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGame from "@/hooks/useGames";
import { PlayerRole } from "@/types/types";
import { Button } from "@/components/ui/button";
import { timeformat } from "@/lib/utils";

export const Wait: React.FC<{ GameAddress: `0x${string}` }> = ({
  GameAddress,
}) => {
  const { timeLeft, playerRole , writeP1TimeoutsP2, writeP2TimeoutsP1 } = useGame(GameAddress);

  const handleTimeout = () => {
    playerRole == PlayerRole.PLAYER1 ? writeP1TimeoutsP2() : writeP2TimeoutsP1();
    console.log("timeout");

   };

  // render functions

  function renderWait() {
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription className="flex flex-col items-center justify-betweeen">
              Waiting for the other player to{" "}
              {playerRole == PlayerRole.PLAYER1
                ? "make a move"
                : "solve the game"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-betweeen space-y-2">
            Time Left : {timeformat(timeLeft)}
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderTimeout() {
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col text-md items-center justify-betweeen">
              ⏰
            </CardTitle>
            <CardDescription className="flex flex-col text-md items-center justify-betweeen">
              The other player has timed out
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col justify-end">
            {playerRole != PlayerRole.AUDIENCE && (
              <Button onClick={handleTimeout}>
                {playerRole == PlayerRole.PLAYER1
                  ? "Claim The Stake"
                  : "Claim Win"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }

  return <div>{timeLeft! > 0 ? renderWait() : renderTimeout()}</div>;
};
