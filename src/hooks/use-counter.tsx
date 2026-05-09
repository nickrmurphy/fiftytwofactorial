import { useStore } from "@nanostores/react";
import { $count, $connected, increment } from "@/stores/counter";

export function useCounter() {
  const count = useStore($count);
  const connected = useStore($connected);
  return { count, increment, connected };
}
