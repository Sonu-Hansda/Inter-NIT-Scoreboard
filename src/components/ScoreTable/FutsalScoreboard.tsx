import { useEffect, useState } from 'react';
import { getFutsalTable, getFutsalFinalStages } from '../../lib/api';
import type { FootballKnockoutRow, FootballPoolRow, FutsalFinalStagesData } from '../../lib/api';
import TeamRow from './TeamRow';
import type { Game, Row } from '../../types/Game';
import { mapFootballKnockoutToGame, mapFootballPoolsToGames, mapFutsalFinalStagesToGame } from '../../lib/mappers';
import PastGameTable from './PastGameTable';
import SkeletonTable from '../ui/SkeletonTable';

export default function FutsalScoreboard() {
  const [pools, setPools] = useState<Record<string, FootballPoolRow[]>>({});
  const [knockout, setKnockout] = useState<FootballKnockoutRow[]>([]);
  const [futsalFinalStagesData, setFutsalFinalStagesData] = useState<FutsalFinalStagesData | null>(null);
  const [loading, setLoading] = useState(true);

  const sortTeams = (teams: Row[]): Row[] => {
    return [...teams].sort((a, b) => {
      // Primary sort by points (descending)
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      // Secondary sort by goal difference (descending)
      if (b.goal_difference !== a.goal_difference) {
        return b.goal_difference - a.goal_difference;
      }
      // Tertiary sort by wins (descending)
      return b.won - a.won;
    });
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([getFutsalTable(), getFutsalFinalStages()])
      .then(([futsalData, finalStagesData]) => {
        setPools(futsalData.futsal_pool || {});
        setKnockout(futsalData.futsal_knockout || []);
        setFutsalFinalStagesData(finalStagesData);
      })
      .catch((error) => {
        console.error("Failed to fetch futsal data:", error);
        setPools({});
        setKnockout([]);
        setFutsalFinalStagesData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const poolGames = mapFootballPoolsToGames(pools);
  const knockoutGame = mapFootballKnockoutToGame(knockout);

  const finalGame = mapFutsalFinalStagesToGame(futsalFinalStagesData?.futsal_final || []);
  const bronzeGame = mapFutsalFinalStagesToGame(futsalFinalStagesData?.futsal_bronze || []);
  const semiGame = mapFutsalFinalStagesToGame(futsalFinalStagesData?.futsal_semi || []);
  const quarterGame = mapFutsalFinalStagesToGame(futsalFinalStagesData?.futsal_quarter || []);

  const hasKnockoutData = knockout && knockout.length > 0;
  const hasPoolData = pools && Object.keys(pools).length > 0;
  const hasFinalData = finalGame.rows.length > 0;
  const hasBronzeData = bronzeGame.rows.length > 0;
  const hasSemiData = semiGame.rows.length > 0;
  const hasQuarterData = quarterGame.rows.length > 0;

  const renderKnockoutTable = (game: Game, title: string) => (
    <>
      <h2 className="text-2xl font-bold mb-4 text-blue-900">{title}</h2>
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
            {game.rows.map((row: Row, i: number) => (
              <TeamRow key={row.team} row={row} delay={i * 100} isKnockout={true} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

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
      {hasFinalData ? (
        renderKnockoutTable(finalGame, 'Final')
      ) : hasBronzeData ? (
        renderKnockoutTable(bronzeGame, 'Bronze Match')
      ) : hasSemiData ? (
        renderKnockoutTable(semiGame, 'Semi Final')
      ) : hasQuarterData ? (
        renderKnockoutTable(quarterGame, 'Quarter Final')
      ) : hasKnockoutData ? (
        renderKnockoutTable(knockoutGame, 'Knockout')
      ) : hasPoolData ? (
        <div className="space-y-8">
          {poolGames.map((game) => (
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
                      {sortTeams(game.rows).map((row: Row, i: number) => (
                        <TeamRow key={row.team} row={row} delay={i * 100} isKnockout={false} />
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
          <p className="text-lg text-gray-500">No match data available at the moment.</p>
        </div>
      )}

      {/* Display previous stages as smaller tables */}
      {hasFinalData && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Past Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasBronzeData && <PastGameTable key="bronze" game={bronzeGame} narrow={true} title="Bronze Match" />}
            {hasSemiData && <PastGameTable key="semi" game={semiGame} narrow={true} title="Semi Final" />}
            {hasQuarterData && <PastGameTable key="quarter" game={quarterGame} narrow={true} title="Quarter Final" />}
            {hasKnockoutData && <PastGameTable key="knockout" game={knockoutGame} narrow={true} title="Knockout" />}
            {hasPoolData && poolGames.map((game: Game) => game.rows.length > 0 && <PastGameTable key={game.name} game={game} narrow={true} title={`Pool ${game.name.split(' ')[1]}`} />)}
          </div>
        </div>
      )}

      {hasBronzeData && !hasFinalData && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Past Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasSemiData && <PastGameTable key="semi" game={semiGame} narrow={true} title="Semi Final" />}
            {hasQuarterData && <PastGameTable key="quarter" game={quarterGame} narrow={true} title="Quarter Final" />}
            {hasKnockoutData && <PastGameTable key="knockout" game={knockoutGame} narrow={true} title="Knockout" />}
            {hasPoolData && poolGames.map((game: Game) => game.rows.length > 0 && <PastGameTable key={game.name} game={game} narrow={true} title={`Pool ${game.name.split(' ')[1]}`} />)}
          </div>
        </div>
      )}

      {hasSemiData && !hasFinalData && !hasBronzeData && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Past Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasQuarterData && <PastGameTable key="quarter" game={quarterGame} narrow={true} title="Quarter Final" />}
            {hasKnockoutData && <PastGameTable key="knockout" game={knockoutGame} narrow={true} title="Knockout" />}
            {hasPoolData && poolGames.map((game: Game) => game.rows.length > 0 && <PastGameTable key={game.name} game={game} narrow={true} title={`Pool ${game.name.split(' ')[1]}`} />)}
          </div>
        </div>
      )}

      {hasQuarterData && !hasFinalData && !hasBronzeData && !hasSemiData && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Past Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasKnockoutData && <PastGameTable key="knockout" game={knockoutGame} narrow={true} title="Knockout" />}
            {hasPoolData && poolGames.map((game: Game) => game.rows.length > 0 && <PastGameTable key={game.name} game={game} narrow={true} title={`Pool ${game.name.split(' ')[1]}`} />)}
          </div>
        </div>
      )}

      {hasKnockoutData && !hasFinalData && !hasBronzeData && !hasSemiData && !hasQuarterData && hasPoolData && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Pool Standings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poolGames.map(
              (game: Game) =>
                game.rows.length > 0 && <PastGameTable key={game.name} game={game} narrow={true} title={`Pool ${game.name.split(' ')[1]}`} />
            )}
          </div>
        </div>
      )}

      {!hasFinalData && !hasBronzeData && !hasSemiData && !hasQuarterData && !hasKnockoutData && hasPoolData && (
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
    </div>
  );
}
