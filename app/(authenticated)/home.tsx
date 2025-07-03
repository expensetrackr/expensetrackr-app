import { useCallback } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '#/components/ui/button.tsx';
import { Text } from '#/components/ui/text.tsx';
import { useSession } from '#/providers/session-provider.tsx';

export default function HomePage() {
    const { setSession } = useSession();

    const handleLogout = useCallback(() => {
        setSession(null);
    }, [setSession]);

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
                {/* Header */}
                <View className="mb-6">
                    <Text className="text-2xl font-bold text-foreground">Welcome to ExpenseTrackr</Text>
                    <Text className="mt-1 text-muted-foreground">Track your expenses with confidence</Text>
                </View>

                {/* Quick Stats */}
                <View className="mb-6">
                    <Text className="mb-3 text-lg font-semibold text-foreground">Quick Overview</Text>
                    <View className="flex-row gap-4">
                        <View className="flex-1 rounded-lg border border-border bg-card p-4">
                            <Text className="text-sm text-muted-foreground">This Month</Text>
                            <Text className="text-xl font-bold text-foreground">$0.00</Text>
                        </View>
                        <View className="flex-1 rounded-lg border border-border bg-card p-4">
                            <Text className="text-sm text-muted-foreground">Total Expenses</Text>
                            <Text className="text-xl font-bold text-foreground">$0.00</Text>
                        </View>
                    </View>
                </View>

                {/* Quick Actions */}
                <View className="mb-6">
                    <Text className="mb-3 text-lg font-semibold text-foreground">Quick Actions</Text>
                    <View className="gap-3">
                        <Pressable
                            accessibilityLabel="Add new expense"
                            accessibilityRole="button"
                            className="rounded-lg bg-primary p-4 active:opacity-80">
                            <Text className="text-center font-semibold text-primary-foreground">Add Expense</Text>
                        </Pressable>
                        <Pressable
                            accessibilityLabel="View expense reports"
                            accessibilityRole="button"
                            className="rounded-lg border border-border bg-card p-4 active:opacity-80">
                            <Text className="text-center font-semibold text-foreground">View Reports</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Recent Activity */}
                <View className="mb-6">
                    <Text className="mb-3 text-lg font-semibold text-foreground">Recent Activity</Text>
                    <View className="rounded-lg border border-border bg-card p-4">
                        <Text className="text-center text-muted-foreground">
                            No expenses yet. Add your first expense to get started!
                        </Text>
                    </View>
                </View>

                {/* Logout Button */}
                <View className="mt-8">
                    <Button
                        $variant="secondary"
                        accessibilityLabel="Sign out of your account"
                        accessibilityRole="button"
                        onPress={handleLogout}>
                        <Text>Sign Out</Text>
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
