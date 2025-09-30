import type { Game } from '../../types/Game';

interface PastGameTableProps {
  game: Game;
}

export default function PastGameTable({ game }: PastGameTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-bold p-4 border-b border-gray-400">{game.name}</h3>
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Team</th>
            <th className="px-4 py-2 text-center font-medium">Pts</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {game.rows.map((row) => (
            <tr key={row.team}>
              <td className="px-4 py-2">{row.team}</td>
              <td className="px-4 py-2 text-center">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
