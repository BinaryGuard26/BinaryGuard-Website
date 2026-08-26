export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-[#030d1f] px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <a
          href="/"
          className="inline-flex items-center text-sm font-semibold text-cyan-300 hover:text-cyan-200"
        >
          ← Back to BinaryGuard
        </a>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-10">
          <p className="text-sm font-bold tracking-[0.14em] text-cyan-400">BINARYGUARD</p>
          <h1 className="mt-3 text-4xl font-extrabold">Cookie Policy</h1>

          <p className="mt-5 leading-7 text-slate-300">
            This Cookie Policy explains how BinaryGuard uses cookies and similar browser technologies on
            www.binaryguard.ca. Cookies are small pieces of information stored by your browser that can help
            websites remember preferences and support website functionality.
          </p>

          <div className="mt-10 space-y-8 text-slate-300">
            <section>
              <h2 className="text-xl font-bold text-white">1. Necessary cookies and storage</h2>
              <p className="mt-3 leading-7">
                Necessary technologies support essential website functions and may be used to remember your
                cookie preference. These technologies cannot be disabled through the BinaryGuard cookie settings
                because they are required for the preference system to work correctly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white">2. Analytics</h2>
              <p className="mt-3 leading-7">
                Analytics technologies may be used to understand website traffic, visitor interactions, and
                general usage patterns. BinaryGuard will use optional analytics technologies only when they are
                enabled on the website and you have provided consent for Analytics.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white">3. Marketing</h2>
              <p className="mt-3 leading-7">
                Marketing technologies may be used for advertising or campaign measurement if BinaryGuard enables
                such services in the future. Optional marketing technologies are not permitted unless you choose
                to allow Marketing cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white">4. Your choices</h2>
              <p className="mt-3 leading-7">
                On your first visit, you can Accept All, choose Only Necessary, or select individual preferences
                and save them. You can reopen Cookie Settings from the website footer at any time to change your
                preference.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white">5. Current preference record</h2>
              <p className="mt-3 leading-7">
                The BinaryGuard website stores your selected cookie preference locally in your browser under the
                key <span className="font-mono text-cyan-200">binaryguard-cookie-consent</span>. This record is used
                to remember your selection and prevent the consent panel from appearing on every visit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white">6. Updates to this policy</h2>
              <p className="mt-3 leading-7">
                BinaryGuard may update this Cookie Policy when website technologies or practices change. Where
                appropriate, the consent experience may be shown again so that you can review updated choices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white">7. Contact</h2>
              <p className="mt-3 leading-7">
                Questions about this Cookie Policy can be sent to{' '}
                <a href="mailto:admin@binaryguard.ca" className="font-semibold text-cyan-300 hover:text-cyan-200">
                  admin@binaryguard.ca
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
