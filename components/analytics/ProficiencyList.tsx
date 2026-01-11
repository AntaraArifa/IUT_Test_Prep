interface ProficiencyItem {
  name: string;
  score: number;
}

interface ProficiencyListProps {
  title: string;
  items: ProficiencyItem[];
}

export default function ProficiencyList({ title, items }: ProficiencyListProps) {
  const getColorDot = (score: number) => {
    if (score < 50) return 'bg-red-500';
    if (score < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <h2 className="text-gray-900 text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getColorDot(item.score)}`}></div>
              <span className="text-gray-800 font-medium">{item.name}</span>
            </div>
            <span className="text-gray-900 font-semibold">{item.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
