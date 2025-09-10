// providers/static-content-context.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { FirestoreDB } from "@/services/firebase";

type StaticContent = {
  [key: string]: any;
};

type StaticContentContextType = {
  contents: StaticContent | null;
  loading: boolean;
  error: Error | null;
};

const StaticContentContext = createContext<StaticContentContextType>({
  contents: null,
  loading: true,
  error: null,
});

export function StaticContentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contents, setContents] = useState<StaticContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const ref = doc(FirestoreDB, "pages", "pages-content");

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          setContents(snapshot.data());
        } else {
          setContents(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching landing page content:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <StaticContentContext.Provider value={{ contents, loading, error }}>
      {children}
    </StaticContentContext.Provider>
  );
}

export function useStaticContent() {
  return useContext(StaticContentContext);
}
