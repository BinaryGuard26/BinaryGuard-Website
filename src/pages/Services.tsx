import { ClipboardList, PenTool, Truck, Wrench, Activity, MessageSquare, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';

type Page = 'home' | 'about' | 'services' | 'contact' | 'solutions';

interface ServicesProps {
  onNavigate: (page: Page) => void;
}

const services = [
  {
    icon: <ClipboardList size={36} className="text-pink-400" />,
    title: 'Project Planning & Execution',
    points: [
      'Structured project delivery with defined scope, timelines, and milestones.',
      'Ensuring accountability, risk control, and on-time completion.',
    ],
  },
  {
    icon: <PenTool size={36} className="text-cyan-400" />,
    title: 'System Design & Engineering',
    points: [
      'Customized system architecture tailored to operational needs.',
      'Designed for performance, scalability, and long-term reliability.',
    ],
  },
  {
    icon: <Truck size={36} className="text-blue-400" />,
    title: 'Supply and Installation',
    points: [
      'Professional installation with configuration and validation.',
      'Thorough testing ensures systems perform as expected from day one.',
    ],
  },
  {
    icon: <Wrench size={36} className="text-green-400" />,
    title: 'Preventive Maintenance',
    points: [
      'Scheduled maintenance to reduce failures and downtime.',
      'Improves system stability, lifespan, and operational efficiency.',
    ],
  },
  {
    icon: <Activity size={36} className="text-orange-400" />,
    title: 'Managed Operations',
    points: [
      'Continuous monitoring of critical systems and services.',
      'Ensuring performance, availability, and operational continuity.',
    ],
  },
  {
    icon: <MessageSquare size={36} className="text-gray-400" />,
    title: 'Technical Consulting',
    points: [
      'Expert guidance for informed technology decisions.',
      'Helping businesses plan, optimize, and future-proof investments.',
    ],
  },
];

const approach = [
  { label: 'Plan', sub: 'Strategy & Requirements' },
  { label: 'Design', sub: 'Wireframes & Mockups' },
  { label: 'Deploy', sub: 'Development & Launch' },
  { label: 'Support', sub: 'Maintenance & Assistance' },
  { label: 'Optimize', sub: 'Performance & Improvement' },
];

export default function Services({ onNavigate }: ServicesProps) {
  return (
    <div className="bg-[#030d1f] min-h-screen">
      <section className="relative min-h-[70vh] flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <img src="/Services.jpg" alt="Services" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030d1f] via-[#030d1f]/80 to-[#030d1f]/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block border border-white/30 text-white/70 text-xs tracking-widest px-3 py-1 mb-6">SERVICES</span>
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-2">OUR</h1>
            <h2 className="text-5xl font-extrabold text-cyan-400 leading-tight mb-6">SERVICES</h2>
            <p className="text-white font-bold text-base mb-4 tracking-wide">TURNING TECHNOLOGY INTO RELIABLE BUSINESS OUTCOMES</p>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              We provide expert services that ensure technology is planned, designed, deployed, and supported with precision.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              From initial strategy to long-term operations, we help businesses run smarter, safer, and more efficiently.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-3 border-2 border-white/40 hover:border-cyan-400 text-white hover:text-cyan-400 px-6 py-3 rounded-full transition-all duration-200"
            >
              <span className="border border-current rounded-full p-1"><ArrowRight size={16} /></span>
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#040e22]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-white text-center mb-3">Services</h2>
          <div className="w-16 h-0.5 bg-cyan-400 mx-auto mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, i) => (
              <div key={i} className="bg-[#030d1f] border border-white/10 rounded-xl p-6 hover:border-cyan-400/40 transition-all group">
                <div className="mb-4 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                <h3 className="text-white font-bold text-base mb-4">{item.title}</h3>
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
        </div>
      </section>

      <section className="py-20 bg-[#030d1f]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12">Our Service Approach</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {approach.map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="flex items-center">
                  <div className="bg-cyan-500 hover:bg-cyan-400 transition-colors rounded-xl px-8 py-5 text-center min-w-[110px] group cursor-default">
                    <p className="text-white font-extrabold text-lg">{step.label}</p>
                    <p className="text-white/70 text-xs mt-1">{step.sub}</p>
                  </div>
                  {i < approach.length - 1 && (
                    <div className="hidden sm:block w-6 h-0.5 bg-cyan-400/40" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-300 text-sm max-w-xl mx-auto">
            A structured lifecycle approach that ensures consistency, accountability, and long-term success for every project.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#040e22] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/Services.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="hidden lg:block">
            <div className="w-64 h-64 rounded-full border border-cyan-400/30 flex items-center justify-center mx-auto">
              <div className="w-48 h-48 rounded-full border border-cyan-400/50 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-cyan-400/10 border border-cyan-400 flex items-center justify-center">
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                    <polygon points="22,2 40,12 40,32 22,42 4,32 4,12" fill="none" stroke="#00b4d8" strokeWidth="1.5" />
                    <circle cx="22" cy="21" r="3" fill="#00b4d8" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-3">Let's Build</h2>
            <h3 className="text-3xl font-extrabold text-cyan-400 mb-6">Something Reliable Together</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              Looking to deploy, upgrade, or manage critical IT and security systems?
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              Our experts are ready to support your business today and scale for tomorrow.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200"
            >
              <span className="text-sm">Request a Consultation</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
