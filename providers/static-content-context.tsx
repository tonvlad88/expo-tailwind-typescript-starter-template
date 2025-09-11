// providers/static-content-context.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { doc, onSnapshot, getDoc, Unsubscribe } from "firebase/firestore";
import { FirestoreDB } from "@/services/firebase";

type StaticContent = {
  [key: string]: any;
};

type StaticContentContextType = {
  contents: StaticContent | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

const StaticContentContext = createContext<StaticContentContextType>({
  contents: null,
  loading: true,
  error: null,
  refetch: async () => {},
});

export function StaticContentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contents, setContents] = useState<StaticContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Keep a ref to the unsubscribe function so we can clean up if needed
  const unsubscribeRef = useRef<Unsubscribe | null>(null);

  const fetchDataOnce = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const ref = doc(FirestoreDB, "pages", "pages-content");
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setContents(snapshot.data());
      } else {
        setContents(null);
      }
    } catch (err) {
      console.error("Error fetching landing page content:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const startRealtimeSubscription = useCallback(() => {
    const ref = doc(FirestoreDB, "pages", "pages-content");
    unsubscribeRef.current = onSnapshot(
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
  }, []);

  // Initial mount: start real-time subscription
  useEffect(() => {
    startRealtimeSubscription();
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [startRealtimeSubscription]);

  // Manual refetch: one-time fetch + restart subscription
  const refetch = useCallback(async () => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }
    await fetchDataOnce();
    startRealtimeSubscription();
  }, [fetchDataOnce, startRealtimeSubscription]);

  return (
    <StaticContentContext.Provider
      value={{
        contents,
        loading,
        error,
        refetch,
      }}
    >
      {children}
    </StaticContentContext.Provider>
  );
}

export function useStaticContent() {
  return useContext(StaticContentContext);
}
