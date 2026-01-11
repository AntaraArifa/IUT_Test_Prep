interface TabSwitchProps {
  activeTab: 'previous' | 'practice';
  onTabChange: (tab: 'previous' | 'practice') => void;
}

export default function TabSwitch({ activeTab, onTabChange }: TabSwitchProps) {
  return (
    <div className="flex justify-center mb-10">
      <div className="inline-flex rounded-lg border border-gray-200 bg-gray-100 p-1">
        <button
          onClick={() => onTabChange('previous')}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'previous'
              ? 'bg-[#004B49] text-white shadow-sm'
              : 'text-black hover:text-gray-900'
          }`}
        >
          Previous Year Quesbank
        </button>
        <button
          onClick={() => onTabChange('practice')}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'practice'
              ? 'bg-[#004B49] text-white shadow-sm'
              : 'text-black hover:text-gray-900'
          }`}
        >
          Practice Question Bank
        </button>
      </div>
    </div>
  );
}
