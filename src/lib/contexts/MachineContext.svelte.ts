import { getContext, setContext } from "svelte";
import { useAuthContext } from "./AuthContext.svelte";

const KEY = Symbol('machine-context');

export type MachineContextValue = {
    get robotParts(): any[];
    get loading(): boolean;
    get error(): string | undefined;
};

export function createMachineContext(machineId: string): MachineContextValue {
    const authContext = useAuthContext();
    let robotParts = $state<any[]>([]);
    let loading = $state(false);
    let error = $state<string | undefined>(undefined);

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