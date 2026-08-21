import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import keycloak from './keycloak';

interface AuthContextValue {
  ready: boolean;
  authenticated: boolean;
  username?: string;
  roles: string[];
  hasRole: (role: string) => boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

let initialization: Promise<boolean> | null = null;

function initializeKeycloak() {
  if (initialization) {
    return initialization;
  }

  const dashboardRequested =
    window.location.pathname === '/dashboard' ||
    window.location.pathname.startsWith('/dashboard/');

  initialization = keycloak.init({
    ...(dashboardRequested ? { onLoad: 'login-required' as const } : {}),
    pkceMethod: 'S256',
    checkLoginIframe: false,
    redirectUri: `${window.location.origin}/dashboard`,
  });

  return initialization;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    initializeKeycloak()
      .then((isAuthenticated) => {
        if (!active) return;

        setAuthenticated(isAuthenticated);
        setReady(true);
      })
      .catch((error) => {
        console.error('Keycloak initialization failed:', error);

        if (active) {
          setAuthenticated(false);
          setReady(true);
        }
      });

    keycloak.onAuthSuccess = () => setAuthenticated(true);
    keycloak.onAuthLogout = () => setAuthenticated(false);
    keycloak.onTokenExpired = () => {
      void keycloak.updateToken(30).catch(() => {
        setAuthenticated(false);
        void keycloak.login({
          redirectUri: `${window.location.origin}/dashboard`,
        });
      });
    };

    return () => {
      active = false;
    };
  }, []);

  const roles = keycloak.realmAccess?.roles ?? [];

  const value = useMemo<AuthContextValue>(
    () => ({
      ready,
      authenticated,
      username:
        typeof keycloak.tokenParsed?.preferred_username === 'string'
          ? keycloak.tokenParsed.preferred_username
          : undefined,
      roles,
      hasRole: (role: string) => roles.includes(role),
      login: () =>
        keycloak.login({
          redirectUri: `${window.location.origin}/dashboard`,
        }),
      logout: () =>
        keycloak.logout({
          redirectUri: `${window.location.origin}/`,
        }),
    }),
    [ready, authenticated, roles],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}