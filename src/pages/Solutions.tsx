import {
  ArrowRight,
  Shield,
  Cpu,
  CheckCircle,
  PhoneCall,
  Network,
  Camera,
  Lock,
  Cloud,
  Headphones,
  Video,
  Monitor,
  Layers,
  BrainCircuit,
  Server,
  Briefcase,
} from 'lucide-react';
import Footer from '../components/Footer';

type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'solutions';

interface SolutionsProps {
  onNavigate: (page: Page) => void;
}

const pathwayCards = [
  {
    label: 'ENTERPRISE SECURITY',
    title: 'Physical Security Solutions',
    description: 'Protect your people, property, and operations with connected physical security systems built for modern business environments.',
    icon: Shield,
    accent: 'text-cyan-400',
    hover: 'hover:border-cyan-400/60',
    button: 'View Security Solutions',
    items: ['Access Control Systems', 'CCTV & Video Surveillance', 'Alarm & Intrusion Detection', 'Monitoring & Response Planning'],
  },
  {
    label: 'IT INFRASTRUCTURE',
    title: 'IT Infrastructure Solutions',
    description: 'Build reliable technology foundations that support daily operations, cloud adoption, cybersecurity, and business growth.',
    icon: Cpu,
    accent: 'text-orange-400',
    hover: 'hover:border-orange-400/60',
    button: 'View IT Solutions',
    items: ['Network Setup & Optimization', 'Cloud & Backup Solutions', 'Managed IT Support', 'Cybersecurity Readiness'],
  },
];

const securitySolutions = [
  {
    icon: Camera,
    title: 'Video Surveillance Systems',
    points: ['AI-powered surveillance with real-time monitoring and recording.', 'Multi-location surveillance management and cloud storage.', 'Audit logs and visitor management integration.'],
  },
  {
    icon: Lock,
    title: 'Access Control Systems',
    points: ['Secure entry management with key-card, biometric, and mobile-based authentication.', 'Centralized access management across all entry points.', 'Audit logs and visitor management integration.'],
  },
  {
    icon: Shield,
    title: 'Alarm & Intrusion Detection',
    points: ['Instant alerts and detection to prevent security breaches.', 'Smart sensors with 24/7 monitoring capabilities.', 'Seamless integration with emergency response systems.'],
  },
    {
    icon: Video,
    title: 'Intercom & Video Door Systems',
    points: ['Smart communication and visitor verification for enhanced entry security.', 'Two-way audio and HD video for remote visitor management.', 'Mobile app integration for remote door access.'],
  },
  {
    icon: Monitor,
    title: 'Centralized Monitoring',
    points: ['Unified platforms to monitor all security systems from a single dashboard.', 'Real-time alerts and notifications across all entry points.', 'Integrated management for seamless security control.'],
  },
  {
    icon: Layers,
    title: 'Security System Integration',
    points: ['Seamless integration of multiple security technologies into one ecosystem.', 'Unified monitoring, control, and automated response capabilities.', 'Scalable infrastructure for growing security needs.'],
  },
];

const itSolutions = [
  {
    icon: BrainCircuit,
    title: 'AI & Modern Technology Solutions',
    points: ['End-to-end AI deployment, automation, and machine learning implementation.', 'Advanced data analytics, reporting, and business intelligence platform.', 'AI-driven decision making and predictive insights for business efficiency.'],
  },
  {
    icon: Network,
    title: 'Network Infrastructure Solutions',
    points: ['Secure wired and wireless networks designed for enterprise reliability.', 'Point-to-Point connectivity, multi-site integration, and VPN solutions.', 'Private cellular networks and complex network infrastructure deployment.'],
  },
  {
    icon: Cloud,
    title: 'Microsoft 365 & Cloud Solutions',
    points: ['Microsoft 365 setup, collaboration, and enterprise integration.', 'SharePoint, Teams, and Microsoft 365 apps customization.', 'Secure cloud migration and managed cloud services.'],
  },
    {
    icon: Server,
    title: 'Private & Hybrid Cloud Solutions',
    points: ['We build secure, scalable cloud environments with flexible and tailored infrastructure.', 'Private and hybrid deployment models for maximum control and security.', 'Cloud-native architecture and containerized workload management.'],
  },
  {
    icon: Headphones,
    title: 'Managed IT Services (MSS)',
    points: ['We ensure proactive monitoring, maintenance, and timely updates.', 'Comprehensive IT support and incident management.', 'Help desk support, system performance optimization, and continuous improvement.'],
  },
  {
    icon: Briefcase,
    title: 'IT Consulting & Support',
    points: ['We provide expert guidance for strategic IT planning and decision-making.', 'Troubleshooting, optimization, and continuous system improvement.', 'IT governance, compliance, and security posture enhancement.'],
  },
];

