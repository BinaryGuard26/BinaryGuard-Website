import Footer from '../components/Footer';

type Page =
  | 'home'
  | 'about'
  | 'services'
  | 'products'
  | 'contact'
  | 'solutions'
  | 'access-card-login'
  | 'portal-login';

interface ProductsProps {
  onNavigate: (page: Page) => void;
}

const authSteps = [
  ['01', 'Register', 'Create account and validate inputs'],
  ['02', 'Login', 'Check credentials and account status'],
  ['03', 'Verify', 'Confirm one-time security code'],
  ['04', 'Recover', 'Reset password safely'],
];

const securityBadges = ['Domain Validated', 'OTP Verified', 'Tenant Access', 'Role Checked'];

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

              <button
                onClick={() => onNavigate('access-card-portal')}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-cyan-500/20"
              >
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

      <section className="bg-[#020817] text-white py-24 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-cyan-400 font-semibold uppercase tracking-wide mb-3">
              Authentication Workspace
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Secure Access Card Ordering Login Flow
            </h2>

            <p className="text-slate-300 max-w-3xl leading-relaxed">
              A secure client portal flow for approved corporate users. The process includes
              registration, login, OTP verification, account recovery, and role-based dashboard
              access before submitting access card orders.
            </p>
          </div>

          <div className="grid lg:grid-cols-[360px_1fr] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/60">

            {/* LEFT AUTH PANEL */}
            <div className="bg-[#14213d] p-8 lg:p-10">
              <div className="w-14 h-14 border border-white/20 rounded-xl flex items-center justify-center font-bold mb-8 bg-white/5">
                BG
              </div>

              <h3 className="text-4xl font-bold mb-6">BinaryGuard</h3>

              <p className="text-slate-300 leading-relaxed mb-10">
                Secure website authentication flow with account creation, login verification, MFA,
                recovery, and role-based access states.
              </p>

              {authSteps.map(([num, title, text], index) => (
                <div
                  key={num}
                  className={`mb-4 rounded-xl border p-4 flex gap-4 transition-all duration-300 ${
                    index === 1
                      ? 'bg-white text-slate-900 border-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-white'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center font-bold text-sm ${
                      index === 1
                        ? 'bg-teal-50 text-teal-700'
                        : 'bg-white/10 text-slate-200'
                    }`}
                  >
                    {num}
                  </div>

                  <div>
                    <h4 className="font-bold">{title}</h4>
                    <p className={index === 1 ? 'text-slate-500 text-sm' : 'text-slate-400 text-sm'}>
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT AUTH PREVIEW */}
            <div className="bg-slate-100 text-slate-900 p-6 lg:p-12">
              <div className="bg-white rounded-2xl p-6 shadow mb-6 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                <div>
                  <p className="text-teal-600 text-sm font-bold uppercase">
                    Authentication Workspace
                  </p>
                  <h3 className="text-3xl font-bold">Sign in to BinaryGuard</h3>
                </div>

                <span className="bg-green-50 border border-green-200 text-green-700 px-6 py-2 rounded-full font-bold text-center">
                  Secure
                </span>
              </div>

              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow mb-6">
                <div className="max-w-xl space-y-6">
                  <label className="block">
                    <span className="text-sm font-bold text-slate-500">
                      Corporate Email Address
                    </span>
                    <input
                      readOnly
                      value="user@gov.mb.ca"
                      className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-4 font-semibold bg-white text-slate-900"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold text-slate-500">
                      OTP Verification Code
                    </span>
                    <input
                      readOnly
                      value="248106"
                      className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-4 font-semibold bg-white text-slate-900"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap gap-3 my-8">
                  {securityBadges.map((item) => (
                    <span
                      key={item}
                      className="bg-teal-50 text-teal-700 border border-teal-200 px-4 py-2 rounded-full text-sm font-bold"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onNavigate('access-card-portal')}
                  className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-teal-600/20"
                >
                  Open Secure Portal
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <div className="flex justify-between mb-4">
                  <h4 className="font-bold">Process log</h4>
                  <span className="text-teal-600 font-bold">Live</span>
                </div>

                <div className="space-y-3 text-slate-500">
                  <p className="bg-slate-50 p-3 rounded-lg">
                    1. Corporate domain validated successfully.
                  </p>
                  <p className="bg-slate-50 p-3 rounded-lg">
                    2. OTP verification completed.
                  </p>
                  <p className="bg-slate-50 p-3 rounded-lg">
                    3. User redirected to Access Card Ordering dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />

    </div>
  );
}
