<script lang="ts">
	import { useHashRouter } from '$lib/contexts/router.svelte';
	import { useAuthContext } from '$lib/contexts/AuthContext.svelte';
	import { useAppContext } from '$lib/contexts/AppContext.svelte';
	import OrgDetailPage from '$lib/components/OrgDetailPage.svelte';
	import MainPage from '$lib/components/MainPage.svelte';

	const router = useHashRouter();
</script>

{#if router.match('/organization/:id')}
	<OrgDetailPage orgId={router.params.id} />
{:else}
	<MainPage />
{/if}
