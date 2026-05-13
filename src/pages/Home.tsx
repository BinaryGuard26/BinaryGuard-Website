import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Globe,
  Shield,
  Server,
  Camera,
  Lock,
  Phone,
  Monitor,
  Cloud,
  Cpu,
  Wrench,
  Settings,
  Star,
  ChevronRight,
  CheckCircle,
  Clock,
} from 'lucide-react';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'solutions' | 'feedback';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const trustMetrics = [
  { value: '24/7', label: 'Monitoring & support' },
  { value: '< 1 Day', label: 'Typical first response' },
  { value: 'End-to-End', label: 'Security + IT delivery' },
];

const pillars = [
  {
    icon: <Shield size={26} className="text-cyan-400" />,
    title: 'Integrated Security',
    description: 'Access control, surveillance, alarm, and perimeter technologies designed to work as one resilient ecosystem.',
  },
  {
    icon: <Server size={26} className="text-cyan-400" />,
    title: 'Reliable IT Infrastructure',
    description: 'Modern networks, systems, and cloud foundations built for uptime, performance, and long-term scalability.',
  },
  {
    icon: <Globe size={26} className="text-cyan-400" />,
    title: 'Multi-Site Visibility',
    description: 'Centralized management and reporting for offices, campuses, retail, hospitality, and distributed operations.',
  },
  {
    icon: <Clock size={26} className="text-cyan-400" />,
    title: 'Fast Project Delivery',
    description: 'From design to deployment, our team keeps projects structured, transparent, and aligned to business goals.',
  },
];

const solutionCards = [
  {
    icon: <Camera size={28} className="text-cyan-400" />,
    title: 'Video Surveillance',
    description: 'Smart CCTV systems with remote visibility, analytics-ready architecture, and dependable site coverage.',
  },
  {
    icon: <Lock size={28} className="text-cyan-400" />,
    title: 'Access Control',
    description: 'Credential, biometric, and visitor-management solutions that strengthen site control without slowing operations.',
  },
  {
    icon: <Server size={28} className="text-cyan-400" />,
    title: 'Network & Structured Cabling',
    description: 'Secure wired and wireless infrastructure designed for performance, growth, and operational continuity.',
  },
  {
    icon: <Cloud size={28} className="text-cyan-400" />,
    title: 'Cloud & Microsoft 365',
    description: 'Practical cloud adoption, collaboration tools, and system modernization tailored to your environment.',
  },
  {
    icon: <Cpu size={28} className="text-cyan-400" />,
    title: 'Automation & Smart Systems',
    description: 'Modern business technology, integrations, and workflow improvements that reduce friction and improve control.',
  },
  {
    icon: <Monitor size={28} className="text-cyan-400" />,
    title: 'Managed Support',
    description: 'Responsive support, maintenance, and proactive service to keep systems secure, available, and optimized.',
  },
];

const deliverySteps = [
  {
    step: '01',
    title: 'Assess',
    text: 'We review your site, business needs, risk areas, and technical requirements.',
    icon: <Globe size={20} className="text-cyan-400" />,
  },
  {
    step: '02',
    title: 'Design',
    text: 'We create a practical architecture covering infrastructure, hardware, software, and rollout strategy.',
    icon: <Settings size={20} className="text-cyan-400" />,
  },
  {
    step: '03',
    title: 'Deploy',
    text: 'Our team installs, configures, tests, and validates the full environment for launch readiness.',
    icon: <Wrench size={20} className="text-cyan-400" />,
  },
  {
    step: '04',
    title: 'Support',
    text: 'We stay involved with maintenance, guidance, monitoring, and future expansion planning.',
    icon: <Phone size={20} className="text-cyan-400" />,
  },
];

const highlights = [
  'Enterprise-grade security and IT under one delivery partner',
  'Designed for offices, retail, hospitality, education, and multi-site operations',
  'Scalable solutions aligned to growth, uptime, and visibility',
  'Professional implementation with ongoing support and optimization',
];

type Review = {
  id: string;
  name: string;
  company: string | null;
  role: string | null;
  rating: number;
  message: string;
};

