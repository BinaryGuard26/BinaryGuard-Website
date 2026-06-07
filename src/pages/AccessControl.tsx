type AccessControlProps = {
  onNavigate?: (page: string) => void;
};

export default function AccessControl({ onNavigate }: AccessControlProps) {
  return (
    <main className="min-h-screen bg-[#020817] text-white pt-24">
      <section className="relative overflow-hidden px-6 py-20 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(6,182,212,0.16),transparent_35%),linear-gradient(135deg,#020817_0%,#020817_55%,#031525_100%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
              Door Access Card Ordering Portal
            </p>

            <h1 className="mb-8 text-6xl font-extrabold leading-tight tracking-tight text-white lg:text-7xl">
              Access Card <br />
              Ordering <br />
              Portal
            </h1>

            <p className="mb-10 max-w-2xl text-lg leading-9 text-slate-200">
              Submit an access card purchase request for your organization through the approved
              corporate ordering portal. Authorized users can request new access cards using
              verified corporate email authentication and OTP validation. All requests are reviewed,
              processed, and managed through an enterprise approval workflow.
            </p>

            <div className="flex flex-wrap gap-5">
              <button
                type="button"
                onClick={() => onNavigate?.('access-card-portal')}
                className="rounded-2xl bg-cyan-500 px-8 py-4 font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400"
              >
                Order Access Card
              </button>

              <button
                type="button"
                onClick={() => onNavigate?.('contact')}
                className="rounded-2xl border border-white/20 px-8 py-4 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
              >
                Contact Us
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-cyan-500/20 blur-3xl" />
            <img
              src="/access-card-reader.png"
              alt="Access card reader"
              className="relative h-[520px] w-full rounded-[2rem] border border-white/10 object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
