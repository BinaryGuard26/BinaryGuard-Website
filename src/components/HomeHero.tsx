import {
  ArrowRight,
  Building2,
  Clock3,
  Factory,
  GraduationCap,
  Hospital,
  Landmark,
  MapPin,
  ShieldCheck,
  ShoppingCart,
  Zap,
} from 'lucide-react';

type HeroPage = 'contact' | 'solutions';

interface HomeHeroProps {
  onNavigate: (page: HeroPage) => void;
}

const metrics = [
  { icon: ShieldCheck, value: '500+', label: 'Projects\nDelivered' },
  { icon: Clock3, value: '24/7', label: 'Monitoring\n& Support' },
  { icon: Zap, value: '< 1 DAY', label: 'Typical First\nResponse' },
  { icon: ShieldCheck, value: '99.9%', label: 'System\nAvailability' },
  { icon: MapPin, value: 'CANADA', label: 'Nationwide\nService' },
];

const sectors = [
  { icon: Landmark, line1: 'GOVERNMENT', line2: 'OF CANADA' },
  { icon: GraduationCap, line1: 'EDUCATION', line2: 'INSTITUTIONS' },
  { icon: Hospital, line1: 'HEALTHCARE', line2: 'PROVIDERS' },
  { icon: Building2, line1: 'COMMERCIAL', line2: 'BUILDINGS' },
  { icon: ShoppingCart, line1: 'RETAIL', line2: 'BUSINESSES' },
  { icon: Factory, line1: 'INDUSTRIAL', line2: 'FACILITIES' },
];

