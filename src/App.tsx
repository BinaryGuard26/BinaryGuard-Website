import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FeedbackPage from './pages/feedback';
import AccessCardLogin from './pages/AccessCardLogin';
import OtpVerify from './pages/OtpVerify';
import AccessCardOrderForm from './pages/AccessCardOrderForm';

type PublicPage = 'home' | 'about' | 'services' | 'contact' | 'solutions' | 'access-card-portal';

type PortalPage =
  | 'portal-login'
  | 'portal-verify-otp'
  | 'portal-dashboard'
  | 'portal-access-card-order';

type LegacyAccessCardPage =
  | 'access-card-login'
  | 'otp-verify'
  | 'access-card-order-form';

type Page = PublicPage | 'feedback' | PortalPage | LegacyAccessCardPage;

function PortalDashboard({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <main className="min-h-screen bg-[#030d1f] px-6 py-24 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
            Client Services Portal
          </p>
          <h1 className="text-4xl font-bold md:text-6xl">Welcome to your secure portal</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            Select an available service module below. More client services can be added later
            without mixing them into the public website.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <button
            type="button"
            onClick={() => onNavigate('portal-access-card-order')}
            className="rounded-3xl border border-cyan-400/30 bg-white/10 p-8 text-left shadow-xl transition hover:-translate-y-1 hover:border-cyan-300 hover:bg-white/15"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              First Module
            </p>
            <h2 className="text-2xl font-bold">Access Control</h2>
            <p className="mt-4 text-slate-300">
              Submit secure access control requests using verified corporate email access.
            </p>
          </button>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 opacity-70">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              Coming Soon
            </p>
            <h2 className="text-2xl font-bold">Service Request</h2>
            <p className="mt-4 text-slate-400">
              Future client support and service call request module.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 opacity-70">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              Coming Soon
            </p>
            <h2 className="text-2xl font-bold">Quote Request</h2>
            <p className="mt-4 text-slate-400">
              Future quote and product request workflow.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const titles: Record<Page, string> = {
      home: 'BinaryGuard – Securing Your Premises',
      about: 'About Us – BinaryGuard',
      solutions: 'Solutions – BinaryGuard',
      services: 'Services – BinaryGuard',
            'access-card-portal': 'Access Control – BinaryGuard',
      contact: 'Contact Us – BinaryGuard',
      feedback: 'Client Feedback – BinaryGuard',

      // New portal architecture pages
      'portal-login': 'Client Portal Login – BinaryGuard',
      'portal-verify-otp': 'OTP Verification – BinaryGuard',
      'portal-dashboard': 'Client Services Portal – BinaryGuard',
      'portal-access-card-order': 'Access Card Order Form – BinaryGuard',

      // Backward-compatible existing page names
      'access-card-login': 'Access Card Login – BinaryGuard',
      'otp-verify': 'OTP Verification – BinaryGuard',
      'access-card-order-form': 'Access Card Order Form – BinaryGuard',
    };

    document.title = titles[currentPage];
  }, [currentPage]);

  const isPortalPage =
    currentPage === 'feedback' ||
    currentPage === 'access-card-portal' ||
    currentPage === 'portal-login' ||
    currentPage === 'portal-verify-otp' ||
    currentPage === 'portal-dashboard' ||
    currentPage === 'portal-access-card-order' ||
    currentPage === 'access-card-login' ||
    currentPage === 'otp-verify' ||
    currentPage === 'access-card-order-form';

  const navbarCurrentPage: PublicPage = isPortalPage ? 'access-card-portal' : currentPage;

  return (
    <div className="bg-[#030d1f]">
      <Navbar currentPage={navbarCurrentPage} onNavigate={navigate} />

      {currentPage === 'home' && <Home onNavigate={navigate} />}
      {currentPage === 'about' && <About onNavigate={navigate} />}
      {currentPage === 'solutions' && <Solutions onNavigate={navigate} />}
      {currentPage === 'services' && <Services onNavigate={navigate} />}
      {currentPage === 'contact' && <Contact onNavigate={navigate} />}
      {currentPage === 'feedback' && <FeedbackPage onNavigate={navigate} />}

      {(currentPage === 'access-card-portal' || currentPage === 'portal-login' || currentPage === 'access-card-login') && (
        <AccessCardLogin onNavigate={navigate} />
      )}

      {(currentPage === 'portal-verify-otp' || currentPage === 'otp-verify') && (
        <OtpVerify onNavigate={navigate} />
      )}

      {currentPage === 'portal-dashboard' && <PortalDashboard onNavigate={navigate} />}

      {(currentPage === 'portal-access-card-order' ||
        currentPage === 'access-card-order-form') && (
        <AccessCardOrderForm onNavigate={navigate} />
      )}
    </div>
  );
}
