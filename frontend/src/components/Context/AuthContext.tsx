import React, {createContext, useState, useContext, ReactNode} from 'react';
interface AuthContextType {
    token : string | null;
    username: string | null;
    login: (token: string, username: string) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode}) {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));

    
    const login = (username: string, newToken: string) => {
        setToken(newToken);
        setUsername(username);
        localStorage.setItem('token', newToken);
        localStorage.setItem('username', username);
    }

    const logout = () => {
        setToken(null);
        setUsername(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');

    }

    return (
        <AuthContext.Provider value={{token, username, login, logout}}>
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