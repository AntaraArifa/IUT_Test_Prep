import Mission from '@/components/Mission';
import MeetTheTeam from '@/components/MeetTheTeam';
import CoreValues from '@/components/CoreValues';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative h-[100vh] w-full">
        {/* Background Image with Opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/about.png')",
            opacity: 0.8,
          }}
        />

        {/* Text Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-20">
          <div className="max-w-4xl text-center">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
              Bridging the Gap Between Preparation and Success
            </h1>
            <p className="text-lg lg:text-xl text-white leading-relaxed max-w-3xl mx-auto">
              Exam temperament is just as important as knowledge. 
              IUT TestPrep is designed to simulate the real pressure of admission day.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <Mission />

      {/* Meet The Team Section */}
      <MeetTheTeam />

      {/* Core Values Section */}
      <CoreValues />

    </div>
  );
}
