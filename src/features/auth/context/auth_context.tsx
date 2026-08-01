import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { User, UserCredential } from "firebase/auth";
import { auth, db } from "../../../firebase";

interface AuthContextType {
  user: User | null;
  isPlaidLinked: boolean;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  refreshPlaidStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPlaidLinked, setIsPlaidLinked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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

    return userCredential;
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setIsPlaidLinked(false);
        setLoading(false);
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
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isPlaidLinked, login, signUp, logout, refreshPlaidStatus }}
    >
      {!loading && children}
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
