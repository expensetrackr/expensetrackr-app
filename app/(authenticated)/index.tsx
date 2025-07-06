import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { FadeInRight, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '#/components/ThemedText.tsx';
import { useColorScheme } from '#/hooks/use-color-scheme.ts';

export default function DashboardScreen() {
    const insets = useSafeAreaInsets();
    const { colors } = useColorScheme();

    const metrics = [
        {
            title: 'Income',
            amount: '$8,250',
            change: '+8.2%',
            isPositive: true,
            icon: 'trending-up',
            color: colors.success,
        },
        {
            title: 'Expenses',
            amount: '$3,800',
            change: '-3.1%',
            isPositive: false,
            icon: 'trending-down',
            color: colors.error,
        },
    ];

    const categorySpending = [
        { name: 'Food & Dining', amount: '$1,230', color: '#FF6B35', percentage: 35 },
        { name: 'Transportation', amount: '$890', color: '#4F46E5', percentage: 25 },
        { name: 'Entertainment', amount: '$650', color: '#EF4444', percentage: 18 },
    ];

    return (
        <View className="flex-1">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 20 }}
                showsVerticalScrollIndicator={false}
                style={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom + 120 }}>
                {/* Header */}
                <Animated.View className="mb-8 flex-row items-center justify-between" entering={FadeInUp.delay(100)}>
                    <View className="flex-1">
                        <ThemedText className="text-base mb-1 text-text-sub-600">Good morning 👋</ThemedText>
                        <ThemedText className="text-2xl font-bold tracking-tight text-text-strong-950">
                            Daniel Esteves
                        </ThemedText>
                    </View>
                    <View className="flex-row items-center gap-3">
                        <Pressable className="h-11 w-11 items-center justify-center rounded-full border border-stroke-soft-200 bg-bg-weak-50">
                            <Feather color={colors.textSub600} name="bell" size={20} />
                        </Pressable>
                        <Pressable
                            className="h-11 w-11 items-center justify-center rounded-full"
                            style={{ backgroundColor: colors.primary }}>
                            <Text className="text-sm font-semibold text-white">DE</Text>
                        </Pressable>
                    </View>
                </Animated.View>

                {/* Total Balance Card */}
                <Animated.View
                    className="mb-6 rounded-20 border border-stroke-soft-200 bg-bg-white-0 p-6"
                    entering={FadeInUp.delay(200)}>
                    <ThemedText className="text-base mb-2 text-text-sub-600 opacity-80">Total Balance</ThemedText>
                    <ThemedText className="text-4xl mb-4 font-extrabold tracking-tight text-text-strong-950">
                        $12,450.00
                    </ThemedText>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center rounded-full bg-bg-weak-50 px-3 py-1.5">
                            <Feather color="#10B981" name="trending-up" size={14} />
                            <ThemedText className="text-sm ml-1 font-semibold text-text-sub-600">
                                +12.5% this month
                            </ThemedText>
                        </View>
                        <Pressable className="p-2">
                            <Feather color={colors.textSub600} name="eye-off" size={20} />
                        </Pressable>
                    </View>
                </Animated.View>

                {/* This Month Section */}
                <Animated.View className="mb-8" entering={FadeInUp.delay(400)}>
                    <ThemedText className="text-xl mb-4 font-bold tracking-tight text-text-strong-950">
                        This Month
                    </ThemedText>
                    <View className="flex-row gap-3">
                        {metrics.map((metric, index) => (
                            <Animated.View
                                className="flex-1 rounded-16 border border-stroke-soft-200 bg-bg-white-0 p-5"
                                entering={FadeInRight.delay(400 + index * 100)}
                                key={metric.title}>
                                <ThemedText className="text-xl mb-1 font-extrabold tracking-tight text-text-strong-950">
                                    {metric.amount}
                                </ThemedText>
                                <ThemedText className="text-sm mb-3 leading-4 text-text-sub-600">
                                    {metric.title}
                                </ThemedText>
                                <View className="flex-row items-center">
                                    <Feather color={metric.color} name={metric.icon as any} size={14} />
                                    <ThemedText className="text-xs ml-1 font-semibold" style={{ color: metric.color }}>
                                        {metric.change}
                                    </ThemedText>
                                </View>
                            </Animated.View>
                        ))}
                    </View>
                </Animated.View>

                {/* Spending by Category */}
                <Animated.View
                    className="mb-6 rounded-16 border border-stroke-soft-200 bg-bg-white-0 p-5"
                    entering={FadeInUp.delay(500)}>
                    <View className="mb-4 flex-row items-center">
                        <View className="mr-3 h-10 w-10 items-center justify-center rounded-12 bg-orange-50">
                            <Feather color="#F97316" name="pie-chart" size={20} />
                        </View>
                        <View className="flex-1">
                            <ThemedText className="text-base mb-0.5 font-semibold text-text-strong-950">
                                Spending by Category
                            </ThemedText>
                            <ThemedText className="text-sm text-text-sub-600">
                                Your top spending categories this month
                            </ThemedText>
                        </View>
                    </View>

                    {categorySpending.map((category, index) => (
                        <Animated.View
                            className="flex-row items-center justify-between py-2"
                            entering={FadeInRight.delay(500 + index * 50)}
                            key={category.name}>
                            <View className="flex-1 flex-row items-center">
                                <View
                                    className="mr-3 h-2 w-2 rounded-full"
                                    style={{ backgroundColor: category.color }}
                                />
                                <ThemedText className="text-sm flex-1 font-medium text-text-strong-950">
                                    {category.name}
                                </ThemedText>
                            </View>
                            <ThemedText className="text-sm font-semibold text-text-strong-950">
                                {category.amount}
                            </ThemedText>
                        </Animated.View>
                    ))}
                </Animated.View>
            </ScrollView>
        </View>
    );
}
