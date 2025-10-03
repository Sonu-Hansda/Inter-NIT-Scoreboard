import { useInView } from 'react-intersection-observer';
import AnimatedNumber from '../ui/AnimatedNumber';
import type { Row } from '../../types/Game'; // Import Row type

interface Props {
  row: Row; // Change to Row type
  delay: number;
}

export default function TableTennisTeamRow({ row, delay }: Props) {
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
      <td className="px-6 py-4 text-center"><AnimatedNumber value={row.played} /></td>
      <td className="px-6 py-4 text-center"><AnimatedNumber value={row.won} /></td>
      <td className="px-6 py-4 text-center"><AnimatedNumber value={row.loss} /></td>
      <td className="px-6 py-4 text-center font-bold"><AnimatedNumber value={row.points ?? 0} /></td>
    </tr>
  );
}
