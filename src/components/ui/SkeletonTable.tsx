import SkeletonRow from './SkeletonRow';

interface Props {
  headers: string[];
  rows?: number;
}

export default function SkeletonTable({ headers, rows = 5 }: Props) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
          <tr>
            {headers.map(h => (
              <th key={h} className="px-6 py-3 text-left font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Array.from({ length: rows }).map((_, i) => (
            <SkeletonRow key={i} cols={headers.length} delay={i * 80} />
          ))}
        </tbody>
      </table>
    </div>
  );
}