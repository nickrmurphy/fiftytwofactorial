import { atom, computed, onMount } from "nanostores";

type ServerMessage =
  | { type: "count"; value: number; ackId?: string }
  | { type: "presence"; value: number }
  | { type: "error"; error: string };

const RECONNECT_DELAYS = [500, 1000, 2000, 5000];

const $remoteCount = atom(0);
const $pendingIds = atom<ReadonlySet<string>>(new Set());
export const $count = computed(
  [$remoteCount, $pendingIds],
  (remote, pending) => remote + pending.size,
);
export const $connected = atom(false);
export const $presence = atom(0);

let socket: WebSocket | null = null;

function wsUrl(): string {
  const proto = window.location.protocol === "https:" ? "wss" : "ws";
  return `${proto}://${window.location.host}/api/count`;
}

export function increment(): void {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;
  const id = crypto.randomUUID();
  const next = new Set($pendingIds.get());
  next.add(id);
  $pendingIds.set(next);
  socket.send(JSON.stringify({ type: "increment", id }));
}

onMount($count, () => {
  let attempt = 0;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let stopped = false;

  const connect = () => {
    const ws = new WebSocket(wsUrl());
    socket = ws;

    ws.addEventListener("open", () => {
      attempt = 0;
      $connected.set(true);
    });

    ws.addEventListener("message", (event) => {
      let msg: ServerMessage;
      try {
        msg = JSON.parse(event.data) as ServerMessage;
      } catch {
        return;
      }
      if (msg.type === "count") {
        $remoteCount.set(msg.value);
        if (msg.ackId !== undefined) {
          const ackId = msg.ackId;
          const prev = $pendingIds.get();
          if (prev.has(ackId)) {
            const updated = new Set(prev);
            updated.delete(ackId);
            $pendingIds.set(updated);
          }
        }
      } else if (msg.type === "presence") {
        $presence.set(msg.value);
      } else if (msg.type === "error") {
        console.warn("counter ws error:", msg.error);
      }
    });

    ws.addEventListener("close", () => {
      if (socket === ws) socket = null;
      $connected.set(false);
      $pendingIds.set(new Set());
      $presence.set(0);
      if (stopped) return;
      const delay =
        RECONNECT_DELAYS[Math.min(attempt, RECONNECT_DELAYS.length - 1)];
      attempt += 1;
      reconnectTimer = setTimeout(connect, delay);
    });
  };

  connect();

  return () => {
    stopped = true;
    if (reconnectTimer) clearTimeout(reconnectTimer);
    socket?.close();
    socket = null;
  };
});
