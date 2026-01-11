import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Lamia Rhydita',
    role: 'UI/UX Designer',
    description: 'Focus on User Experience and designing intuitive and beautiful interfaces. Shapes the visual identity and ensures every interaction is delightful.',
    image: '/rhydita.jpg',
  },
  {
    name: 'Antara Arifa Mullick',
    role: 'Frontend Developer',
    description: 'Crafting seamless user experiences with precision. Responsible for the test engine UI, timer logic, and interactive analytics dashboard.',
    image: '/antara.jpeg',
  },
  {
    name: 'Saadman Sakib',
    role: 'Backend Developer',
    description: 'Building the core infrastructure that powers everything. Handles APIs, database architecture, scoring logic, and AI question generation.',
    image: '/saadman.jpeg',
  },
];

export default function MeetTheTeam() {
  return (
    <div className="bg-[#004B49] py-16 px-4 sm:px-6 lg:px-12"> {/* Reduced padding */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12">
          Meet The Team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-5xl mx-auto"> {/* Increased gap */}
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 max-w-xs mx-auto w-full"
            >
              {/* Team Member Photo with Gradient Border */}
              <div className="flex justify-center mb-6">
                <div
                  className="rounded-full p-1"
                  style={{
                    background: 'linear-gradient(180deg, rgba(41, 94, 93, 1) 0%, rgba(0, 75, 73, 0.5) 100%)',
                  }}
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-white">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Team Member Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-black mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-black font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-sm text-[#004B49] leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
