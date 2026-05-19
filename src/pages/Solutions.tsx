import {
  ArrowRight,
  Shield,
  Cpu,
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

      <section className="relative z-10 -mt-12 pb-24">
        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#020817] min-h-[720px] shadow-2xl shadow-black/40">
            <img
              src="/solutions-split-bg.jpg"
              alt="Security and IT infrastructure background"
              className="absolute inset-0 h-full w-full object-cover opacity-25 scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817]/90 to-[#020817]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(34,211,238,0.28),transparent_35%),radial-gradient(circle_at_75%_40%,rgba(251,146,60,0.24),transparent_35%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent lg:block" />
            <div className="absolute left-1/2 top-1/2 hidden h-[120%] w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-12 bg-gradient-to-b from-transparent via-cyan-400/25 to-orange-400/25 lg:block" />

            <div className="relative z-10 grid min-h-[720px] grid-cols-1 lg:grid-cols-2">
              <div className="group relative flex flex-col justify-center overflow-hidden p-8 md:p-14 xl:p-20">
                <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl transition-all duration-700 group-hover:scale-125" />

                <div className="relative z-10">
                  <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 shadow-xl shadow-cyan-400/10 backdrop-blur-md">
                    <Shield className="text-cyan-400" size={30} />
                  </div>

                  <p className="mb-6 text-sm font-black tracking-[0.3em] text-cyan-400">
                    ENTERPRISE SECURITY
                  </p>

                  <h2 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-tight md:text-5xl xl:text-6xl">
                    Secure every entry, asset, and operation.
                  </h2>

                  <p className="mt-7 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
                    Integrated access control, CCTV, alarms, and monitoring systems designed for modern business protection.
                  </p>

                  <div className="mt-10 flex flex-wrap gap-3">
                    {['Access Control', 'CCTV', 'Alarm Systems', 'Monitoring'].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-bold text-cyan-100 backdrop-blur-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-cyan-400 px-8 py-4 font-black text-slate-950 shadow-lg shadow-cyan-400/20 transition-all hover:bg-cyan-300 hover:gap-4"
                  >
                    View Security Solutions
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>

              <div className="group relative flex flex-col justify-center overflow-hidden border-t border-white/10 p-8 md:p-14 xl:p-20 lg:border-l lg:border-t-0">
                <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-orange-400/20 blur-3xl transition-all duration-700 group-hover:scale-125" />

                <div className="relative z-10">
                  <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-400/25 bg-orange-400/10 shadow-xl shadow-orange-400/10 backdrop-blur-md">
                    <Cpu className="text-orange-400" size={30} />
                  </div>

                  <p className="mb-6 text-sm font-black tracking-[0.3em] text-orange-400">
                    IT INFRASTRUCTURE
                  </p>

                  <h2 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-tight md:text-5xl xl:text-6xl">
                    Build the digital foundation for growth.
                  </h2>

                  <p className="mt-7 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
                    Reliable networking, cloud, backup, cybersecurity, and managed IT support for scalable operations.
                  </p>

                  <div className="mt-10 flex flex-wrap gap-3">
                    {['Networking', 'Cloud Backup', 'Managed IT', 'Cybersecurity'].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-orange-400/30 bg-orange-400/10 px-5 py-3 text-sm font-bold text-orange-100 backdrop-blur-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-orange-400 px-8 py-4 font-black text-slate-950 shadow-lg shadow-orange-400/20 transition-all hover:bg-orange-300 hover:gap-4"
                  >
                    View IT Solutions
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
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

          <div className="flex flex-col gap-10">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
              
<div className="mb-10">
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 backdrop-blur-sm mb-4">
    <Shield className="text-cyan-400" size={16} />
    <span className="text-cyan-400 text-xs font-bold tracking-[0.25em] uppercase">
      Enterprise Security
    </span>
  </div>

  <h3 className="text-4xl md:text-5xl font-black leading-none tracking-tight">
    Physical{" "}
    <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
      Security
    </span>
  </h3>

  <div className="mt-4 w-24 h-[3px] bg-gradient-to-r from-cyan-400 to-transparent rounded-full" />
</div>


              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {securitySolutions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#071428] to-[#020b1a] p-10 min-h-[520px] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-400/10"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full" />
                      </div>

                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent opacity-70" />

                      <div className="relative z-10 w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                        <Icon className="text-cyan-400" size={30} />
                      </div>

                      <h4 className="relative z-10 text-[28px] font-black leading-tight mb-7 tracking-tight">
                        {item.title}
                      </h4>

                      <ul className="relative z-10 space-y-6">
                        {item.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-gray-300 text-base leading-relaxed"
                          >
                            <span className="text-cyan-400 mt-1 shrink-0">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-2">
              <div className="relative rounded-3xl overflow-hidden border border-cyan-400/30 bg-black shadow-2xl shadow-cyan-400/10">
                <video
                  src="/security-video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[500px] object-cover opacity-80"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020b1a] via-[#020b1a]/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <p className="text-cyan-400 font-bold tracking-widest text-sm mb-3">
                    ENTERPRISE SECURITY
                  </p>

                  <h3 className="text-3xl font-extrabold mb-4">
                    Intelligent Physical Protection
                  </h3>

                  <p className="text-gray-300 leading-relaxed">
                    Advanced surveillance, access control, and integrated monitoring
                    systems built for modern organizations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#020b1a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-10">
            <div className="mt-2 order-2">
              <div className="relative rounded-3xl overflow-hidden border border-orange-400/30 bg-black shadow-2xl shadow-orange-400/10">
                <video
                  src="/it-video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[500px] object-cover opacity-80"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020b1a] via-[#020b1a]/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <p className="text-orange-400 font-bold tracking-widest text-sm mb-3">
                    IT INFRASTRUCTURE
                  </p>

                  <h3 className="text-3xl font-extrabold mb-4">
                    Scalable Digital Infrastructure
                  </h3>

                  <p className="text-gray-300 leading-relaxed">
                    Cloud, networking, AI, and managed IT solutions designed for
                    performance, security, and scalability.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white/5 border border-white/10 p-7 order-1">
              
<div className="mb-10">
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-400/20 bg-orange-400/10 backdrop-blur-sm mb-4">
    <Cpu className="text-orange-400" size={16} />
    <span className="text-orange-400 text-xs font-bold tracking-[0.25em] uppercase">
      IT Infrastructure
    </span>
  </div>

  <h3 className="text-4xl md:text-5xl font-black leading-none tracking-tight">
    Digital{" "}
    <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
      Infrastructure
    </span>
  </h3>

  <div className="mt-4 w-24 h-[3px] bg-gradient-to-r from-orange-400 to-transparent rounded-full" />
</div>


              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {itSolutions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#071428] to-[#020b1a] p-10 min-h-[520px] transition-all duration-500 hover:-translate-y-2 hover:border-orange-400/50 hover:shadow-2xl hover:shadow-orange-400/10"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-400/10 blur-3xl rounded-full" />
                      </div>

                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-orange-400 via-yellow-500 to-transparent opacity-70" />

                      <div className="relative z-10 w-16 h-16 rounded-2xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                        <Icon className="text-orange-400" size={30} />
                      </div>

                      <h4 className="relative z-10 text-[28px] font-black leading-tight mb-7 tracking-tight">
                        {item.title}
                      </h4>

                      <ul className="relative z-10 space-y-6">
                        {item.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-3 text-gray-300 text-base leading-relaxed"
                          >
                            <span className="text-orange-400 mt-1 shrink-0">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-orange-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                  );
                })}
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
