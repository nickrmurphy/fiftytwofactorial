declare module 'bun' {
	interface Env {
		TURSO_CONNECTION_URL: string;
		TURSO_AUTH_TOKEN: string;
	}
}
