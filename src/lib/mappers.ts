import type { FootballKnockoutRow, FootballPoolRow, FutsalRow, TableTennisKnockoutRow, TableTennisRow } from './api';
import type { Game, Row } from '../types/Game';

export function mapFootballPoolsToGames(pools: Record<string, FootballPoolRow[]>): Game[] {
    if (!pools) return [];
    return Object.entries(pools).map(([poolName, rows]) => ({
        name: poolName.replace('_', ' ').toUpperCase(),
        rows: rows.map(
            (row): Row => ({
                team: row.team_name,
                played: row.matches_played,
        won: row.won,
                draw: row.draw,
                loss: row.loss,
                points: row.points,
                goals_scored: row.goals_scored,
                goal_difference: row.goal_difference,
                cards: row.cards,
            })
        ),
    }));
}

export function mapFootballKnockoutToGame(knockout: FootballKnockoutRow[]): Game {
    if (!knockout) return { name: 'Knockout', rows: [] };
    return {
        name: 'Knockout',
        rows: knockout.map(
            (row): Row => ({
                team: row.team,
                played: row.win + row.loss,
                won: row.win,
                draw: 0,
                loss: row.loss,
                points: row.score,
                goals_scored: 0,
                goal_difference: 0,
                cards: { yellow: 0, red: 0 },
            })
        ),
    };
}

export function mapFootballFinalStagesToGame(stageData: FootballKnockoutRow[]): Game {
  if (!stageData) return { name: 'Final Stages', rows: [] };
  return {
    name: 'Final Stages',
    rows: stageData.map(
      (row): Row => ({
        team: row.team,
        played: row.win + row.loss,
        won: row.win ?? 0,
        draw: 0,
        loss: row.loss,
        points: row.score ?? 0,
        goals_scored: 0,
        goal_difference: 0,
        cards: { yellow: 0, red: 0 },
      })
    ),
  };
}

export function mapFutsalFinalStagesToGame(stageData: FootballKnockoutRow[]): Game {
  if (!stageData) return { name: 'Final Stages', rows: [] };
  return {
    name: 'Final Stages',
    rows: stageData.map(
      (row): Row => ({
        team: row.team,
        played: row.win + row.loss,
        won: row.win ?? 0,
        draw: 0,
        loss: row.loss,
        points: row.score ?? 0,
        goals_scored: 0,
        goal_difference: 0,
        cards: { yellow: 0, red: 0 },
      })
    ),
  };
}

export function mapTableTennisPoolsToGames(pools: Record<string, TableTennisRow[]>): Game[] {
  if (!pools) return [];
  return Object.entries(pools).map(([poolName, rows]) => ({
    name: `Pool ${poolName.split('_')[1].toUpperCase()}`,
    rows: rows.map(
      (row): Row => ({
        team: row.team_name,
        played: row.matches_played,
        won: row.won,
        draw: 0,
        loss: row.loss,
        points: row.points,
        goals_scored: 0,
        goal_difference: 0,
        cards: { yellow: 0, red: 0 },
      })
    ),
  }));
}

export function mapTableTennisKnockoutToGame(knockout: TableTennisKnockoutRow[]): Game {
  if (!knockout) return { name: 'Knockout', rows: [] };
  return {
    name: 'Knockout',
    rows: knockout.map(
      (row): Row => ({
        team: row.team,
        played: row.win + row.loss,
        won: row.win ?? 0,
        draw: 0,
        loss: row.loss,
        points: row.score ?? 0,
        goals_scored: 0,
        goal_difference: 0,
        cards: { yellow: 0, red: 0 },
      })
    ),
  };
}

export function mapTableTennisFinalStagesToGame(stageData: TableTennisKnockoutRow[]): Game {
  if (!stageData) return { name: 'Final Stages', rows: [] };
  return {
    name: 'Final Stages',
    rows: stageData.map(
      (row): Row => ({
        team: row.team,
        played: row.win + row.loss,
        won: row.win ?? 0,
        draw: 0,
        loss: row.loss,
        points: row.score ?? 0,
        goals_scored: 0,
        goal_difference: 0,
        cards: { yellow: 0, red: 0 },
      })
    ),
  };
}

export function mapFutsalToGame(futsal: FutsalRow[]): Game {
    if (!futsal) return { name: 'Arsenal', rows: [] };
    return {
        name: 'Futsal',
        rows: futsal.map(
            (row): Row => ({
                team: row.team_name,
                played: row.played,
                won: row.win,
                draw: row.draw,
                loss: row.loss,
                points: row.points,
                goals_scored: 0,
                goal_difference: 0,
            })
        ),
    };
}
