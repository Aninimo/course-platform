import { ReactNode, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { Sidebar } from '../components/sidebar'

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className='min-h-screen h-full'>
      <div className='h-[80px] md:pl-56 absolute inset-y-0 z-50 pt-8'>
        <button
          className='md:hidden pl-4'
          onClick={toggleMobileMenu}
        >
          <Menu />
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className='md:hidden w-52 fixed inset-y-0 z-50 bg-slate-900 text-white p-4 pt-8'>
          <X
            onClick={closeMobileMenu}
            className='mb-4'
          />
          <div className='flex flex-col justify-center items-center'>
            <Sidebar />
          </div>
        </div>
      )}
      <div className='hidden md:flex items-center h-full w-48 flex-col fixed inset-y-0 z-50 bg-slate-900 text-white pt-8'>
        <Sidebar />
      </div>
      <main className='md:pl-60 w-full h-full mx-auto'>
        {children}
      </main>
    </div>
  );
}
