import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Services from './pages/Services';
import Products from './pages/Products';
import Contact from './pages/Contact';
import FeedbackPage from './pages/feedback';
import AccessCardLogin from './pages/AccessCardLogin';

type PublicPage = 'home' | 'about' | 'services' | 'products' | 'contact' | 'solutions';
type Page = PublicPage | 'feedback' | 'access-card-login';

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
      products: 'Products – BinaryGuard',
      contact: 'Contact Us – BinaryGuard',
      feedback: 'Client Feedback – BinaryGuard',
      'access-card-login': 'Access Card Login – BinaryGuard',
    };

    document.title = titles[currentPage];
  }, [currentPage]);

  const navbarCurrentPage: PublicPage =
    currentPage === 'feedback' || currentPage === 'access-card-login'
      ? 'products'
      : currentPage;

  return (
    <div className="bg-[#030d1f]">
      <Navbar currentPage={navbarCurrentPage} onNavigate={navigate} />

      {currentPage === 'home' && <Home onNavigate={navigate} />}
      {currentPage === 'about' && <About onNavigate={navigate} />}
      {currentPage === 'solutions' && <Solutions onNavigate={navigate} />}
      {currentPage === 'services' && <Services onNavigate={navigate} />}
      {currentPage === 'products' && <Products onNavigate={navigate} />}
      {currentPage === 'contact' && <Contact onNavigate={navigate} />}
      {currentPage === 'feedback' && <FeedbackPage onNavigate={navigate} />}
      {currentPage === 'access-card-login' && <AccessCardLogin onNavigate={navigate} />}
    </div>
  );
}
