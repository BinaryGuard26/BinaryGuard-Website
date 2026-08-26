import { useEffect, useState } from 'react';

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  savedAt: string;
  version: 1;
};

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

    const openSettings = () => setVisible(true);
    window.addEventListener(OPEN_EVENT, openSettings);

    return () => window.removeEventListener(OPEN_EVENT, openSettings);
  }, []);

  const save = (preferences: CookiePreferences) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    setAnalytics(preferences.analytics);
    setMarketing(preferences.marketing);
    setVisible(false);

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
            <a href="/cookie-policy" className="font-semibold text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
              Cookie Policy
            </a>
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
      </div>
    </div>
  );
}
