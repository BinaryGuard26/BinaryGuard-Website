type AccessControlProps = {
  onNavigate?: (page: string) => void;
};

export default function AccessControl({ onNavigate }: AccessControlProps) {
  return (
    <section className="min-h-screen bg-[#020817] text-white px-8 py-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-cyan-400 font-semibold tracking-wide mb-6 uppercase">
            Door Access Card Ordering Portal
          </p>

          <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight mb-8">
            Access Card <br />
            Ordering <br />
            Portal
          </h1>

          <p className="text-lg text-slate-300 leading-9 max-w-2xl mb-10">
            Submit an access card purchase request for your organization
            through the approved corporate ordering portal. Authorized users can
            request new access cards using verified corporate email
            authentication and OTP validation. All requests are reviewed,
            processed, and managed through an enterprise approval workflow.
          </p>

          <div className="flex flex-wrap gap-5">
            <button
              onClick={() => onNavigate?.("access-card-portal")}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-cyan-500/30"
            >
              Order Access Card
            </button>

            <button
              onClick={() => onNavigate?.("contact")}
              className="border border-white/20 hover:border-cyan-400 text-white font-semibold px-8 py-4 rounded-2xl"
            >
              Contact Us
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-cyan-500/20 blur-3xl rounded-[2rem]" />

          <img
            src="/access-card-reader.png"
            alt="Access card reader"
            className="relative w-full h-[520px] object-cover rounded-[2rem] border border-white/10 shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
