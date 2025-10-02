import { useEffect, useState } from 'react';
import { getTableTennisBoys, getTableTennisGirls } from '../../lib/api';
import type { TableTennisRow } from '../../lib/api';
import TeamRow from './TeamRow';
import type { Row } from '../../types/Game';
import { mapTableTennisToGame } from '../../lib/mappers';
import SkeletonTable from '../ui/SkeletonTable';

export default function TableTennisScoreboard() {
  const [boysData, setBoysData] = useState<TableTennisRow[]>([]);
  const [girlsData, setGirlsData] = useState<TableTennisRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getTableTennisBoys(), getTableTennisGirls()])
      .then(([boys, girls]) => {
        setBoysData(boys || []);
        setGirlsData(girls || []);
      })
      .catch(() => {
        setBoysData([]);
        setGirlsData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const boysGame = mapTableTennisToGame(boysData, 'Boys');
  const girlsGame = mapTableTennisToGame(girlsData, 'Girls');

  const hasBoysData = boysData && boysData.length > 0;
  const hasGirlsData = girlsData && girlsData.length > 0;

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
      {hasBoysData && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Boys</h2>
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
                {boysGame.rows.map((row: Row, i: number) => (
                  <TeamRow key={row.team} row={row} delay={i * 100} isKnockout={true} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {hasGirlsData && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Girls</h2>
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
                {girlsGame.rows.map((row: Row, i: number) => (
                  <TeamRow key={row.team} row={row} delay={i * 100} isKnockout={true} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!hasBoysData && !hasGirlsData && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">Game data not available at the moment.</p>
        </div>
      )}
    </div>
  );
}
