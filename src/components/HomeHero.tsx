import { useEffect, useRef, useState } from 'react';

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

const brands = [
  { name: 'Cisco', domain: 'cisco.com', url: 'https://www.cisco.com/' },
  { name: 'AXIS', domain: 'axis.com', url: 'https://www.axis.com/' },
  { name: 'UNIFI', domain: 'ui.com', url: 'https://www.ui.com/' },
  { name: 'BOSCH', domain: 'boschsecurity.com', url: 'https://www.boschsecurity.com/' },
  { name: 'APC', domain: 'se.com', url: 'https://www.se.com/ca/en/brands/apc/' },
  { name: 'Cyberlink', domain: 'cyberlink.com', url: 'https://www.cyberlink.com/' },
  { name: '2N', domain: '2n.com', url: 'https://www.2n.com/en-US/' },
  { name: 'TRIPP-LITE', domain: 'tripplite.eaton.com', url: 'https://tripplite.eaton.com/' },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MetricIcon({ index }: { index: number }) {
  const icons = [
    <path key="shield" d="M12 3.2 19 6v5.2c0 4.5-2.8 7.6-7 9.8-4.2-2.2-7-5.3-7-9.8V6l7-2.8Z" />,
    <g key="clock"><circle cx="12" cy="12" r="8.3" /><path d="M12 7.8v4.7l3.2 2" /></g>,
    <path key="bolt" d="M13.2 2.8 6.5 13h5l-.7 8.2 6.7-10.3h-5l.7-8.1Z" />,
    <g key="availability"><path d="M12 3.2 19 6v5.2c0 4.5-2.8 7.6-7 9.8-4.2-2.2-7-5.3-7-9.8V6l7-2.8Z" /><path d="m8.8 12 2.1 2.1 4.5-4.5" /></g>,
    <g key="location"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" /><circle cx="12" cy="10" r="2.1" /></g>,
  ];

  return (
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-md">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {icons[index]}
      </svg>
    </div>
  );
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
  const [brandIndex, setBrandIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragRotation, setDragRotation] = useState(0);
  const dragStartX = useRef(0);
  const dragDistance = useRef(0);
  const suppressClick = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || isDragging) return;

    const timer = window.setInterval(() => {
      setBrandIndex((current) => (current + 1) % brands.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [isDragging]);

  const previousBrand = () => {
    setDragRotation(0);
    setBrandIndex((current) => (current - 1 + brands.length) % brands.length);
  };

  const nextBrand = () => {
    setDragRotation(0);
    setBrandIndex((current) => (current + 1) % brands.length);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX;
    dragDistance.current = 0;
    suppressClick.current = false;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const distance = event.clientX - dragStartX.current;
    dragDistance.current = distance;
    if (Math.abs(distance) > 8) suppressClick.current = true;
    setDragRotation(distance * 0.28);
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const steps = Math.round(-dragRotation / 45);
    if (steps !== 0) {
      setBrandIndex((current) => (current + steps + brands.length * 10) % brands.length);
    }

    setDragRotation(0);
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#020916] pt-[73px] text-white">
      <style>{`
        @keyframes bgSolutionsBlade {
          0% { background-position: 165% 50%; }
          100% { background-position: -65% 50%; }
        }

        .bg-solutions-motion {
          display: inline-block;
          color: transparent;
          background-image: linear-gradient(
            105deg,
            #22d3ee 0%,
            #22d3ee 43%,
            #7dd3fc 46%,
            #ffffff 48.5%,
            #ffffff 50.5%,
            #67e8f9 53%,
            #22d3ee 56%,
            #22d3ee 100%
          );
          background-size: 240% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: bgSolutionsBlade 2.35s linear infinite;
          will-change: background-position;
        }

        @media (prefers-reduced-motion: reduce) {
          .bg-solutions-motion {
            animation: none;
            background-position: 50% 50%;
          }
        }
      `}</style>

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-ops-dashboard.png')" }}
      />
      <div className="absolute inset-0 bg-[rgba(2,9,22,0.20)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(0,180,255,.04),transparent_34%)]" />

      <div className="relative mx-auto max-w-[1536px] px-6 pt-12 lg:px-10 lg:pt-16 xl:px-12">
        <div className="grid min-h-[555px] items-center gap-8 xl:grid-cols-[0.95fr_0.65fr]">
          <div className="relative z-10 max-w-[760px] pb-10 lg:pb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-400/[0.04] px-4 py-2 text-[12px] font-bold tracking-[0.13em] text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              MODERN SECURITY &amp; IT PARTNER
            </div>

            <h1 className="text-[42px] font-black leading-[1.06] tracking-[-0.025em] sm:text-[52px] lg:text-[58px] xl:text-[64px]">
              <span className="block">Enterprise-Grade</span>
              <span className="block">Physical Security,</span>
              <span className="mt-1 block text-cyan-400">IT &amp; Infrastructure</span>
              <span className="block overflow-visible">
                <span className="bg-solutions-motion">Solutions</span>
              </span>
            </h1>

            <p className="mt-6 max-w-[560px] text-[16px] leading-7 text-slate-300">
              BinaryGuard delivers integrated physical security and IT solutions that improve visibility,
              resilience, and operational control designed for businesses that need dependable systems
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
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/25 bg-black/10 px-7 text-[13px] font-bold tracking-wide text-white transition hover:border-cyan-400/60 hover:bg-cyan-400/10"
              >
                EXPLORE SOLUTIONS
                <ArrowIcon />
              </button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {metrics.map((item, index) => (
                <div
                  key={item.value}
                  className="group min-w-0 rounded-2xl border border-white/20 bg-white/[0.10] px-4 py-4 shadow-[0_8px_30px_rgba(0,0,0,.16),inset_0_1px_0_rgba(255,255,255,.14)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/35 hover:bg-white/[0.15]"
                >
                  <MetricIcon index={index} />
                  <p className="text-[18px] font-black leading-none text-white">{item.value}</p>
                  <p className="mt-2 whitespace-pre-line text-[10px] leading-4 text-white/75">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 hidden xl:flex xl:justify-end">
            <div className="w-full max-w-[520px] rounded-3xl bg-[#041326]/20 p-5 shadow-[0_20px_70px_rgba(0,0,0,.22)] backdrop-blur-sm">
              <div className="mb-2">
                <p className="text-[11px] font-bold tracking-[0.16em] text-cyan-300">TECHNOLOGY BRANDS</p>
                <p className="mt-1 max-w-[390px] text-sm leading-5 text-slate-300">
                  Explore trusted technology partners supporting our security, networking, power, and infrastructure solutions.
                </p>
              </div>

              <div
                className={`relative mx-auto h-[340px] w-full select-none overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{ perspective: '1100px', touchAction: 'pan-y' }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={finishDrag}
                onPointerCancel={finishDrag}
              >
                <button
                  type="button"
                  aria-label="Show previous brand"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={previousBrand}
                  className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-2xl text-white backdrop-blur-sm transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
                >
                  ‹
                </button>

                <button
                  type="button"
                  aria-label="Show next brand"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={nextBrand}
                  className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-2xl text-white backdrop-blur-sm transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
                >
                  ›
                </button>

                <div
                  className={`absolute left-1/2 top-1/2 h-[128px] w-[132px] ease-out ${isDragging ? '' : 'transition-transform duration-700'}`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `translate(-50%, -50%) rotateY(${-brandIndex * 45 + dragRotation}deg)`,
                  }}
                >
                  {brands.map((brand, index) => {
                    const angle = index * 45;
                    const isActive = index === brandIndex;
                    return (
                      <a
                        key={brand.name}
                        href={brand.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`Open ${brand.name} website`}
                        onClick={(event) => {
                          if (suppressClick.current) {
                            event.preventDefault();
                            suppressClick.current = false;
                          }
                        }}
                        draggable={false}
                        className={`absolute left-0 top-0 flex h-[128px] w-[132px] flex-col items-center justify-center rounded-2xl border px-3 py-3 text-center transition-[border-color,background-color,box-shadow] duration-500 ${
                          isActive
                            ? 'border-cyan-300/90 bg-[#0b233d]/95 shadow-[0_0_34px_rgba(34,211,238,.34)]'
                            : 'border-white/15 bg-[#07182d]/88 shadow-[0_12px_30px_rgba(0,0,0,.24)]'
                        }`}
                        style={{
                          transform: `rotateY(${angle}deg) translateZ(${isActive ? 238 : 205}px) scale(${isActive ? 1.14 : 1})`,
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        <div className={`flex items-center justify-center rounded-xl bg-white/95 p-2.5 shadow-sm transition-all duration-500 ${isActive ? 'h-16 w-16' : 'h-14 w-14'}`}>
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`}
                            alt={`${brand.name} brand`}
                            className="h-full w-full select-none object-contain"
                            loading="lazy"
                            draggable={false}
                          />
                        </div>
                        <span className={`mt-3 font-extrabold tracking-[0.08em] text-white transition-all duration-500 ${isActive ? 'text-[13px] text-cyan-100' : 'text-[12px]'}`}>
                          {brand.name}
                        </span>
                      </a>
                    );
                  })}
                </div>

                <div className="pointer-events-none absolute bottom-6 left-1/2 h-10 w-[300px] -translate-x-1/2 rounded-[50%] bg-cyan-400/10 blur-2xl" />
              </div>

              <div className="mt-1 flex items-center justify-center gap-1.5">
                {brands.map((brand, index) => (
                  <button
                    key={brand.name}
                    type="button"
                    aria-label={`Rotate to ${brand.name}`}
                    onClick={() => {
                      setDragRotation(0);
                      setBrandIndex(index);
                    }}
                    className={`h-1.5 rounded-full transition-all ${index === brandIndex ? 'w-7 bg-cyan-300' : 'w-1.5 bg-white/25 hover:bg-white/50'}`}
                  />
                ))}
              </div>

              <p className="mt-3 text-center text-xs text-slate-400">
                Drag the carousel or use the arrows to explore each technology brand.
              </p>
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
