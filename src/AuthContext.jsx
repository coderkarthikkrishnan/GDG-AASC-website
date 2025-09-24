// src/AuthContext.jsx
import { useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut as fbSignOut, getAuth } from 'firebase/auth';
import app, { auth as sharedAuth } from './firebase';
import { AuthContext } from './authContext';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = sharedAuth || getAuth(app);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsub();
    }, [auth]);

    const signIn = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    const signOut = async () => {
        await fbSignOut(auth);
    };

    return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>;
}

