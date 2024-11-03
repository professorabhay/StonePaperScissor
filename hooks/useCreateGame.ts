import useSavedGames from "@/hooks/useSavedGames";
import { useWalletClient, usePublicClient } from "wagmi";
import { parseEther } from "viem";
import { abi , bytecode } from "@/contracts/rpsABI";
import { toast } from "react-hot-toast";
import useHasher from "@/hooks/useHasher";
import { GameMove } from "@/types/types";

const useCreateGame = () => {
  const addGame = useSavedGames((state) => state.addGame);
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { hashGameMessage } = useHasher();

  const createGame = async (opponentAddress: `0x${string}`, wager: string, move: GameMove, salt: `0x${string}`) => {
    if (!walletClient) {
      toast.error("Wallet not connected. Please connect your wallet.");
      return "";
    }

    const commitment = hashGameMessage(move, salt);

    try {
      const hash = await walletClient.deployContract({
        abi: abi,
        bytecode: bytecode as `0x${string}`,
        value: BigInt(parseEther(wager).toString()),
        args: [commitment, opponentAddress],
        gas : BigInt(4700000)
      });

      const contractPromise = new Promise<`0x${string}`>((resolve, reject) => {
        publicClient
          .waitForTransactionReceipt({ hash })
          .then((tx) => (tx.contractAddress ? resolve(tx.contractAddress) : reject()));
      });

      toast.promise(contractPromise, {
        loading: "Waiting for transaction confirmation",
        success: "Contract deployed successfully",
        error: "There was an issue with contract creation (see console for details).",
      });

      const deployedContract = await contractPromise;
      addGame(deployedContract, move, salt);

      return deployedContract;
    } catch (e) {
      console.error(e);

      const stringified = typeof e === "string" ? e : JSON.stringify(e);

      if (stringified.includes("rejected") || stringified.includes("denied"))
        toast.error("You rejected the request. Please try again.");

      return "";
    }
  };

  return { createGame };
};

export default useCreateGame;