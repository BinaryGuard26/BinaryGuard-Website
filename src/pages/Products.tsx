import Footer from '../components/Footer';

type Page =
  | 'home'
  | 'about'
  | 'services'
  | 'products'
  | 'contact'
  | 'solutions';

interface ProductsProps {
  onNavigate: (page: Page) => void;
}

export default function Products({ onNavigate }: ProductsProps) {
  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col">

      <section className="relative overflow-hidden py-24 px-6 border-b border-white/10">

        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/Products.jpg"
            alt="Access Card Ordering Portal"
            className="w-full h-full object-cover opacity-20"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>

            <p className="text-cyan-400 font-semibold mb-3 tracking-wide uppercase text-sm">
              Door Access Card Ordering Portal
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              Access Card Ordering
              <br />
              Portal
            </h1>

            <p className="text-slate-300 leading-relaxed text-xl mb-10">
              Submit an access card purchase request for your organization
              through the approved corporate ordering portal. Authorized users
              can request new access cards using verified corporate email
              authentication and OTP validation. All requests are reviewed,
              processed, and managed through an enterprise approval workflow.
            </p>

            <div className="flex flex-wrap gap-4">

              <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-cyan-500/20">
                Order Access Card
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="border border-white/20 hover:border-cyan-400 text-white hover:text-cyan-400 px-8 py-4 rounded-2xl transition-all duration-300"
              >
                Contact Us
              </button>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">

            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />

            <img
              src="/access-card-reader.png"
              alt="Access Card Reader"
              className="relative rounded-3xl border border-white/10 shadow-2xl w-full object-cover"
            />

          </div>

        </div>

      </section>

      <Footer onNavigate={onNavigate} />

    </div>
  );
}
