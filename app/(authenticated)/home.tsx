import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '#/components/ui/button';
import { Text } from '#/components/ui/text';
import { useSession } from '#/providers/session-provider';

export default function HomePage() {
    const { setSession } = useSession();

    const handleLogout = () => {
        setSession(null);
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
                {/* Header */}
                <View className="mb-6">
                    <Text className="text-2xl font-bold text-foreground">
                        Welcome to ExpenseTrackr
                    </Text>
                    <Text className="text-muted-foreground mt-1">
                        Track your expenses with confidence
                    </Text>
                </View>

                {/* Quick Stats */}
                <View className="mb-6">
                    <Text className="text-lg font-semibold text-foreground mb-3">
                        Quick Overview
                    </Text>
                    <View className="flex-row gap-4">
                        <View className="flex-1 bg-card p-4 rounded-lg border border-border">
                            <Text className="text-sm text-muted-foreground">This Month</Text>
                            <Text className="text-xl font-bold text-foreground">$0.00</Text>
                        </View>
                        <View className="flex-1 bg-card p-4 rounded-lg border border-border">
                            <Text className="text-sm text-muted-foreground">Total Expenses</Text>
                            <Text className="text-xl font-bold text-foreground">$0.00</Text>
                        </View>
                    </View>
                </View>

                {/* Quick Actions */}
                <View className="mb-6">
                    <Text className="text-lg font-semibold text-foreground mb-3">
                        Quick Actions
                    </Text>
                    <View className="gap-3">
                        <Pressable 
                            className="bg-primary p-4 rounded-lg active:opacity-80"
                            accessibilityRole="button"
                            accessibilityLabel="Add new expense">
                            <Text className="text-primary-foreground font-semibold text-center">
                                Add Expense
                            </Text>
                        </Pressable>
                        <Pressable 
                            className="bg-card p-4 rounded-lg border border-border active:opacity-80"
                            accessibilityRole="button"
                            accessibilityLabel="View expense reports">
                            <Text className="text-foreground font-semibold text-center">
                                View Reports
                            </Text>
                        </Pressable>
                    </View>
                </View>

                {/* Recent Activity */}
                <View className="mb-6">
                    <Text className="text-lg font-semibold text-foreground mb-3">
                        Recent Activity
                    </Text>
                    <View className="bg-card p-4 rounded-lg border border-border">
                        <Text className="text-muted-foreground text-center">
                            No expenses yet. Add your first expense to get started!
                        </Text>
                    </View>
                </View>

                {/* Logout Button */}
                <View className="mt-8">
                    <Button 
                        $variant="secondary" 
                        onPress={handleLogout}
                        accessibilityLabel="Sign out of your account"
                        accessibilityRole="button">
                        <Text>Sign Out</Text>
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
