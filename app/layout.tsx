import type { Metadata } from "next";
import { Black_Ops_One } from "next/font/google";
import "./globals.css";

import { Web3Modal } from "@/context/Web3Modal";
import { Toaster } from "react-hot-toast";

const inter = Black_Ops_One({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Modal>
          <Toaster position="bottom-right" />
          {children}
        </Web3Modal>
      </body>
    </html>
  );
}
