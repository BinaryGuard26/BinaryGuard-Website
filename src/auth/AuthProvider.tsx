import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const roles: string[] = [];

  const value = useMemo<AuthContextValue>(
    () => ({
      ready: true,

      // The public website no longer owns or maintains an authenticated
      // Keycloak session. Authentication is handled by the separate
      // BinaryGuard auth gateway at login.binaryguard.ca.
      authenticated: false,
      username: undefined,
      roles,

      hasRole: () => false,

      // Any legacy component that still calls login() will be routed into
      // the new independent BinaryGuard authentication flow.
      login: async () => {
        window.location.href = 'https://login.binaryguard.ca/login';
      },

      // The public website does not hold a secure login session anymore.
      // Keep this fallback only for compatibility with any old component
      // that may still call logout().
      logout: async () => {
        window.location.href = 'https://binaryguard.ca/';
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}