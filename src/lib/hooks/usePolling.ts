import { useCallback, useRef, useEffect } from "react";

interface UsePollingOptions {
  interval: number;
  enabled?: boolean;
  onPoll: () => Promise<void>;
  onError?: (error: Error) => void;
}

export function usePolling({
  interval,
  enabled = true,
  onPoll,
  onError,
}: UsePollingOptions) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPollingRef = useRef(false);

  const poll = useCallback(async () => {
    if (isPollingRef.current) return;
    isPollingRef.current = true;
    try {
      await onPoll();
    } catch (error) {
      onError?.(error as Error);
    } finally {
      isPollingRef.current = false;
    }
  }, [onPoll, onError]);

  useEffect(() => {
    if (!enabled) return;

    poll();
    intervalRef.current = setInterval(poll, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [enabled, interval, poll]);
}
