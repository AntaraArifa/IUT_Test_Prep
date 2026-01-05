import Link from 'next/link';
import Button from './ui/Button';

export default function Hero() {
  return (
    <section className="bg-[#004B49] text-white pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-16 lg:pt-24">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Ace Your IUT Admission Test
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              Master your preparation with realistic mock tests, instant feedback, and AI-powered insights. 
              Join thousands of students who trust IUT MockHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/sign-up">
                <button className="px-4 py-2 bg-[#003333] text-white border-2 border-white rounded-md font-medium transition-all hover:bg-white hover:text-[#003333] w-full sm:w-auto">
                  Start Learning
                </button>
              </Link>
              <Link href="/#see-it-in-action">
                <Button variant="secondary" className="w-full sm:w-auto !px-4 !py-2">
                  See It in Action
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Placeholder for Image - Extended */}
          <div className="hidden lg:block relative">
            <div className="bg-gray-200 rounded-3xl h-[500px] flex items-center justify-center">
              <div className="text-center">
                <svg 
                  className="w-24 h-24 mx-auto mb-4 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                <p className="text-gray-500 text-sm">Hero Image Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
