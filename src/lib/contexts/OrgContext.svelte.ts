import { getContext, setContext } from 'svelte';
import { appApi } from '@viamrobotics/sdk';
type LocationSummary = appApi.LocationSummary;
import { useAuthContext } from './AuthContext.svelte';

const KEY = Symbol('org-context');

export type OrgContextValue = {
	get locationSummaries(): LocationSummary[];
	get loading(): boolean;
	get error(): string | undefined;
};

export function createOrgContext(orgId: string): OrgContextValue {
	const authContext = useAuthContext();
	let locationSummaries = $state<LocationSummary[]>([]);
	let loading = $state(false);
	let error = $state<string | undefined>(undefined);

	$effect(() => {
		if (!authContext.client) {
			return;
		}
		loading = true;
		error = undefined;
		authContext.client.appClient
			.listMachineSummaries(orgId)
			.then((summaries) => {
				locationSummaries = summaries;
			})
			.catch((err) => {
				console.error('Error listing machine summaries for org', orgId, err);
				error = String(err);
			})
			.finally(() => {
				loading = false;
			});
	});

	const ctx: OrgContextValue = {
		get locationSummaries() {
			return locationSummaries;
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

export function useOrgContext(): OrgContextValue {
	const ctx = getContext<OrgContextValue | undefined>(KEY);
	if (!ctx) {
		throw new Error('OrgContext has not been created. Call createOrgContext() in a parent component.');
	}
	return ctx;
}
