export type Stat = {
  completedStages: {
    total: number;
    cluesUsed: number;
    guessesMade: number;
  };
  date: Date;
  leader: {
    name: string;
    avatar: string;
  };
  numUsersPerStage: {
    [key: string]: number;
  };
  numUsersPerStageMax: number;
  totalUsers: number;
};