const fallbackReviews: Review[] = [
  {
    id: 'fallback-operations-manager',
    name: 'Operations Manager',
    company: 'Commercial Facilities Client',
    role: 'Operations Manager',
    rating: 5,
    message: 'BinaryGuard helped us standardize security and networking across sites. The rollout was clean, organized, and far more strategic than our previous vendors.',
  },
  {
    id: 'fallback-it-lead',
    name: 'IT Lead',
    company: 'Hospitality Group',
    role: 'IT Lead',
    rating: 5,
    message: 'They understood both the security side and the infrastructure side, which made the project much smoother. Communication and follow-through were excellent.',
  },
  {
    id: 'fallback-business-director',
    name: 'Business Director',
    company: 'Multi-Location Enterprise',
    role: 'Business Director',
    rating: 5,
    message: 'From consultation to deployment, the team delivered a modern solution that improved visibility, support responsiveness, and operational confidence.',
  },
];

export default function Home({ onNavigate }: HomeProps) {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('client_reviews')
          .select('id, name, company, role, rating, message')
          .eq('approved', true)
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) {
          console.error('Failed to load Supabase reviews:', error);
          return;
        }

        if (Array.isArray(data) && data.length > 0) {
          setReviews(
            data.map((item) => ({
              id: String(item.id),
              name: String(item.name || 'Client'),
              company: item.company ? String(item.company) : null,
              role: item.role ? String(item.role) : null,
              rating: Number(item.rating) || 5,
              message: String(item.message || ''),
            }))
          );
        }
      } catch (error) {
        console.error('Failed to connect to Supabase reviews:', error);
      } finally {
        setReviewsLoading(false);
      }
    };

    loadReviews();
  }, []);

  return (
    <div className="bg-[#030d1f] min-h-screen">
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/Home.jpg"
            className="w-full h-full object-cover object-center"
          >
            <source src="/home-hero-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#020816]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020816]/95 via-[#020816]/82 to-[#020816]/45" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_28%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-xs tracking-[0.22em] px-4 py-2 rounded-full mb-6">
              MODERN SECURITY & IT PARTNER
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.02] mb-4">
              <span className="block text-[0.58em] md:text-[0.54em] font-extrabold tracking-[0.04em] text-white mb-2">
                Enterprise-Grade Physical
              </span>

              <span className="block text-cyan-400 whitespace-nowrap">
                Security &amp; IT Solutions
              </span>
            </h1>

            <p className="text-lg text-gray-200/95 leading-8 max-w-2xl mb-8">
              BinaryGuard delivers integrated physical security and IT solutions that improve
              visibility, resilience, and operational control—designed for businesses that need
              dependable systems and a professional long-term partner.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-7 py-3.5 transition-all"
              >
                Get Free Consultation <ArrowRight size={18} />
              </button>
              <button
                onClick={() => onNavigate('solutions')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold px-7 py-3.5 transition-all"
              >
                Explore Solutions <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
              {trustMetrics.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4">
                  <p className="text-cyan-400 text-2xl font-extrabold">{item.value}</p>
                  <p className="text-gray-300 text-sm mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:justify-self-end w-full max-w-md">
            <div className="rounded-[28px] border border-white/15 bg-white/10 backdrop-blur-md p-6 shadow-2xl shadow-cyan-950/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-400/15 text-cyan-300 flex items-center justify-center">
                  <Shield size={24} />
                </div>
                <div>
                  <p className="text-white font-semibold">Top-class delivery focus</p>
                  <p className="text-gray-400 text-sm">Security, IT, support, and deployment aligned.</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {highlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#051326]/70 px-4 py-3">
                    <CheckCircle size={18} className="text-cyan-400 mt-0.5 shrink-0" />
                    <p className="text-gray-200 text-sm leading-6">{item}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-4">
                <p className="text-cyan-300 text-sm font-semibold mb-1">Need a tailored rollout plan?</p>
                <p className="text-gray-200 text-sm leading-6 mb-4">
                  Tell us about your site, requirements, or expansion goals and we will help map the right approach.
                </p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                >
                  Start your project discussion <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#040e22]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-cyan-400 text-sm font-semibold tracking-[0.22em]">WHY BINARYGUARD</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-4">A more premium standard for security and IT delivery</h2>
            <p className="text-gray-400 leading-8">
              We combine practical engineering, modern design thinking, and responsive support so your business gets a solution that performs well today and scales with tomorrow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {pillars.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-[#061327] p-6 hover:border-cyan-400/40 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-7">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#030d1f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-cyan-400 text-sm font-semibold tracking-[0.22em]">CORE CAPABILITIES</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-4">Solutions built for real operations</h2>
              <p className="text-gray-400 leading-8">
                From enterprise protection to modern workplace infrastructure, we design and deploy systems that help businesses operate with confidence.
              </p>
            </div>
            <button
              onClick={() => onNavigate('solutions')}
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              View all solutions <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {solutionCards.map((item) => (
              <div key={item.title} className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/6 to-white/0 p-6 hover:border-cyan-400/35 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#08172b] border border-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-500 group-hover:text-cyan-300 transition-colors">BinaryGuard</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-7 mb-5">{item.description}</p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Request details <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#040e22]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div>
            <span className="text-cyan-400 text-sm font-semibold tracking-[0.22em]">OUR PROCESS</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-5">A delivery model that keeps projects clear and controlled</h2>
            <p className="text-gray-400 leading-8 mb-8">
              We keep projects structured from first consultation through post-deployment support, helping reduce risk and improve outcomes for stakeholders, users, and operations teams.
            </p>
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3 transition-all"
            >
              Learn about our services <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {deliverySteps.map((item) => (
              <div key={item.step} className="rounded-3xl border border-white/10 bg-[#061327] p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-extrabold text-white/15">{item.step}</span>
                  <div className="w-10 h-10 rounded-2xl bg-cyan-400/10 flex items-center justify-center">{item.icon}</div>
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
          <div className="rounded-[32px] overflow-hidden border border-white/10 bg-[#061327] grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[340px]">
              <img src="/binaryGuard-operations.jpg" alt="BinaryGuard operations" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030d1f]/15 via-[#030d1f]/25 to-[#030d1f]/85" />
            </div>
            <div className="p-8 md:p-10 lg:p-12">
              <span className="text-cyan-400 text-sm font-semibold tracking-[0.22em]">BUSINESS READY</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-5">Built for organizations that need confidence, not complexity</h2>
              <p className="text-gray-400 leading-8 mb-8">
                Whether you are upgrading a site, standardizing multiple locations, or modernizing your infrastructure, BinaryGuard helps you move forward with a solution that is secure, scalable, and professionally delivered.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Scalable architecture for future expansion',
                  'Professional implementation with minimal disruption',
                  'Unified approach across security, networking, and support',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-cyan-400 mt-1 shrink-0" />
                    <p className="text-gray-300 text-sm leading-7">{item}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Learn more about BinaryGuard <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#040e22]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-cyan-400 text-sm font-semibold tracking-[0.22em]">CLIENT FEEDBACK</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-4">Trusted by businesses that value professionalism</h2>
              <p className="text-gray-400 leading-8">
                Published feedback is loaded from approved client submissions in Supabase.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('feedback')}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-300 hover:bg-cyan-400/15 transition-all"
            >
              Leave feedback <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-3xl border border-white/10 bg-[#061327] p-6 hover:border-cyan-400/35 transition-all">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: Math.max(1, Math.min(5, review.rating || 5)) }).map((_, idx) => (
                    <Star key={idx} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-7 mb-6">“{review.message}”</p>
                <div>
                  <p className="text-white font-semibold">{review.role || review.name}</p>
                  <p className="text-gray-500 text-sm mt-1">{review.company || 'Verified Client'}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-sm text-gray-500">
            {reviewsLoading ? 'Loading approved client feedback…' : 'Displaying approved feedback from Supabase.'}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#030d1f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-[32px] border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-white/5 to-cyan-500/10 p-8 md:p-10 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-cyan-400 text-sm font-semibold tracking-[0.22em]">START YOUR NEXT PROJECT</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-4">Ready to upgrade your security and IT environment?</h2>
              <p className="text-gray-300 leading-8">
                Let’s plan a solution that fits your business, site conditions, operational goals, and future growth.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-7 py-3.5 transition-all shrink-0"
            >
              Contact BinaryGuard <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