export default function Solutions({ onNavigate }: SolutionsProps) {
  return (
    <div className="bg-[#020b1a] min-h-screen text-white">
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 z-0">
          <img src="/Solutions.jpg" alt="Security and IT solutions" className="w-full h-full object-cover object-center opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020b1a]/80 via-[#020b1a]/92 to-[#020b1a]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.20),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.14),transparent_30%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-400 text-sm font-bold tracking-widest">
            SOLUTIONS
          </span>

          <h1 className="mt-8 text-4xl md:text-6xl font-extrabold leading-tight max-w-5xl mx-auto">
            Your Security & IT <span className="text-cyan-400">Solutions</span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-gray-300 text-base md:text-lg leading-relaxed">
            From physical protection to digital infrastructure, BinaryGuard helps organizations build secure, connected, and scalable environments.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/20"
            >
              Book a Free Consultation
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-3 px-7 py-3 rounded-full border border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400 transition-all"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 bg-[#020b1a] border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.10),transparent_35%)]" />

        <div className="relative z-10 max-w-screen-2xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-cyan-400 font-bold tracking-[0.25em] text-sm mb-4">SOLUTION ECOSYSTEM</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">BinaryGuard Enterprise Solutions</h2>
            <p className="mt-6 max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed">
              A connected root map that brings physical security and IT infrastructure together under one scalable business technology strategy.
            </p>
          </div>

          <div className="relative">
            <div className="relative z-20 max-w-md mx-auto mb-16">
              <div className="rounded-[2rem] border border-cyan-400/30 bg-gradient-to-br from-cyan-400/15 via-white/5 to-orange-400/10 p-8 text-center shadow-2xl shadow-cyan-400/10">
                <div className="w-16 h-16 rounded-2xl bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center mx-auto mb-5">
                  <Shield className="text-cyan-400" size={30} />
                </div>
                <p className="text-cyan-400 text-xs font-bold tracking-[0.25em] uppercase mb-3">Root Map</p>
                <h3 className="text-3xl font-black">BinaryGuard Solutions</h3>
                <p className="mt-3 text-gray-300 leading-relaxed">
                  One integrated direction for secure, connected, and scalable operations.
                </p>
              </div>
            </div>

            <div className="hidden lg:block absolute top-[150px] left-1/2 w-px h-16 bg-gradient-to-b from-cyan-400/60 to-white/10" />
            <div className="hidden lg:block absolute top-[214px] left-[18%] right-[18%] h-px bg-gradient-to-r from-cyan-400/50 via-white/20 to-orange-400/50" />
            <div className="hidden lg:block absolute top-[214px] left-[18%] w-px h-16 bg-gradient-to-b from-cyan-400/50 to-white/10" />
            <div className="hidden lg:block absolute top-[214px] right-[18%] w-px h-16 bg-gradient-to-b from-orange-400/50 to-white/10" />

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="relative rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-8 md:p-10 backdrop-blur-xl">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-400/10 blur-3xl rounded-full" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                      <Shield className="text-cyan-400" size={28} />
                    </div>
                    <div>
                      <p className="text-cyan-400 text-xs font-bold tracking-[0.25em] uppercase mb-1">Enterprise Security</p>
                      <h3 className="text-3xl md:text-4xl font-black">Enterprise Security Solutions</h3>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {securitySolutions.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="group relative rounded-2xl border border-white/10 bg-[#020b1a]/80 p-5 hover:border-cyan-400/40 transition-all">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400/70 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                              <Icon className="text-cyan-400" size={20} />
                            </div>
                            <h4 className="font-black leading-tight">{item.title}</h4>
                          </div>
                          <ul className="space-y-3">
                            {item.points.map((point) => (
                              <li key={point} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                                <span className="text-cyan-400 mt-1 shrink-0">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="relative rounded-[2rem] border border-orange-400/20 bg-white/[0.04] p-8 md:p-10 backdrop-blur-xl">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-400/10 blur-3xl rounded-full" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-orange-400/10 border border-orange-400/30 flex items-center justify-center">
                      <Cpu className="text-orange-400" size={28} />
                    </div>
                    <div>
                      <p className="text-orange-400 text-xs font-bold tracking-[0.25em] uppercase mb-1">IT Infrastructure</p>
                      <h3 className="text-3xl md:text-4xl font-black">IT Infrastructure Solutions</h3>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {itSolutions.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="group relative rounded-2xl border border-white/10 bg-[#020b1a]/80 p-5 hover:border-orange-400/40 transition-all">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-orange-400/70 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center">
                              <Icon className="text-orange-400" size={20} />
                            </div>
                            <h4 className="font-black leading-tight">{item.title}</h4>
                          </div>
                          <ul className="space-y-3">
                            {item.points.map((point) => (
                              <li key={point} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                                <span className="text-orange-400 mt-1 shrink-0">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-[2rem] border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 via-white/[0.04] to-orange-400/10 p-8 md:p-10 text-center">
              <h3 className="text-3xl md:text-4xl font-black mb-4">Not sure which solution fits your business?</h3>
              <p className="max-w-3xl mx-auto text-gray-300 leading-relaxed mb-8">
                Share your business requirements and BinaryGuard will help map the right security and IT solution direction for your environment.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/20"
              >
                Get a Free Recommendation
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

            <Footer onNavigate={onNavigate} />
    </div>
  );
}
