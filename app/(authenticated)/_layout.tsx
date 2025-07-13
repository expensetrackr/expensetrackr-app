import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { CustomTabBar } from '#/components/ui/custom-tab-bar.tsx';
import { useSession } from '#/providers/session-provider.tsx';

export default function AuthenticatedLayout() {
    const { session } = useSession();

    if (!session) {
        return <Redirect href="/(guest)" />;
    }

    return (
        <Tabs
            initialRouteName="index"
            screenOptions={{
                headerShown: false,
                animation: 'fade',
            }}
            tabBar={(props) => <CustomTabBar {...props} />}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                }}
            />
            <Tabs.Screen
                name="accounts"
                options={{
                    title: 'Accounts',
                }}
            />
            <Tabs.Screen
                name="add-transaction"
                options={{
                    title: 'Add',
                }}
            />
            <Tabs.Screen
                name="transactions"
                options={{
                    title: 'Transactions',
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                }}
            />
        </Tabs>
    );
}
