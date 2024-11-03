import { GameMove } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameMemory {
  address: `0x${string}`;
  salt?: `0x${string}`;
  move: GameMove;
}

interface GamesState {
  games: GameMemory[];
  addGame: (address: `0x${string}`, move: GameMove, salt?: `0x${string}`) => void;
}

const useSavedGames = create(
  persist<GamesState>(
    (set, get) => ({
      games: [],
      addGame: (address: `0x${string}`, move: GameMove, salt?: `0x${string}`) => {
        if (get().games.find((game) => game.address === address)) return;
        set({
          games: [...get().games, { address, salt , move }],
        });
      }
    }),
    {
      name: "gameData",
    }
  )
);

export default useSavedGames;