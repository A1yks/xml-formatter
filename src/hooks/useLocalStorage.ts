import { useCallback, useState } from 'react';

export function useLocalStorage<T = unknown>(key: string, defaultValue: T) {
    const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
        try {
            const value = localStorage.getItem(key);

            if (value) {
                return JSON.parse(value);
            } else {
                localStorage.setItem(key, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (error) {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        }
    });

    const setLocalStorageStateValue = useCallback(
        (valueOrFn: React.SetStateAction<T>) => {
            let newValue: T;

            if (valueOrFn instanceof Function) {
                newValue = valueOrFn(localStorageValue);
            } else {
                newValue = valueOrFn;
            }

            localStorage.setItem(key, JSON.stringify(newValue));
            setLocalStorageValue(newValue);
        },
        [key, localStorageValue]
    );

    return [localStorageValue, setLocalStorageStateValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
