import React from "react";
import { Wait } from "./WaitOrTimeout";
import useGame from "@/hooks/useGames";
import { P1Reveal } from "./P1Reveal";

export const Player1: React.FC<{ GameAddress: `0x${string}` }> = ({
  GameAddress,
}) => {
  const { c2 } = useGame(GameAddress);
  return (
    <div>
      {!c2 ? (
        <Wait GameAddress={GameAddress} />
      ) : (
        <P1Reveal GameAddress={GameAddress} />
      )}
    </div>
  );
};
