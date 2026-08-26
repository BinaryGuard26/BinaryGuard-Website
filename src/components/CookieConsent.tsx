import { useEffect, useState } from 'react';

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
  version: 1;
};

type CookieView = 'settings' | 'policy';

const STORAGE_KEY = 'binaryguard-cookie-consent';
const OPEN_EVENT = 'binaryguard:open-cookie-settings';

const makePreferences = (
  analytics: boolean,
  marketing: boolean,
): CookiePreferences => ({
  necessary: true,
  analytics,
  marketing,
  savedAt: new Date().toISOString(),
  version: 1,
});

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [view, setView] = useState<CookieView>('settings');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      setVisible(true);
    } else {
      try {
        const parsed = JSON.parse(stored) as Partial<CookiePreferences>;
        setAnalytics(Boolean(parsed.analytics));
        setMarketing(Boolean(parsed.marketing));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
        setVisible(true);
      }
    }

    const openSettings = () => {
      setView('settings');
      setVisible(true);
    };

    window.addEventListener(OPEN_EVENT, openSettings);

    return () => window.removeEventListener(OPEN_EVENT, openSettings);
  }, []);

  const save = (preferences: CookiePreferences) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    setAnalytics(preferences.analytics);
    setMarketing(preferences.marketing);
    setVisible(false);
    setView('settings');

    window.dispatchEvent(
      new CustomEvent('binaryguard:cookie-consent-changed', {
        detail: preferences,
      }),
    );
  };

  const acceptAll = () => save(makePreferences(true, true));
  const onlyNecessary = () => save(makePreferences(false, false));
  const savePreferences = () => save(makePreferences(analytics, marketing));

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title"
    >
      <div className="max-h-[92vh] w-full overflow-y-auto border border-white/10 bg-[#071426] shadow-2xl sm:max-w-2xl sm:rounded-2xl">
        {view === 'settings' ? (
          <>
            <div className="p-6 sm:p-8">
              <div className="mb-5 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                    <path d="M12 3a9 9 0 109 9c-1.7.2-3.2-.3-4.3-1.4A5.4 5.4 0 0115.2 5 8.9 8.9 0 0012 3z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="8" cy="10" r="1" fill="currentColor" />
                    <circle cx="11" cy="16" r="1" fill="currentColor" />
                    <circle cx="6.5" cy="15" r="1" fill="currentColor" />
                  </svg>
                </div>

                <div>
                  <h2 id="cookie-settings-title" className="text-2xl font-bold text-white sm:text-3xl">
                    Cookie settings
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                    BinaryGuard uses cookies and similar technologies to remember your preferences,
                    support website security and functionality, understand website usage, and improve
                    our services. Optional analytics and marketing technologies are used only when you
                    choose to allow them.
                  </p>
                </div>
              </div>

              <p className="mb-6 text-sm text-slate-300">
                More information:{' '}
                <button
                  type="button"
                  onClick={() => setView('policy')}
                  className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200"
                >
                  Cookie Policy
                </button>
                {' '}and{' '}
                <button
                  type="button"
                  onClick={() => setShowDetails((value) => !value)}
                  className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200"
                >
                  Cookie Details
                </button>
              </p>

              <div className="border-t border-white/10 pt-5">
                <h3 className="mb-4 text-lg font-bold text-white">Your preferences</h3>

                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-5 rounded-xl border border-white/10 bg-white/[0.035] p-4">
                    <div>
                      <p className="font-semibold text-white">Necessary</p>
                      <p className="mt-1 text-sm leading-5 text-slate-400">
                        Required for core website functionality and to remember your cookie choice.
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
                      Always on
                    </span>
                  </div>

                  <label className="flex cursor-pointer items-start justify-between gap-5 rounded-xl border border-white/10 bg-white/[0.035] p-4">
                    <div>
                      <p className="font-semibold text-white">Analytics</p>
                      <p className="mt-1 text-sm leading-5 text-slate-400">
                        Helps us understand website traffic and usage patterns when analytics services are enabled.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(event) => setAnalytics(event.target.checked)}
                      className="mt-1 h-5 w-5 shrink-0 accent-cyan-400"
                    />
                  </label>

                  <label className="flex cursor-pointer items-start justify-between gap-5 rounded-xl border border-white/10 bg-white/[0.035] p-4">
                    <div>
                      <p className="font-semibold text-white">Marketing</p>
                      <p className="mt-1 text-sm leading-5 text-slate-400">
                        Allows marketing technologies to be used if BinaryGuard enables them in the future.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(event) => setMarketing(event.target.checked)}
                      className="mt-1 h-5 w-5 shrink-0 accent-cyan-400"
                    />
                  </label>
                </div>

                {showDetails && (
                  <div className="mt-4 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.05] p-4 text-sm leading-6 text-slate-300">
                    <p className="font-semibold text-white">Current BinaryGuard website storage</p>
                    <p className="mt-1">
                      We store your cookie preference in your browser under{' '}
                      <code className="rounded bg-black/30 px-1.5 py-0.5 text-cyan-200">binaryguard-cookie-consent</code>.
                      This preference record prevents the consent panel from appearing on every visit.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-3 border-t border-white/10 bg-[#040d1c] p-5 sm:grid-cols-3 sm:p-6">
              <button
                type="button"
                onClick={acceptAll}
                className="min-h-12 rounded-xl bg-cyan-400 px-5 text-sm font-extrabold tracking-wide text-[#03101d] transition hover:bg-cyan-300"
              >
                ACCEPT ALL
              </button>
              <button
                type="button"
                onClick={onlyNecessary}
                className="min-h-12 rounded-xl border border-cyan-400/45 px-5 text-sm font-extrabold tracking-wide text-white transition hover:bg-cyan-400/10"
              >
                ONLY NECESSARY
              </button>
              <button
                type="button"
                onClick={savePreferences}
                className="min-h-12 rounded-xl border border-white/20 px-5 text-sm font-extrabold tracking-wide text-white transition hover:border-cyan-400/45 hover:bg-white/5"
              >
                SAVE PREFERENCES
              </button>
            </div>
          </>
        ) : (
          <div className="p-6 sm:p-8">
            <div className="sticky top-0 z-10 -mx-6 -mt-6 mb-6 flex items-center justify-between border-b border-white/10 bg-[#071426]/95 px-6 py-5 backdrop-blur sm:-mx-8 sm:-mt-8 sm:px-8">
              <div>
                <p className="text-xs font-bold tracking-[0.18em] text-cyan-300">BINARYGUARD</p>
                <h2 className="mt-1 text-2xl font-bold text-white">Cookie Policy</h2>
              </div>
              <button
                type="button"
                onClick={() => setView('settings')}
                className="rounded-xl border border-cyan-400/35 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/10"
              >
                Back to settings
              </button>
            </div>

            <div className="space-y-7 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
              <section>
                <p className="text-slate-400">Last updated: August 2026</p>
                <p className="mt-3">
                  This Cookie Policy explains how BinaryGuard uses cookies and similar technologies on
                  www.binaryguard.ca and related public website pages. It should be read together with
                  our Privacy Policy.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white">1. What cookies are</h3>
                <p className="mt-2">
                  Cookies are small text files or similar browser storage technologies placed on or
                  accessed from your device when you visit a website. They can help a website operate,
                  remember choices, understand usage, and provide enhanced or personalized features.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white">2. How BinaryGuard uses cookies</h3>
                <p className="mt-2">We may use cookies and similar technologies to:</p>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>operate and secure the website;</li>
                  <li>remember your cookie and website preferences;</li>
                  <li>understand website performance and visitor usage;</li>
                  <li>diagnose errors and improve functionality;</li>
                  <li>measure the effectiveness of website content; and</li>
                  <li>support marketing activities when those technologies are enabled and you have consented.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white">3. Categories of cookies</h3>
                <div className="mt-3 space-y-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                    <p className="font-semibold text-white">Necessary cookies</p>
                    <p className="mt-1">
                      These are required for essential website functions, security, navigation, and
                      remembering your cookie preference. They cannot be disabled through this consent panel.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                    <p className="font-semibold text-white">Analytics cookies</p>
                    <p className="mt-1">
                      These help us understand how visitors use the website, including traffic patterns,
                      page usage, and performance. Analytics cookies are used only when enabled and allowed.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                    <p className="font-semibold text-white">Marketing cookies</p>
                    <p className="mt-1">
                      These may be used to measure or support advertising and marketing campaigns. They
                      are optional and are used only when enabled and you have provided consent.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white">4. First-party and third-party technologies</h3>
                <p className="mt-2">
                  Some technologies may be set directly by BinaryGuard, while others may be provided by
                  third-party service providers used for hosting, analytics, security, communications,
                  or marketing. Third-party providers may process information according to their own
                  privacy and cookie policies.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white">5. Current preference storage</h3>
                <p className="mt-2">
                  BinaryGuard currently stores your cookie-consent preference in browser local storage
                  using the key{' '}
                  <code className="rounded bg-black/30 px-1.5 py-0.5 text-cyan-200">binaryguard-cookie-consent</code>.
                  This record contains the categories you selected, the date of your choice, and the consent
                  version. It is used so we can remember your selection on later visits.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white">6. Your choices and consent</h3>
                <p className="mt-2">
                  On your first visit, you can accept all optional categories, allow only necessary
                  technologies, or choose individual preferences. You may change your selection at any
                  time by using the Cookie Settings link in the website footer.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white">7. Browser controls</h3>
                <p className="mt-2">
                  Most browsers allow you to delete, block, or restrict cookies and site data. Browser
                  controls are separate from BinaryGuard's consent panel and may affect website functionality.
                  Consult your browser's help or privacy settings for instructions.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white">8. Retention</h3>
                <p className="mt-2">
                  Cookie and browser-storage retention periods vary depending on their purpose. Necessary
                  preference records may remain until you clear your browser data, change your preferences,
                  or BinaryGuard changes the consent version. Third-party technologies, when enabled, may
                  use their own retention periods.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white">9. Personal information and privacy</h3>
                <p className="mt-2">
                  Information collected through cookies or similar technologies may, depending on the
                  technology used, include device information, browser information, IP address, page usage,
                  timestamps, referral information, and preference data. Any personal information is handled
                  in accordance with our Privacy Policy and applicable Canadian privacy requirements.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white">10. Changes to this Cookie Policy</h3>
                <p className="mt-2">
                  We may update this Cookie Policy when our website, technologies, service providers,
                  or legal obligations change. When appropriate, we may request your consent again after
                  a material change or a new consent version.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white">11. Contact us</h3>
                <p className="mt-2">
                  If you have questions about this Cookie Policy or how BinaryGuard uses cookies and similar
                  technologies, contact us at{' '}
                  <a href="mailto:admin@binaryguard.ca" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
                    admin@binaryguard.ca
                  </a>
                  {' '}or by phone at +1 204-504-5000.
                </p>
              </section>

              <section className="rounded-xl border border-cyan-400/15 bg-cyan-400/[0.05] p-4">
                <p className="font-semibold text-white">Cookie preferences</p>
                <p className="mt-1">
                  Use the button below to return to your cookie settings and review or change your choices.
                </p>
                <button
                  type="button"
                  onClick={() => setView('settings')}
                  className="mt-4 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-extrabold text-[#03101d] transition hover:bg-cyan-300"
                >
                  MANAGE COOKIE SETTINGS
                </button>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
