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
    {:else if localFqdn}
        <a
            href={`https://sanding-webapp_viam.viamapplications.com/machine/${localFqdn}`}
            target="_blank"
            rel="noopener noreferrer"
            class="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            Open Operator App
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
        </a>
    {/if}
</li>
