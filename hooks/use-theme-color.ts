/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '#/constants/Colors';
import { useColorScheme } from '#/hooks/use-color-scheme';

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
    const { colorScheme } = useColorScheme();
    const colorFromProps = props[colorScheme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[colorScheme][colorName];
    }
}
