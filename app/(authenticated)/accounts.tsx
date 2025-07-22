import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, View } from 'react-native';
import Animated, { FadeInRight, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '#/components/ThemedText.tsx';
import { useColorScheme } from '#/hooks/use-color-scheme.ts';
import { AccountSubtype } from '#/types/account.ts';
import { layoutSpacing } from '#/utils/alignui.ts';

// Animation timing constants for better maintainability
const ANIMATION_DELAYS = {
    header: 100,
    summary: 200,
    accountBase: 300,
    accountIncrement: 100,
    addButton: 600,
    maxAccountDelay: 800, // Maximum delay cap for accounts
} as const;

const formatCurrency = (amount: number, currencyCode: string = 'USD', locale: string = 'en-US'): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
    }).format(amount);
};

interface Account {
    id: number;
    name: string;
    description: string | null;
    subtype: AccountSubtype | null;
    currency_code: string;
    base_currency: string | null;
    currency_rate: number | null;
    initial_balance: number;
    base_initial_balance: number | null;
    current_balance: number;
    base_current_balance: number | null;
}

interface AccountUIConfig {
    color: string;
    icon: React.ComponentProps<typeof Feather>['name'];
}

const accountUIMapping: Record<AccountSubtype, AccountUIConfig> = {
    [AccountSubtype.CHECKING]: { color: '#3B82F6', icon: 'credit-card' },
    [AccountSubtype.SAVINGS]: { color: '#10B981', icon: 'dollar-sign' },
    [AccountSubtype.CREDIT_CARD]: { color: '#8B5CF6', icon: 'credit-card' },
    [AccountSubtype.INVESTMENT]: { color: '#F59E0B', icon: 'trending-up' },
    [AccountSubtype.BUSINESS]: { color: '#EF4444', icon: 'briefcase' },
};

const getAccountUIConfig = (subtype: AccountSubtype | null): AccountUIConfig => {
    return accountUIMapping[subtype || AccountSubtype.CHECKING] || { color: '#6B7280', icon: 'circle' };
};

// Memoized animation delay calculation for better performance
const getAnimationDelay = (index: number): number =>
    Math.min(
        ANIMATION_DELAYS.accountBase + index * ANIMATION_DELAYS.accountIncrement,
        ANIMATION_DELAYS.maxAccountDelay,
    );

const isMultiCurrency = (account: Account): boolean => {
    return !!(
        account.base_currency &&
        account.currency_rate &&
        account.base_initial_balance !== null &&
        account.base_current_balance !== null
    );
};

const getAccountTypeDisplayName = (subtype: AccountSubtype | null): string => {
    switch (subtype) {
        case AccountSubtype.CHECKING:
            return 'Checking Account';
        case AccountSubtype.SAVINGS:
            return 'Savings Account';
        case AccountSubtype.CREDIT_CARD:
            return 'Credit Card';
        case AccountSubtype.INVESTMENT:
            return 'Investment Account';
        case AccountSubtype.BUSINESS:
            return 'Business Account';
        default:
            return 'Account';
    }
};

