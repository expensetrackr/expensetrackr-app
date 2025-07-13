import { Stack, router, usePathname } from 'expo-router';

import { Button } from '#/components/ui/button.tsx';
import { Text } from '#/components/ui/text.tsx';
import { useThemeColor } from '#/hooks/use-theme-color.ts';

function HeaderLeftButton() {
    const pathname = usePathname();
    const isForgotPassword = pathname.endsWith('/forgot-password');

    if (isForgotPassword) {
        return (
            <Button $variant="plain" className="ios:px-0" onPress={() => router.back()}>
                <Text className="text-primary font-medium">Back</Text>
            </Button>
        );
    }

    return (
        <Button $variant="plain" className="ios:px-0" onPress={() => router.dismiss()}>
            <Text className="text-primary font-medium">Cancel</Text>
        </Button>
    );
}

export default function AuthLayout() {
    const textColor = useThemeColor({}, 'textStrong950');

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerShadowVisible: false,
                headerTransparent: true,
                headerStyle: {
                    backgroundColor: 'transparent',
                },
                headerTitleStyle: {
                    color: textColor,
                    fontWeight: '600',
                },
                animation: 'ios_from_right', // This provides smooth horizontal transitions
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                headerLeft: () => <HeaderLeftButton />,
            }}>
            <Stack.Screen
                name="login"
                options={{
                    title: '',
                    animation: 'ios_from_right',
                }}
            />
            <Stack.Screen
                name="create-account"
                options={{
                    title: '',
                    animation: 'ios_from_left',
                }}
            />
            <Stack.Screen
                name="forgot-password"
                options={{
                    title: '',
                    animation: 'ios_from_right',
                }}
            />
        </Stack>
    );
}
