import { useStore } from "@nanostores/react";
import { $count, $connected, $presence, increment } from "@/stores/counter";

export function useCounter() {
  const count = useStore($count);
  const presence = useStore($presence);
  const connected = useStore($connected);
  return { count, presence, increment, connected };
}
