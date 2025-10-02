function getApiUrl(type: string): string | null {
  switch (type) {
    case 'football:table':
      return import.meta.env.VITE_FOOTBALL_API ?? null;
    case 'table_tennis:table':
      return import.meta.env.VITE_TABLE_TENNIS_API ?? null;
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

export function getTableTennis() {
  return fetchData<CombinedTableTennisData>('table_tennis:table');
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
  team: string;
  matches_played: number;
  win: number;
  loss: number;
  score: number;
}

export interface CombinedTableTennisData {
  tt_boys: TableTennisRow[];
  tt_girls: TableTennisRow[];
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
