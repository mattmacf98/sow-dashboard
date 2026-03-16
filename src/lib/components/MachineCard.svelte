<script lang="ts">
    import { createMachineContext } from '$lib/contexts/MachineContext.svelte';
    let { machine } = $props();
    const machineContext = createMachineContext(machine.machineId);
    const mainPart = $derived(machineContext.robotParts.find((part) => part.mainPart));
    const localFqdn = $derived(mainPart?.localFqdn ? mainPart.localFqdn.replace('local.', '') : '');

</script>

<li class="rounded-lg border border-gray-200 p-3">
    <p class="font-medium text-gray-900">{machine.machineName}</p>
    <p class="text-sm text-gray-500">ID: {machine.machineId}</p>
    {#if machineContext.loading}
        <p class="text-sm text-gray-500">Loading robot parts...</p>
    {:else if machineContext.error}
        <p class="text-sm text-red-500">Error: {machineContext.error}</p>
    {:else}
        <p class="text-sm text-gray-500">Main part: <a href={`https://sanding-webapp_viam.viamapplications.com/machine/${localFqdn}`} target="_blank">{localFqdn}</a></p>
    {/if}
</li>