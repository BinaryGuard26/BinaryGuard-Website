import { ArrowRight, Shield, Cpu, Cloud, Lock, Wifi, Zap } from 'lucide-react';
import Footer from '../components/Footer';

type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'solutions';

interface SolutionsProps {
  onNavigate: (page: Page) => void;
}

const securitySolutions = [
  {
    title: 'Video Surveillance Systems',
    points: [
      'AI-powered surveillance with real-time monitoring and recording.',
      'Multi-location surveillance management and cloud storage.',
      'Secure storage and rapid retrieval of security footage.',
    ],
  },
  {
    title: 'Access Control Systems',
    points: [
      'Secure entry management with key-card, biometric, and mobile-based authentication.',
      'Centralized access management across all entry points.',
      'Audit logs and visitor management integration.',
    ],
  },
  {
    title: 'Alarm & Intrusion Detection',
    points: [
      'Instant alerts and detection to prevent security breaches.',
      'Smart sensors with 24/7 monitoring capabilities.',
      'Seamless integration with emergency response systems.',
    ],
  },
  {
    title: 'Intercom & Video Door Systems',
    points: [
      'Smart communication and visitor verification for enhanced entry security.',
      'Two-way audio and HD video for remote visitor management.',
      'Mobile app integration for remote door access.',
    ],
  },
  {
    title: 'Centralized Monitoring',
    points: [
      'Unified platforms to monitor all security systems from a single dashboard.',
      'Real-time alerts and notifications across all entry points.',
      'Integrated management for seamless security control.',
    ],
  },
  {
    title: 'Security System Integration',
    points: [
      'Seamless integration of multiple security technologies into one ecosystem.',
      'Unified monitoring, control, and automated response capabilities.',
      'Scalable infrastructure for growing security needs.',
    ],
  },
];

const itSolutions = [
  {
    title: 'AI & Modern Technology Solutions',
    points: [
      'End-to-end AI deployment, automation, and machine learning implementation.',
      'Advanced data analytics, reporting, and business intelligence platforms.',
      'AI-driven decision making and predictive insights for business efficiency.',
    ],
  },
  {
    title: 'Network Infrastructure Solutions',
    points: [
      'Secure wired and wireless networks designed for enterprise reliability.',
      'Point-to-Point connectivity, multi-site integration, and VPN solutions.',
      'Private cellular networks and complex network infrastructure deployment.',
    ],
  },
  {
    title: 'Microsoft 365 & Cloud Solutions',
    points: [
      'Microsoft 365 setup, collaboration, and enterprise integration.',
      'SharePoint, Teams, and Microsoft 365 apps customization.',
      'Secure cloud migration and managed cloud services.',
    ],
  },
  {
    title: 'Private & Hybrid Cloud Solutions',
    points: [
      'We build secure, scalable cloud environments with flexible and tailored infrastructure.',
      'Private and hybrid deployment models for maximum control and security.',
      'Cloud-native architecture and containerized workload management.',
    ],
  },
  {
    title: 'Managed IT Services (MSS)',
    points: [
      'We ensure proactive monitoring, maintenance, and timely updates.',
      'Comprehensive IT support and incident management.',
      'Help desk support, system performance optimization, and continuous improvement.',
    ],
  },
  {
    title: 'IT Consulting & Support',
    points: [
      'We provide expert guidance for strategic IT planning and decision-making.',
      'Troubleshooting, optimization, and continuous system improvement.',
      'IT governance, compliance, and security posture enhancement.',
    ],
  },
];

