import { FAQ } from '@/lib/api/faqs';

interface FAQAdminCardProps {
  faq: FAQ;
  onEdit: (faq: FAQ) => void;
  onDelete: (id: string) => void;
}

export default function FAQAdminCard({ faq, onEdit, onDelete }: FAQAdminCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      exam: 'bg-blue-100 text-blue-800',
      account: 'bg-green-100 text-green-800',
      payment: 'bg-purple-100 text-purple-800',
      general: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#004B49] hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(faq.category)}`}>
          {faq.category.toUpperCase()}
        </span>
        <div className="text-xs text-gray-500">
          Updated: {new Date(faq.updatedAt).toLocaleDateString()}
        </div>
      </div>

      {/* Question */}
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        {faq.question}
      </h3>

      {/* Answer */}
      <p className="text-gray-700 mb-4 whitespace-pre-wrap">
        {faq.answer}
      </p>

      {/* Metadata */}
      <div className="text-xs text-gray-500 mb-4">
        <p>Created: {new Date(faq.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(faq)}
          className="flex-1 px-4 py-2 bg-[#004B49] text-white rounded-lg hover:bg-[#003833] transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(faq._id)}
          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
