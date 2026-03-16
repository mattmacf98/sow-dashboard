import { getContext, setContext, onMount } from 'svelte';
import { createViamClient, type AccessToken, type ViamClient } from '@viamrobotics/sdk';
import { getCookie } from 'typescript-cookie';

const KEY = Symbol('auth-context');

export type AuthContextValue = {
	get accessToken(): AccessToken | undefined;
    get client(): ViamClient | undefined;
};

export function createAuthContext(): AuthContextValue {
	let accessToken = $state<AccessToken | undefined>(undefined);
    let client = $state<ViamClient | undefined>(undefined);

    $effect(() => {
        if (!accessToken) {
            return;
        }
        createViamClient({serviceHost: "https://app.viam.com", credentials: accessToken}).then((c) => {
            client = c;
        });
    });

	function refresh() {
        const userTokenRawCookie = getCookie('userToken');
        if (!userTokenRawCookie) {
            console.error('No user token found');
            return undefined;
        }
        const startIndex = userTokenRawCookie.indexOf("{");
        const endIndex = userTokenRawCookie.indexOf("}");
        const userTokenValue = userTokenRawCookie.slice(startIndex, endIndex + 1);
        const payload = JSON.parse(userTokenValue).access_token;
        accessToken = {
            type: 'access-token',
            payload: payload
        };
	}

	onMount(() => {
		refresh();
	});

	const ctx: AuthContextValue = {
		get accessToken() {
			return accessToken;
		},
		get client() {
			return client;
		}
	};

	setContext(KEY, ctx);
	return ctx;
}

export function useAuthContext(): AuthContextValue {
	const ctx = getContext<AuthContextValue | undefined>(KEY);
	if (!ctx) {
		throw new Error('AuthContext has not been created. Call createAuthContext() in a parent component.');
	}
	return ctx;
}