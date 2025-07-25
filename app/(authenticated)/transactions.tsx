import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, SectionList, View } from 'react-native';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '#/components/ThemedText.tsx';
import { ThemedView } from '#/components/ThemedView.tsx';
import { TextField } from '#/components/ui/text-field/index.ts';
import { useColorScheme } from '#/hooks/use-color-scheme.ts';
import type { ThemeColors } from '#/theme/colors.ts';
import { cn } from '#/utils/cn.ts';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface FilterData {
    id: string;
    label: string;
    icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'] | string;
}

interface TransactionData {
    id: number;
    name: string;
    category: string;
    amount: string;
    time: string;
    icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'] | string;
    color: keyof ThemeColors;
}

const transactions: {
    title: string;
    data: TransactionData[];
}[] = [
    {
        title: 'Today',
        data: [
            {
                id: 1,
                name: 'Coffee Shop',
                category: 'Food & Dining',
                amount: '-$4.50',
                time: '9:30 AM',
                icon: 'coffee',
                color: 'error', // '#ef4444' -> error
            },
            {
                id: 2,
                name: 'Grocery Store',
                category: 'Shopping',
                amount: '-$125.30',
                time: '2:15 PM',
                icon: 'cart',
                color: 'feature', // '#8b5cf6' -> feature
            },
        ],
    },
    {
        title: 'Yesterday',
        data: [
            {
                id: 3,
                name: 'Salary Deposit',
                category: 'Income',
                amount: '+$3,200.00',
                time: '12:00 AM',
                icon: 'cash',
                color: 'success', // '#10b981' -> success
            },
            {
                id: 4,
                name: 'Netflix Subscription',
                category: 'Entertainment',
                amount: '-$15.99',
                time: '11:45 PM',
                icon: 'netflix',
                color: 'highlighted', // '#ec4899' -> highlighted
            },
            {
                id: 5,
                name: 'Gas Station',
                category: 'Transportation',
                amount: '-$45.00',
                time: '6:30 PM',
                icon: 'gas-station',
                color: 'information', // '#3b82f6' -> information
            },
        ],
    },
    {
        title: 'March 15, 2024',
        data: [
            {
                id: 6,
                name: 'Electric Bill',
                category: 'Bills & Utilities',
                amount: '-$120.00',
                time: '10:00 AM',
                icon: 'flash',
                color: 'warning', // '#f59e0b' -> warning
            },
            {
                id: 7,
                name: 'Freelance Payment',
                category: 'Income',
                amount: '+$850.00',
                time: '3:00 PM',
                icon: 'laptop',
                color: 'information', // '#3b82f6' -> information
            },
            {
                id: 8,
                name: 'Restaurant',
                category: 'Food & Dining',
                amount: '-$65.00',
                time: '7:30 PM',
                icon: 'food-fork-drink',
                color: 'error', // '#ef4444' -> error
            },
        ],
    },
];

