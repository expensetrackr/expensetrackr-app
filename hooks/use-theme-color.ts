/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from '#/hooks/use-color-scheme.ts';
import { colors } from '#/theme/colors.ts';

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof colors.light & keyof typeof colors.dark,
) {
    const { colorScheme } = useColorScheme();
    const colorFromProps = props[colorScheme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return colors[colorScheme][colorName];
    }
}
