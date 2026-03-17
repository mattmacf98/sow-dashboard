<script lang="ts">
	import { useHashRouter } from '$lib/contexts/router.svelte';
	import OrgDetailPage from '$lib/components/OrgDetailPage.svelte';
	import MainPage from '$lib/components/MainPage.svelte';

	const router = useHashRouter();
</script>

{#if router.match('/organization/:id')}
	<OrgDetailPage orgId={router.params.id} />
{:else}
	<MainPage />
{/if}
