import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Animated, {
    FadeInDown,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '#/components/ThemedText.tsx';
import { ThemedView } from '#/components/ThemedView.tsx';
import { useColorScheme } from '#/hooks/use-color-scheme.ts';
import { cn } from '#/utils/cn.ts';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AccountsScreen() {
    const insets = useSafeAreaInsets();
    const { isDarkColorScheme, colors } = useColorScheme();

    const accounts = [
        {
            id: 1,
            name: 'Main Checking',
            type: 'Checking Account',
            balance: '$5,250.00',
            accountNumber: '****1234',
            gradient: ['#3b82f6', '#60a5fa'] as const,
            icon: 'bank',
        },
        {
            id: 2,
            name: 'Savings',
            type: 'Savings Account',
            balance: '$12,450.00',
            accountNumber: '****5678',
            gradient: ['#10b981', '#34d399'] as const,
            icon: 'piggy-bank',
        },
        {
            id: 3,
            name: 'Credit Card',
            type: 'Visa Card',
            balance: '-$1,200.00',
            accountNumber: '****9012',
            gradient: ['#8b5cf6', '#a78bfa'] as const,
            icon: 'credit-card',
        },
        {
            id: 4,
            name: 'Investment',
            type: 'Brokerage Account',
            balance: '$25,890.00',
            accountNumber: '****3456',
            gradient: ['#f59e0b', '#fbbf24'] as const,
            icon: 'chart-line',
        },
    ];

    const totalBalance = accounts.reduce((acc, account) => {
        const amount = parseFloat(account.balance.replace(/[$,]/g, ''));
        return acc + amount;
    }, 0);

    return (
        <ThemedView className="flex-1">
            <ScrollView
                contentContainerStyle={{
                    paddingTop: insets.top + 20,
                    paddingBottom: insets.bottom + 100,
                }}
                showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="mb-6 px-5">
                    <Animated.View entering={FadeInDown.delay(100).springify()}>
                        <ThemedText className="text-text-strong-950 mb-2 text-2xl font-semibold">
                            Your Accounts
                        </ThemedText>
                        <View className="flex-row items-baseline">
                            <ThemedText className="text-text-sub-600 mr-2 text-sm">Total Balance:</ThemedText>
                            <ThemedText className="text-xl font-semibold text-primary">
                                $
                                {totalBalance.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </ThemedText>
                        </View>
                    </Animated.View>
                </View>

                {/* Account Cards */}
                <View className="px-5">
                    {accounts.map((account, index) => (
                        <AccountCard account={account} index={index} key={account.id} />
                    ))}
                </View>

                {/* Add Account Button */}
                <Animated.View className="mt-6 px-5" entering={FadeInDown.delay(500).springify()}>
                    <Pressable
                        className={cn(
                            'items-center rounded-2xl border-2 border-dashed p-6',
                            isDarkColorScheme ? 'border-grey4' : 'border-grey5',
                        )}>
                        <View className="bg-bg-weak-50 mb-3 h-12 w-12 items-center justify-center rounded-full">
                            <MaterialCommunityIcons color={colors.primary} name="plus" size={24} />
                        </View>
                        <ThemedText className="text-text-strong-950 text-base font-medium">Add New Account</ThemedText>
                        <ThemedText className="text-text-sub-600 mt-1 text-sm">Connect bank or add manually</ThemedText>
                    </Pressable>
                </Animated.View>
            </ScrollView>
        </ThemedView>
    );
}

function AccountCard({ account, index }: { account: any; index: number }) {
    const pressed = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(pressed.value, [0, 1], [1, 0.95]),
            },
        ],
    }));

    return (
        <Animated.View className="mb-4" entering={FadeInDown.delay(index * 100).springify()}>
            <AnimatedPressable
                style={animatedStyle}
                onPressIn={() => {
                    pressed.value = withSpring(1);
                }}
                onPressOut={() => {
                    pressed.value = withSpring(0);
                }}>
                <LinearGradient
                    className="rounded-2xl p-5"
                    colors={account.gradient}
                    end={{ x: 1, y: 1 }}
                    start={{ x: 0, y: 0 }}
                    style={{
                        shadowColor: account.gradient[0],
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 8,
                        elevation: 5,
                    }}>
                    <View className="mb-8 flex-row items-start justify-between">
                        <View>
                            <ThemedText className="text-lg font-semibold text-white">{account.name}</ThemedText>
                            <ThemedText className="text-sm text-white/80">{account.type}</ThemedText>
                        </View>
                        <View className="rounded-xl bg-white/20 p-2.5">
                            <MaterialCommunityIcons color="#ffffff" name={account.icon} size={24} />
                        </View>
                    </View>

                    <View>
                        <ThemedText className="mb-1 text-xs text-white/60">Available Balance</ThemedText>
                        <ThemedText className="mb-3 text-2xl font-bold text-white">{account.balance}</ThemedText>
                        <ThemedText className="text-sm text-white/80">{account.accountNumber}</ThemedText>
                    </View>
                </LinearGradient>
            </AnimatedPressable>
        </Animated.View>
    );
}
