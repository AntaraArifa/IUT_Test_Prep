interface InsightCard {
  type: 'critical' | 'warning' | 'on-track';
  title: string;
  message: string;
}

interface AICoachInsightsProps {
  insights: InsightCard[];
}

export default function AICoachInsights({ insights }: AICoachInsightsProps) {
  const getCardStyle = (type: 'critical' | 'warning' | 'on-track') => {
    if (type === 'critical') {
      return 'bg-red-100 border-red-200';
    }
    if (type === 'warning') {
      return 'bg-yellow-100 border-yellow-200';
    }
    return 'bg-green-100 border-green-200';
  };

  const getBadgeStyle = (type: 'critical' | 'warning' | 'on-track') => {
    if (type === 'critical') {
      return 'bg-red-200 text-red-800';
    }
    if (type === 'warning') {
      return 'bg-yellow-200 text-yellow-800';
    }
    return 'bg-green-200 text-green-800';
  };

  return (
    <div className="bg-[#004B49] rounded-xl p-6">
      <h2 className="text-white text-lg font-semibold mb-4">AI Coach Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`rounded-lg border-2 p-4 ${getCardStyle(insight.type)}`}
          >
            <div className="mb-3">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${getBadgeStyle(
                  insight.type
                )}`}
              >
                {insight.type === 'critical' ? 'Critical' : insight.type === 'warning' ? 'Warning' : 'On Track'}
              </span>
            </div>
            <p className="text-gray-800 text-sm mb-3">{insight.message}</p>
            <button className="text-[#004B49] text-sm font-semibold hover:underline flex items-center gap-1">
              Practice Now
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
