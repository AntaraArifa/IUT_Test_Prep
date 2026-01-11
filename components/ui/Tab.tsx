interface TabProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export default function Tab({ tabs, activeTab, onTabChange }: TabProps) {
  return (
    <div className="flex justify-center mb-8 w-full">
      <div className="flex w-full max-w-[500px]">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => onTabChange(index)}
            className={`flex-1 py-3 font-medium transition-all ${
              index === 0 ? 'rounded-l-full' : 'rounded-r-full'
            } ${
              activeTab === index
                ? 'bg-[#004B49] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
