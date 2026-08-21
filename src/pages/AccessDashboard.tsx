import {
  ArrowUpRight,
  Briefcase,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';

export default function AccessDashboard() {
  const {
    ready,
    authenticated,
    username,
    hasRole,
    login,
    logout,
  } = useAuth();

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030d1f] text-white">
        <p className="text-sm tracking-widest text-cyan-300">
          VERIFYING SECURE SESSION…
        </p>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030d1f] px-6 text-white">
        <div className="max-w-md text-center">
          <ShieldCheck className="mx-auto mb-6 text-cyan-400" size={52} />

          <h1 className="text-3xl font-bold">Authentication required</h1>

          <p className="mt-4 text-slate-300">
            Sign in through BinaryGuard Identity to access your assigned
            applications.
          </p>

          <button
            type="button"
            onClick={() => void login()}
            className="mt-8 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-[#030d1f] transition hover:bg-cyan-300"
          >
            Sign in with BinaryGuard
          </button>
        </div>
      </main>
    );
  }

  const isGlobalAdmin = hasRole('global-admin');
  const isAdministrativeStaff = hasRole('administrative-staff');

  const canUseErp =
    hasRole('erp-access') || isAdministrativeStaff || isGlobalAdmin;

  const canUsePortal =
    hasRole('portal-access') || isAdministrativeStaff || isGlobalAdmin;

  const canUseAdminApps = isAdministrativeStaff || isGlobalAdmin;

  const noApplications =
    !canUseErp && !canUsePortal && !canUseAdminApps;

  return (
    <main className="min-h-screen bg-[#030d1f] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <img
                src="/logo.png"
                alt="BinaryGuard"
                className="h-10 w-auto object-contain"
              />

              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-widest text-cyan-300">
                SECURE ACCESS
              </span>
            </div>

            <h1 className="text-3xl font-bold md:text-5xl">
              Application Dashboard
            </h1>

            <p className="mt-3 text-slate-300">
              Signed in as{' '}
              <span className="font-semibold text-cyan-300">
                {username ?? 'BinaryGuard user'}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => void logout()}
            className="flex w-fit items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-red-400/50 hover:bg-red-400/10 hover:text-red-300"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </header>

        <section>
          <div className="mb-7 flex items-center gap-3">
            <LayoutDashboard className="text-cyan-400" size={24} />
            <h2 className="text-xl font-semibold">Your applications</h2>
          </div>

          {noApplications && (
            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-8">
              <h2 className="text-xl font-semibold text-amber-200">
                No applications assigned
              </h2>

              <p className="mt-2 text-slate-300">
                Contact a BinaryGuard administrator to request access.
              </p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {canUseErp && (
              <a
                href="https://erp.binaryguard.ca"
                className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-cyan-400/10"
              >
                <div className="flex items-start justify-between">
                  <Briefcase className="text-cyan-400" size={38} />
                  <ArrowUpRight
                    className="text-slate-400 transition group-hover:text-cyan-300"
                    size={22}
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold">BinaryGuard ERP</h3>

                <p className="mt-3 text-slate-300">
                  Business operations, CRM, projects, inventory and finance.
                </p>
              </a>
            )}

            {canUsePortal && (
              <a
                href="https://portal.binaryguard.ca"
                className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-cyan-400/10"
              >
                <div className="flex items-start justify-between">
                  <LayoutDashboard className="text-cyan-400" size={38} />
                  <ArrowUpRight
                    className="text-slate-400 transition group-hover:text-cyan-300"
                    size={22}
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold">Client Portal</h3>

                <p className="mt-3 text-slate-300">
                  Customer services, requests and authorized portal modules.
                </p>
              </a>
            )}

            {canUseAdminApps && (
              <div className="rounded-3xl border border-purple-400/20 bg-purple-400/5 p-7">
                <div className="flex items-start justify-between">
                  <Settings className="text-purple-300" size={38} />

                  <span className="rounded-full bg-purple-400/15 px-3 py-1 text-xs font-semibold text-purple-200">
                    COMING SOON
                  </span>
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  Administrative Apps
                </h3>

                <p className="mt-3 text-slate-300">
                  Protected operational applications for authorized
                  administrative staff.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}