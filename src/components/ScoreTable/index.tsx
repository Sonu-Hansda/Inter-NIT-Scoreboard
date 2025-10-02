import { useState } from 'react';
import SportPill from './SportPill';
import FootballScoreboard from './FootballScoreboard';
import TableTennisScoreboard from './TableTennisScoreboard';
import FutsalScoreboard from './FutsalScoreboard';
import Teams from './TeamDisplay';
const SPORTS = ['Football', 'Table Tennis', 'Futsal', 'Teams'];

export default function ScoreTable() {
  const [selected, setSelected] = useState(SPORTS[0]);

  const renderScoreboard = () => {
    switch (selected) {
      case 'Football':
        return <FootballScoreboard />;
      case 'Table Tennis':
        return <TableTennisScoreboard />;
      case 'Futsal':
        return <FutsalScoreboard />;
      case 'Teams':
        return <Teams />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6 md:p-10">
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black">
                <span className="text-blue-900 mr-2.5 drop-shadow-[0_2px_2px_rgba(30,58,138,0.5)]">INTER NIT</span>
                <span className="text-white drop-shadow-[0_2px_2px_rgba(30,58,138,0.5)]">
                  Scoreboard
                </span>
              </h1>
              <p className="text-sm text-gray-400">
                Real-time updates · Powered by{' '}
                <a className="underline" href="https://cmdc.in" target="_blank" rel="noreferrer">
                  CMDC
                </a>
              </p>
            </div>
          </div>
          <div className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 gap-2 items-stretch mt-6 md:mt-0">
            {SPORTS.map((sport) => (
              <SportPill
                key={sport}
                label={sport}
                active={sport === selected}
                onClick={() => setSelected(sport)}
              />
            ))}
          </div>
        </div>
        {renderScoreboard()}
      </div>
    </div>
  );
}
