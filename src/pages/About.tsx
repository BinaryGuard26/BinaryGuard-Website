import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Shield,
  Eye,
  Sparkles,
  Briefcase,
  BadgeCheck,
  Network,
  Camera,
  Cloud,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
} from 'lucide-react';
import Footer from '../components/Footer';

type Page = 'home' | 'about' | 'services' | 'contact' | 'solutions';

interface AboutProps {
  onNavigate: (page: Page) => void;
}

const galleryImages = [
  {
    src: '/gallery-security.jpg',
    title: 'Advanced Security Monitoring',
    text: 'Real-time surveillance, access control, and threat visibility across your operations.',
  },
  {
    src: '/gallery-network.jpg',
    title: 'Enterprise Network Infrastructure',
    text: 'Reliable, scalable connectivity built for performance and business continuity.',
  },
  {
    src: '/gallery-operations.jpg',
    title: 'Connected Operations',
    text: 'Technology that works together to support secure and efficient business workflows.',
  },
  {
    src: '/gallery-cloud.jpg',
    title: 'Cloud & Smart Systems',
    text: 'Flexible, modern platforms that simplify management and improve accessibility.',
  },
];

const capabilities = [
  {
    icon: <Network size={20} className="text-cyan-300" />,
    title: 'Network Infrastructure',
    text: 'Stable, scalable connectivity designed for real business operations.',
  },
  {
    icon: <Camera size={20} className="text-cyan-300" />,
    title: 'Security & Surveillance',
    text: 'Modern monitoring and protection systems with better visibility.',
  },
  {
    icon: <Cloud size={20} className="text-cyan-300" />,
    title: 'Cloud & IT Services',
    text: 'Smarter access, ongoing support, and flexible digital systems.',
  },
  {
    icon: <Cpu size={20} className="text-cyan-300" />,
    title: 'Integrated Solutions',
    text: 'Connected platforms that reduce complexity and improve control.',
  },
];

const values = [
  {
    icon: <Shield size={18} className="text-cyan-400" />,
    title: 'Security-first approach',
    text: 'Protection, resilience, and risk reduction are built into every project.',
  },
  {
    icon: <BadgeCheck size={18} className="text-cyan-400" />,
    title: 'Reliable delivery',
    text: 'We focus on practical execution, clear communication, and accountable support.',
  },
  {
    icon: <Briefcase size={18} className="text-cyan-400" />,
    title: 'Business-focused design',
    text: 'Every recommendation is shaped around operations, usability, and growth.',
  },
];

const process = [
  {
    step: '01',
    title: 'Assess',
    text: 'We understand your site, priorities, and operational requirements.',
  },
  {
    step: '02',
    title: 'Plan',
    text: 'We design the right solution with performance, security, and scale in mind.',
  },
  {
    step: '03',
    title: 'Deploy',
    text: 'Implementation is handled with structure, quality, and communication.',
  },
  {
    step: '04',
    title: 'Support',
    text: 'We stay available with ongoing service, optimization, and future growth planning.',
  },
];

