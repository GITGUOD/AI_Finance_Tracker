import React, {createContext, useState, useContext, ReactNode} from 'react';
interface AuthContextType {
    token : string | null;
    login: (token: string) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode}) {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    
    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context;
}