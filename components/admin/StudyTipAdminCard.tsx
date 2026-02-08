import { StudyTip } from '@/lib/api/studyTips';

interface StudyTipAdminCardProps {
  tip: StudyTip;
  onEdit: (tip: StudyTip) => void;
  onDelete: (id: string) => void;
}

export default function StudyTipAdminCard({ tip, onEdit, onDelete }: StudyTipAdminCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      preparation: 'bg-blue-100 text-blue-800',
      subjects: 'bg-purple-100 text-purple-800',
      physics: 'bg-indigo-100 text-indigo-800',
      chemistry: 'bg-green-100 text-green-800',
      math: 'bg-red-100 text-red-800',
      'time-management': 'bg-yellow-100 text-yellow-800',
      'exam-day': 'bg-orange-100 text-orange-800',
      general: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-100 hover:border-[#004B49] transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#004B49] to-[#006666] p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(tip.category)} mb-2`}>
              {tip.category}
            </span>
            <h3 className="text-xl font-bold text-white">{tip.title}</h3>
            <p className="text-gray-100 text-sm mt-1">{tip.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <ul className="space-y-2 mb-4">
          {tip.details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <span className="text-[#004B49] mr-2 font-bold">•</span>
              <span className="text-gray-700">{detail}</span>
            </li>
          ))}
        </ul>

        {/* Metadata */}
        <div className="text-xs text-gray-500 mb-4">
          <p>Created: {new Date(tip.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(tip.updatedAt).toLocaleDateString()}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(tip)}
            className="flex-1 px-4 py-2 bg-[#004B49] text-white rounded-lg hover:bg-[#003833] transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(tip._id)}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
