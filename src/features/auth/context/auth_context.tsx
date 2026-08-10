import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
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

// Helper: Safely fetch Plaid status from Firestore
const fetchPlaidStatus = async (uid: string): Promise<boolean> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    return Boolean(userDoc.exists() && userDoc.data()?.is_plaid_linked);
  } catch (error) {
    console.error("Failed to fetch Plaid status:", error);
    return false;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPlaidLinked, setIsPlaidLinked] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // Auth State Listener: Single source of truth for session sync
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const linked = await fetchPlaidStatus(currentUser.uid);
        setIsPlaidLinked(linked);
      } else {
        setIsPlaidLinked(false);
      }

      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await setDoc(
      doc(db, "users", credential.user.uid),
      {
        email: credential.user.email,
        is_plaid_linked: false,
        createdAt: new Date(),
      },
      { merge: true },
    );

    setIsPlaidLinked(false);
    return credential;
  };

  const login = async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);

    // Fetch Firestore profile before login() resolves so state is immediately accurate for caller
    const linked = await fetchPlaidStatus(credential.user.uid);
    setIsPlaidLinked(linked);

    return credential;
  };

  const logout = async () => {
    await signOut(auth);
    // State cleanup (setUser, setIsPlaidLinked) is handled automatically by onAuthStateChanged
  };

  const refreshPlaidStatus = async () => {
    if (!user) {
      setIsPlaidLinked(false);
      return;
    }
    const linked = await fetchPlaidStatus(user.uid);
    setIsPlaidLinked(linked);
  };

  const markPlaidLinked = async () => {
    if (!user) throw new Error("User is not authenticated.");

    await updateDoc(doc(db, "users", user.uid), {
      is_plaid_linked: true,
      plaidLinkedAt: new Date(),
    });

    setIsPlaidLinked(true);
  };

  const value = useMemo(() => {
    return {
      user,
      isPlaidLinked,
      isAuthLoading,
      signUp,
      login,
      logout,
      refreshPlaidStatus,
      markPlaidLinked,
    };
  }, [user, isPlaidLinked, isAuthLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
