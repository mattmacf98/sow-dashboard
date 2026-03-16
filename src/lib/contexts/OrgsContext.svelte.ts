import { getContext, setContext } from 'svelte';
import { appApi } from '@viamrobotics/sdk';
type Organization = appApi.Organization;
import { useAuthContext } from './AuthContext.svelte';

const KEY = Symbol('orgs-context');

export type OrgsContextValue = {
	get organizations(): Organization[];
	get loading(): boolean;
	get error(): string | undefined;
};

export function createOrgsContext(): OrgsContextValue {
	const authContext = useAuthContext();
	let organizations = $state<Organization[]>([]);
	let loading = $state(false);
	let error = $state<string | undefined>(undefined);

	$effect(() => {
		if (!authContext.client) {
			return;
		}
		loading = true;
		error = undefined;
		authContext.client.appClient
			.listOrganizations()
			.then((orgs) => {
				organizations = orgs;
			})
			.catch((err) => {
				console.error('Error listing organizations', err);
				error = String(err);
			})
			.finally(() => {
				loading = false;
			});
	});

	const ctx: OrgsContextValue = {
		get organizations() {
			return organizations;
		},
		get loading() {
			return loading;
		},
		get error() {
			return error;
		}
	};

	setContext(KEY, ctx);
	return ctx;
}

export function useOrgsContext(): OrgsContextValue {
	const ctx = getContext<OrgsContextValue | undefined>(KEY);
	if (!ctx) {
		throw new Error('OrgsContext has not been created. Call createOrgsContext() in a parent component.');
	}
	return ctx;
}
