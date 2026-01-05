import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function Card({ title, description, icon }: CardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-8 hover:shadow-xl hover:bg-white transition-all duration-300 hover:-translate-y-1">
      {icon && (
        <div className="mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-[#004B49] mb-3">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
