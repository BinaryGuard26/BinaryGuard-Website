import Footer from '../components/Footer';

type Page =
  | 'home'
  | 'about'
  | 'services'
  | 'products'
  | 'contact'
  | 'solutions'
  | 'access-card-login';

interface AccessCardLoginProps {
  onNavigate: (page: Page) => void;
}

export default function AccessCardLogin({ onNavigate }: AccessCardLoginProps) {
  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col">

      <section className="relative flex-1 flex items-center justify-center px-6 py-24 overflow-hidden">

        <div className="absolute inset-0">
          <img
            src="/Products.jpg"
            alt="Access Card Login Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/95 to-slate-950" />
        </div>

        <div className="relative w-full max-w-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl">

          <p className="text-cyan-400 font-semibold uppercase tracking-wide text-sm mb-3">
            Access Card Login Page
          </p>

          <h1 className="text-4xl font-bold mb-5">
            Verify Corporate Email
          </h1>

          <p className="text-slate-300 leading-relaxed mb-8">
            Enter your approved corporate email address to continue with your
            access card purchase request.
          </p>

          <label className="block text-sm text-slate-300 mb-3">
            Corporate Email Address
          </label>

          <input
            type="email"
            placeholder="user@gov.mb.ca"
            className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 mb-6"
          />

          <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-cyan-500/20">
            Continue
          </button>

          <p className="text-slate-500 text-sm mt-6">
            Only approved corporate email domains are allowed to access this ordering portal.
          </p>

          <button
            onClick={() => onNavigate('products')}
            className="mt-6 text-slate-400 hover:text-cyan-400 text-sm transition-colors"
          >
            Back to Products
          </button>

        </div>

      </section>

      <Footer onNavigate={onNavigate} />

    </div>
  );
}
