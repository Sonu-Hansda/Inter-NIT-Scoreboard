import { useSpring } from 'react-spring';

export function useAnimatedNumber(value: number) {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    config: { duration: 1000 },
  });

  return number.to((n) => n.toFixed(0));
}
