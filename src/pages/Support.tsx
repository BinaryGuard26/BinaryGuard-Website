import {
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Clock3,
  KeyRound,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

const supportItems = [
  {
    icon: KeyRound,
    title: 'Email OTP & sign-in',
    text: 'Use the most recent six-digit verification code sent to your approved corporate email address. Verification codes expire and older codes may stop working after a new code is issued.',
  },
  {
    icon: UserCheck,
    title: 'Account approval',
    text: 'New registrations may require BinaryGuard administrator review before secure access is enabled. You will be notified by email when a decision has been made.',
  },
  {
    icon: ShieldCheck,
    title: 'Application access',
    text: 'Successfully signing in does not automatically grant access to every BinaryGuard application. Application access is assigned according to approved roles and business requirements.',
  },
  {
    icon: HelpCircle,
    title: 'Technical issues',
    text: 'If a page does not load correctly, capture the error message, the approximate time of the issue, and the page you were accessing. Do not include passwords, OTPs, recovery codes, or other secrets in screenshots or support emails.',
  },
];

export default function Support() {
  return (
    <div className="min-h-screen bg-[#030d1f] text-white">
      <header className="border-b border-white/10 bg-[#020b1a]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <a href="/" className="flex items-center gap-3" aria-label="BinaryGuard home">
            <img src="/logo.png" alt="BinaryGuard" className="h-10 w-auto object-contain" />
          </a>

          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/15"
          >
            <ArrowLeft size={16} />
            Back to BinaryGuard
          </a>
        </div>
      </header>

      <main>
        <section className="border-b border-white/10 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.12),transparent_30%)]">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-cyan-300">
                <ShieldCheck size={15} />
                SECURE ACCESS SUPPORT
              </span>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                BinaryGuard Support
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Get help with BinaryGuard secure sign-in, email OTP verification, account approval,
                application access, and other access-related issues.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-6 md:grid-cols-2">
            <a
              href="mailto:support@binaryguard.ca"
              className="rounded-3xl border border-cyan-400/25 bg-cyan-400/[0.07] p-7 transition hover:bg-cyan-400/[0.1]"
            >
              <Mail className="text-cyan-300" size={26} />
              <h2 className="mt-5 text-xl font-bold">Email support</h2>
              <p className="mt-2 text-cyan-300">support@binaryguard.ca</p>
              <p className="mt-3 leading-7 text-slate-300">
                Recommended for account, authentication, approval, and application-access requests.
              </p>
            </a>

            <a
              href="tel:+12045045000"
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 transition hover:bg-white/[0.06]"
            >
              <Phone className="text-cyan-300" size={26} />
              <h2 className="mt-5 text-xl font-bold">Telephone</h2>
              <p className="mt-2 text-cyan-300">+1 204-504-5000</p>
              <p className="mt-3 leading-7 text-slate-300">
                For time-sensitive service issues, please provide your organization name and a brief
                description of the problem.
              </p>
            </a>
          </div>

          <div className="mt-8 grid gap-6">
            {supportItems.map(({ icon: Icon, title, text }) => (
              <section
                key={title}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                    <Icon size={21} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{title}</h2>
                    <p className="mt-3 leading-7 text-slate-300">{text}</p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <section className="mt-8 rounded-3xl border border-yellow-400/25 bg-yellow-400/[0.07] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <LockKeyhole className="mt-1 shrink-0 text-yellow-200" size={23} />
              <div>
                <h2 className="text-xl font-bold text-yellow-100">Protect your authentication secrets</h2>
                <p className="mt-3 leading-7 text-slate-300">
                  Never send your password, one-time password, authenticator code, recovery code,
                  private key, or other authentication secret to BinaryGuard support. If you believe
                  an authentication factor has been exposed, report it immediately.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-white/10 bg-[#07172c] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <Clock3 className="mt-1 shrink-0 text-cyan-300" size={22} />
              <div>
                <h2 className="text-xl font-bold">When contacting support</h2>
                <p className="mt-3 leading-7 text-slate-300">
                  To help us investigate efficiently, include your corporate email address,
                  organization name, affected BinaryGuard service, approximate time of the issue,
                  and the exact error message. Do not include authentication secrets.
                </p>
                <div className="mt-5 flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-cyan-300" size={18} />
                  <p>Support is available 7 days a week. Response times vary by issue priority and service arrangement.</p>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#020b1a]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-7 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} BinaryGuard Innovations Inc.</p>
          <div className="flex gap-5">
            <a href="/privacy" className="hover:text-cyan-300">Privacy Policy</a>
            <a href="/support" className="text-cyan-300">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
