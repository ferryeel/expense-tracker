import React, { createContext, useContext, ReactNode } from 'react';

// Mock User object
const mockUser = {
    id: 'user_2N0W2zMock', // Dummy ID
    firstName: 'Demo',
    lastName: 'User',
    fullName: 'Demo User',
    primaryEmailAddress: { emailAddress: 'demo@example.com' },
    emailAddresses: [{ emailAddress: 'demo@example.com' }],
    imageUrl: 'https://images.clerk.dev/static/placeholder.png',
};

// Mock Context
const ClerkMockContext = createContext({
    user: mockUser,
    isLoaded: true,
    isSignedIn: true,
});

export const ClerkProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ClerkMockContext.Provider value={{ user: mockUser, isLoaded: true, isSignedIn: true }}>
            {children}
        </ClerkMockContext.Provider>
    );
};

export const useUser = () => {
    const { user, isLoaded, isSignedIn } = useContext(ClerkMockContext);
    return { user, isLoaded, isSignedIn };
};

export const useAuth = () => {
    return {
        isLoaded: true,
        userId: mockUser.id,
        sessionId: 'sess_123',
        getToken: async () => 'mock_token',
        signOut: () => console.log('Mock Sign Out'),
    };
};

export const getAuth = (req: any) => {
    return {
        userId: mockUser.id,
    };
};

export const UserButton = () => <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer" title="Mock User Button">DU</div>;
export const SignIn = () => <div>Sign In (Mock)</div>;
export const SignUp = () => <div>Sign Up (Mock)</div>;

export const SignedIn = ({ children }: { children: ReactNode }) => <>{children}</>;
export const SignedOut = ({ children }: { children: ReactNode }) => null;
export const ClerkLoaded = ({ children }: { children: ReactNode }) => <>{children}</>;
export const ClerkLoading = ({ children }: { children: ReactNode }) => null;

export const useSignIn = () => ({ isLoaded: true, signIn: {}, setActive: () => { } });
export const useSignUp = () => ({ isLoaded: true, signUp: {}, setActive: () => { } });
export const useClerk = () => ({ signOut: () => console.log('Mock Sign Out') });

export const clerkClient = {
    users: {
        getUser: async (id: string) => mockUser,
    },
};
