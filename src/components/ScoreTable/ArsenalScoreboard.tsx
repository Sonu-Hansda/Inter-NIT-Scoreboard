import { useEffect, useState } from 'react';
import { getArsenalTable } from '../../lib/api';
import type { ArsenalRow } from '../../lib/api';
import TeamRow from './TeamRow';
import type { Row } from '../../types/Game';
import { mapArsenalToGame } from '../../lib/mappers';
import SkeletonTable from '../ui/SkeletonTable';

export default function ArsenalScoreboard() {
  const [table, setTable] = useState<ArsenalRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getArsenalTable()
      .then((data) => {
        setTable(data || []);
      })
      .catch(() => {
        setTable([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const game = mapArsenalToGame(table);
  const hasData = table && table.length > 0;

  if (loading) {
    const headers = ['Team', 'Played', 'Won', 'Draw', 'Loss', 'Points'];
    return (
      <div className="space-y-10">
        <SkeletonTable headers={headers} rows={10} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {hasData ? (
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {game.rows.map((row: Row, i: number) => (
                <TeamRow key={row.team} row={row} delay={i * 100} isKnockout={false} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">Game data not available at the moment.</p>
        </div>
      )}
    </div>
  );
}
