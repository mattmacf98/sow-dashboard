import { getContext, setContext } from 'svelte';
import { browser } from '$app/environment';

const ROUTER_KEY = Symbol('hash-router');

export type RouterContext = {
	readonly path: string;
	readonly params: Record<string, string>;
	navigate: (path: string) => void;
	match: (pattern: string) => Record<string, string> | null;
};

function parseHash(): string {
	if (!browser) return '/';
	const hash = window.location.hash;
	if (!hash || hash === '#') return '/';
	return hash.slice(1) || '/';
}

function matchPattern(pattern: string, path: string): Record<string, string> | null {
	const patternParts = pattern.split('/');
	const pathParts = path.split('/');
	if (patternParts.length !== pathParts.length) return null;

	const params: Record<string, string> = {};
	for (let i = 0; i < patternParts.length; i++) {
		if (patternParts[i].startsWith(':')) {
			params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
		} else if (patternParts[i] !== pathParts[i]) {
			return null;
		}
	}
	return params;
}

export function createHashRouter(): RouterContext {
	let path = $state(parseHash());
	let params = $state<Record<string, string>>({});

	function onHashChange() {
		path = parseHash();
	}

	if (browser) {
		window.addEventListener('hashchange', onHashChange);
	}

	const router: RouterContext = {
		get path() {
			return path;
		},
		get params() {
			return params;
		},
		navigate(newPath: string) {
			window.location.hash = newPath;
		},
		match(pattern: string) {
			const result = matchPattern(pattern, path);
			if (result) {
				params = result;
			}
			return result;
		}
	};

	setContext(ROUTER_KEY, router);
	return router;
}

export function useHashRouter(): RouterContext {
	return getContext<RouterContext>(ROUTER_KEY);
}
