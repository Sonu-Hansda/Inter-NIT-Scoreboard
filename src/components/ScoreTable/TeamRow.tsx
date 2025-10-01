import { useInView } from 'react-intersection-observer';
import AnimatedNumber from '../ui/AnimatedNumber';
import type { Row } from '../../types/Game';

interface Props {
  row: Row;
  delay: number;
  isKnockout: boolean;
}

export default function TeamRow({ row, delay, isKnockout }: Props) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const spring = {
    transition: 'all 0.5s ease-out',
    transitionDelay: `${delay}ms`,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    opacity: inView ? 1 : 0,
  };

  return (
    <tr ref={ref} style={spring} className="border-b border-white/10 hover:bg-white/5">
      <td className="px-6 py-4 flex items-center gap-3">
        <span className="font-semibold">{row.team}</span>
      </td>
      {!isKnockout && <td className="px-6 py-4 text-center"><AnimatedNumber value={row.played} /></td>}
      <td className="px-6 py-4 text-center"><AnimatedNumber value={row.won} /></td>
      {!isKnockout && <td className="px-6 py-4 text-center"><AnimatedNumber value={row.draw} /></td>}
      <td className="px-6 py-4 text-center"><AnimatedNumber value={row.loss} /></td>
      <td className="px-6 py-4 text-center font-bold"><AnimatedNumber value={row.points} /></td>
      {!isKnockout && <td className="px-6 py-4 text-center"><AnimatedNumber value={row.goals_scored} /></td>}
      {!isKnockout && <td className="px-6 py-4 text-center"><AnimatedNumber value={row.goal_difference} /></td>}
      {!isKnockout && (
        <td className="px-6 py-4 text-center">
          <div className="flex justify-center items-center gap-3">
            {/* YELLOW */}
            <div className="flex items-center gap-1.5">
              <div className="relative w-4 h-6 rounded-sm bg-gradient-to-br from-amber-300 to-amber-500
                    border border-amber-600 shadow-sm transform -rotate-6" />
              <span className="text-xs font-semibold text-amber-700">{row.cards?.yellow ?? 0}</span>
            </div>

            {/* RED */}
            <div className="flex items-center gap-1.5">
              <div className="relative w-4 h-6 rounded-sm bg-gradient-to-br from-red-400 to-red-600
                    border border-red-700 shadow-sm rotate-6" />
              <span className="text-xs font-semibold text-red-700">{row.cards?.red ?? 0}</span>
            </div>
          </div>
        </td>
      )}
    </tr>
  );
}
