import { useEffect, useState } from 'react';
import { getFutsalTable } from '../../lib/api';
import type { FootballKnockoutRow, FootballPoolRow } from '../../lib/api';
import TeamRow from './TeamRow';
import type { Game, Row } from '../../types/Game';
import { mapFootballKnockoutToGame, mapFootballPoolsToGames } from '../../lib/mappers';
import PastGameTable from './PastGameTable';
import SkeletonTable from '../ui/SkeletonTable';

export default function FutsalScoreboard() {
  const [pools, setPools] = useState<Record<string, FootballPoolRow[]>>({});
  const [knockout, setKnockout] = useState<FootballKnockoutRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFutsalTable()
      .then((data) => {
        setPools(data.futsal_pool || {});
        setKnockout(data.futsal_knockout || []);
      })
      .catch(() => {
        setPools({});
        setKnockout([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const poolGames = mapFootballPoolsToGames(pools);
  const knockoutGame = mapFootballKnockoutToGame(knockout);
  const hasKnockoutData = knockout && knockout.length > 0;
  const hasPoolData = pools && Object.keys(pools).length > 0;

  if (loading) {
    const koHeaders = ['Team', 'Won', 'Loss', 'Score'];
    const poolHeaders = ['Team', 'Played', 'Won', 'Draw', 'Loss', 'Points', 'GS', 'GD'];
    return (
      <div className="min-h-screen bg-gray-100 text-gray-800 p-6 md:p-10 space-y-10">
        <SkeletonTable headers={koHeaders} rows={4} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
              <SkeletonTable headers={poolHeaders} rows={4} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {hasKnockoutData ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Current Matches - Knockout</h2>
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Team</th>
                  <th className="px-6 py-3 text-center font-medium">Won</th>
                  <th className="px-6 py-3 text-center font-medium">Loss</th>
                  <th className="px-6 py-3 text-center font-medium">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {knockoutGame.rows.map((row: Row, i: number) => (
                  <TeamRow key={row.team} row={row} delay={i * 100} isKnockout={true} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        hasPoolData && (
          <div className="space-y-8">
            {poolGames.map(
              (game) =>
                game.rows.length > 0 && (
                  <div key={game.name}>
                    <h2 className="text-2xl font-bold mb-4 text-blue-900">{game.name}</h2>
                    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                      <table className="w-full text-sm text-gray-700">
                        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
                          <tr>
                            <th className="px-6 py-3 text-left font-medium">Team</th>
                            <th className="px-6 py-3 text-center font-medium">Played</th>
                            <th className="px-6 py-3 text-center font-medium">Won</th>
                            <th className="px-6 py-3 text-center font-medium">Draw</th>
                            <th className="px-6 py-3 text-center font-medium">Loss</th>
                            <th className="px-6 py-3 text-center font-medium">Points</th>
                            <th className="px-6 py-3 text-center font-medium">Goal Score</th>
                            <th className="px-6 py-3 text-center font-medium">Goal Difference</th>
                            <th className="px-6 py-3 text-center font-medium">Cards</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {game.rows.map((row: Row, i: number) => (
                            <TeamRow key={row.team} row={row} delay={i * 100} isKnockout={false} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
            )}
          </div>
        )
      )}

      {hasKnockoutData && hasPoolData && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Pool Standings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poolGames.map(
              (game: Game) =>
                game.rows.length > 0 && <PastGameTable key={game.name} game={game} />
            )}
          </div>
        </div>
      )}

      {!hasKnockoutData && !hasPoolData && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">No match data available at the moment.</p>
        </div>
      )}
    </div>
  );
}
