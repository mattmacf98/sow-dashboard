<script lang="ts">
	import './layout.css';
	import { createAppContext } from '$lib/contexts/AppContext.svelte';
	import { createAuthContext } from '$lib/contexts/AuthContext.svelte';
	import { createHashRouter } from '$lib/contexts/router.svelte';

	let { children } = $props();

	createAuthContext();
	createAppContext();
	createHashRouter();
</script>

{@render children()}