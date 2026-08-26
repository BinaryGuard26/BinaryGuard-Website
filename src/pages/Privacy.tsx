import {
  ArrowLeft,
  CheckCircle2,
  Database,
  FileText,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

const sections = [
  {
    icon: UserRound,
    title: 'Information we may collect',
    body: (
      <>
        <p>
          Depending on how you use BinaryGuard services, we may collect information that you
          provide directly, including your name, corporate email address, company name, telephone
          number, city, province or state, country, and information submitted through support,
          registration, or service request forms.
        </p>
        <p>
          We may also process technical and security information generated when you use our
          services, such as authentication events, verification activity, timestamps, session
          information, application access records, and diagnostic or security logs.
        </p>
      </>
    ),
  },
  {
    icon: KeyRound,
    title: 'Authentication and one-time passwords',
    body: (
      <>
        <p>
          BinaryGuard uses authentication controls such as email verification codes, identity
          provider sessions, multi-factor authentication, and account approval workflows to protect
          access to secured services.
        </p>
        <p>
          Verification codes are intended to be short-lived and should never be shared with another
          person. BinaryGuard support personnel will never ask you to send a password, one-time
          password, recovery code, or authenticator code by email.
        </p>
      </>
    ),
  },
  {
    icon: Database,
    title: 'How we use information',
    body: (
      <>
        <p>We use personal information and service data for purposes including:</p>
        <ul>
          <li>creating, reviewing, approving, and administering user accounts;</li>
          <li>authenticating users and protecting secured applications;</li>
          <li>providing requested products, services, support, and account administration;</li>
          <li>detecting abuse, fraud, unauthorized access, and security incidents;</li>
          <li>maintaining, troubleshooting, and improving BinaryGuard systems; and</li>
          <li>meeting contractual, legal, regulatory, and business record requirements where applicable.</li>
        </ul>
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: 'Service providers and disclosures',
    body: (
      <>
        <p>
          BinaryGuard may use trusted service providers to operate its technology environment,
          including providers of identity and authentication services, cloud hosting, email
          delivery, security monitoring, communications, and business systems.
        </p>
        <p>
          Information is disclosed only as reasonably necessary to provide or protect the service,
          comply with applicable law, enforce agreements, or respond to a valid legal process. We do
          not sell personal information to advertisers.
        </p>
      </>
    ),
  },
  {
    icon: LockKeyhole,
    title: 'Security',
    body: (
      <>
        <p>
          We use administrative, technical, and organizational safeguards designed to protect
          information against unauthorized access, alteration, disclosure, loss, or misuse. These
          safeguards may include encryption in transit, access controls, multi-factor authentication,
          account approval controls, logging, monitoring, and least-privilege access practices.
        </p>
        <p>
          No internet or information system can be guaranteed to be completely secure. Users are
          responsible for protecting their own devices, email accounts, authentication factors, and
          recovery information.
        </p>
      </>
    ),
  },
  {
    icon: FileText,
    title: 'Retention',
    body: (
      <>
        <p>
          BinaryGuard retains information for only as long as reasonably necessary for the purpose
          for which it was collected, to maintain security and audit records, to provide services,
          and to satisfy applicable legal, contractual, accounting, or operational requirements.
        </p>
        <p>
          Retention periods can vary depending on the type of information, the service involved, and
          applicable obligations.
        </p>
      </>
    ),
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#030d1f] text-white">
      <header className="border-b border-white/10 bg-[#020b1a]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <a href="/" className="flex items-center gap-3" aria-label="BinaryGuard home">
            <img src="/logo.png" alt="BinaryGuard" className="h-10 w-auto object-contain" />
          </a>

          <a
            href="https://login.binaryguard.ca/dashboard"
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
                PRIVACY & DATA PROTECTION
              </span>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                Privacy Policy
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                This Privacy Policy explains how BinaryGuard Innovations Inc. collects, uses,
                protects, and handles information when you use BinaryGuard websites, secure access
                services, client portals, applications, and related support services.
              </p>

              <p className="mt-5 text-sm font-medium text-cyan-200">
                Effective date: August 26, 2026
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.06] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 shrink-0 text-cyan-300" size={22} />
              <div>
                <h2 className="text-xl font-bold">Our privacy commitment</h2>
                <p className="mt-2 leading-7 text-slate-300">
                  BinaryGuard processes information for legitimate business, security,
                  authentication, service-delivery, and support purposes. We aim to collect only the
                  information reasonably necessary to operate and protect our services.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6">
            {sections.map(({ icon: Icon, title, body }) => (
              <section
                key={title}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                    <Icon size={21} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <div className="mt-3 space-y-3 leading-7 text-slate-300 [&_ul]:ml-5 [&_ul]:list-disc [&_li]:mt-1">
                      {body}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-bold">Cookies and session technologies</h2>
              <p className="mt-3 leading-7 text-slate-300">
                BinaryGuard services may use cookies, browser storage, or similar technologies that
                are necessary to maintain secure sessions, remember authentication state, prevent
                abuse, and operate application functionality. Security-related cookies may be
                required for protected services to function.
              </p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-bold">Cross-border processing</h2>
              <p className="mt-3 leading-7 text-slate-300">
                Some technology service providers may process or store information in locations
                outside your province, territory, state, or country. When this occurs, information
                may be subject to the laws applicable in those locations.
              </p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-bold">Your choices and requests</h2>
              <p className="mt-3 leading-7 text-slate-300">
                Subject to applicable law and legitimate security or record-retention requirements,
                you may contact BinaryGuard to request information about your account data, request
                correction of inaccurate information, or ask questions about how your information
                is handled.
              </p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <h2 className="text-xl font-bold">Policy updates</h2>
              <p className="mt-3 leading-7 text-slate-300">
                We may update this Privacy Policy as our services, security practices, or legal
                requirements change. The current version will be posted on this page with its
                effective date.
              </p>
            </section>
          </div>

          <section className="mt-8 rounded-3xl border border-cyan-400/20 bg-[#07172c] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <Mail className="mt-1 shrink-0 text-cyan-300" size={22} />
              <div>
                <h2 className="text-xl font-bold">Privacy questions</h2>
                <p className="mt-2 leading-7 text-slate-300">
                  For privacy-related questions or requests, contact BinaryGuard Innovations Inc.
                </p>
                <a
                  href="mailto:support@binaryguard.ca"
                  className="mt-3 inline-block font-semibold text-cyan-300 hover:text-cyan-200"
                >
                  support@binaryguard.ca
                </a>
              </div>
            </div>
          </section>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#020b1a]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-7 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} BinaryGuard Innovations Inc.</p>
          <div className="flex gap-5">
            <a href="/privacy" className="text-cyan-300">Privacy Policy</a>
            <a href="/support" className="hover:text-cyan-300">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}