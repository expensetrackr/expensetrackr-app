import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView, View } from 'react-native';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '#/components/ThemedText.tsx';
import { useColorScheme } from '#/hooks/use-color-scheme.ts';

const formatCurrency = (amount: number, currencyCode: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
    }).format(amount);
};

// Account subtype enum - in real app this would come from API
enum AccountSubtype {
    CHECKING = 'checking',
    SAVINGS = 'savings',
    CREDIT_CARD = 'credit_card',
    INVESTMENT = 'investment',
    BUSINESS = 'business',
}

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
    // UI-specific fields
    color: string;
    icon: React.ComponentProps<typeof Feather>['name'];
}

// Helper function to determine if account is multi-currency
const isMultiCurrency = (account: Account): boolean => {
    return !!(account.base_currency && account.currency_rate && 
             account.base_initial_balance !== null && account.base_current_balance !== null);
};

// Helper function to get account type display name
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
            color: '#3B82F6',
            icon: 'credit-card',
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
            color: '#10B981',
            icon: 'piggy-bank',
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
            color: '#8B5CF6',
            icon: 'credit-card',
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
            color: '#F59E0B',
            icon: 'trending-up',
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
            color: '#EF4444',
            icon: 'briefcase',
        },
    ];

    // Calculate total balance in USD for display
    const totalBalance = accounts.reduce((acc, account) => {
        if (isMultiCurrency(account)) {
            return acc + (account.base_current_balance || 0);
        }
        return acc + account.current_balance;
    }, 0);

    const multiCurrencyCount = accounts.filter(account => isMultiCurrency(account)).length;

    return (
        <View className="flex-1 bg-bg-weak-50">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingTop: insets.top + 16,
                    paddingBottom: insets.bottom + 120,
                }}
                showsVerticalScrollIndicator={false}>
                
                {/* Header */}
                <Animated.View className="mb-6" entering={FadeInUp.delay(100)}>
                    <View className="flex-row items-center justify-between mb-2">
                        <ThemedText className="text-3xl font-bold tracking-tight text-text-strong-950">
                            Accounts
                        </ThemedText>
                        <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-primary">
                            <Feather color="white" name="plus" size={18} />
                        </Pressable>
                    </View>
                    <ThemedText className="text-base text-text-sub-600">
                        {accounts.length} accounts • {multiCurrencyCount} multi-currency
                    </ThemedText>
                </Animated.View>

                {/* Summary Stats */}
                <Animated.View className="mb-8 flex-row gap-4" entering={FadeInUp.delay(200)}>
                    <View className="flex-1 rounded-16 bg-bg-white-0 p-4">
                        <ThemedText className="text-sm mb-1 text-text-sub-600">Total Balance</ThemedText>
                        <ThemedText className="text-2xl font-bold text-text-strong-950">
                            {formatCurrency(totalBalance)}
                        </ThemedText>
                    </View>
                    <View className="flex-1 rounded-16 bg-bg-white-0 p-4">
                        <ThemedText className="text-sm mb-1 text-text-sub-600">This Month</ThemedText>
                        <View className="flex-row items-center">
                            <Feather color="#10B981" name="trending-up" size={16} />
                            <ThemedText className="text-2xl font-bold text-success ml-2">
                                +$1,240
                            </ThemedText>
                        </View>
                    </View>
                </Animated.View>

                {/* Account List */}
                <View className="gap-3">
                    {accounts.map((account, index) => (
                        <Animated.View
                            className="rounded-16 bg-bg-white-0 overflow-hidden"
                            entering={FadeInRight.delay(300 + index * 100)}
                            key={account.id}>
                            <Pressable className="p-5">
                                {/* Account Header */}
                                <View className="flex-row items-start justify-between mb-4">
                                    <View className="flex-1">
                                        <View className="flex-row items-center mb-1">
                                            <View 
                                                className="mr-3 h-8 w-8 items-center justify-center rounded-8"
                                                style={{ backgroundColor: account.color + '20' }}>
                                                <Feather color={account.color} name={account.icon} size={16} />
                                            </View>
                                            <View className="flex-1">
                                                <View className="flex-row items-center">
                                                    <ThemedText className="text-lg font-semibold text-text-strong-950">
                                                        {account.name}
                                                    </ThemedText>
                                                    {isMultiCurrency(account) && (
                                                        <View className="ml-2 px-2 py-1 bg-blue-50 rounded-full">
                                                            <ThemedText className="text-xs font-medium text-blue-700">
                                                                Multi
                                                            </ThemedText>
                                                        </View>
                                                    )}
                                                </View>
                                                <ThemedText className="text-sm text-text-sub-600">
                                                    {getAccountTypeDisplayName(account.subtype)}
                                                </ThemedText>
                                            </View>
                                        </View>
                                    </View>
                                    <Feather color={colors.textSub600} name="chevron-right" size={18} />
                                </View>

                                {/* Balance Section */}
                                <View className="border-t border-stroke-soft-200 pt-4">
                                    <View className="flex-row items-baseline justify-between mb-2">
                                        <ThemedText className="text-2xl font-bold text-text-strong-950">
                                            {formatCurrency(account.current_balance, account.currency_code)}
                                        </ThemedText>
                                        <View className="flex-row items-center">
                                            <ThemedText className="text-sm text-text-sub-600 mr-2">
                                                {account.currency_code}
                                            </ThemedText>
                                            <View className={`h-2 w-2 rounded-full ${account.current_balance >= 0 ? 'bg-success' : 'bg-error'}`} />
                                        </View>
                                    </View>

                                    {/* USD Equivalent for Multi-Currency */}
                                    {isMultiCurrency(account) && account.base_current_balance !== null && (
                                        <View className="flex-row items-center justify-between mt-2 p-2 rounded-8 bg-bg-weak-50">
                                            <View className="flex-row items-center">
                                                <Feather color={colors.textSub600} name="dollar-sign" size={14} />
                                                <ThemedText className="text-sm font-medium text-text-strong-950 ml-1">
                                                    {formatCurrency(account.base_current_balance, account.base_currency!)}
                                                </ThemedText>
                                            </View>
                                            <ThemedText className="text-xs text-text-sub-600">
                                                {account.currency_rate?.toFixed(4)} USD
                                            </ThemedText>
                                        </View>
                                    )}
                                </View>
                            </Pressable>
                        </Animated.View>
                    ))}
                </View>

                {/* Add Account CTA */}
                <Animated.View
                    className="mt-6 rounded-16 border-2 border-dashed border-stroke-soft-200 bg-bg-white-0"
                    entering={FadeInUp.delay(600)}>
                    <Pressable className="p-6 items-center">
                        <View className="mb-3 h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Feather color={colors.primary} name="plus" size={20} />
                        </View>
                        <ThemedText className="text-base font-semibold text-text-strong-950 mb-1">
                            Add Account
                        </ThemedText>
                        <ThemedText className="text-sm text-text-sub-600">
                            Connect your bank or add manually
                        </ThemedText>
                    </Pressable>
                </Animated.View>
            </ScrollView>
        </View>
    );
}
