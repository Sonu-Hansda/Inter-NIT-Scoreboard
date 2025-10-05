import type { Game } from '../../types/Game';

interface PastGameTableProps {
  game: Game;
  narrow?: boolean;
  title?: string;
}

export default function PastGameTable({ game, narrow = false, title }: PastGameTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-bold p-4 border-b border-gray-400">{title || game.name}</h3>
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Team</th>
            {narrow ? null : <th className="px-4 py-2 text-center font-medium">Win</th>}
            {narrow ? null : <th className="px-4 py-2 text-center font-medium">Loss</th>}
            <th className="px-4 py-2 text-center font-medium">Score</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {[...game.rows].sort((a, b) => b.points - a.points).map((row) => (
            <tr key={row.team}>
              <td className="px-4 py-2">{row.team}</td>
              {narrow ? null : <td className="px-4 py-2 text-center">{row.won}</td>}
              {narrow ? null : <td className="px-4 py-2 text-center">{row.loss}</td>}
              <td className="px-4 py-2 text-center">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
