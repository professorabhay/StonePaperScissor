import React from "react";
import { Wait } from "./WaitOrTimeout";
import useGame from "@/hooks/useGames";
import { P2Move } from "./P2Move";

export const Player2: React.FC<{ GameAddress: `0x${string}` }> = ({
  GameAddress,
}) => {
  const { c2 } = useGame(GameAddress);
  return (
    <div>
      {c2 ? (
        <Wait GameAddress={GameAddress} />
      ) : (
        <P2Move GameAddress={GameAddress} />
      )}
    </div>
  );
};
