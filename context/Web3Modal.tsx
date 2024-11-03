"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { sepolia, arbitrumGoerli } from "viem/chains";
import React, { ReactNode } from "react";

const projectId: string = process.env.NEXT_PUBLIC_PROJECT_ID!;

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784889"],
};

const chains = [sepolia, arbitrumGoerli];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

interface Web3ModalProps {
  children: ReactNode;
}

createWeb3Modal({
  wagmiConfig,
  projectId,
  defaultChain: sepolia,
  chains,
  enableAnalytics: true,
});

export function Web3Modal({ children }: Web3ModalProps) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
