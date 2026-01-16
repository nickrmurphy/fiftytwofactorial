import { getCount, incrementCount } from "@/data/count";
import { useState, useEffect, useCallback } from "react";
import { useAsyncBatcher } from "@tanstack/react-pacer";

const POLL_INTERVAL = 2000;
const MAX_BATCH_SIZE = 3;
const BATCH_WAIT = 1000;

export function useCounter(initialCount: number) {
  const [remoteCount, setRemoteCount] = useState(initialCount);
  const [localCount, setLocalCount] = useState(0);

  const asyncBatcher = useAsyncBatcher(
    async (items) => {
      const batchSize = items.length;
      const { count } = await incrementCount({ data: { count: batchSize } });
      setRemoteCount(count);
      setLocalCount((prev) => prev - batchSize);
      return count;
    },
    {
      maxSize: MAX_BATCH_SIZE,
      wait: BATCH_WAIT,
    },
  );

  const increment = useCallback(() => {
    setLocalCount((prev) => prev + 1);
    asyncBatcher.addItem({ timestamp: Date.now() });
  }, [asyncBatcher]);

  useEffect(() => {
    const pollForUpdates = async () => {
      try {
        if (!navigator.onLine) return;
        const { count } = await getCount();
        setRemoteCount(count);
      } catch (error) {
        console.error("Failed to poll for count updates:", error);
      }
    };

    const intervalId = setInterval(pollForUpdates, POLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return {
    count: remoteCount + localCount,
    increment,
  };
}
