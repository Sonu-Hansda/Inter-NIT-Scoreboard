function getApiUrl(type: string): string | null {
  switch (type) {
    case 'football:table':
      return import.meta.env.VITE_FOOTBALL_API ?? null;
    case 'table_tennis:boys':
      return import.meta.env.VITE_TT_BOYS_API ?? null;
    case 'table_tennis:girls':
      return import.meta.env.VITE_TT_GIRLS_API ?? null;
    case 'futsal:table':
      return import.meta.env.VITE_FUTSAL_API ?? null;
    default:
      return null;
  }
}

async function fetchData<T>(type: string): Promise<T> {
  let url: string | null;

  if (import.meta.env.VITE_DEV) {
    url = getApiUrl(type);
    if (!url) {
      throw new Error(`Invalid data type: ${type}`);
    }
  } else {
    url = `/api/data?type=${type}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export function getFootball(){
  return fetchData<CombinedFootballData>('football:table');
}

export function getTableTennisBoys() {
  return fetchData<TableTennisData>('table_tennis:boys');
}

export function getTableTennisGirls() {
  return fetchData<TableTennisData>('table_tennis:girls');
}

export function getFutsalTable() {
  return fetchData<CombinedFutsalData>('futsal:table');
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

export interface CombinedFootballData {
  football_pool: Record<string, FootballPoolRow[]>;
  football_knockout: FootballKnockoutRow[];
}

export interface TableTennisRow {
  team_name: string; // Changed from 'team' to 'team_name'
  matches_played: number;
  win: number;
  loss: number;
  points: number;
  score: number;
}

export interface TableTennisData {
  tt_boys_pool: Record<string, TableTennisRow[]>;
  tt_boys_knockout: TableTennisKnockoutRow[];
}

export interface TableTennisKnockoutRow {
  team: string;
  win: number;
  loss: number;
  score: number;
}

export interface CombinedFutsalData {
  futsal_pool: Record<string, FootballPoolRow[]>;
  futsal_knockout: FootballKnockoutRow[];
}

export interface FutsalRow {
    team_name: string;
    played: number;
    win: number;
    draw: number;
    loss: number;
    points: number;
}