export default function AccountsScreen() {
    const insets = useSafeAreaInsets();
    const { colors } = useColorScheme();

    // Dummy data with multi-currency support
    const accounts: Account[] = [
        {
            id: 1,
            name: 'Main Checking',
            description: 'Primary checking account',
            subtype: AccountSubtype.CHECKING,
            currency_code: 'USD',
            base_currency: null,
            currency_rate: null,
            initial_balance: 5000.0,
            base_initial_balance: null,
            current_balance: 5250.0,
            base_current_balance: null,
        },
        {
            id: 2,
            name: 'Euro Savings',
            description: 'European savings account',
            subtype: AccountSubtype.SAVINGS,
            currency_code: 'EUR',
            base_currency: 'USD',
            currency_rate: 1.08,
            initial_balance: 10000.0,
            base_initial_balance: 10800.0,
            current_balance: 12450.0,
            base_current_balance: 13446.0,
        },
        {
            id: 3,
            name: 'Travel Credit Card',
            description: 'Multi-currency travel card',
            subtype: AccountSubtype.CREDIT_CARD,
            currency_code: 'GBP',
            base_currency: 'USD',
            currency_rate: 1.25,
            initial_balance: 0.0,
            base_initial_balance: 0.0,
            current_balance: -960.0,
            base_current_balance: -1200.0,
        },
        {
            id: 4,
            name: 'Investment Portfolio',
            description: 'Diversified portfolio',
            subtype: AccountSubtype.INVESTMENT,
            currency_code: 'USD',
            base_currency: null,
            currency_rate: null,
            initial_balance: 20000.0,
            base_initial_balance: null,
            current_balance: 25890.0,
            base_current_balance: null,
        },
        {
            id: 5,
            name: 'Business Account',
            description: 'Japanese business operations',
            subtype: AccountSubtype.BUSINESS,
            currency_code: 'JPY',
            base_currency: 'USD',
            currency_rate: 0.0067,
            initial_balance: 1500000.0,
            base_initial_balance: 10050.0,
            current_balance: 1850000.0,
            base_current_balance: 12395.0,
        },
    ];

    const totalBalance = accounts.reduce((acc, account) => {
        if (isMultiCurrency(account)) {
            // For multi-currency accounts, only add if USD equivalent exists
            return account.base_current_balance !== null ? acc + account.base_current_balance : acc;
        }
        // For single-currency accounts, only add if already in USD
        return account.currency_code === 'USD' ? acc + account.current_balance : acc;
    }, 0);

    const multiCurrencyCount = accounts.filter((account) => isMultiCurrency(account)).length;

    // TODO: Replace with actual monthly change calculation from transaction data
    // This should calculate the difference between current month and previous month balance changes
    const monthlyChange = 1240; // Placeholder - should be calculated from transactions
    const monthlyChangeFormatted =
        monthlyChange >= 0 ? `+${formatCurrency(monthlyChange)}` : formatCurrency(monthlyChange);
    const isPositiveChange = monthlyChange >= 0;

    return (
        <View className="flex-1 bg-bg-weak-50">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingTop: insets.top + 16,
                    paddingBottom: insets.bottom + layoutSpacing.tabBarHeight,
                }}
                showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Animated.View className="mb-6" entering={FadeInUp.delay(ANIMATION_DELAYS.header)}>
                    <View className="mb-2 flex-row items-center justify-between">
                        <ThemedText className="text-h3 font-bold tracking-tight text-text-strong-950">
                            Accounts
                        </ThemedText>
                        <Pressable className="bg-primary h-10 w-10 items-center justify-center rounded-full">
                            <Feather color="white" name="plus" size={18} />
                        </Pressable>
                    </View>
                    <ThemedText className="text-paragraph-md text-text-sub-600">
                        {accounts.length} accounts • {multiCurrencyCount} multi-currency
                    </ThemedText>
                </Animated.View>

                {/* Summary Stats */}
                <Animated.View className="mb-8 flex-row gap-4" entering={FadeInUp.delay(ANIMATION_DELAYS.summary)}>
                    <View className="flex-1 rounded-16 bg-bg-white-0 p-4">
                        <ThemedText className="mb-1 text-paragraph-sm text-text-sub-600">Total Balance</ThemedText>
                        <ThemedText className="text-h4 font-bold text-text-strong-950">
                            {formatCurrency(totalBalance)}
                        </ThemedText>
                    </View>
                    <View className="flex-1 rounded-16 bg-bg-white-0 p-4">
                        <ThemedText className="mb-1 text-paragraph-sm text-text-sub-600">This Month</ThemedText>
                        <View className="flex-row items-center">
                            <Feather
                                color={isPositiveChange ? '#10B981' : '#EF4444'}
                                name={isPositiveChange ? 'trending-up' : 'trending-down'}
                                size={16}
                            />
                            <ThemedText
                                className={`ml-2 text-h4 font-bold ${isPositiveChange ? 'text-success' : 'text-error'}`}>
                                {monthlyChangeFormatted}
                            </ThemedText>
                        </View>
                    </View>
                </Animated.View>

                {/* Account List */}
                <View className="gap-3">
                    {accounts.map((account, index) => {
                        const uiConfig = getAccountUIConfig(account.subtype);
                        return (
                            <Animated.View
                                className="overflow-hidden rounded-16 bg-bg-white-0"
                                entering={FadeInRight.delay(getAnimationDelay(index))}
                                key={account.id}>
                                <Pressable className="p-5">
                                    {/* Account Header */}
                                    <View className="mb-4 flex-row items-start justify-between">
                                        <View className="flex-1">
                                            <View className="mb-1 flex-row items-center">
                                                <View
                                                    className="mr-3 h-8 w-8 items-center justify-center rounded-8"
                                                    style={{ backgroundColor: uiConfig.color + '20' }}>
                                                    <Feather color={uiConfig.color} name={uiConfig.icon} size={16} />
                                                </View>
                                                <View className="flex-1">
                                                    <View className="flex-row items-center">
                                                        <ThemedText className="text-label-lg font-semibold text-text-strong-950">
                                                            {account.name}
                                                        </ThemedText>
                                                        {isMultiCurrency(account) && (
                                                            <View className="rounded-md ml-2 bg-blue-50 px-1.5 py-0.5">
                                                                <ThemedText className="text-subheading-2xs font-medium text-blue-600">
                                                                    MC
                                                                </ThemedText>
                                                            </View>
                                                        )}
                                                    </View>
                                                    <ThemedText className="text-paragraph-sm text-text-sub-600">
                                                        {getAccountTypeDisplayName(account.subtype)}
                                                    </ThemedText>
                                                </View>
                                            </View>
                                        </View>
                                        <Feather color={colors.textSub600} name="chevron-right" size={18} />
                                    </View>

                                    {/* Balance Section */}
                                    <View className="border-t border-stroke-soft-200 pt-4">
                                        <View className="mb-2 flex-row items-baseline justify-between">
                                            <ThemedText className="text-h4 font-bold text-text-strong-950">
                                                {formatCurrency(account.current_balance, account.currency_code)}
                                            </ThemedText>
                                            <View className="flex-row items-center">
                                                <ThemedText className="mr-2 text-paragraph-sm text-text-sub-600">
                                                    {account.currency_code}
                                                </ThemedText>
                                                <View
                                                    className={`h-2 w-2 rounded-full ${account.current_balance >= 0 ? 'bg-success' : 'bg-error'}`}
                                                />
                                            </View>
                                        </View>

                                        {/* USD Equivalent for Multi-Currency */}
                                        {isMultiCurrency(account) && account.base_current_balance !== null && (
                                            <View className="mt-2 flex-row items-center justify-between rounded-8 bg-bg-weak-50 p-2">
                                                <View className="flex-row items-center">
                                                    <Feather color={colors.textSub600} name="dollar-sign" size={14} />
                                                    <ThemedText className="ml-1 text-paragraph-sm font-medium text-text-strong-950">
                                                        {formatCurrency(
                                                            account.base_current_balance,
                                                            account.base_currency || 'USD',
                                                        )}
                                                    </ThemedText>
                                                </View>
                                                <ThemedText className="text-paragraph-xs text-text-sub-600">
                                                    1 {account.currency_code} = {account.currency_rate?.toFixed(4)}{' '}
                                                    {account.base_currency || 'USD'}
                                                </ThemedText>
                                            </View>
                                        )}
                                    </View>
                                </Pressable>
                            </Animated.View>
                        );
                    })}
                </View>

                {/* Add Account CTA */}
                <Animated.View
                    className="mt-6 rounded-16 border-2 border-dashed border-stroke-soft-200 bg-bg-white-0"
                    entering={FadeInUp.delay(ANIMATION_DELAYS.addButton)}>
                    <Pressable className="items-center p-6">
                        <View className="bg-primary/10 mb-3 h-12 w-12 items-center justify-center rounded-full">
                            <Feather color={colors.primary} name="plus" size={20} />
                        </View>
                        <ThemedText className="mb-1 text-paragraph-md font-semibold text-text-strong-950">
                            Add Account
                        </ThemedText>
                        <ThemedText className="text-paragraph-sm text-text-sub-600">
                            Connect your bank or add manually
                        </ThemedText>
                    </Pressable>
                </Animated.View>
            </ScrollView>
        </View>
    );
}
