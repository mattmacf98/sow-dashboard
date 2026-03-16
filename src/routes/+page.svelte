<script lang="ts">
	import { createAuthContext } from '$lib/contexts/AuthContext.svelte';

	const authContext = createAuthContext();
	let organizations = $state<any[]>([]);

	const fetchOrganizations = async () => {
		if (!authContext.client) {
			return;
		}
		try {
			const response = await authContext.client.appClient.listOrganizations();
			organizations = response;
		} catch (error) {
			console.error('Error listing organizations', error);
		}
	};

	$effect(() => {
		if (authContext.client) {
			fetchOrganizations();
		}
	});
</script>

{#if authContext.accessToken}
	<h1>Select an Organization</h1>
	{#if organizations.length === 0}
		<p>Loading organizations...</p>
	{:else}
		<ul>
			{#each organizations as org}
				<li>
					<a href="/organization/{org.id}">{org.name}</a>
				</li>
			{/each}
		</ul>
	{/if}
{:else}
	<h1>No user token found</h1>
{/if}
