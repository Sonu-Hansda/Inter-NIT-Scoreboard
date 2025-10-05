import { useEffect, useState } from 'react';
import { getTableTennisBoys, getTableTennisGirls } from '../../lib/api';
import type { TableTennisRow, TableTennisKnockoutRow } from '../../lib/api';
import TableTennisTeamRow from './TableTennisTeamRow';
import SkeletonTable from '../ui/SkeletonTable';
import PastGameTable from './PastGameTable'; // Reusing PastGameTable for TT pools
import type { Game, Row } from '../../types/Game';
import { mapTableTennisPoolsToGames, mapTableTennisKnockoutToGame } from '../../lib/mappers';

interface TableTennisScoreboardProps {
  viewGender: 'boys' | 'girls';
  setViewGender: (gender: 'boys' | 'girls') => void;
}

const sortTeams = (teams: Row[]): Row[] => {
  return [...teams].sort((a, b) => {
    // Primary sort by points (descending)
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    // Secondary sort by wins (descending)
    if (b.won !== a.won) {
      return b.won - a.won;
    }
    // Tertiary sort by losses (ascending)
    return a.loss - b.loss;
  });
};

export default function TableTennisScoreboard({ viewGender, setViewGender }: TableTennisScoreboardProps) {
  const [boysPoolData, setBoysPoolData] = useState<Record<string, TableTennisRow[]>>({});
  const [boysKnockoutData, setBoysKnockoutData] = useState<TableTennisKnockoutRow[]>([]);
  const [girlsPoolData, setGirlsPoolData] = useState<Record<string, TableTennisRow[]>>({});
  const [girlsKnockoutData, setGirlsKnockoutData] = useState<TableTennisKnockoutRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getTableTennisBoys(), getTableTennisGirls()])
      .then(([boysData, girlsData]) => {
        setBoysPoolData(boysData.tt_boys_pool || {});
        setBoysKnockoutData(boysData.tt_boys_knockout || []);
        setGirlsPoolData(girlsData.tt_girls_pool || {});
        setGirlsKnockoutData(girlsData.tt_girls_knockout || []);
      })
      .catch((error) => {
        console.error("Failed to fetch table tennis data:", error);
        setBoysPoolData({});
        setBoysKnockoutData([]);
        setGirlsPoolData({});
        setGirlsKnockoutData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const currentPoolData = viewGender === 'boys' ? boysPoolData : girlsPoolData;
  const currentKnockoutData = viewGender === 'boys' ? boysKnockoutData : girlsKnockoutData;

  const poolGames: Game[] = mapTableTennisPoolsToGames(currentPoolData);
  const knockoutGame: Game = mapTableTennisKnockoutToGame(currentKnockoutData);

  const hasPoolData = poolGames.length > 0;
  const hasKnockoutData = knockoutGame.rows.length > 0;


  if (loading) {
    const headers = ['Team', 'Played', 'Won', 'Loss', 'Points'];
    return (
      <div className="space-y-10">
        <div className="space-y-2">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          <SkeletonTable headers={headers} rows={4} />
        </div>
        <div className="space-y-2">
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          <SkeletonTable headers={headers} rows={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className={`py-2 px-4 text-sm font-medium rounded-l-lg ${
              viewGender === 'boys'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
            }`}
            onClick={() => setViewGender('boys')}
          >
            Boys
          </button>
          <button
            type="button"
            className={`py-2 px-4 text-sm font-medium rounded-r-lg ${
              viewGender === 'girls'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
            }`}
            onClick={() => setViewGender('girls')}
          >
            Girls
          </button>
        </div>
      </div>

      {hasKnockoutData ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Knockout Stage - {viewGender === 'boys' ? 'Boys' : 'Girls'}</h2>
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Team</th>
                  <th className="px-6 py-3 text-center font-medium">Win</th>
                  <th className="px-6 py-3 text-center font-medium">Loss</th>
                  <th className="px-6 py-3 text-center font-medium">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {knockoutGame.rows.map((row, i: number) => (
                  <tr key={row.team} className="hover:bg-gray-50 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{row.team}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">{row.won}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">{row.loss}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : hasPoolData ? (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Pool Stage - {viewGender === 'boys' ? 'Boys' : 'Girls'}</h2>
          {poolGames.map((game) => (
            game.rows.length > 0 && (
              <div key={game.name}>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{game.name}</h3>
                <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                  <table className="w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
                      <tr>
                        <th className="px-6 py-3 text-left font-medium">Team</th>
                        <th className="px-6 py-3 text-center font-medium">Played</th>
                        <th className="px-6 py-3 text-center font-medium">Won</th>
                        <th className="px-6 py-3 text-center font-medium">Loss</th>
                        <th className="px-6 py-3 text-center font-medium">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sortTeams(game.rows).map((row, i: number) => (
                        <TableTennisTeamRow key={row.team} row={row} delay={i * 100} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">No match data available at the moment for {viewGender === 'boys' ? 'Boys' : 'Girls'}.</p>
        </div>
      )}

      {hasKnockoutData && hasPoolData && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Pool Standings - {viewGender === 'boys' ? 'Boys' : 'Girls'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poolGames.map(
              (game: Game) =>
                game.rows.length > 0 && <PastGameTable key={game.name} game={game} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
