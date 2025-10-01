interface Props {
  cols: number;
  delay?: number;
}

export default function SkeletonRow({ cols, delay = 0 }: Props) {
  return (
    <tr style={{ animationDelay: `${delay}ms` }} className="animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-gray-200 rounded" />
        </td>
      ))}
    </tr>
  );
}