function Sparkline() {
  return (
    <svg viewBox="0 0 180 48" className="h-10 w-full" aria-hidden="true">
      <polyline
        points="0,37 16,31 30,34 45,24 59,28 73,13 88,19 101,11 118,18 134,10 151,14 166,6 180,9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function HomeHero({ onNavigate }: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#020916] pt-[73px] text-white">
      <div className="absolute inset-0">
        <img
          src="/binaryGuard-operations.jpg"
          alt="BinaryGuard security operations centre"
          className="h-full w-full object-cover object-center opacity-65"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,7,18,.98)_0%,rgba(1,8,20,.92)_33%,rgba(1,11,27,.58)_62%,rgba(1,8,20,.40)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_77%_26%,rgba(0,197,255,.10),transparent_32%),linear-gradient(180deg,rgba(1,8,20,.12),rgba(1,8,20,.78))]" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-6 pb-0 pt-12 lg:px-10 lg:pt-16 xl:px-12">
        <div className="grid min-h-[560px] grid-cols-1 items-center gap-10 lg:grid-cols-[0.83fr_1.17fr] xl:min-h-[585px]">
          <div className="relative z-10 max-w-[610px] pb-8 lg:pb-14">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-400/[0.04] px-4 py-2 text-[12px] font-bold tracking-[0.13em] text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              MODERN SECURITY &amp; IT PARTNER
            </div>

            <h1 className="text-[42px] font-black leading-[1.08] tracking-[-0.025em] sm:text-[54px] lg:text-[58px] xl:text-[64px]">
              <span className="block">Enterprise-Grade</span>
              <span className="block">Physical Security,</span>
              <span className="mt-1 block text-cyan-400">IT &amp; Infrastructure</span>
              <span className="block text-cyan-400">Solutions</span>
            </h1>

            <p className="mt-6 max-w-[560px] text-[16px] leading-7 text-slate-300 sm:text-[17px]">
              BinaryGuard delivers integrated physical security and IT solutions that improve
              visibility, resilience, and operational control—designed for businesses that need
              dependable systems and a professional long-term partner.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-cyan-400 px-7 text-[13px] font-extrabold tracking-wide text-[#03101d] shadow-[0_0_28px_rgba(34,211,238,.20)] transition hover:bg-cyan-300"
              >
                GET FREE CONSULTATION
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('solutions')}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/25 bg-black/10 px-7 text-[13px] font-bold tracking-wide text-white transition hover:border-cyan-400/60 hover:bg-cyan-400/10"
              >
                EXPLORE SOLUTIONS
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-y-7 sm:grid-cols-5 sm:gap-y-0">
              {metrics.map(({ icon: Icon, value, label }, index) => (
                <div
                  key={value}
                  className={`min-w-0 pr-3 sm:px-4 ${index === 0 ? 'sm:pl-0' : 'sm:border-l sm:border-white/15'}`}
                >
                  <Icon size={27} className="mb-3 text-cyan-400" strokeWidth={1.8} />
                  <p className="text-[20px] font-black leading-none text-cyan-400">{value}</p>
                  <p className="mt-2 whitespace-pre-line text-[11px] leading-4 text-slate-300">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 hidden min-h-[540px] lg:block">
            <div className="absolute left-[7%] top-[16%] h-[155px] w-[31%] rounded border border-cyan-400/15 bg-[#061427]/70 p-2 shadow-2xl backdrop-blur-sm">
              <div className="grid h-full grid-cols-2 gap-2">
                {[0, 1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="relative overflow-hidden rounded-sm border border-white/5 bg-[linear-gradient(135deg,#0a2132,#06101f)]"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(34,211,238,.17),transparent_27%)]" />
                    <div className="absolute bottom-2 left-2 right-2 h-px bg-cyan-400/20" />
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute right-0 top-[2%] w-[68%] rounded-md border border-cyan-400/20 bg-[#061427]/90 p-4 shadow-[0_25px_60px_rgba(0,0,0,.42)] backdrop-blur-md xl:p-5">
              <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3">
                <p className="text-[12px] font-semibold tracking-wide text-slate-300">SECURITY OPERATIONS DASHBOARD</p>
                <ArrowRight size={16} className="text-cyan-400" />
              </div>

              <div className="grid grid-cols-[1.25fr_.75fr_.75fr] gap-3">
                <div className="rounded border border-white/5 bg-[#071829]/80 p-2">
                  <p className="mb-2 text-[9px] font-semibold text-slate-400">LIVE VIEW</p>
                  <div className="grid h-[118px] grid-cols-2 gap-1.5">
                    {[0, 1, 2, 3].map((item) => (
                      <div key={item} className="bg-[linear-gradient(135deg,#15334a,#07131f)]" />
                    ))}
                  </div>
                </div>

                <div className="rounded border border-white/5 bg-[#071829]/80 p-3">
                  <p className="text-[9px] font-semibold text-slate-400">SYSTEM STATUS</p>
                  <div className="mx-auto mt-4 flex h-20 w-20 items-center justify-center rounded-full border-[7px] border-cyan-400/25 shadow-[inset_0_0_0_3px_rgba(52,211,153,.75)]">
                    <div className="text-center">
                      <p className="text-[18px] font-bold">99.9%</p>
                      <p className="text-[7px] text-slate-400">OPERATIONAL</p>
                    </div>
                  </div>
                </div>

                <div className="rounded border border-white/5 bg-[#071829]/80 p-3">
                  <p className="text-[9px] font-semibold text-slate-400">ACTIVE ALERTS</p>
                  <p className="mt-4 text-[28px] font-light">12</p>
                  <p className="text-[8px] font-semibold text-red-400">CRITICAL</p>
                  <p className="mt-8 text-[8px] text-cyan-400">View all alerts →</p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-3">
                <div className="rounded border border-white/5 bg-[#071829]/80 p-3">
                  <p className="text-[9px] text-slate-400">ACCESS CONTROL</p>
                  <p className="mt-3 text-[10px] text-emerald-400">All Systems</p>
                  <p className="text-[11px] font-semibold text-cyan-300">0 Secure</p>
                </div>

                <div className="rounded border border-white/5 bg-[#071829]/80 p-3 text-cyan-400">
                  <p className="text-[9px] text-slate-400">NETWORK STATUS</p>
                  <div className="mt-2 flex items-center justify-between text-[9px] text-slate-300">
                    <span>12,248</span>
                    <span>Online</span>
                  </div>
                  <Sparkline />
                </div>

                <div className="rounded border border-white/5 bg-[#071829]/80 p-3 text-emerald-400">
                  <p className="text-[9px] text-slate-400">THREAT MONITORING</p>
                  <p className="mt-2 text-[10px]">Low Risk</p>
                  <Sparkline />
                </div>
              </div>
            </div>

            <div className="absolute bottom-[5%] left-[18%] right-[2%] grid grid-cols-3 gap-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="h-[155px] rounded border border-cyan-400/15 bg-[linear-gradient(145deg,#09223a,#061220)] shadow-xl"
                >
                  <div className="h-full w-full bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,.14),transparent_30%)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-cyan-400/10 bg-[#061426]/92 px-6 py-5 backdrop-blur-md lg:px-10">
        <p className="mb-5 text-center text-[11px] font-bold tracking-[0.14em] text-cyan-400">
          TRUSTED BY ORGANIZATIONS ACROSS CANADA
        </p>

        <div className="mx-auto grid max-w-[1450px] grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {sectors.map(({ icon: Icon, line1, line2 }) => (
            <div key={line1} className="flex items-center gap-3 text-slate-400">
              <Icon size={31} strokeWidth={1.35} className="shrink-0" />
              <div className="text-[10px] font-semibold leading-[1.25] tracking-wide sm:text-[11px]">
                <p>{line1}</p>
                <p>{line2}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