export default function About({ onNavigate }: AboutProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const goPrev = () => {
    setActiveSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goNext = () => {
    setActiveSlide((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <div className="bg-[#030d1f] min-h-screen">
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/About_Us.jpg"
            alt="About BinaryGuard"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#020b1a]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_24%),linear-gradient(135deg,rgba(2,11,26,0.96)_0%,rgba(2,11,26,0.82)_48%,rgba(2,11,26,0.96)_100%)]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-12 items-stretch">
            <div className="max-w-2xl self-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-xs tracking-[0.22em] px-4 py-2 mb-6">
                <Sparkles size={14} />
                ABOUT BINARYGUARD
              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.04] mb-5">
                Technology that protects,
                <span className="block text-cyan-400">connects, and scales.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-200/90 leading-8 max-w-xl mb-8">
                BinaryGuard delivers integrated IT, security, and smart infrastructure solutions
                for businesses that need dependable systems, modern execution, and long-term value.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-3.5 transition-colors"
                >
                  Talk to Our Team <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white px-6 py-3.5 transition-colors"
                >
                  Explore Services
                </button>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-sm p-6 max-w-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 text-cyan-300 flex items-center justify-center shrink-0">
                    <Quote size={22} />
                  </div>
                  <div>
                    <p className="text-white text-xl font-bold leading-8 mb-2">
                      We build better operating environments, not just isolated systems.
                    </p>
                    <p className="text-gray-400 leading-7 text-sm md:text-base">
                      Our focus is simple: combine protection, infrastructure, and usability into one
                      clean, scalable solution that works in the real world.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full flex">
              <div className="absolute -inset-10 bg-cyan-500/10 blur-3xl opacity-30 pointer-events-none" />
              <div className="relative flex w-full rounded-[30px] border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl shadow-cyan-950/20 overflow-hidden min-h-[650px]">
                <div className="flex flex-col w-full">
                  <div className="relative flex-1 min-h-[656px]">
                    {galleryImages.map((item, index) => (
                      <div
                        key={item.title}
                        className={`absolute inset-0 transition-all duration-700 ${
                          index === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                        }`}
                      >
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-cover scale-105 transition-transform duration-[6000ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#041224]/95 via-[#041224]/40 to-transparent" />
                        <div className="absolute left-0 right-0 bottom-0 p-6 md:p-8">
                          <p className="text-white text-2xl md:text-3xl font-bold mb-2">{item.title}</p>
                          <p className="text-gray-200/90 leading-7 max-w-xl">{item.text}</p>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={goPrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-[#061328]/70 hover:bg-[#0b1a31] text-white flex items-center justify-center transition-colors"
                      aria-label="Previous slide"
                      type="button"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <button
                      onClick={goNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-[#061328]/70 hover:bg-[#0b1a31] text-white flex items-center justify-center transition-colors"
                      aria-label="Next slide"
                      type="button"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4 p-5 border-t border-white/10 bg-[#071428]/90">
                    <div className="flex items-center gap-2">
                      {galleryImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveSlide(index)}
                          className={`h-2.5 rounded-full transition-all ${
                            activeSlide === index ? 'w-8 bg-cyan-400' : 'w-2.5 bg-white/30'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                          type="button"
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => onNavigate('solutions')}
                      className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"
                      type="button"
                    >
                      View our solutions <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#040e22]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
            <div className="rounded-[30px] border border-white/10 bg-[#0a1830]/95 p-14 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <span className="inline-block text-cyan-400 text-xs tracking-[0.22em] mb-4">
                WHO WE ARE
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-6">
                A practical partner for secure, connected, and efficient business operations.
              </h2>
              <div className="space-y-5 text-gray-300 leading-8 text-sm md:text-base">
                <p>
                  BinaryGuard helps organizations move beyond disconnected tools and fragmented systems.
                  We design environments where IT, security, monitoring, and smart technology work together.
                </p>
                <p>
                  Our role is to simplify the path from requirement to results. That means understanding
                  the business, planning the right architecture, deploying with care, and supporting the
                  system long after implementation.
                </p>
                <p>
                  We focus on clear communication, accountable delivery, and solutions that remain useful,
                  scalable, and easy to manage as your operation grows.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[30px] border border-white/10 bg-[#0a1830]/95 p-11 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                  <Shield size={24} className="text-cyan-400" />
                </div>
                <div>
                  <p className="text-cyan-300 text-xs tracking-[0.22em] mb-1">OUR MISSION</p>
                  <h3 className="text-white font-bold text-2xl">Mission</h3>
                </div>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-cyan-400/40 to-transparent mb-5" />
                  <p className="text-gray-200 leading-8 text-lg">
                  To deliver secure, reliable, and scalable technology solutions that help
                  businesses operate with confidence, visibility, and continuity.
                </p>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-[#0a1830]/95 p-11 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                  <Eye size={24} className="text-cyan-400" />
                  </div>
                  <div>
                   <p className="text-cyan-300 text-xs tracking-[0.22em] mb-1">OUR VISION</p>
                  <h3 className="text-white font-bold text-2xl">Vision</h3>
                </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-cyan-400/40 to-transparent mb-5" />
                  <p className="text-gray-200 leading-8 text-lg">
                  To be a trusted leader in integrated IT and security delivery, recognized for
                  modern execution, strong support, and long-term business value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#030d1f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="inline-block text-cyan-400 text-xs tracking-[0.22em] mb-3">
                WHAT MAKES US DIFFERENT
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Modern features with a cleaner business-first approach
              </h2>
            </div>
            <p className="text-gray-400 max-w-xl text-sm md:text-base">
              Instead of one crowded feature block in the hero, the key strengths are presented here
              as a cleaner section with more space and better balance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((item, index) => (
              <div
                key={index}
                className="rounded-[26px] border border-white/10 bg-[#061328] p-6 hover:border-cyan-400/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-7">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#040e22]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="inline-block text-cyan-400 text-xs tracking-[0.22em] mb-3">
                CORE CAPABILITIES
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Built for secure and connected operations
              </h2>
            </div>
            <p className="text-gray-400 max-w-xl text-sm md:text-base">
              Our services are designed to bring infrastructure, security, and digital operations
              together in one coordinated environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {capabilities.map((item, index) => (
              <div
                key={index}
                className="rounded-[26px] border border-white/10 bg-white/5 p-6 hover:border-cyan-400/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-7">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#030d1f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-[34px] border border-white/10 bg-gradient-to-br from-white/8 to-white/5 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-10 items-start">
              <div>
                <span className="inline-block text-cyan-400 text-xs tracking-[0.22em] mb-4">
                  OUR APPROACH
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5">
                  A structured path from planning to long-term support.
                </h2>
                <p className="text-gray-300 leading-8 text-sm md:text-base mb-8 max-w-2xl">
                  Every project follows a clear workflow so clients get better visibility, controlled
                  implementation, and systems that remain useful over time.
                </p>

                <div className="rounded-[24px] border border-cyan-400/20 bg-cyan-400/10 p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-cyan-300 mt-1 shrink-0" />
                    <p className="text-gray-200 leading-7 text-sm md:text-base">
                      We stay engaged beyond installation with guidance, support, and future-ready planning.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {process.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-2xl border border-white/10 bg-[#061328] px-5 py-5 flex items-start gap-4"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 font-bold flex items-center justify-center shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{item.title}</p>
                      <p className="text-gray-400 text-sm md:text-base leading-6 mt-1">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-3.5 transition-colors"
              >
                Start Your Project <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white px-6 py-3.5 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
