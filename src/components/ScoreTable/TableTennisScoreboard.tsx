import { useEffect, useState } from 'react';
import { getTableTennis } from '../../lib/api';
import type { TableTennisRow } from '../../lib/api';
import TableTennisTeamRow from './TableTennisTeamRow';
import SkeletonTable from '../ui/SkeletonTable';

export default function TableTennisScoreboard() {
  const [boysData, setBoysData] = useState<TableTennisRow[]>([]);
  const [girlsData, setGirlsData] = useState<TableTennisRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTableTennis()
      .then((data) => {
        setBoysData(data.tt_boys || []);
        setGirlsData(data.tt_girls || []);
      })
      .catch(() => {
        setBoysData([]);
        setGirlsData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // The mapTableTennisToGame function is no longer needed here as TableTennisTeamRow directly uses TableTennisRow
  // Keeping the original data for direct use with the new component
  const boysGameData = boysData;
  const girlsGameData = girlsData;

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
                {boysGameData.map((row: TableTennisRow, i: number) => (
                  <TableTennisTeamRow key={row.team} row={row} delay={i * 100} />
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
                {girlsGameData.map((row: TableTennisRow, i: number) => (
                  <TableTennisTeamRow key={row.team} row={row} delay={i * 100} />
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
