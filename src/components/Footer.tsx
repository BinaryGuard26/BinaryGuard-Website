import { useEffect, useState } from 'react';
import { Twitter, Facebook, Instagram, ChevronUp, Phone, Mail, MapPin, Clock } from 'lucide-react';

type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'solutions';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = window.innerHeight * 0.9;
      setShowScrollTop(window.scrollY > heroThreshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#030d1f] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="mb-3">
            <img
              src="/logo.png"
              alt="BinaryGuard logo"
              className="h-10 w-auto object-contain"
            />
          </div>
          <h3 className="text-cyan-400 text-2xl font-bold leading-tight">Contact<br />Information</h3>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h4 className="text-white font-bold text-lg mb-3">Get in Touch</h4>
          <p className="text-gray-400 text-sm mb-3">Reach out to us through any of the following channels:</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2 text-gray-300">
              <Phone size={14} className="text-cyan-400 mt-0.5 shrink-0" />
              <span><span className="font-semibold text-white">Phone:</span> +1 204-504-5000</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <Mail size={14} className="text-cyan-400 mt-0.5 shrink-0" />
              <span><span className="font-semibold text-white">Email:</span> admin@binaryguard.ca</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <MapPin size={14} className="text-cyan-400 mt-0.5 shrink-0" />
              <span><span className="font-semibold text-white">Location:</span> Canada</span>
            </li>
            <li className="flex items-start gap-2 text-gray-300">
              <Clock size={14} className="text-cyan-400 mt-0.5 shrink-0" />
              <span><span className="font-semibold text-white">Support:</span> Available 7 days a week</span>
            </li>
          </ul>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h4 className="text-white font-bold text-lg mb-3">Business Hours</h4>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-white font-semibold">Monday – Friday</p>
              <p className="text-gray-400">10:00 AM – 7:00 PM</p>
            </div>
            <div>
              <p className="text-white font-semibold">Saturday</p>
              <p className="text-gray-400">11:00 AM – 6:00 PM</p>
            </div>
            <div>
              <p className="text-white font-semibold">Sunday</p>
              <p className="text-gray-400">By Appointment</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative">
          <p className="text-white font-bold text-lg mb-2">Ready to secure your business?</p>
          <button
            onClick={() => onNavigate('contact')}
            className="group"
          >
            <p className="text-gray-400 text-sm">Contact</p>
            <p className="text-cyan-400 font-extrabold text-2xl hover:text-cyan-300 transition-colors">BinaryGuard</p>
          </button>
          <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-cyan-400 transition-colors">
              <Twitter size={22} />
            </a>
            <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-cyan-400 transition-colors">
              <Facebook size={22} />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-cyan-400 transition-colors">
              <Instagram size={22} />
            </a>
          </div>
          <a
            href="https://wa.me/12045045000"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-400 transition-colors rounded-full p-2 shadow-lg"
            aria-label="WhatsApp"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50
                     flex h-14 w-14 items-center justify-center rounded-full
                     border border-cyan-400/45
                     bg-[#071224]/85 text-cyan-300
                     shadow-[0_0_26px_rgba(34,211,238,0.38)]
                     backdrop-blur-md
                     transition-all duration-300
                     hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-400
                     hover:text-[#071224] hover:shadow-[0_0_38px_rgba(34,211,238,0.62)]
                     focus:outline-none focus:ring-2 focus:ring-cyan-300/70 focus:ring-offset-2 focus:ring-offset-[#030d1f]"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} strokeWidth={2.6} />
        </button>
      )}
    </footer>
  );
}
