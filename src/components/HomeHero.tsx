type HeroPage = 'contact' | 'solutions';

interface HomeHeroProps {
  onNavigate: (page: HeroPage) => void;
}

const metrics = [
  { value: '500+', label: 'Projects\nDelivered' },
  { value: '24/7', label: 'Monitoring\n& Support' },
  { value: '< 1 DAY', label: 'Typical First\nResponse' },
  { value: '99.9%', label: 'System\nAvailability' },
  { value: 'CANADA', label: 'Nationwide\nService' },
];

const sectors = [
  ['GOVERNMENT', 'INSTITUTIONS'],
  ['EDUCATION', 'INSTITUTIONS'],
  ['HEALTHCARE', 'PROVIDERS'],
  ['COMMERCIAL', 'BUILDINGS'],
  ['RETAIL', 'BUSINESSES'],
  ['INDUSTRIAL', 'FACILITIES'],
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MetricIcon({ index }: { index: number }) {
  const paths = [
    <path key="a" d="M12 3l7 3v5c0 5-3.2 8.2-7 10-3.8-1.8-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.7" fill="none" />,
    <path key="b" d="M12 5v7l4 2M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="1.7" fill="none" />,
    <path key="c" d="M13 2L5 14h6l-1 8 8-12h-6l1-8z" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round" />,
    <path key="d" d="M12 3l7 3v5c0 5-3.2 8.2-7 10-3.8-1.8-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.7" fill="none" />,
    <path key="e" d="M12 21s6-5.3 6-11a6 6 0 10-12 0c0 5.7 6 11 6 11zM12 12a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.7" fill="none" />,
  ];
  return <svg viewBox="0 0 24 24" className="mb-3 h-7 w-7 text-cyan-400" aria-hidden="true">{paths[index]}</svg>;
}

function SectorIcon({ index }: { index: number }) {
  const shapes = [
    <path key="0" d="M4 22h20M7 22V10h18v12M10 10V6h12v4M12 14h2m4 0h2m-8 4h2m4 0h2" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />,
    <path key="1" d="M4 11l12-6 12 6-12 6-12-6zm5 4v6m14-6v6M12 22h8" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    <path key="2" d="M12 4h8v6h6v8h-6v6h-8v-6H6v-8h6V4z" stroke="currentColor" strokeWidth="1.4" fill="none" />,
    <path key="3" d="M4 24h24M7 24V9h7v15m3 0V5h8v19M9 13h3m-3 4h3m7-8h4m-4 4h4m-4 4h4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />,
    <path key="4" d="M5 7h3l2 10h12l3-7H10M12 21a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm11 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
    <path key="5" d="M4 24h24M7 24v-9l6 3v-7l6 3V8l6 3v13M9 20h2m4 0h2m4 0h2" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  ];
  return <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">{shapes[index]}</svg>;
}

export default function HomeHero({ onNavigate }: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#020916] pt-[73px] text-white">
      <div className="absolute inset-0 z-0">
        <img
          src="/binaryGuard-operations.jpg"
          alt="BinaryGuard security operations centre"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#020916]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020916]/98 via-[#020916]/82 to-[#020916]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020916]/90 via-transparent to-[#020916]/25" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1536px] px-6 pt-12 lg:px-10 lg:pt-16 xl:px-12">
        <div className="min-h-[555px] flex items-center">
          <div className="relative z-10 max-w-[760px] pb-10 lg:pb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-[#020916]/55 px-4 py-2 text-[12px] font-bold tracking-[0.13em] text-cyan-300 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              MODERN SECURITY &amp; IT PARTNER
            </div>

            <h1 className="text-[42px] font-black leading-[1.06] tracking-[-0.025em] sm:text-[52px] lg:text-[58px] xl:text-[64px]">
              <span className="block">Enterprise-Grade</span>
              <span className="block">Physical Security,</span>
              <span className="mt-1 block text-cyan-400">IT &amp; Infrastructure</span>
              <span className="block text-cyan-400">Solutions</span>
            </h1>

            <p className="mt-6 max-w-[560px] text-[16px] leading-7 text-slate-200">
              BinaryGuard delivers integrated physical security and IT solutions that improve visibility,
              resilience, and operational control—designed for businesses that need dependable systems
              and a professional long-term partner.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-cyan-400 px-7 text-[13px] font-extrabold tracking-wide text-[#03101d] shadow-[0_0_28px_rgba(34,211,238,.20)] transition hover:bg-cyan-300"
              >
                GET FREE CONSULTATION
                <ArrowIcon />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('solutions')}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/30 bg-[#020916]/40 px-7 text-[13px] font-bold tracking-wide text-white backdrop-blur-sm transition hover:border-cyan-400/60 hover:bg-cyan-400/10"
              >
                EXPLORE SOLUTIONS
                <ArrowIcon />
              </button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-y-7 sm:grid-cols-5 sm:gap-y-0">
              {metrics.map((item, index) => (
                <div
                  key={item.value}
                  className={`min-w-0 pr-3 sm:px-4 ${index === 0 ? 'sm:pl-0' : 'sm:border-l sm:border-white/15'}`}
                >
                  <MetricIcon index={index} />
                  <p className="text-[20px] font-black leading-none text-cyan-400">{item.value}</p>
                  <p className="mt-2 whitespace-pre-line text-[11px] leading-4 text-slate-200">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-cyan-400/10 bg-[#061426]/95 px-6 py-5 backdrop-blur-md lg:px-10">
        <p className="mb-5 text-center text-[11px] font-bold tracking-[0.14em] text-cyan-400">
          TRUSTED BY ORGANIZATIONS ACROSS CANADA
        </p>

        <div className="mx-auto grid max-w-[1450px] grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {sectors.map(([line1, line2], index) => (
            <div key={line1} className="flex items-center gap-3 text-slate-400">
              <SectorIcon index={index} />
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