export default function Solutions({ onNavigate }: SolutionsProps) {
  return (
    <div className="bg-[#030d1f] min-h-screen">
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <img src="/Solutions.jpg" alt="Solutions" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030d1f] via-[#030d1f]/85 to-[#030d1f]/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block border border-white/30 text-white/70 text-xs tracking-widest px-3 py-1 mb-6">SOLUTIONS</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2">Enterprise-Grade Security and IT</h1>
            <h2 className="text-4xl md:text-5xl font-extrabold text-cyan-400 leading-tight mb-6">Solutions</h2>
            <p className="text-white font-bold text-base mb-4 tracking-wide">ENTERPRISE PROTECTION, INTEGRATED INFRASTRUCTURE, AND SCALABLE SUPPORT</p>
            <p className="text-gray-300 text-sm leading-relaxed mb-3 max-w-2xl">
              Protect your business with advanced, enterprise-grade solutions designed for modern threats.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-2xl">
              We seamlessly integrate physical security with IT infrastructure to ensure complete protection, visibility, and operational resilience across your business.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-3 border-2 border-white/40 hover:border-cyan-400 text-white hover:text-cyan-400 px-6 py-3 rounded-full transition-all duration-200"
            >
              <span className="border border-current rounded-full p-1"><ArrowRight size={16} /></span>
              Get Started
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#040e22]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 border border-cyan-400/30 rounded-full px-6 py-2">
              <p className="text-cyan-400 text-sm font-bold tracking-widest">SOLUTIONS</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-400/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Shield size={28} className="text-cyan-400" />
                <h2 className="text-white font-bold text-lg">Enterprise Security</h2>
              </div>
              <h3 className="text-cyan-400 font-semibold mb-3">Solutions</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Comprehensive security systems that protect your business from modern threats with real-time monitoring and integrated response capabilities.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-400/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Cpu size={28} className="text-orange-400" />
                <h2 className="text-white font-bold text-lg">Information Technology (IT)</h2>
              </div>
              <h3 className="text-cyan-400 font-semibold mb-3">Solutions</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Scalable IT infrastructure and managed services covering AI, networking, cloud solutions, and enterprise support for seamless digital operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#030d1f] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-3">Enterprise</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-cyan-400 text-center mb-12">Security Solutions</h3>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
            Protect your business with advanced, enterprise-grade security solutions designed for modern threats. We seamlessly integrate multiple security technologies for complete visibility, safety, and control across your operations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {securitySolutions.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-400/40 transition-all group">
                <h3 className="text-white font-bold text-base mb-4 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                <ul className="space-y-2">
                  {item.points.map((pt, j) => (
                    <li key={j} className="text-gray-400 text-xs flex items-start gap-2 leading-relaxed">
                      <span className="text-cyan-400 mt-0.5 shrink-0">•</span>{pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="relative rounded-2xl overflow-hidden h-64 border border-white/10">
            <img
              src="https://images.pexels.com/photos/356625/pexels-photo-356625.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Security"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#030d1f]/40" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#040e22] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-3">Information Technology</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-cyan-400 text-center mb-12">Solutions</h3>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
            Empower your business with secure, resilient, and scalable IT infrastructure. Our IT solutions are designed to support modern workplaces with seamless connectivity, cloud integration, managed services, and enterprise support.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {itSolutions.map((item, i) => (
              <div key={i} className="bg-[#030d1f] border border-white/10 rounded-xl p-6 hover:border-cyan-400/40 transition-all group">
                <h3 className="text-white font-bold text-base mb-4 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                <ul className="space-y-2">
                  {item.points.map((pt, j) => (
                    <li key={j} className="text-gray-400 text-xs flex items-start gap-2 leading-relaxed">
                      <span className="text-cyan-400 mt-0.5 shrink-0">•</span>{pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="relative rounded-2xl overflow-hidden h-64 border border-white/10">
            <img
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="IT Infrastructure"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030d1f] to-[#030d1f]/30 flex items-center justify-center">
              <div className="text-center">
                <Zap size={48} className="text-yellow-400 mx-auto mb-2" />
                <p className="text-yellow-400 font-bold text-xl tracking-widest">Video is Under</p>
                <p className="text-yellow-400 font-bold text-xl tracking-widest">Construction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
