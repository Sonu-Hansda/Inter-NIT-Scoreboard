export interface TeamRow {
  team: string;
  played: number;
  won: number;
  loss: number;
  points: number;
}

export interface Game {
  name: string;
  rows: TeamRow[];
}