// src/AuthContext.jsx
import { useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut as fbSignOut, getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import app, { auth as sharedAuth } from './firebase';
import { AuthContext } from './authContext';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const auth = sharedAuth || getAuth(app);
    const db = getFirestore(app);

    const superAdminEmail = "gskarthikkrishnan@gmail.com";

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser(u);
                if (u.email === superAdminEmail) {
                    setIsAdmin(true);
                } else {
                    try {
                        const adminDoc = await getDoc(doc(db, "admins", u.email));
                        setIsAdmin(adminDoc.exists());
                    } catch (error) {
                        console.error("Error checking admin:", error);
                        setIsAdmin(false);
                    }
                }
            } else {
                setUser(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });
        return () => unsub();
    }, [auth, db]);

    const signIn = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    const signOut = async () => {
        await fbSignOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, loading, signIn, signOut }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

