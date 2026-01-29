interface StudyTipCardProps {
  title: string;
  description: string;
  tips: string[];
}

export default function StudyTipCard({ title, description, tips }: StudyTipCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-[#004B49]">
      {/* Card Header with Gradient */}
      <div className="bg-gradient-to-r from-[#004B49] to-[#006666] p-6">
        <h3 className="text-xl font-bold text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-white/90">{description}</p>
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        <ul className="space-y-3">
          {tips.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3 text-black">
              <span className="text-[#004B49] mt-1 flex-shrink-0 font-bold">•</span>
              <span className="text-sm leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
