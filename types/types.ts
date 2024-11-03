export enum GameMove {
    NULL,
    ROCK,
    PAPER,
    SCISSORS,
    SPOCK,
    LIZARD,
  }

export  type GameData = {
    move: GameMove;
    salt: `0x${string}`;
  };

  export enum PlayerRole {
    PLAYER1,
    PLAYER2,
    AUDIENCE,
    UNKNOWN,
  }
  