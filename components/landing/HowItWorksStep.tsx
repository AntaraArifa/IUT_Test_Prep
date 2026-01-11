interface HowItWorksStepProps {
  step: string;
  title: string;
  description: string;
}

export default function HowItWorksStep({ step, title, description }: HowItWorksStepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-[#004B49] text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">
        {step}
      </div>
      <h3 className="text-xl font-bold text-[#004B49] mb-2">
        {title}
      </h3>
      <p className="text-gray-600 max-w-xs">
        {description}
      </p>
    </div>
  );
}
