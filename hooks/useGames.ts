import { useMemo } from "react";
import {
  useRpsJ1,
  useRpsJ2,
  useRpsC2,
  useRpsStake,
  useRpsTimeout,
  useRpsLastAction,
  useRpsPlay,
  useRpsSolve,
  useRpsJ1Timeout,
  useRpsJ2Timeout,
} from "@/hooks/contract/generated";
import { useAccount } from "wagmi";
import { isAddressEqual, parseEther } from "viem";
import { WagmiToastedTransaction } from "@/lib/wagmi";
import useSavedGames from "@/hooks/useSavedGames";
import toast from "react-hot-toast";
import useTimer from "./useTimer";
import { GameMove, PlayerRole } from "@/types/types";

const useGame = (address?: `0x${string}`) => {
  const { address: userAddress } = useAccount();
  const gameSalt = useSavedGames((state) => state.games.find((game) => game.address === address)?.salt);
  const gameMove = useSavedGames((state) => state.games.find((game) => game.address === address)?.move);

  const hookArgs = useMemo(() => ({ address, watch: true }), [address]);

  const j1 = useRpsJ1(hookArgs).data;
  const j2 = useRpsJ2(hookArgs).data;
  const c1 = useMemo(() => gameMove, [gameMove]);
  const c2 = (useRpsC2(hookArgs).data || 0) as GameMove;
  const stake = useRpsStake(hookArgs).data;
  const timeout = Number(useRpsTimeout(hookArgs).data);
  const lastAction = Number(useRpsLastAction(hookArgs).data);

  const { execute: executeToastedTransaction } = WagmiToastedTransaction();

  const play = useRpsPlay({ address, value: stake || parseEther("0") });
  const solve = useRpsSolve({ address, args: [c1 || 0, BigInt(gameSalt || 0)] });
  const p1TimeoutsP2 = useRpsJ2Timeout({ address });
  const p2TimeoutsP1 = useRpsJ1Timeout({ address });

  const writeP2Play = async (c2: number) => {
    return executeToastedTransaction(() =>
      play.writeAsync({
        value: stake,
        args: [c2],
      })
    );
  };

  const writeP1Solve = async () => {
    if (!c1 || !gameSalt) {
      toast.error("Your password does not match. Try again.");
      return;
    }
    const hash = await executeToastedTransaction(() => solve.writeAsync());
  };

  const writeP1TimeoutsP2 = async () => executeToastedTransaction(() => p1TimeoutsP2.writeAsync());
  const writeP2TimeoutsP1 = async () => executeToastedTransaction(() => p2TimeoutsP1.writeAsync());

  const playerRole = useMemo(() => {
    if (!j1 || !j2 || !userAddress) return PlayerRole.UNKNOWN;
    if (isAddressEqual(j1!, userAddress as `0x${string}`)) return PlayerRole.PLAYER1;
    else if (isAddressEqual(j2!, userAddress as `0x${string}`)) return PlayerRole.PLAYER2;
    else return PlayerRole.AUDIENCE;
  }, [j1, j2, userAddress]);

  const timeLeft = useTimer(lastAction + timeout);

  return {
    j1,
    j2,
    c2,
    c1,
    stake,
    timeout,
    lastAction,
    timeLeft,
    playerRole,
    gameSalt,
    gameMove,
    writeP2Play,
    writeP1Solve,
    writeP1TimeoutsP2,
    writeP2TimeoutsP1,
  };
};

export default useGame;