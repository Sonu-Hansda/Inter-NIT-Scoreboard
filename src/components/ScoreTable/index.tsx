import { useState } from 'react';
import SportPill from './SportPill';
import TeamRow from './TeamRow';
import { DUMMY_GAMES, PAST_GAMES } from './TableData';
import PastGameTable from './PastGameTable';

export default function ScoreTable() {
  const [selected, setSelected] = useState(DUMMY_GAMES[0].name);
  const current = DUMMY_GAMES.find(g => g.name === selected)!;
  const pastGames = PAST_GAMES;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6 md:p-10">
      <div className="max-w-6xl mx-auto animate-fade-in">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black">
                <span className="text-blue-900 mr-2.5">INTER NIT</span>
                <span className="text-transparent bg-clip-text 
                   [-webkit-text-stroke:2px_#1e3a8a]">
                  Scoreboard
                </span>
              </h1>
              <p className="text-sm text-gray-400">Real-time updates · Powered by <a className='underline' href='https://cmdc.in' target='_blank'>CMDC</a></p>
            </div>
          </div>

          <div className="flex gap-2 items-center justify-center mt-6 mx-auto md:mx-0 md:mt-0">
            {DUMMY_GAMES.map((game) => (
              <SportPill
                key={game.name}
                label={game.name}
                active={game.name === selected}
                onClick={() => setSelected(game.name)}
              />
            ))}
          </div>
          
        </div>
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Current Matches - Knockout</h2>
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
              {current.rows.map((row, i) => (
                <TeamRow key={row.team} row={row} delay={i * 100} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Past Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastGames.map((game) => (
              <PastGameTable key={game.name} game={game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
