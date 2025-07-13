import { useColorScheme as useNativewindColorScheme } from 'nativewind';

import { colors } from '#/theme/colors.ts';

export function useColorScheme() {
    const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme();
    return {
        colorScheme: colorScheme ?? 'dark',
        isDarkColorScheme: colorScheme === 'dark',
        setColorScheme,
        toggleColorScheme,
        colors: colors[colorScheme ?? 'light'],
    };
}
