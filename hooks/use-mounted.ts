"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * SSR-sicherer Ersatz für das "useState + useEffect(() => setMounted(true))"-Muster
 * (löst den ESLint-Fehler react-hooks/set-state-in-effect nicht aus).
 * Server-Snapshot: false. Client-Snapshot nach Hydration: true.
 */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
