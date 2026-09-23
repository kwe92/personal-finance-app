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
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import type { User, UserCredential } from "firebase/auth";
import { auth, db } from "../../../firebase";

interface AuthContextType {
  user: User | null;
  isPlaidLinked: boolean;
  institutionName: string | null;
  isAuthLoading: boolean;
  signUp: (
    email: string,
    password: string,
    name: string,
  ) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  markPlaidLinked: () => Promise<void>;
  markPlaidDisconnected: () => void; // <-- NEW
  updateLocalUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const fetchPlaidData = async (
  uid: string,
): Promise<{ isLinked: boolean; institutionName: string | null }> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        isLinked: Boolean(data?.is_plaid_linked),
        institutionName: data?.institution_name || null,
      };
    }
    return { isLinked: false, institutionName: null };
  } catch (error) {
    console.error("Failed to fetch Plaid status:", error);
    return { isLinked: false, institutionName: null };
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isPlaidLinked, setIsPlaidLinked] = useState<boolean>(false);
  const [institutionName, setInstitutionName] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const data = await fetchPlaidData(currentUser.uid);
        setIsPlaidLinked(data.isLinked);
        setInstitutionName(data.institutionName);
      } else {
        setIsPlaidLinked(false);
        setInstitutionName(null);
      }

      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(credential.user, {
      displayName: name,
    });

    await setDoc(
      doc(db, "users", credential.user.uid),
      {
        name,
        email: credential.user.email,
        is_plaid_linked: false,
        createdAt: new Date(),
      },
      { merge: true },
    );

    setUser({ ...credential.user, displayName: name });
    setIsPlaidLinked(false);
    setInstitutionName(null);

    return credential;
  };

  const login = async (email: string, password: string) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);

    const data = await fetchPlaidData(credential.user.uid);
    setIsPlaidLinked(data.isLinked);
    setInstitutionName(data.institutionName);

    return credential;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const markPlaidLinked = async () => {
    if (!user) throw new Error("User is not authenticated.");

    await updateDoc(doc(db, "users", user.uid), {
      is_plaid_linked: true,
      plaidLinkedAt: new Date(),
    });

    setIsPlaidLinked(true);

    const data = await fetchPlaidData(user.uid);
    setInstitutionName(data.institutionName);
  };

  const markPlaidDisconnected = () => {
    setIsPlaidLinked(false);
    setInstitutionName(null);
  };

  const updateLocalUser = (updates: Partial<User>) => {
    setUser((prev) => (prev ? ({ ...prev, ...updates } as User) : null));
  };

  const value = useMemo(() => {
    return {
      user,
      isPlaidLinked,
      institutionName,
      isAuthLoading,
      signUp,
      login,
      logout,
      markPlaidLinked,
      markPlaidDisconnected,
      updateLocalUser,
    };
  }, [user, isPlaidLinked, institutionName, isAuthLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
