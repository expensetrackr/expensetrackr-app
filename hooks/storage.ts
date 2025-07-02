import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useReducer } from 'react';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
    return useReducer(
        (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
        initialValue,
    ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
    if (value == null) {
        await SecureStore.deleteItemAsync(key);
    } else {
        await SecureStore.setItemAsync(key, value);
    }
}

export function useStorageState(key: string): UseStateHook<string> {
    const [state, setState] = useAsyncState<string>();

    useEffect(() => {
        SecureStore.getItemAsync(key).then((value) => {
            setState(value);
        }).catch((error: unknown) => {
            console.error(`Failed to load storage item "${key}":`, error);
            setState(null);
        });
    }, [key]);

    const setValue = useCallback(
        (value: string | null) => {
            // Update local state first for immediate UI response
            setState(value);
            
            // Then persist to storage with error handling
            setStorageItemAsync(key, value).catch((error: unknown) => {
                console.error(`Failed to save storage item "${key}":`, error);
                // Revert local state if storage fails
                SecureStore.getItemAsync(key)
                    .then((currentValue: string | null) => setState(currentValue))
                    .catch(() => setState(null));
            });
        },
        [key],
    );

    return [state, setValue];
}
