interface CoreValue {
  title: string;
  description: string;
}

const coreValues: CoreValue[] = [
  {
    title: 'Accuracy',
    description:
      'Every question is carefully curated and verified. We ensure that explanations are clear, correct, and aligned with IUT standards.',
  },
  {
    title: 'Speed',
    description:
      'Time management is critical. Our platform trains you to think fast and answer faster, building the muscle memory needed for success.',
  },
  {
    title: 'Growth',
    description:
      'We track your progress, identify weak areas, and adapt to your learning pace. Every test makes you stronger than before.',
  },
];

export default function CoreValues() {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#004B49] hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-2xl font-semibold text-[#004B49] mb-4 text-center">
                {value.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-center">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
