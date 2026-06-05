import { useState } from 'react';
import { Menu, X } from 'lucide-react';

type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'solutions';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const taglines: Record<Page, string> = {
  home: 'Securing Your Premises. Empowering Your Business.',
  about: 'Smart Security and IT Solutions for a Connected World',
  services: 'Reliable Services. Real Results.',
  products: 'Enterprise Security & IT Products',
  contact: 'Connect with Our IT & Security Specialists',
  solutions: 'Enterprise-Grade Security and IT Solutions',
};

const navLinks: { label: string; page: Page }[] = [
  { label: 'HOME', page: 'home' },
  { label: 'ABOUT US', page: 'about' },
  { label: 'SOLUTIONS', page: 'solutions' },
  { label: 'SERVICES', page: 'services' },
  { label: 'PRODUCTS', page: 'products' },
  { label: 'CONTACT US', page: 'contact' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#030d1f]/95 backdrop-blur-sm border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-3">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center group"
        >
          <img
            src="/logo.png"
            alt="BinaryGuard logo"
            className="h-12 w-auto object-contain"
          />
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`text-xs font-semibold tracking-widest transition-colors duration-200 ${
                currentPage === page
                  ? 'text-cyan-400'
                  : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <p className="hidden lg:block text-gray-300 text-sm font-light italic max-w-xs text-right">
          {taglines[currentPage]}
        </p>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#030d1f] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => { onNavigate(page); setMobileOpen(false); }}
              className={`text-xs font-semibold tracking-widest text-left transition-colors ${
                currentPage === page ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
