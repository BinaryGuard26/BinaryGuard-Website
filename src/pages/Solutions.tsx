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
    label: 'PATHWAY 01',
    title: 'Physical Security Solutions',
    description: 'Protect your people, property, and operations with connected physical security systems built for modern business environments.',
    icon: Shield,
    accent: 'text-cyan-400',
    hover: 'hover:border-cyan-400/60',
    button: 'View Security Solutions',
    items: ['Access Control Systems', 'CCTV & Video Surveillance', 'Alarm & Intrusion Detection', 'Monitoring & Response Planning'],
  },
  {
    label: 'PATHWAY 02',
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

      <section className="relative z-10 -mt-8 pb-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {pathwayCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className={`rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-md transition-all ${card.hover}`}>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <p className={`${card.accent} font-bold text-sm tracking-widest`}>{card.label}</p>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className={card.accent} size={26} />
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold mb-4">{card.title}</h2>
                <p className="text-gray-300 leading-relaxed mb-7">{card.description}</p>

                <ul className="space-y-3 text-gray-200">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className={`${card.accent} mt-0.5 shrink-0`} size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onNavigate('contact')}
                  className={`mt-8 inline-flex items-center gap-2 ${card.accent} font-bold hover:gap-3 transition-all`}
                >
                  {card.button} <ArrowRight size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24 bg-[#030d1f] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-cyan-400 font-bold tracking-widest text-sm mb-3">
              WHAT WE DELIVER
            </p>

            <h2 className="text-3xl md:text-5xl font-extrabold">
              Protection, Connectivity, and Support
            </h2>

            <p className="mt-5 max-w-3xl mx-auto text-gray-300 leading-relaxed">
              Explore integrated security and IT solutions built to protect your business,
              improve operations, and support future growth.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            <div className="space-y-8">
              <div className="rounded-3xl bg-white/5 border border-white/10 p-7">
                <div className="flex items-center gap-3 mb-7">
                  <Shield className="text-cyan-400" size={28} />
                  <h3 className="text-2xl font-extrabold">Physical Security</h3>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {securitySolutions.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl bg-[#020b1a] border border-white/10 p-5 hover:border-cyan-400/50 transition-all"
                      >
                        <Icon className="text-cyan-400 mb-4" size={24} />

                        <h4 className="font-bold mb-3 leading-snug">
                          {item.title}
                        </h4>

                        <ul className="space-y-2">
                          {item.points.map((point) => (
                            <li
                              key={point}
                              className="text-gray-400 text-xs leading-relaxed"
                            >
                              • {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-7">
                <div className="flex items-center gap-3 mb-7">
                  <Cpu className="text-orange-400" size={28} />
                  <h3 className="text-2xl font-extrabold">IT Infrastructure</h3>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {itSolutions.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl bg-[#020b1a] border border-white/10 p-5 hover:border-orange-400/50 transition-all"
                      >
                        <Icon className="text-orange-400 mb-4" size={24} />

                        <h4 className="font-bold mb-3 leading-snug">
                          {item.title}
                        </h4>

                        <ul className="space-y-2">
                          {item.points.map((point) => (
                            <li
                              key={point}
                              className="text-gray-400 text-xs leading-relaxed"
                            >
                              • {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="sticky top-28">
              <div className="relative rounded-3xl overflow-hidden border border-cyan-400/30 bg-white/5 shadow-2xl shadow-cyan-400/10">
                <video
                  src="/solutions-video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[950px] object-cover opacity-80"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020b1a] via-[#020b1a]/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-cyan-400 font-bold tracking-widest text-sm mb-3">
                    BINARYGUARD SOLUTIONS
                  </p>

                  <h3 className="text-3xl font-extrabold mb-4">
                    One Partner for Security & IT
                  </h3>

                  <p className="text-gray-300 leading-relaxed">
                    From surveillance and access control to cloud, networking,
                    and managed IT support — we help organizations build secure,
                    connected, and scalable environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#020b1a]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-br from-cyan-400/15 via-white/5 to-orange-400/10 border border-cyan-400/30 p-8 md:p-12 text-center shadow-2xl shadow-cyan-400/10">
            <div className="w-16 h-16 rounded-2xl bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center mx-auto mb-6">
              <PhoneCall className="text-cyan-400" size={30} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Not sure where to start?</h2>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Tell us your business needs and we’ll recommend the right security and IT solution.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="mt-8 inline-flex items-center gap-3 px-8 py-3 rounded-full bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition-all"
            >
              Get a Free Recommendation
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
