import { getContext, setContext } from "svelte";
import { appApi } from "@viamrobotics/sdk";
import { useAuthContext } from "./AuthContext.svelte";

type MachineSummary = appApi.MachineSummary;
type OnlineState = appApi.OnlineState;

const KEY = Symbol('machine-context');

export type MachineContextValue = {
    get robotParts(): any[];
    get loading(): boolean;
    get error(): string | undefined;
    get onlineState(): OnlineState;
};

export function createMachineContext(machine: MachineSummary): MachineContextValue {
    const authContext = useAuthContext();
    const machineId = machine.machineId;
    let robotParts = $state<any[]>([]);
    let loading = $state(false);
    let error = $state<string | undefined>(undefined);

    const mainPartSummary = $derived(machine.partSummaries.find((p) => p.isMainPart));
    const onlineState = $derived(mainPartSummary?.onlineState ?? appApi.OnlineState.UNSPECIFIED);

    $effect(() => {
        if (!authContext.client) {
            return;
        }
        loading = true;
        error = undefined;
        authContext.client.appClient.getRobotParts(machineId).then((parts) => {
            robotParts = parts;
        }).catch((err) => {
            console.error('Error getting robot parts for machine', machineId, err);
            error = String(err);
        }).finally(() => {
            loading = false;
        });
    });

    const ctx: MachineContextValue = {
        get robotParts() {
            return robotParts;
        },
        get loading() {
            return loading;
        },
        get error() {
            return error;
        },
        get onlineState() {
            return onlineState;
        }
    };

    setContext(KEY, ctx);
    return ctx;
}

export function useMachineContext(): MachineContextValue {
    const ctx = getContext<MachineContextValue | undefined>(KEY);
    if (!ctx) {
        throw new Error('MachineContext has not been created. Call createMachineContext() in a parent component.');
    }
    return ctx;
}