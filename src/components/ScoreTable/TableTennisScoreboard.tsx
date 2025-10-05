import { useEffect, useState } from 'react';
import { getTableTennisBoys, getTableTennisGirls, getTableTennisBoysFinalStages, getTableTennisGirlsFinalStages } from '../../lib/api';
import type { TableTennisRow, TableTennisKnockoutRow, TableTennisFinalStagesData } from '../../lib/api';
import TableTennisTeamRow from './TableTennisTeamRow';
import SkeletonTable from '../ui/SkeletonTable';
import PastGameTable from './PastGameTable';
import type { Game, Row } from '../../types/Game';
import { mapTableTennisPoolsToGames, mapTableTennisKnockoutToGame, mapTableTennisFinalStagesToGame } from '../../lib/mappers';

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
  const [boysFinalStagesData, setBoysFinalStagesData] = useState<TableTennisFinalStagesData | null>(null);
  const [girlsPoolData, setGirlsPoolData] = useState<Record<string, TableTennisRow[]>>({});
  const [girlsKnockoutData, setGirlsKnockoutData] = useState<TableTennisKnockoutRow[]>([]);
  const [girlsFinalStagesData, setGirlsFinalStagesData] = useState<TableTennisFinalStagesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getTableTennisBoys(), getTableTennisGirls(), getTableTennisBoysFinalStages(), getTableTennisGirlsFinalStages()])
      .then(([boysData, girlsData, boysFinalStagesData, girlsFinalStagesData]) => {
        setBoysPoolData(boysData.tt_boys_pool || {});
        setBoysKnockoutData(boysData.tt_boys_knockout || []);
        setGirlsPoolData(girlsData.tt_girls_pool || {});
        setGirlsKnockoutData(girlsData.tt_girls_knockout || []);
        setBoysFinalStagesData(boysFinalStagesData);
        setGirlsFinalStagesData(girlsFinalStagesData);
      })
      .catch((error) => {
        console.error("Failed to fetch table tennis data:", error);
        setBoysPoolData({});
        setBoysKnockoutData([]);
        setGirlsPoolData({});
        setGirlsKnockoutData([]);
        setBoysFinalStagesData(null);
        setGirlsFinalStagesData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const currentPoolData = viewGender === 'boys' ? boysPoolData : girlsPoolData;
  const currentKnockoutData = viewGender === 'boys' ? boysKnockoutData : girlsKnockoutData;

  const poolGames: Game[] = mapTableTennisPoolsToGames(currentPoolData);
  const knockoutGame: Game = mapTableTennisKnockoutToGame(currentKnockoutData);

  const finalGameBoys: Game = mapTableTennisFinalStagesToGame(boysFinalStagesData?.tt_boys_final || []);
  const bronzeGameBoys: Game = mapTableTennisFinalStagesToGame(boysFinalStagesData?.tt_boys_bronze || []);
  const semiGameBoys: Game = mapTableTennisFinalStagesToGame(boysFinalStagesData?.tt_boys_semi || []);
  const quarterGameBoys: Game = mapTableTennisFinalStagesToGame(boysFinalStagesData?.tt_boys_quarter || []);

  const finalGameGirls: Game = mapTableTennisFinalStagesToGame(girlsFinalStagesData?.tt_girls_final || []);
  const bronzeGameGirls: Game = mapTableTennisFinalStagesToGame(girlsFinalStagesData?.tt_girls_bronze || []);
  const semiGameGirls: Game = mapTableTennisFinalStagesToGame(girlsFinalStagesData?.tt_girls_semi || []);
  const quarterGameGirls: Game = mapTableTennisFinalStagesToGame(girlsFinalStagesData?.tt_girls_quarter || []);

  const hasPoolData = poolGames.length > 0;
  const hasKnockoutData = knockoutGame.rows.length > 0;
  const hasFinalDataBoys = finalGameBoys.rows.length > 0;
  const hasBronzeDataBoys = bronzeGameBoys.rows.length > 0;
  const hasSemiDataBoys = semiGameBoys.rows.length > 0;
  const hasQuarterDataBoys = quarterGameBoys.rows.length > 0;

  const hasFinalDataGirls = finalGameGirls.rows.length > 0;
  const hasBronzeDataGirls = bronzeGameGirls.rows.length > 0;
  const hasSemiDataGirls = semiGameGirls.rows.length > 0;
  const hasQuarterDataGirls = quarterGameGirls.rows.length > 0;

  const renderKnockoutTable = (game: Game, title: string, gender: 'boys' | 'girls') => (
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
            {game.rows.map((row, i: number) => (
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
  );


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
            className={`py-2 px-4 text-sm font-medium rounded-l-lg ${viewGender === 'boys'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
              }`}
            onClick={() => setViewGender('boys')}
          >
            Boys
          </button>
          <button
            type="button"
            className={`py-2 px-4 text-sm font-medium rounded-r-lg ${viewGender === 'girls'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
              }`}
            onClick={() => setViewGender('girls')}
          >
            Girls
          </button>
        </div>
      </div>

      {viewGender === 'boys' && hasFinalDataBoys ? (
        renderKnockoutTable(finalGameBoys, 'Final', 'boys')
      ) : viewGender === 'boys' && hasBronzeDataBoys ? (
        renderKnockoutTable(bronzeGameBoys, 'Bronze Match', 'boys')
      ) : viewGender === 'boys' && hasSemiDataBoys ? (
        renderKnockoutTable(semiGameBoys, 'Semi Final', 'boys')
      ) : viewGender === 'boys' && hasQuarterDataBoys ? (
        renderKnockoutTable(quarterGameBoys, 'Quarter Final', 'boys')
      ) : viewGender === 'girls' && hasFinalDataGirls ? (
        renderKnockoutTable(finalGameGirls, 'Final', 'girls')
      ) : viewGender === 'girls' && hasBronzeDataGirls ? (
        renderKnockoutTable(bronzeGameGirls, 'Bronze Match', 'girls')
      ) : viewGender === 'girls' && hasSemiDataGirls ? (
        renderKnockoutTable(semiGameGirls, 'Semi Final', 'girls')
      ) : viewGender === 'girls' && hasQuarterDataGirls ? (
        renderKnockoutTable(quarterGameGirls, 'Quarter Final', 'girls')
      ) : hasKnockoutData ? (
        renderKnockoutTable(knockoutGame, `Knockout`, viewGender)
      ) : hasPoolData ? (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Pool - {viewGender === 'boys' ? 'Boys' : 'Girls'}</h2>
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

      {/* Display previous stages as smaller tables for boys */}
      {viewGender === 'boys' && hasFinalDataBoys && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Past Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasBronzeDataBoys && <PastGameTable key="bronzeBoys" game={bronzeGameBoys} narrow={true} title="Bronze Match" />}
            {hasSemiDataBoys && <PastGameTable key="semiBoys" game={semiGameBoys} narrow={true} title="Semi Final" />}
            {hasQuarterDataBoys && <PastGameTable key="quarterBoys" game={quarterGameBoys} narrow={true} title="Quarter Final" />}
            {hasKnockoutData && <PastGameTable key="knockoutBoys" game={knockoutGame} narrow={true} title="Knockout" />}
            {hasPoolData && poolGames.map((game: Game) => game.rows.length > 0 && <PastGameTable key={game.name} game={game} narrow={true} title={`Pool ${game.name.split(' ')[1]}`} />)}
          </div>
        </div>
      )}

      {viewGender === 'boys' && hasBronzeDataBoys && !hasFinalDataBoys && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Past Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasSemiDataBoys && <PastGameTable key="semiBoys" game={semiGameBoys} narrow={true} title="Semi Final" />}
            {hasQuarterDataBoys && <PastGameTable key="quarterBoys" game={quarterGameBoys} narrow={true} title="Quarter Final" />}
            {hasKnockoutData && <PastGameTable key="knockoutBoys" game={knockoutGame} narrow={true} title="Knockout" />}
            {hasPoolData && poolGames.map((game: Game) => game.rows.length > 0 && <PastGameTable key={game.name} game={game} narrow={true} title={`Pool ${game.name.split(' ')[1]}`} />)}
          </div>
        </div>
      )}

      {viewGender === 'boys' && hasSemiDataBoys && !hasFinalDataBoys && !hasBronzeDataBoys && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Past Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasQuarterDataBoys && <PastGameTable key="quarterBoys" game={quarterGameBoys} narrow={true} title="Quarter Final" />}
            {hasKnockoutData && <PastGameTable key="knockoutBoys" game={knockoutGame} narrow={true} title="Knockout" />}
            {hasPoolData && poolGames.map((game: Game) => game.rows.length > 0 && <PastGameTable key={game.name} game={game} narrow={true} title={`Pool ${game.name.split(' ')[1]}`} />)}
          </div>
        </div>
      )}

      {viewGender === 'boys' && hasQuarterDataBoys && !hasFinalDataBoys && !hasBronzeDataBoys && !hasSemiDataBoys && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Past Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasKnockoutData && <PastGameTable key="knockoutBoys" game={knockoutGame} narrow={true} title="Knockout" />}
            {hasPoolData && poolGames.map((game: Game) => game.rows.length > 0 && <PastGameTable key={game.name} game={game} narrow={true} title={`Pool ${game.name.split(' ')[1]}`} />)}
          </div>
        </div>
      )}

      {viewGender === 'boys' && hasKnockoutData && !hasFinalDataBoys && !hasBronzeDataBoys && !hasSemiDataBoys && !hasQuarterDataBoys && hasPoolData && (
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

      {/* Display previous stages as smaller tables for girls */}
      {viewGender === 'girls' && hasFinalDataGirls && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Past Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasBronzeDataGirls && <PastGameTable key="bronzeGirls" game={bronzeGameGirls} narrow={true} title="Bronze Match" />}
            {hasSemiDataGirls && <PastGameTable key="semiGirls" game={semiGameGirls} narrow={true} title="Semi Final" />}
            {hasQuarterDataGirls && <PastGameTable key="quarterGirls" game={quarterGameGirls} narrow={true} title="Quarter Final" />}
            {hasKnockoutData && <PastGameTable key="knockoutGirls" game={knockoutGame} narrow={true} title="Knockout" />}
            {hasPoolData && poolGames.map((game: Game) => game.rows.length > 0 && <PastGameTable key={game.name} game={game} narrow={true} title={`Pool ${game.name.split(' ')[1]}`} />)}
          </div>
        </div>
      )}

      {viewGender === 'girls' && hasBronzeDataGirls && !hasFinalDataGirls && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Past Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasSemiDataGirls && <PastGameTable key="semiGirls" game={semiGameGirls} narrow={true} title="Semi Final" />}
            {hasQuarterDataGirls && <PastGameTable key="quarterGirls" game={quarterGameGirls} narrow={true} title="Quarter Final" />}
            {hasKnockoutData && <PastGameTable key="knockoutGirls" game={knockoutGame} narrow={true} title="Knockout" />}
            {hasPoolData && poolGames.map((game: Game) => game.rows.length > 0 && <PastGameTable key={game.name} game={game} narrow={true} title={`Pool ${game.name.split(' ')[1]}`} />)}
          </div>
        </div>
      )}

      {viewGender === 'girls' && hasSemiDataGirls && !hasFinalDataGirls && !hasBronzeDataGirls && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Past Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasQuarterDataGirls && <PastGameTable key="quarterGirls" game={quarterGameGirls} narrow={true} title="Quarter Final" />}
            {hasKnockoutData && <PastGameTable key="knockoutGirls" game={knockoutGame} narrow={true} title="Knockout" />}
            {hasPoolData && poolGames.map((game: Game) => game.rows.length > 0 && <PastGameTable key={game.name} game={game} narrow={true} title={`Pool ${game.name.split(' ')[1]}`} />)}
          </div>
        </div>
      )}

      {viewGender === 'girls' && hasQuarterDataGirls && !hasFinalDataGirls && !hasBronzeDataGirls && !hasSemiDataGirls && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Past Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hasKnockoutData && <PastGameTable key="knockoutGirls" game={knockoutGame} narrow={true} title="Knockout" />}
            {hasPoolData && poolGames.map((game: Game) => game.rows.length > 0 && <PastGameTable key={game.name} game={game} narrow={true} title={`Pool ${game.name.split(' ')[1]}`} />)}
          </div>
        </div>
      )}

      {viewGender === 'girls' && hasKnockoutData && !hasFinalDataGirls && !hasBronzeDataGirls && !hasSemiDataGirls && !hasQuarterDataGirls && hasPoolData && (
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

      {viewGender === 'girls' && !hasFinalDataGirls && !hasBronzeDataGirls && !hasSemiDataGirls && !hasQuarterDataGirls && !hasKnockoutData && hasPoolData && (
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
