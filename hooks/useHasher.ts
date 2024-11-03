import { useSignMessage } from "wagmi";
import { encodePacked, keccak256 } from "viem";
import { randomBytes } from "crypto";
import { wagmiErrorToast } from "@/lib/wagmi";
import { GameMove } from "@/types/types";

const useHasher = () => {
  const { signMessageAsync: wagmiSignAsync } = useSignMessage();

  const getMessageForSigning = (existingPassword?: string) => {
    const password = existingPassword || `*${Date.now()}#${randomBytes(8).toString("hex")}`;
    const message =
      "Signature of this message proves commitment to your move without revealing it." +
      `\n\nGame password: ${password}`;
    return { message, password };
  };

  const signMessage = async (message: string) => {
    try {
      const signed = await wagmiSignAsync({ message });
      return signed;
    } catch (e) {
      wagmiErrorToast(e);
      return null;
    }
  };

  const hashGameMessage = (move: GameMove, salt: `0x${string}`) =>
    keccak256(encodePacked(["uint8", "uint256"], [move, BigInt(salt)]));

  return { getMessageForSigning, signMessage, hashGameMessage };
};

export default useHasher;