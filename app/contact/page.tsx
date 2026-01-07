'use client';

import ContactInfo from '@/components/ContactInfo';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-16">
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
          How Can We Help You?
        </h1>
        
        {/* Contact Info and Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
