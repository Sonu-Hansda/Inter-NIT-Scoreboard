async function fetchData<T>(type: string): Promise<T> {
  const response = await fetch(`/api/data?type=${type}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export function getFootballPools() {
  return fetchData<Record<string, FootballPoolRow[]>>('football:pools');
}

export function getFootballKnockout() {
  return fetchData<FootballKnockoutRow[]>('football:knockout');
}

export function getTableTennisPools() {
  return fetchData<Record<string, TableTennisPoolRow[]>>('table_tennis:pools');
}

export function getTableTennisKnockout() {
  return fetchData<TableTennisKnockoutRow[]>('table_tennis:knockout');
}

export function getFutsalTable() {
  return fetchData<FutsalRow[]>('futsal:table');
}

export interface FootballPoolRow {
  team_name: string;
  matches_played: number;
  won: number;
  draw: number;
  loss: number;
  points: number;
  goals_scored: number;
  goal_difference: number;
  cards: { yellow: number; red: number };
}
export interface FootballKnockoutRow {
  team: string;
  win: number;
  loss: number;
  score: number;
}

export interface TableTennisPoolRow {
    team_name: string;
    win: number;
    loss: number;
    points: number;
}

export interface TableTennisKnockoutRow {
    team_name: string;
    win: number;
    loss: number;
    score: number;
}

export interface FutsalRow {
    team_name: string;
    played: number;
    win: number;
    draw: number;
    loss: number;
    points: number;
}
