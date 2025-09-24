// src/authContext.js
import { createContext, useContext } from 'react';

export const AuthContext = createContext({ user: null, loading: true, signIn: async () => { }, signOut: async () => { } });

export function useAuth() {
    return useContext(AuthContext);
}
