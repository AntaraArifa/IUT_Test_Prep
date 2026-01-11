import Image from 'next/image';

export default function Mission() {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Library Image */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <div
              className="rounded-3xl overflow-hidden shadow-xl"
              style={{
                width: '500px',
                height: '350px',
                border: '15px solid rgba(41, 94, 93, 0.8)', 
              }}
            >
              <Image
                src="/library.jpg"
                alt="Library"
                width={500}
                height={350}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Mission Text */}
          <div className="order-1 lg:order-2 max-w-xl">
            <p className="text-xl text-black mb-2 uppercase tracking-wide">Our Mission</p>
            <h2 className="text-4xl font-semibold text-[#004B49] mb-6">
              Why IUT TestPrep Exist?
            </h2>
            <div className="space-y-4 text-black leading-relaxed">
              <p>
                Most students fail not because they don't know the answers, but because they can't 
                manage time under pressure. Traditional study methods don't prepare you for the 
                real exam environment.
              </p>
              <p>
                Our platform provides realistic timer simulations, negative marking logic, and 
                adaptive difficulty to ensure you are battle-ready. Practice like it's the real thing, so the 
                real thing feels like practice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
