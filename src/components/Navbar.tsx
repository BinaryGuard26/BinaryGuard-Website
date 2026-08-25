import { useState } from 'react';
import { Menu, X, UserRound } from 'lucide-react';

export type NavbarPage =
  | 'home'
  | 'about'
  | 'solutions'
  | 'services'
  | 'contact';

interface NavbarProps {
  currentPage: NavbarPage;
  onNavigate: (page: NavbarPage) => void;
}

const taglines: Record<NavbarPage, string> = {
  home: 'Securing Your Premises. Empowering Your Business.',
  about: 'Smart Security and IT Solutions for a Connected World',
  solutions: 'Enterprise-Grade Security and IT Solutions',
  services: 'Reliable Services. Real Results.',
  contact: 'Connect with Our IT & Security Specialists',
};

const navLinks: { label: string; page: NavbarPage }[] = [
  { label: 'HOME', page: 'home' },
  { label: 'ABOUT US', page: 'about' },
  { label: 'SOLUTIONS', page: 'solutions' },
  { label: 'SERVICES', page: 'services' },
  { label: 'CONTACT US', page: 'contact' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (page: NavbarPage) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const openSecureAccess = () => {
    const authUrl = new URL(
      'https://auth.binaryguard.ca/realms/binaryguard/protocol/openid-connect/auth'
    );

    authUrl.searchParams.set('client_id', 'binaryguard-website');
    authUrl.searchParams.set('redirect_uri', 'https://www.binaryguard.ca/dashboard');
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'openid profile email');
    authUrl.searchParams.set('kc_idp_hint', 'binaryguard-gateway');
    authUrl.searchParams.set('prompt', 'login');

    window.location.assign(authUrl.toString());
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#030d1f]/95 backdrop-blur-sm">
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
          {navLinks.map(({ label, page }) => (
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
        </nav>

        <p className="hidden lg:block max-w-xs text-right text-sm font-light italic text-gray-300">
          {taglines[currentPage]}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openSecureAccess}
            className="group flex h-10 items-center justify-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 text-cyan-300 transition-all duration-200 hover:border-cyan-300 hover:bg-cyan-400/20 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            aria-label="Open BinaryGuard secure login"
            title="Secure login"
          >
            <UserRound
              size={20}
              strokeWidth={1.8}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-xs font-semibold tracking-wide">Login</span>
          </button>

          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-4 border-t border-white/10 bg-[#030d1f] px-6 py-4">
          {navLinks.map(({ label, page }) => (
            <button
              type="button"
              key={page}
              onClick={() => handleNavigate(page)}
              className={`text-left text-xs font-semibold tracking-widest transition-colors ${
                currentPage === page
                  ? 'text-cyan-400'
                  : 'text-gray-300 hover:text-cyan-400'
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