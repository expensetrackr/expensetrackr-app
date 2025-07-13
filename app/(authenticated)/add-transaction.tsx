import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '#/components/ThemedText.tsx';
import { ThemedView } from '#/components/ThemedView.tsx';
import { Button } from '#/components/ui/button.tsx';
import { TextField } from '#/components/ui/text-field/index.ts';
import { useColorScheme } from '#/hooks/use-color-scheme.ts';
import { colors } from '#/theme/colors.ts';
import { cn } from '#/utils/cn.ts';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Category {
    id: string;
    name: string;
    icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'] | string;
    color: string;
}

export default function AddTransactionScreen() {
    const insets = useSafeAreaInsets();
    const { isDarkColorScheme, colors } = useColorScheme();
    const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
    const [amount, setAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [note, setNote] = useState('');
    const [amountError, setAmountError] = useState('');

    const validateAmount = (value: string) => {
        const regex = /^\d+(\.\d{0,2})?$/;
        if (value && !regex.test(value)) {
            setAmountError('Please enter a valid amount (e.g., 10.50)');
            return false;
        }
        setAmountError('');
        return true;
    };

    const categories = {
        expense: [
            { id: 'food', name: 'Food & Dining', icon: 'food-fork-drink', color: 'error' },
            { id: 'transport', name: 'Transportation', icon: 'car', color: 'information' },
            { id: 'shopping', name: 'Shopping', icon: 'shopping', color: 'feature' },
            { id: 'entertainment', name: 'Entertainment', icon: 'movie-open', color: 'highlighted' },
            { id: 'bills', name: 'Bills & Utilities', icon: 'receipt', color: 'warning' },
            { id: 'health', name: 'Healthcare', icon: 'hospital-box', color: 'success' },
        ],
        income: [
            { id: 'salary', name: 'Salary', icon: 'cash', color: 'success' },
            { id: 'freelance', name: 'Freelance', icon: 'laptop', color: 'information' },
            { id: 'investment', name: 'Investment', icon: 'chart-line', color: 'feature' },
            { id: 'gift', name: 'Gift', icon: 'gift', color: 'highlighted' },
            { id: 'other', name: 'Other', icon: 'dots-horizontal', color: 'gray600' },
        ],
    };

    const currentCategories = categories[transactionType];

    return (
        <ThemedView className="flex-1">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                <ScrollView
                    contentContainerStyle={{
                        paddingTop: insets.top + 20,
                        paddingBottom: insets.bottom + 100,
                    }}
                    showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View className="mb-6 px-5">
                        <Animated.View entering={FadeInDown.delay(100).springify()}>
                            <View className="mb-2 flex-row items-center justify-between">
                                <Pressable
                                    className="h-10 w-10 items-center justify-center rounded-full bg-bg-weak-50"
                                    onPress={() => router.back()}>
                                    <Feather color={colors.iconSub600} name="arrow-left" size={20} />
                                </Pressable>
                                <ThemedText className="text-2xl font-semibold text-text-strong-950">
                                    Add Transaction
                                </ThemedText>
                                <View className="w-10" />
                            </View>
                            <ThemedText className="text-sm text-center text-text-sub-600">
                                Record your income or expense
                            </ThemedText>
                        </Animated.View>
                    </View>

                    {/* Transaction Type Toggle */}
                    <Animated.View className="mb-6 px-5" entering={FadeInDown.delay(200).springify()}>
                        <View className="rounded-xl flex-row bg-bg-weak-50 p-1">
                            <TransactionTypeButton
                                colors={colors}
                                isActive={transactionType === 'expense'}
                                label="Expense"
                                type="expense"
                                onPress={() => setTransactionType('expense')}
                            />
                            <TransactionTypeButton
                                colors={colors}
                                isActive={transactionType === 'income'}
                                label="Income"
                                type="income"
                                onPress={() => setTransactionType('income')}
                            />
                        </View>
                    </Animated.View>

                    {/* Amount Input */}
                    <Animated.View className="mb-6 px-5" entering={FadeInDown.delay(300).springify()}>
                        <ThemedText className="text-sm mb-2 text-text-sub-600">Amount</ThemedText>
                        <View className="flex-row items-center">
                            <ThemedText className="text-3xl mr-2 font-bold text-text-strong-950">$</ThemedText>
                            <TextField
                                className="text-3xl flex-1 font-bold"
                                keyboardType="decimal-pad"
                                placeholder="0.00"
                                style={{ fontSize: 28 }}
                                value={amount}
                                onChangeText={(text) => {
                                    setAmount(text);
                                    validateAmount(text);
                                }}
                            />
                        </View>
                        {amountError ? (
                            <ThemedText className="text-sm mt-1 text-error-base">{amountError}</ThemedText>
                        ) : null}
                    </Animated.View>

                    {/* Category Selection */}
                    <Animated.View className="mb-6 px-5" entering={FadeInDown.delay(400).springify()}>
                        <ThemedText className="text-sm mb-3 text-text-sub-600">Category</ThemedText>
                        <View className="flex-row flex-wrap">
                            {currentCategories.map((category) => (
                                <CategoryButton
                                    category={category}
                                    isDarkColorScheme={isDarkColorScheme}
                                    isSelected={selectedCategory === category.id}
                                    key={category.id}
                                    onPress={() => setSelectedCategory(category.id)}
                                />
                            ))}
                        </View>
                    </Animated.View>

                    {/* Note Input */}
                    <Animated.View className="mb-8 px-5" entering={FadeInDown.delay(500).springify()}>
                        <ThemedText className="text-sm mb-2 text-text-sub-600">Note (Optional)</ThemedText>
                        <TextField
                            multiline
                            numberOfLines={3}
                            placeholder="Add a note..."
                            textAlignVertical="top"
                            value={note}
                            onChangeText={setNote}
                        />
                    </Animated.View>

                    {/* Save Button */}
                    <Animated.View className="px-5" entering={FadeInUp.delay(600).springify()}>
                        <Button
                            $size="lg"
                            className="w-full"
                            disabled={!amount || !selectedCategory || !!amountError}
                            onPress={() => {
                                // Here you would typically save the transaction
                                // For now, we'll just navigate back
                                router.back();
                            }}>
                            <LinearGradient
                                className="rounded-xl absolute inset-0"
                                colors={transactionType === 'expense' ? ['#ef4444', '#f87171'] : ['#10b981', '#34d399']}
                                end={{ x: 1, y: 0 }}
                                start={{ x: 0, y: 0 }}
                            />
                            <ThemedText className="text-lg font-semibold text-white">Save Transaction</ThemedText>
                        </Button>
                        {(!amount || !selectedCategory || !!amountError) && (
                            <ThemedText className="text-sm mt-2 text-center text-error-base">
                                {amountError
                                    ? amountError
                                    : !amount
                                      ? 'Please enter an amount.'
                                      : !selectedCategory
                                        ? 'Please select a category.'
                                        : ''}
                            </ThemedText>
                        )}
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ThemedView>
    );
}

interface TransactionTypeButtonProps {
    type: 'expense' | 'income';
    label: string;
    isActive: boolean;
    onPress: () => void;
    colors: typeof colors.light | typeof colors.dark;
}

function TransactionTypeButton({ type, label, isActive, onPress, colors }: TransactionTypeButtonProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <AnimatedPressable
            className={cn('rounded-lg flex-1 items-center py-3', isActive && 'bg-bg-white-0')}
            style={animatedStyle}
            onPress={onPress}
            onPressIn={() => {
                scale.value = withSpring(0.95);
            }}
            onPressOut={() => {
                scale.value = withSpring(1);
            }}>
            <Feather
                color={isActive ? (type === 'expense' ? colors.error : colors.success) : colors.iconSub600}
                name={type === 'expense' ? 'arrow-up-circle' : 'arrow-down-circle'}
                size={20}
            />
            <ThemedText
                className={cn(
                    'text-sm mt-1 font-medium',
                    isActive ? (type === 'expense' ? 'text-error-base' : 'text-success-base') : 'text-text-sub-600',
                )}>
                {label}
            </ThemedText>
        </AnimatedPressable>
    );
}

function CategoryButton({
    category,
    isSelected,
    onPress,
    isDarkColorScheme,
}: {
    category: Category;
    isSelected: boolean;
    onPress: () => void;
    isDarkColorScheme: boolean;
}) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <AnimatedPressable
            className="mb-3 mr-[2%] w-[31%]"
            style={animatedStyle}
            onPress={onPress}
            onPressIn={() => {
                scale.value = withSpring(0.9);
            }}
            onPressOut={() => {
                scale.value = withSpring(1);
            }}>
            <View
                className={cn(
                    'rounded-xl items-center p-3',
                    isSelected
                        ? 'bg-primary/10 border-primary border-2'
                        : isDarkColorScheme
                          ? 'border-2 border-transparent bg-bg-weak-50'
                          : 'border-2 border-stroke-soft-200 bg-bg-white-0',
                )}>
                <View
                    className="mb-2 h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${category.color}20` }}>
                    <MaterialCommunityIcons
                        color={category.color}
                        name={category.icon as React.ComponentProps<typeof MaterialCommunityIcons>['name']}
                        size={24}
                    />
                </View>
                <ThemedText className="text-xs text-center text-text-strong-950">{category.name}</ThemedText>
            </View>
        </AnimatedPressable>
    );
}
