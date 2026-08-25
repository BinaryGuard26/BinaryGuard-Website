import { useState } from 'react';
import { Menu, X, UserRound } from 'lucide-react';

export type NavbarPage =
  | 'home'
  | 'about'
  | 'services'
  | 'contact'
  | 'solutions';

interface NavbarProps {
  currentPage: NavbarPage;
  onNavigate: (page: NavbarPage) => void;
}

const taglines: Record<NavbarPage, string> = {
  home: 'Securing Your Premises. Empowering Your Business.',
  about: 'Smart Security and IT Solutions for a Connected World',
  services: 'Reliable Services. Real Results.',
  contact: 'Connect with Our IT & Security Specialists',
  solutions: 'Enterprise-Grade Security and IT Solutions',
};

const mainNavLinks: { label: string; page: NavbarPage }[] = [
  { label: 'HOME', page: 'home' },
  { label: 'ABOUT US', page: 'about' },
  { label: 'SOLUTIONS', page: 'solutions' },
  { label: 'SERVICES', page: 'services' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (page: NavbarPage) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const openSecureAccess = () => {
    window.location.assign('https://login.binaryguard.ca');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#030d1f]/95 backdrop-blur-sm border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-3">
        <button
          type="button"
          onClick={() => handleNavigate('home')}
          className="flex items-center group"
        >
          <img
            src="/logo.png"
            alt="BinaryGuard logo"
            className="h-12 w-auto object-contain"
          />
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {mainNavLinks.map(({ label, page }) => (
            <button
              type="button"
              key={page}
              onClick={() => handleNavigate(page)}
              className={`text-xs font-semibold tracking-widest transition-colors duration-200 ${
                currentPage === page
                  ? 'text-cyan-400'
                  : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => handleNavigate('contact')}
            className={`text-xs font-semibold tracking-widest transition-colors duration-200 ${
              currentPage === 'contact'
                ? 'text-cyan-400'
                : 'text-gray-300 hover:text-cyan-400'
            }`}
          >
            CONTACT US
          </button>
        </nav>

        <p className="hidden lg:block text-gray-300 text-sm font-light italic max-w-xs text-right">
          {taglines[currentPage]}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openSecureAccess}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-400/20 hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            aria-label="Open BinaryGuard secure login"
            title="Secure login"
          >
            <UserRound size={21} strokeWidth={1.8} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#030d1f] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {mainNavLinks.map(({ label, page }) => (
            <button
              type="button"
              key={page}
              onClick={() => handleNavigate(page)}
              className={`text-xs font-semibold tracking-widest text-left transition-colors ${
                currentPage === page
                  ? 'text-cyan-400'
                  : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => handleNavigate('contact')}
            className={`text-xs font-semibold tracking-widest text-left transition-colors ${
              currentPage === 'contact'
                ? 'text-cyan-400'
                : 'text-gray-300 hover:text-cyan-400'
            }`}
          >
            CONTACT US
          </button>
        </div>
      )}
    </header>
  );
}
