<script lang="ts">
    import './layout.css';
    import { createAppContext } from '$lib/contexts/AppContext.svelte';
    import { createAuthContext } from '$lib/contexts/AuthContext.svelte';

    let { children } = $props();

    createAuthContext();
    createAppContext();
</script>

{@render children()}