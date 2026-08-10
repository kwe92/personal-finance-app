import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import type { User, UserCredential } from "firebase/auth";
import { auth, db } from "../../../firebase";

interface AuthContextType {
  user: User | null;
  isPlaidLinked: boolean;
  isAuthLoading: boolean;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  refreshPlaidStatus: () => Promise<void>;
  markPlaidLinked: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPlaidLinked, setIsPlaidLinked] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const { user } = userCredential;

    await setDoc(
      doc(db, "users", user.uid),
      {
        email: user.email,
        is_plaid_linked: false,
        createdAt: new Date(),
      },
      { merge: true },
    );

    setIsPlaidLinked(false);
    return userCredential;
  };

  const login = async (email: string, password: string) => {
    setIsAuthLoading(true);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    // Fetch Firestore profile BEFORE login() resolves so isPlaidLinked is set
    try {
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;
      setIsPlaidLinked(Boolean(userData?.is_plaid_linked));
    } catch (error) {
      setIsPlaidLinked(false);
    } finally {
      setIsAuthLoading(false);
    }

    return userCredential;
  };

  const logout = async () => {
    setUser(null);
    setIsPlaidLinked(false);
    return signOut(auth);
  };

  const refreshPlaidStatus = async () => {
    if (!user) {
      setIsPlaidLinked(false);
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;
      setIsPlaidLinked(Boolean(userData?.is_plaid_linked));
    } catch (error) {
      setIsPlaidLinked(false);
    }
  };

  const markPlaidLinked = async () => {
    if (!user) {
      throw new Error("User is not available.");
    }

    await updateDoc(doc(db, "users", user.uid), {
      is_plaid_linked: true,
      plaidLinkedAt: new Date(),
    });

    setIsPlaidLinked(true);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setIsPlaidLinked(false);
        setIsAuthLoading(false);
        return;
      }

      setUser(currentUser);
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;
        setIsPlaidLinked(Boolean(userData?.is_plaid_linked));
      } catch (error) {
        setIsPlaidLinked(false);
      } finally {
        setIsAuthLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isPlaidLinked,
        isAuthLoading,
        login,
        signUp,
        logout,
        refreshPlaidStatus,
        markPlaidLinked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
