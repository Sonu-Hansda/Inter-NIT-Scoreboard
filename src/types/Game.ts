export interface Row {
  team: string;
  played: number;
  won: number;
  draw: number;
  loss: number;
  points: number;
  goals_scored: number;
  goal_difference: number;
  cards?: {
    yellow: number;
    red: number;
  };
}

export interface Game {
  name: string;
  rows: Row[];
}
