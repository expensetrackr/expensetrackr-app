import { useColorScheme as useNativewindColorScheme } from 'nativewind';

import { COLORS } from '#/theme/colors';

export function useColorScheme() {
    const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme();
    return {
        colorScheme: colorScheme ?? 'dark',
        isDarkColorScheme: colorScheme === 'dark',
        setColorScheme,
        toggleColorScheme,
        colors: COLORS[colorScheme ?? 'light'],
    };
}
