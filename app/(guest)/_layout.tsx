import { Redirect, Stack } from 'expo-router';

import { useSession } from '#/providers/session-provider.tsx';

export default function GuestLayout() {
    const { session } = useSession();

    if (session) {
        return <Redirect href="/(authenticated)/home" />;
    }

    return (
        <Stack screenOptions={SCREEN_OPTIONS}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" options={AUTH_MODAL_OPTIONS} />
        </Stack>
    );
}

const SCREEN_OPTIONS = {
    headerShown: false,
} as const;

const AUTH_MODAL_OPTIONS = {
    presentation: 'card',
    headerShown: false,
} as const;
