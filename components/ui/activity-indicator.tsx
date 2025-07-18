import { ActivityIndicator as RNActivityIndicator } from 'react-native';

import { useColorScheme } from '#/hooks/use-color-scheme.ts';

export function ActivityIndicator(props: React.ComponentPropsWithoutRef<typeof RNActivityIndicator>) {
    const { colors } = useColorScheme();

    return <RNActivityIndicator color={colors.primary} {...props} />;
}
