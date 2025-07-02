import { Redirect, Slot } from 'expo-router';

import { useSession } from '#/providers/session-provider.tsx';

export default function AuthenticatedLayout() {
    const { session } = useSession();

    if (!session) {
        return <Redirect href="/(guest)" />;
    }

    return <Slot />;
}
