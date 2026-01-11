'use client';

import { usePathname } from 'next/navigation'; 
import Navbar from '@/components/layout/Navbar'; 
import Footer from '@/components/layout/Footer'; 

const ClientSideLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  
  // Check if the current route is an auth page
  const isAuthPage = pathname?.startsWith('/auth');

  return (
    <div>
      {/* Conditionally render Navbar and Footer */}
      {!isAuthPage && <Navbar />}
      
      <main className="flex-grow">{children}</main>

      {!isAuthPage && <Footer />}
    </div>
  );
};

export default ClientSideLayout;
