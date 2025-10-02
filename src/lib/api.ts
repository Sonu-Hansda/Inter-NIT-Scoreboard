function getApiUrl(type: string): string | null {
  switch (type) {
    case 'football:pools':
      return import.meta.env.VITE_FOOTBALL_POOL_API ?? null;
    case 'football:knockout':
      return import.meta.env.VITE_FOOTBALL_KNOCKOUT_API ?? null;
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

  if (import.meta.env.DEV) {
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

export function getFootballPools() {
  return fetchData<Record<string, FootballPoolRow[]>>('football:pools');
}

export function getFootballKnockout() {
  return fetchData<FootballKnockoutRow[]>('football:knockout');
}

export function getTableTennisBoys() {
  return fetchData<TableTennisRow[]>('table_tennis:boys');
}

export function getTableTennisGirls() {
  return fetchData<TableTennisRow[]>('table_tennis:girls');
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

export interface TableTennisRow {
  team: string;
  matches_played: number;
  win: number;
  loss: number;
  score: number | null;
}

export interface FutsalRow {
    team_name: string;
    played: number;
    win: number;
    draw: number;
    loss: number;
    points: number;
}
