import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInRight, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '#/components/ThemedText.tsx';
import { useColorScheme } from '#/hooks/use-color-scheme.ts';

export default function DashboardScreen() {
    const insets = useSafeAreaInsets();
    const { colors } = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bgWhite,
        },
        scrollContent: {
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 120,
            paddingHorizontal: 20,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 32,
        },
        headerLeft: {
            flex: 1,
        },
        greeting: {
            fontSize: 16,
            color: colors.textSub,
            marginBottom: 4,
        },
        userName: {
            fontSize: 24,
            fontWeight: '700',
            color: colors.textStrong,
            letterSpacing: -0.5,
        },
        headerRight: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
        },
        notificationButton: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: colors.bgSoft,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.strokeSoft,
        },
        avatar: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        totalBalanceCard: {
            backgroundColor: colors.primary,
            borderRadius: 20,
            padding: 24,
            marginBottom: 24,
            shadowColor: colors.primary,
            shadowOffset: {
                width: 0,
                height: 8,
            },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 8,
        },
        balanceLabel: {
            fontSize: 16,
            color: colors.textWhite,
            opacity: 0.8,
            marginBottom: 8,
        },
        balanceAmount: {
            fontSize: 36,
            fontWeight: '800',
            lineHeight: 40,
            color: colors.textWhite,
            letterSpacing: -1,
            marginBottom: 16,
        },
        balanceRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        balanceChange: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
        },
        balanceChangeText: {
            fontSize: 14,
            fontWeight: '600',
            color: colors.textWhite,
            marginLeft: 4,
        },
        hideButton: {
            padding: 8,
        },
        quickActionsContainer: {
            marginBottom: 32,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: '700',
            color: colors.textStrong,
            letterSpacing: -0.3,
            marginBottom: 16,
        },
        metricsContainer: {
            marginBottom: 32,
        },
        metricsRow: {
            flexDirection: 'row',
            gap: 12,
        },
        metricCard: {
            flex: 1,
            backgroundColor: colors.bgWhite,
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: colors.strokeSoft,
            shadowColor: colors.bgStrong,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
        },
        metricAmount: {
            fontSize: 20,
            fontWeight: '800',
            color: colors.textStrong,
            marginBottom: 4,
            letterSpacing: -0.5,
        },
        metricLabel: {
            fontSize: 13,
            color: colors.textSub,
            marginBottom: 12,
            lineHeight: 16,
        },
        metricChange: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        metricChangeText: {
            fontSize: 12,
            fontWeight: '600',
            marginLeft: 4,
        },
        sectionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
        },
        seeAllButton: {
            fontSize: 14,
            fontWeight: '600',
            color: colors.primary,
        },
        transactionsContainer: {
            backgroundColor: colors.bgWhite,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.strokeSoft,
            overflow: 'hidden',
        },
        transactionItem: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.strokeSoft,
        },
        transactionItemLast: {
            borderBottomWidth: 0,
        },
        transactionIcon: {
            width: 48,
            height: 48,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
        },
        transactionContent: {
            flex: 1,
        },
        transactionName: {
            fontSize: 16,
            fontWeight: '600',
            color: colors.textStrong,
            marginBottom: 4,
        },
        transactionCategory: {
            fontSize: 14,
            color: colors.textSoft,
        },
        transactionRight: {
            alignItems: 'flex-end',
        },
        transactionAmount: {
            fontSize: 16,
            fontWeight: '700',
            marginBottom: 4,
            letterSpacing: -0.2,
        },
        transactionTime: {
            fontSize: 12,
            color: colors.textSoft,
        },
        spendingInsightCard: {
            backgroundColor: colors.bgWhite,
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: colors.strokeSoft,
            shadowColor: colors.bgStrong,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 2,
        },
        insightHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
        },
        insightIcon: {
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: colors.warningLighter,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
        },
        insightText: {
            flex: 1,
        },
        insightTitle: {
            fontSize: 16,
            fontWeight: '600',
            color: colors.textStrong,
            marginBottom: 2,
        },
        insightDescription: {
            fontSize: 14,
            color: colors.textSub,
        },
        categorySpending: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 8,
        },
        categoryLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
        },
        categoryDot: {
            width: 8,
            height: 8,
            borderRadius: 4,
            marginRight: 12,
        },
        categoryName: {
            fontSize: 14,
            fontWeight: '500',
            color: colors.textStrong,
            flex: 1,
        },
        categoryAmount: {
            fontSize: 14,
            fontWeight: '600',
            color: colors.textStrong,
        },
    });

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

    const recentTransactions = [
        {
            id: 1,
            name: 'Starbucks Coffee',
            category: 'Food & Drink',
            amount: '-$5.49',
            time: '10:30 AM',
            isExpense: true,
            icon: 'coffee',
            color: colors.warning,
            bgColor: colors.warningLighter,
        },
        {
            id: 2,
            name: 'Salary Deposit',
            category: 'Income',
            amount: '+$3,200.00',
            time: '9:00 AM',
            isExpense: false,
            icon: 'dollar-sign',
            color: colors.success,
            bgColor: colors.successLighter,
        },
        {
            id: 3,
            name: 'Netflix',
            category: 'Entertainment',
            amount: '-$15.99',
            time: 'Yesterday',
            isExpense: true,
            icon: 'tv',
            color: colors.error,
            bgColor: colors.errorLighter,
        },
        {
            id: 4,
            name: 'Uber Ride',
            category: 'Transportation',
            amount: '-$12.50',
            time: 'Yesterday',
            isExpense: true,
            icon: 'car',
            color: colors.primary,
            bgColor: colors.primaryDark,
        },
    ];

    const categorySpending = [
        { name: 'Food & Dining', amount: '$1,230', color: colors.warning, percentage: 35 },
        { name: 'Transportation', amount: '$890', color: colors.primary, percentage: 25 },
        { name: 'Entertainment', amount: '$650', color: colors.error, percentage: 18 },
        { name: 'Shopping', amount: '$450', color: colors.success, percentage: 13 },
        { name: 'Other', amount: '$320', color: colors.textSub, percentage: 9 },
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Animated.View entering={FadeInUp.delay(100)} style={styles.header}>
                    <View style={styles.headerLeft}>
                        <ThemedText style={styles.greeting}>Good morning 👋</ThemedText>
                        <ThemedText style={styles.userName}>Daniel Esteves</ThemedText>
                    </View>
                    <View style={styles.headerRight}>
                        <Pressable style={styles.notificationButton}>
                            <Feather color={colors.textSub} name="bell" size={20} />
                        </Pressable>
                        <Pressable style={styles.avatar}>
                            <ThemedText style={{ color: colors.textWhite, fontWeight: '600' }}>DE</ThemedText>
                        </Pressable>
                    </View>
                </Animated.View>

                {/* Total Balance Card */}
                <Animated.View entering={FadeInUp.delay(200)} style={styles.totalBalanceCard}>
                    <ThemedText style={styles.balanceLabel}>Total Balance</ThemedText>
                    <ThemedText style={styles.balanceAmount}>$12,450.00</ThemedText>
                    <View style={styles.balanceRow}>
                        <View style={styles.balanceChange}>
                            <Feather color={colors.textWhite} name="trending-up" size={14} />
                            <ThemedText style={styles.balanceChangeText}>+12.5% this month</ThemedText>
                        </View>
                        <Pressable style={styles.hideButton}>
                            <Feather color={colors.textWhite} name="eye-off" size={20} />
                        </Pressable>
                    </View>
                </Animated.View>

                {/* Income/Expense Metrics */}
                <Animated.View entering={FadeInUp.delay(400)} style={styles.metricsContainer}>
                    <ThemedText style={styles.sectionTitle}>This Month</ThemedText>
                    <View style={styles.metricsRow}>
                        {metrics.map((metric, index) => (
                            <Animated.View
                                entering={FadeInRight.delay(400 + index * 100)}
                                key={metric.title}
                                style={styles.metricCard}>
                                <ThemedText style={styles.metricAmount}>{metric.amount}</ThemedText>
                                <ThemedText style={styles.metricLabel}>{metric.title}</ThemedText>
                                <View style={styles.metricChange}>
                                    <Feather color={metric.color} name={metric.icon as any} size={14} />
                                    <ThemedText style={[styles.metricChangeText, { color: metric.color }]}>
                                        {metric.change}
                                    </ThemedText>
                                </View>
                            </Animated.View>
                        ))}
                    </View>
                </Animated.View>

                {/* Spending Insights */}
                <Animated.View entering={FadeInUp.delay(500)} style={styles.spendingInsightCard}>
                    <View style={styles.insightHeader}>
                        <View style={styles.insightIcon}>
                            <Feather color={colors.warning} name="pie-chart" size={20} />
                        </View>
                        <View style={styles.insightText}>
                            <ThemedText style={styles.insightTitle}>Spending by Category</ThemedText>
                            <ThemedText style={styles.insightDescription}>
                                Your top spending categories this month
                            </ThemedText>
                        </View>
                    </View>
                    {categorySpending.map((category, index) => (
                        <Animated.View
                            entering={FadeInRight.delay(500 + index * 50)}
                            key={category.name}
                            style={styles.categorySpending}>
                            <View style={styles.categoryLeft}>
                                <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
                                <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
                            </View>
                            <ThemedText style={styles.categoryAmount}>{category.amount}</ThemedText>
                        </Animated.View>
                    ))}
                </Animated.View>

                {/* Recent Transactions */}
                <Animated.View entering={FadeInUp.delay(600)}>
                    <View style={styles.sectionHeader}>
                        <ThemedText style={styles.sectionTitle}>Recent Transactions</ThemedText>
                        <Pressable onPress={() => router.push('/(authenticated)/transactions')}>
                            <ThemedText style={styles.seeAllButton}>See all</ThemedText>
                        </Pressable>
                    </View>

                    <View style={styles.transactionsContainer}>
                        {recentTransactions.map((transaction, index) => (
                            <Animated.View entering={FadeInRight.delay(600 + index * 50)} key={transaction.id}>
                                <Pressable>
                                    <View
                                        style={[
                                            styles.transactionItem,
                                            index === recentTransactions.length - 1 && styles.transactionItemLast,
                                        ]}>
                                        <View
                                            style={[styles.transactionIcon, { backgroundColor: transaction.bgColor }]}>
                                            <Feather
                                                color={transaction.color}
                                                name={transaction.icon as any}
                                                size={22}
                                            />
                                        </View>
                                        <View style={styles.transactionContent}>
                                            <ThemedText style={styles.transactionName}>{transaction.name}</ThemedText>
                                            <ThemedText style={styles.transactionCategory}>
                                                {transaction.category}
                                            </ThemedText>
                                        </View>
                                        <View style={styles.transactionRight}>
                                            <ThemedText
                                                style={[
                                                    styles.transactionAmount,
                                                    {
                                                        color: transaction.isExpense
                                                            ? colors.textStrong
                                                            : colors.success,
                                                    },
                                                ]}>
                                                {transaction.amount}
                                            </ThemedText>
                                            <ThemedText style={styles.transactionTime}>{transaction.time}</ThemedText>
                                        </View>
                                    </View>
                                </Pressable>
                            </Animated.View>
                        ))}
                    </View>
                </Animated.View>
            </ScrollView>
        </View>
    );
}