export default function TransactionsScreen() {
    const insets = useSafeAreaInsets();
    const { colors } = useColorScheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filters = useMemo(
        () => [
            { id: 'all', label: 'All', icon: 'format-list-bulleted' },
            { id: 'income', label: 'Income', icon: 'arrow-down' },
            { id: 'expense', label: 'Expense', icon: 'arrow-up' },
        ],
        [],
    );

    const filteredTransactions = useMemo(
        () =>
            transactions
                .map((section) => ({
                    ...section,
                    data: section.data.filter((transaction) => {
                        const matchesSearch =
                            transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
                        const matchesFilter =
                            selectedFilter === 'all' ||
                            (selectedFilter === 'income' && transaction.amount.startsWith('+')) ||
                            (selectedFilter === 'expense' && transaction.amount.startsWith('-'));
                        return matchesSearch && matchesFilter;
                    }),
                }))
                .filter((section) => section.data.length > 0),
        [transactions, searchQuery, selectedFilter],
    );

    return (
        <ThemedView className="flex-1">
            <View style={{ paddingTop: insets.top + 20 }}>
                {/* Header */}
                <View className="mb-4 px-5">
                    <Animated.View entering={FadeInDown.delay(100).springify()}>
                        <ThemedText className="text-2xl mb-2 font-semibold text-text-strong-950">
                            Transactions
                        </ThemedText>
                    </Animated.View>
                </View>

                {/* Search Bar */}
                <Animated.View className="mb-4 px-5" entering={FadeInDown.delay(200).springify()}>
                    <View className="relative">
                        <Feather
                            color={colors.iconSub600}
                            name="search"
                            size={20}
                            style={{ position: 'absolute', left: 12, top: 12, zIndex: 1 }}
                        />
                        <TextField
                            className="pl-10"
                            placeholder="Search transactions..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </Animated.View>

                {/* Filter Tabs */}
                <Animated.View entering={FadeInDown.delay(300).springify()}>
                    <ScrollView
                        horizontal
                        className="mb-4"
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        showsHorizontalScrollIndicator={false}>
                        {filters.map((filter) => (
                            <FilterTab
                                colors={colors}
                                filter={filter}
                                isSelected={selectedFilter === filter.id}
                                key={filter.id}
                                onPress={() => setSelectedFilter(filter.id)}
                            />
                        ))}
                    </ScrollView>
                </Animated.View>
            </View>

            {/* Transactions List */}
            <SectionList
                ListEmptyComponent={
                    <View className="flex-1 items-center justify-center py-20">
                        <MaterialCommunityIcons color={colors.iconSub600} name="receipt" size={64} />
                        <ThemedText className="mt-4 text-text-sub-600">No transactions found</ThemedText>
                    </View>
                }
                contentContainerStyle={{
                    paddingBottom: insets.bottom + 100,
                }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index, section }) => (
                    <TransactionItem isLast={index === section.data.length - 1} transaction={item} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <View className="bg-bg-white-0 px-5 py-2">
                        <ThemedText className="text-sm font-medium text-text-sub-600">{title}</ThemedText>
                    </View>
                )}
                sections={filteredTransactions}
                showsVerticalScrollIndicator={false}
            />
        </ThemedView>
    );
}

function FilterTab({
    filter,
    isSelected,
    onPress,
    colors,
}: {
    filter: FilterData;
    isSelected: boolean;
    onPress: () => void;
    colors: ThemeColors;
}) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <AnimatedPressable
            accessible
            accessibilityLabel={`${filter.label} filter`}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            className={cn(
                'mr-2 flex-row items-center rounded-full px-4 py-2',
                isSelected ? 'bg-primary' : 'bg-bg-weak-50',
            )}
            style={animatedStyle}
            onPress={onPress}
            onPressIn={() => {
                scale.value = withSpring(0.95);
            }}
            onPressOut={() => {
                scale.value = withSpring(1);
            }}>
            <MaterialCommunityIcons
                color={isSelected ? colors.textWhite0 : colors.iconSub600}
                name={filter.icon as React.ComponentProps<typeof MaterialCommunityIcons>['name']}
                size={16}
            />
            <ThemedText className={cn('text-sm ml-1.5 font-medium', isSelected ? 'text-white' : 'text-text-sub-600')}>
                {filter.label}
            </ThemedText>
        </AnimatedPressable>
    );
}

function TransactionItem({ transaction, isLast }: { transaction: TransactionData; isLast: boolean }) {
    const { colors } = useColorScheme();
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <AnimatedPressable
            accessible
            accessibilityLabel={`${transaction.name}, ${transaction.category}, ${transaction.amount}`}
            accessibilityRole="button"
            style={animatedStyle}
            onPressIn={() => {
                scale.value = withSpring(0.98);
            }}
            onPressOut={() => {
                scale.value = withSpring(1);
            }}>
            <View className={cn('flex-row items-center px-5 py-4', !isLast && 'border-b border-stroke-soft-200')}>
                <View
                    className="mr-3 h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${colors[transaction.color]}20` }}>
                    <MaterialCommunityIcons
                        color={colors[transaction.color]}
                        name={transaction.icon as React.ComponentProps<typeof MaterialCommunityIcons>['name']}
                        size={24}
                    />
                </View>
                <View className="flex-1">
                    <ThemedText className="text-base font-medium text-text-strong-950">{transaction.name}</ThemedText>
                    <View className="flex-row items-center">
                        <ThemedText className="text-sm text-text-sub-600">{transaction.category}</ThemedText>
                        <ThemedText className="text-sm mx-1 text-text-sub-600">•</ThemedText>
                        <ThemedText className="text-sm text-text-sub-600">{transaction.time}</ThemedText>
                    </View>
                </View>
                <ThemedText
                    className={cn(
                        'text-base font-semibold',
                        transaction.amount.startsWith('+') ? 'text-success-base' : 'text-text-strong-950',
                    )}>
                    {transaction.amount}
                </ThemedText>
            </View>
        </AnimatedPressable>
    );
}
