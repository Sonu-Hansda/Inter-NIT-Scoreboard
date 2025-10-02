interface Props {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function SportPill({ label, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 text-gray-800 font-semibold rounded-md transition-all duration-300
                  transform hover:scale-110 whitespace-nowrap ${active ? 'bg-blue-900 text-white' : 'bg-white'}`}
      style={{ transform: 'skew(-20deg)' }}
    >
      <span style={{ transform: 'skew(20deg)', display: 'inline-block' }}>{label}</span>
    </button>
  );
}
