"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

interface AuthContextProps {
    isLoggedIn: boolean;
    handleCtxLogout: () => void;
    handleCtxLogin: () => void;
    role: UserRole | null;
    loading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    handleCtxLogout: () => {},
    handleCtxLogin: () => {},
    role: null,
    loading: true,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await fetch("/api/checkUser", { 
                method: 'POST'
            });
            
            if (!response.ok) {
                setIsLoggedIn(false);
                setRole(null);
                return;
            }

            const data = await response.json();
            setIsLoggedIn(true);
            setRole(data.role);                
        } catch (error) {
            //console.error("Error fetching user data:", error);
            setIsLoggedIn(false);
            setRole(null);
        } finally {
            setLoading(false);
        }
    };

    const handleCtxLogout = () => {
        setIsLoggedIn(false);
    }

    const handleCtxLogin = async () => {
        await fetchUser();
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, handleCtxLogout, handleCtxLogin, role, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
