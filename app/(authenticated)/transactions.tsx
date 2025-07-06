import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, SectionList, View } from 'react-native';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '#/components/ThemedText.tsx';
import { ThemedView } from '#/components/ThemedView.tsx';
import { TextField } from '#/components/ui/text-field/index.ts';
import { useColorScheme } from '#/hooks/use-color-scheme.ts';
import { cn } from '#/utils/cn.ts';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function TransactionsScreen() {
    const insets = useSafeAreaInsets();
    const { isDarkColorScheme, colors } = useColorScheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'All', icon: 'format-list-bulleted' },
        { id: 'income', label: 'Income', icon: 'arrow-down' },
        { id: 'expense', label: 'Expense', icon: 'arrow-up' },
    ];

    const transactions = [
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
                    color: '#ef4444',
                },
                {
                    id: 2,
                    name: 'Grocery Store',
                    category: 'Shopping',
                    amount: '-$125.30',
                    time: '2:15 PM',
                    icon: 'cart',
                    color: '#8b5cf6',
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
                    color: '#10b981',
                },
                {
                    id: 4,
                    name: 'Netflix Subscription',
                    category: 'Entertainment',
                    amount: '-$15.99',
                    time: '11:45 PM',
                    icon: 'netflix',
                    color: '#ec4899',
                },
                {
                    id: 5,
                    name: 'Gas Station',
                    category: 'Transportation',
                    amount: '-$45.00',
                    time: '6:30 PM',
                    icon: 'gas-station',
                    color: '#3b82f6',
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
                    color: '#f59e0b',
                },
                {
                    id: 7,
                    name: 'Freelance Payment',
                    category: 'Income',
                    amount: '+$850.00',
                    time: '3:00 PM',
                    icon: 'laptop',
                    color: '#3b82f6',
                },
                {
                    id: 8,
                    name: 'Restaurant',
                    category: 'Food & Dining',
                    amount: '-$65.00',
                    time: '7:30 PM',
                    icon: 'food-fork-drink',
                    color: '#ef4444',
                },
            ],
        },
    ];

    const filteredTransactions = transactions
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
        .filter((section) => section.data.length > 0);

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
                    <TransactionItem
                        isDarkColorScheme={isDarkColorScheme}
                        isLast={index === section.data.length - 1}
                        transaction={item}
                    />
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
    filter: any;
    isSelected: boolean;
    onPress: () => void;
    colors: any;
}) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <AnimatedPressable
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
            <MaterialCommunityIcons color={isSelected ? '#ffffff' : colors.grey} name={filter.icon} size={16} />
            <ThemedText className={cn('text-sm ml-1.5 font-medium', isSelected ? 'text-white' : 'text-text-sub-600')}>
                {filter.label}
            </ThemedText>
        </AnimatedPressable>
    );
}

function TransactionItem({
    transaction,
    isLast,
    isDarkColorScheme,
}: {
    transaction: any;
    isLast: boolean;
    isDarkColorScheme: boolean;
}) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <AnimatedPressable
            style={animatedStyle}
            onPressIn={() => {
                scale.value = withSpring(0.98);
            }}
            onPressOut={() => {
                scale.value = withSpring(1);
            }}>
            <View
                className={cn(
                    'flex-row items-center px-5 py-4',
                    !isLast && 'border-b',
                    isDarkColorScheme ? 'border-grey5' : 'border-stroke-soft-200',
                )}>
                <View
                    className="mr-3 h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${transaction.color}20` }}>
                    <MaterialCommunityIcons color={transaction.color} name={transaction.icon} size={24} />
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
