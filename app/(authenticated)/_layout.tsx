import { useSession } from '#/providers/session-provider';
import { Redirect, Slot } from 'expo-router';

export default function AuthenticatedLayout() {
    const { session } = useSession();

    if (!session) {
        return <Redirect href="/(guest)" />;
    }

    return <Slot />;
}
