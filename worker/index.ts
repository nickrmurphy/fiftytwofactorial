import { DurableObject } from "cloudflare:workers";

interface Env {
  ASSETS: Fetcher;
  COUNTER: DurableObjectNamespace<Counter>;
}

type ClientMessage = { type: "increment"; id: string };
type ServerMessage =
  | { type: "count"; value: number; ackId?: string }
  | { type: "presence"; value: number }
  | { type: "error"; error: string };

export class Counter extends DurableObject<Env> {
  private readCount(): number {
    return this.ctx.storage.kv.get<number>("count") ?? 0;
  }

  private send(ws: WebSocket, msg: ServerMessage) {
    ws.send(JSON.stringify(msg));
  }

  override async fetch(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("expected websocket", { status: 426 });
    }

    const { 0: client, 1: server } = new WebSocketPair();
    this.ctx.acceptWebSocket(server);

    const sockets = this.ctx.getWebSockets();
    const presence = sockets.length;
    this.send(server, { type: "count", value: this.readCount() });
    this.send(server, { type: "presence", value: presence });

    const presenceBroadcast = JSON.stringify({ type: "presence", value: presence });
    for (const s of sockets) {
      if (s !== server) s.send(presenceBroadcast);
    }

    return new Response(null, { status: 101, webSocket: client });
  }

  override webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(typeof message === "string" ? message : "");
    } catch {
      this.send(ws, { type: "error", error: "bad input" });
      return;
    }

    const msg = parsed as Partial<ClientMessage>;
    if (msg?.type !== "increment" || typeof msg.id !== "string") {
      this.send(ws, { type: "error", error: "bad input" });
      return;
    }

    const next = this.readCount() + 1;
    this.ctx.storage.kv.put("count", next);

    this.send(ws, { type: "count", value: next, ackId: msg.id });
    const broadcast = JSON.stringify({ type: "count", value: next });
    for (const socket of this.ctx.getWebSockets()) {
      if (socket !== ws) socket.send(broadcast);
    }
  }

  override webSocketClose(
    ws: WebSocket,
    code: number,
    _reason: string,
    _wasClean: boolean,
  ) {
    this.broadcastPresenceExcept(ws);
    ws.close(code);
  }

  override webSocketError(ws: WebSocket, _error: unknown) {
    this.broadcastPresenceExcept(ws);
  }

  private broadcastPresenceExcept(ws: WebSocket) {
    const remaining = this.ctx.getWebSockets().filter((s) => s !== ws);
    const broadcast = JSON.stringify({ type: "presence", value: remaining.length });
    for (const s of remaining) s.send(broadcast);
  }
}

function getStub(env: Env) {
  return env.COUNTER.get(env.COUNTER.idFromName("global"));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/count") {
      return getStub(env).fetch(request);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
