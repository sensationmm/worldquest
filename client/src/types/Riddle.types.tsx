type RiddleBase = {
  id: string;
  order: number;
  question: string[];
};

type Guess = {
  guessedAt: Date;
  value: string;
};

export interface Riddle extends RiddleBase {
  progressId: string;
  clue1?: string;
  clue2?: string;
  clue3?: string;
  clueTokens: number;
  guesses: Guess[];
}

interface CompletedRiddle extends RiddleBase {
  answer: string;
  clue1: string;
  clue2: string;
  clue3: string;
  completedAt: Date;
  cluesUsed: number;
}

export type CompletedRiddles = CompletedRiddle[];
