/// <reference types="vite/client" />
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type * as React from 'react';
import { StoreProvider } from '~/components/store-provider';
import { Syncronizer } from '~/components/syncronizer';
import appCss from '~/styles/app.css?url';

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'Fifty-two Factorial',
			},
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{ rel: 'manifest', href: '/site.webmanifest' },
			{
				rel: 'preconnect',
				href: 'https://fonts.googleapis.com',
			},
			{
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossOrigin: 'anonymous',
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap',
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<StoreProvider>
					{children}
					<TanStackRouterDevtools />
					<Syncronizer />
				</StoreProvider>
				<Scripts />
			</body>
		</html>
	);
}
