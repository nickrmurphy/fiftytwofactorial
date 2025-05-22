// biome-ignore lint/style/useImportType: <explanation>
import * as React from "react";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import appCss from "../app.css?url";
import { StoreProvider } from "../components/StoreProvider";
import { Syncronizer } from "../components/Syncronizer";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Fifty-two Factorial",
			},
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap",
			},
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<StoreProvider>
				<Outlet />
				<TanStackRouterDevtools />
				<Syncronizer />
			</StoreProvider>
		</RootDocument>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		// biome-ignore lint/a11y/useHtmlLang: <explanation>
		<html>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
