import { createContext, useContext, type PropsWithChildren } from 'react';

import { useStorageState } from '#/hooks/storage.ts';

const AuthContext = createContext<{
    session?: string | null;
    setSession: (value: string | null) => void;
    isLoading: boolean;
}>({
    session: null,
    setSession: () => {},
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                session,
                setSession,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
