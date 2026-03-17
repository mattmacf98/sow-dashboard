<script lang="ts">
	import { useHashRouter } from '$lib/contexts/router.svelte';
	import { useAuthContext } from '$lib/contexts/AuthContext.svelte';
	import { useAppContext } from '$lib/contexts/AppContext.svelte';
	import OrgDetailPage from '$lib/components/OrgDetailPage.svelte';

	const router = useHashRouter();
	const authContext = useAuthContext();
	const appContext = useAppContext();
</script>

{#if router.match('/organization/:id')}
	<OrgDetailPage orgId={router.params.id} />
{:else}
	<div class="min-h-screen bg-gray-50">
		<div class="mx-auto max-w-2xl px-4 py-12">
			{#if !authContext.accessToken}
				<div class="rounded-lg border border-yellow-200 bg-yellow-50 p-6 text-center">
					<div class="mb-2 text-2xl">⚠️</div>
					<h1 class="text-lg font-semibold text-yellow-800">No user token found</h1>
					<p class="mt-1 text-sm text-yellow-700">Please provide a valid access token to continue.</p>
				</div>
			{:else if appContext.loading}
				<div class="flex flex-col items-center justify-center py-16 text-gray-500">
					<div class="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-500"></div>
					<p class="text-sm">Loading organizations...</p>
				</div>
			{:else if appContext.error}
				<div class="rounded-lg border border-red-200 bg-red-50 p-6">
					<h2 class="font-semibold text-red-800">Error loading organizations</h2>
					<p class="mt-1 text-sm text-red-700">{appContext.error}</p>
				</div>
			{:else}
				<div class="mb-8">
					<h1 class="text-2xl font-bold text-gray-900">Select an Organization</h1>
					<p class="mt-1 text-sm text-gray-500">Choose an organization to view its details.</p>
				</div>
				<ul class="space-y-2">
					{#each appContext.organizations as org (org.id)}
						<li>
							<a
								href="#/organization/{org.id}"
								class="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm transition hover:border-green-400 hover:shadow-md"
							>
								<span class="font-medium text-gray-800">{org.name}</span>
								<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</a>
						</li>
					{/each}
				</ul>
				{#if appContext.organizations.length === 0}
					<div class="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
						<p class="text-sm">No organizations found.</p>
					</div>
				{/if}
			{/if}
		</div>
	</div>
{/if}
