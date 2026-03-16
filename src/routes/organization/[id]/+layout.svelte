<script lang="ts">
	import { page } from '$app/state';
	import { createOrgContext } from '$lib/contexts/OrgContext.svelte';

	createOrgContext(page.params.id ?? '');

	let { children } = $props();
</script>

{@render children()}
