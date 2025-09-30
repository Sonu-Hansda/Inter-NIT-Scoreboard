import { animated } from 'react-spring';
import { useAnimatedNumber } from '../../hooks/useAnimatedNumber';

interface Props {
  value: number;
}

export default function AnimatedNumber({ value }: Props) {
  const animatedValue = useAnimatedNumber(value);
  return <animated.span>{animatedValue}</animated.span>;
}
