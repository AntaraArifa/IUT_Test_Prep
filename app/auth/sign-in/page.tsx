import Link from 'next/link';
import SignInForm from '@/components/auth/SignInForm';

export default function SignInPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Auth_image.png')",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-end px-4 sm:px-6 lg:px-20">
        <div className="w-full max-w-md lg:mr-12">
          <SignInForm />
        </div>
      </div>

      {/* Footer - Bottom Left */}
      <div className="absolute bottom-0 left-0 z-20">
        <div 
          className="px-8 py-6 rounded-2xl backdrop-blur-sm"
          style={{
            background: 'linear-gradient(180deg, rgba(217,217,217,0.7) 0%, rgba(172,172,172,0.61) 70%, rgba(115,115,115,0.5) 100%)'
          }}
        >
          <p className="text-sm text-white text-center">
            Don't have an account?{' '}
            <Link
              href="/auth/sign-up"
              className="font-bold text-[#004B49] hover:text-[#003333] underline block mt-1 text-lg"
            >
              Sign Up↩
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
