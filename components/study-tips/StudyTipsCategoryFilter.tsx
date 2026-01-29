interface Category {
  id: string;
  label: string;
}

interface StudyTipsCategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function StudyTipsCategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: StudyTipsCategoryFilterProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-sm font-semibold text-black mb-4">Browse by Category:</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center ${
              selectedCategory === category.id
                ? 'bg-[#004B49] text-white shadow-lg'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            <span className="text-sm">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
