import { useEffect, useState } from 'react';
import { LogOut, Grid2X2, ShieldCheck } from 'lucide-react';
import Navbar, { type NavbarPage } from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FeedbackPage from './pages/feedback';
import Privacy from './pages/Privacy';
import Support from './pages/Support';
import { useAuth } from './auth/AuthProvider';

type Page = NavbarPage | 'feedback';

function SecureDashboard() {
  const { ready, authenticated, username, roles, login, logout } = useAuth();

  useEffect(() => {
    document.title = 'Secure Access – BinaryGuard';
  }, []);

  if (!ready) {
    return (
      <main className="min-h-screen bg-[#020d20] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-cyan-300 font-semibold">Securing your session…</p>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#020d20] text-white flex items-center justify-center px-6">
        <section className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <h1 className="text-3xl font-extrabold">Secure session required</h1>
          <p className="mt-4 text-slate-300">
            Sign in to continue to the BinaryGuard Application Dashboard.
          </p>
          <button
            type="button"
            onClick={() => void login()}
            className="mt-6 rounded-xl bg-cyan-500 px-5 py-3 font-bold text-white transition hover:bg-cyan-400"
          >
            Sign in
          </button>
        </section>
      </main>
    );
  }

  const applications = [
    {
      id: 'erp',
      label: 'ERP',
      description: 'Open BinaryGuard ERP.',
      url: 'https://erp.binaryguard.ca',
      allowed: roles.some((role) =>
        ['erp-user', 'erp-admin', 'binaryguard-admin', 'admin'].includes(role),
      ),
    },
    {
      id: 'portal',
      label: 'Client Portal',
      description: 'Open the BinaryGuard client portal.',
      url: 'https://portal.binaryguard.ca',
      allowed: roles.some((role) =>
        ['portal-user', 'portal-admin', 'binaryguard-admin', 'admin'].includes(role),
      ),
    },
    {
      id: 'apps',
      label: 'Internal Apps',
      description: 'Open BinaryGuard internal applications.',
      url: 'https://apps.binaryguard.ca',
      allowed: roles.some((role) =>
        ['apps-user', 'apps-admin', 'binaryguard-admin', 'admin'].includes(role),
      ),
    },
  ].filter((application) => application.allowed);

  return (
    <main className="min-h-screen bg-[#020d20] px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <section className="border-b border-white/10 pb-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="BinaryGuard"
                  className="h-9 w-auto object-contain"
                />
                <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-bold tracking-wider text-cyan-300">
                  SECURE ACCESS
                </span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                Application Dashboard
              </h1>

              <p className="mt-2 text-slate-300">
                Signed in as{' '}
                <strong className="text-cyan-300">
                  {username ?? 'Authenticated user'}
                </strong>
              </p>
            </div>

            <button
              type="button"
              onClick={() => void logout()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
            >
              <LogOut size={17} />
              Sign out
            </button>
          </div>
        </section>

        <section className="pt-10">
          <div className="mb-7 flex items-center gap-3">
            <Grid2X2 size={22} className="text-cyan-400" />
            <h2 className="text-xl font-bold">Your applications</h2>
          </div>

          {applications.length === 0 ? (
            <div className="rounded-3xl border border-yellow-400/25 bg-yellow-400/10 p-7">
              <h3 className="text-lg font-bold text-yellow-200">
                No applications assigned
              </h3>
              <p className="mt-2 text-slate-300">
                Contact a BinaryGuard administrator to request access.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {applications.map((application) => (
                <a
                  key={application.id}
                  href={application.url}
                  className="group rounded-3xl border border-cyan-400/20 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.07]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                    <ShieldCheck size={22} />
                  </div>
                  <h3 className="text-xl font-bold">{application.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {application.description}
                  </p>
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default function App() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';

  const isDashboard =
    normalizedPath === '/dashboard' ||
    normalizedPath.startsWith('/dashboard/');

  const isPrivacy = normalizedPath === '/privacy';
  const isSupport = normalizedPath === '/support';

  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isDashboard) {
      document.title = 'Secure Access – BinaryGuard';
      return;
    }

    if (isPrivacy) {
      document.title = 'Privacy Policy – BinaryGuard';
      return;
    }

    if (isSupport) {
      document.title = 'Support – BinaryGuard';
      return;
    }

    const titles: Record<Page, string> = {
      home: 'BinaryGuard – Securing Your Premises',
      about: 'About Us – BinaryGuard',
      solutions: 'Solutions – BinaryGuard',
      services: 'Services – BinaryGuard',
      contact: 'Contact Us – BinaryGuard',
      feedback: 'Client Feedback – BinaryGuard',
    };

    document.title = titles[currentPage];
  }, [currentPage, isDashboard, isPrivacy, isSupport]);

  if (isDashboard) {
    return <SecureDashboard />;
  }

  // These pages are deliberately public and do not require authentication.
  // Microsoft and customers must be able to open them directly.
  if (isPrivacy) {
    return <Privacy />;
  }

  if (isSupport) {
    return <Support />;
  }

  const navbarCurrentPage: NavbarPage =
    currentPage === 'feedback' ? 'home' : currentPage;

  return (
    <div className="min-h-screen bg-[#030d1f]">
      <Navbar currentPage={navbarCurrentPage} onNavigate={navigate} />

      {currentPage === 'home' && <Home onNavigate={navigate} />}
      {currentPage === 'about' && <About onNavigate={navigate} />}
      {currentPage === 'solutions' && <Solutions onNavigate={navigate} />}
      {currentPage === 'services' && <Services onNavigate={navigate} />}
      {currentPage === 'contact' && <Contact onNavigate={navigate} />}
      {currentPage === 'feedback' && <FeedbackPage onNavigate={navigate} />}
    </div>
  );
}
