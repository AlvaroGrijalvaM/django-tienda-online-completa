import React, { useState, useEffect, createContext, useCallback } from "react";
import { setToken, getToken, removeToken } from "../api/token";
import { useUser } from "../hooks/useUser";

export const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null,
});

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(undefined);
    const { getMe } = useUser();

    const logout = useCallback(() => {
        setAuth(null);
        removeToken();
    }, []);

    const login = useCallback(async (token) => {
        setToken(token);
        try {
            const me = await getMe(token);
            setAuth({ token, me });
        } catch (error) {
            logout();
        }
    }, [getMe, logout]);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            setAuth(null);
        } else {
            login(token);
        }
    }, [login]);

    const valueContext = {
        auth,
        login,
        logout,
    };

    if (auth === undefined) return null;

    return (
        <AuthContext.Provider value={valueContext}>
            {children}
        </AuthContext.Provider>
    );
}
