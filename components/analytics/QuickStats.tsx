interface QuickStatsProps {
  accuracy: number;
  avgSpeed: string;
}

export default function QuickStats({ accuracy, avgSpeed }: QuickStatsProps) {
  return (
    <div className="bg-[#004B49] rounded-xl p-6">
      <h2 className="text-white text-lg font-semibold mb-4">Quick Stats</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4">
          <p className="text-gray-600 text-sm mb-1">Accuracy</p>
          <p className="text-2xl font-bold text-gray-900">{accuracy}%</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-gray-600 text-sm mb-1">Avg Speed</p>
          <p className="text-2xl font-bold text-gray-900">{avgSpeed}</p>
        </div>
      </div>
    </div>
  );
}
