interface ReadinessScoreProps {
  score: number; // 0–100
}

export default function ReadinessScore({ score }: ReadinessScoreProps) {
  // Correct angle calculation
  const angle = -180 + (score / 100) * 180;
  const rad = (angle * Math.PI) / 180;

  return (
    <div className="bg-[#004B49] rounded-xl p-6">
      <h2 className="text-white text-lg font-semibold mb-6">
        Readiness Score
      </h2>

      <div className="flex flex-col items-center">
        <div className="relative w-64 h-32 mb-4">
          <svg viewBox="0 0 200 120" className="w-full h-full">
            {/* Gradient */}
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="50%" stopColor="#FACC15" />
                <stop offset="100%" stopColor="#4ADE80" />
              </linearGradient>
            </defs>

            {/* Gradient arc */}
            <path
              d="M 15 105 A 90 90 0 0 1 185 105"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="22"
              strokeLinecap="butt"
            />

            {/* Needle */}
            <line
              x1="100"
              y1="105"
              x2={100 + 75 * Math.cos(rad)}
              y2={105 + 75 * Math.sin(rad)}
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Center dot */}
            <circle cx="100" cy="105" r="6" fill="white" />
          </svg>
        </div>

        {/* Score */}
        <div className="text-4xl font-bold text-white">
          {score}%
        </div>
      </div>
    </div>
  );
}
