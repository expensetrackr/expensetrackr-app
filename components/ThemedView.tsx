import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '#/hooks/use-theme-color.ts';

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'bgWhite');

    return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
