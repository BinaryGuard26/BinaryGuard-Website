import { useEffect, useState } from 'react';
import Navbar, { type NavbarPage } from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FeedbackPage from './pages/feedback';

type Page = NavbarPage | 'feedback';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const titles: Record<Page, string> = {
      home: 'BinaryGuard – Securing Your Premises',
      about: 'About Us – BinaryGuard',
      solutions: 'Solutions – BinaryGuard',
      services: 'Services – BinaryGuard',
      contact: 'Contact Us – BinaryGuard',
      feedback: 'Client Feedback – BinaryGuard',
    };

    document.title = titles[currentPage];
  }, [currentPage]);

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