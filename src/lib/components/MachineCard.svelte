<script lang="ts">
    import { appApi } from '@viamrobotics/sdk';
    import { createMachineContext } from '$lib/contexts/MachineContext.svelte';
    let { machine } = $props();
    const machineContext = createMachineContext(machine);
    const mainPart = $derived(machineContext.robotParts.find((part) => part.mainPart));
    const localFqdn = $derived(mainPart?.localFqdn ? mainPart.localFqdn.replace('local.', '') : '');
    const isOnline = $derived(machineContext.onlineState === appApi.OnlineState.ONLINE);
    const isOffline = $derived(machineContext.onlineState === appApi.OnlineState.OFFLINE);
</script>

<li class="rounded-lg border border-gray-200 p-3">
    <div class="flex items-center justify-between">
        <p class="font-medium text-gray-900">{machine.machineName}</p>
        {#if isOnline}
            <span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                Online
            </span>
        {:else if isOffline}
            <span class="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                Offline
            </span>
        {:else}
            <span class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                <span class="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                Unknown
            </span>
        {/if}
    </div>
    <p class="text-sm text-gray-500">ID: {machine.machineId}</p>
    {#if machineContext.loading}
        <p class="text-sm text-gray-500">Loading robot parts...</p>
    {:else if machineContext.error}
        <p class="text-sm text-red-500">Error: {machineContext.error}</p>
    {:else}
        <p class="text-sm text-gray-500">Main part: <a href={`https://sanding-webapp_viam.viamapplications.com/machine/${localFqdn}`} target="_blank">{localFqdn}</a></p>
    {/if}
</li>
