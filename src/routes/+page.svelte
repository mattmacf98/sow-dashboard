<script lang="ts">
	import { createAuthContext } from '$lib/contexts/AuthContext.svelte';

	const authContext = createAuthContext();
    let organizations = $state<any[]>([]);

    const fetchOrganizations = async () => {
        if (!authContext.client) {
            return;
        }
        console.log('Listing organizations...');
        try {
            console.log(authContext.client.appClient);
            const response = await authContext.client.appClient.listOrganizations();
            console.log('Organizations listed', response);
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
	<h1>Sow Dashboard why</h1>
	<pre>{JSON.stringify(organizations, null, 2)}</pre>
{:else}
	<h1>No user token found</h1>
{/if}