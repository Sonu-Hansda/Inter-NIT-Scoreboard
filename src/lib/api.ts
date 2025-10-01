const FOOTBALL_POOL_API = import.meta.env.VITE_FOOTBALL_POOL_API;
const FOOTBALL_KNOCKOUT_API = import.meta.env.VITE_FOOTBALL_KNOCKOUT_API;
const TABLE_TENNIS_POOL_API = import.meta.env.VITE_TABLE_TENNIS_POOL_API;
const TABLE_TENNIS_KNOCKOUT_API = import.meta.env.VITE_TABLE_TENNIS_KNOCKOUT_API;
const ARSENAL_API = import.meta.env.VITE_ARSENAL_API;

export async function getFootballPools()   {
  return fetch(FOOTBALL_POOL_API).then(r => r.json()) as Promise<Record<string, FootballPoolRow[]>>;
}
export async function getFootballKnockout(){
  return fetch(FOOTBALL_KNOCKOUT_API).then(r => r.json()) as Promise<FootballKnockoutRow[]>;
}

export async function getTableTennisPools() {
    return fetch(TABLE_TENNIS_POOL_API).then(r => r.json()) as Promise<Record<string, TableTennisPoolRow[]>>;
}

export async function getTableTennisKnockout() {
    return fetch(TABLE_TENNIS_KNOCKOUT_API).then(r => r.json()) as Promise<TableTennisKnockoutRow[]>;
}

export async function getArsenalTable() {
    return fetch(ARSENAL_API).then(r => r.json()) as Promise<FutsalRow[]>;
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
