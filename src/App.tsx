import { useEffect, useState } from 'react';

import Navbar, { type NavbarPage } from './components/Navbar';
import CookieConsent from './components/CookieConsent';
import CustomCursor from './components/CustomCursor';
import HomeHero from './components/HomeHero';

import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FeedbackPage from './pages/feedback';
import Privacy from './pages/Privacy';
import Support from './pages/Support';
import CookiePolicy from './pages/CookiePolicy';

type Page = NavbarPage | 'feedback';

export default function App() {
  const normalizedPath =
    window.location.pathname.replace(/\/+$/, '') || '/';

  const isPrivacy = normalizedPath === '/privacy';
  const isSupport = normalizedPath === '/support';
  const isCookiePolicy = normalizedPath === '/cookie-policy';

  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isPrivacy) {
      document.title = 'Privacy Policy – BinaryGuard';
      return;
    }

    if (isSupport) {
      document.title = 'Support – BinaryGuard';
      return;
    }

    if (isCookiePolicy) {
      document.title = 'Cookie Policy – BinaryGuard';
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
  }, [currentPage, isPrivacy, isSupport, isCookiePolicy]);

  if (isPrivacy) {
    return (
      <>
        <CustomCursor />
        <Privacy />
        <CookieConsent />
      </>
    );
  }

  if (isSupport) {
    return (
      <>
        <CustomCursor />
        <Support />
        <CookieConsent />
      </>
    );
  }

  if (isCookiePolicy) {
    return (
      <>
        <CustomCursor />
        <CookiePolicy />
        <CookieConsent />
      </>
    );
  }

  const navbarCurrentPage: NavbarPage =
    currentPage === 'feedback' ? 'home' : currentPage;

  return (
    <div className="min-h-screen bg-[#030d1f]">
      <CustomCursor />
      <Navbar currentPage={navbarCurrentPage} onNavigate={navigate} />

      {currentPage === 'home' && (
        <>
          <HomeHero onNavigate={navigate} />
          <div className="[&>div>section:first-child]:hidden">
            <Home onNavigate={navigate} />
          </div>
        </>
      )}
      {currentPage === 'about' && <About onNavigate={navigate} />}
      {currentPage === 'solutions' && <Solutions onNavigate={navigate} />}
      {currentPage === 'services' && <Services onNavigate={navigate} />}
      {currentPage === 'contact' && <Contact onNavigate={navigate} />}
      {currentPage === 'feedback' && <FeedbackPage onNavigate={navigate} />}

      <CookieConsent />
    </div>
  );
}
