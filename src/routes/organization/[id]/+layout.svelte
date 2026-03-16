<script lang="ts">
	import { page } from '$app/state';
	import { createOrgContext } from '$lib/contexts/OrgContext.svelte';

	const orgContext = createOrgContext(page.params.id ?? '');

	let { children } = $props();
</script>

<div class="p-4">
	<h2 class="mb-4 text-xl font-semibold">Organization: {page.params.id}</h2>

	{#if orgContext.loading}
		<p class="text-gray-500">Loading machines...</p>
	{:else if orgContext.error}
		<p class="text-red-500">Error: {orgContext.error}</p>
	{:else if orgContext.locationSummaries.length === 0}
		<p class="text-gray-500">No machines found for this organization.</p>
	{:else}
		{#each orgContext.locationSummaries as location}
			<div class="mb-6">
				<h3 class="mb-2 text-lg font-medium">{location.locationName}</h3>
				<ul class="space-y-2">
					{#each location.machineSummaries as machine}
						<li class="rounded border p-3">
							<p class="font-medium">{machine.machineName}</p>
							<p class="text-sm text-gray-500">ID: {machine.machineId}</p>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	{/if}

	{@render children()}
</div>
