<script lang="ts">
	import { createAuthContext } from '$lib/contexts/AuthContext.svelte';
	import { createOrgsContext } from '$lib/contexts/OrgsContext.svelte';

	const authContext = createAuthContext();
	const orgsContext = createOrgsContext();
</script>

{#if !authContext.accessToken}
	<h1>No user token found</h1>
{:else if orgsContext.loading}
	<p>Loading organizations...</p>
{:else if orgsContext.error}
	<p>Error: {orgsContext.error}</p>
{:else}
	<h1>Select an Organization</h1>
	<ul>
		{#each orgsContext.organizations as org}
			<li>
				<a href="/organization/{org.id}">{org.name}</a>
			</li>
		{/each}
	</ul>
{/if}
