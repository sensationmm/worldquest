export type Riddle = {
  id: string;
  progressId: string;
  order: number;
  question: string[];
  clue1?: string;
  clue2?: string;
  clue3?: string;
  clueTokens: number;
};

type CompletedRiddle = {
  id: string;
  question: string[];
  answer: string;
  order: number;
  clue1: string;
  clue2: string;
  clue3: string;
  completedAt: Date;
  cluesUsed: number;
};

export type CompletedRiddles = CompletedRiddle[];
