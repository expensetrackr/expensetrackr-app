import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
import { Badge } from '#/components/ui/badge.tsx';
import { useColorScheme } from '#/hooks/use-color-scheme.ts';
import { cn } from '#/utils/cn.ts';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
    gradient: readonly [string, string];
    icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
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
    const { isDarkColorScheme, colors } = useColorScheme();

    // Dummy data with multi-currency support
    const accounts: Account[] = [
        {
            id: 1,
            name: 'Main Checking',
            description: 'Primary checking account for daily expenses',
            subtype: AccountSubtype.CHECKING,
            currency_code: 'USD',
            base_currency: null,
            currency_rate: null,
            initial_balance: 5000.0,
            base_initial_balance: null,
            current_balance: 5250.0,
            base_current_balance: null,
            gradient: ['#3b82f6', '#60a5fa'] as const,
            icon: 'bank',
        },
        {
            id: 2,
            name: 'Euro Savings',
            description: 'European savings account with currency conversion',
            subtype: AccountSubtype.SAVINGS,
            currency_code: 'EUR',
            base_currency: 'USD',
            currency_rate: 1.08,
            initial_balance: 10000.0,
            base_initial_balance: 10800.0,
            current_balance: 12450.0,
            base_current_balance: 13446.0,
            gradient: ['#10b981', '#34d399'] as const,
            icon: 'piggy-bank',
        },
        {
            id: 3,
            name: 'Travel Credit Card',
            description: 'Multi-currency credit card for international travel',
            subtype: AccountSubtype.CREDIT_CARD,
            currency_code: 'GBP',
            base_currency: 'USD',
            currency_rate: 1.25,
            initial_balance: 0.0,
            base_initial_balance: 0.0,
            current_balance: -960.0,
            base_current_balance: -1200.0,
            gradient: ['#8b5cf6', '#a78bfa'] as const,
            icon: 'credit-card',
        },
        {
            id: 4,
            name: 'Investment Portfolio',
            description: 'Diversified investment portfolio',
            subtype: AccountSubtype.INVESTMENT,
            currency_code: 'USD',
            base_currency: null,
            currency_rate: null,
            initial_balance: 20000.0,
            base_initial_balance: null,
            current_balance: 25890.0,
            base_current_balance: null,
            gradient: ['#f59e0b', '#fbbf24'] as const,
            icon: 'chart-line',
        },
        {
            id: 5,
            name: 'Business Account',
            description: 'Japanese business operations account',
            subtype: AccountSubtype.BUSINESS,
            currency_code: 'JPY',
            base_currency: 'USD',
            currency_rate: 0.0067,
            initial_balance: 1500000.0,
            base_initial_balance: 10050.0,
            current_balance: 1850000.0,
            base_current_balance: 12395.0,
            gradient: ['#ef4444', '#f87171'] as const,
            icon: 'office-building',
        },
    ];

    // Calculate total balance in USD for display
    const totalBalance = accounts.reduce((acc, account) => {
        if (isMultiCurrency(account)) {
            return acc + (account.base_current_balance || 0);
        }
        return acc + account.current_balance;
    }, 0);

    const multiCurrencyAccountsCount = accounts.filter(account => isMultiCurrency(account)).length;

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
                        <View className="flex-row items-center justify-between mb-3">
                            <ThemedText className="text-2xl font-semibold text-text-strong-950">
                                Your Accounts
                            </ThemedText>
                            {multiCurrencyAccountsCount > 0 && (
                                <View className="flex-row items-center">
                                    <MaterialCommunityIcons
                                        name="earth"
                                        size={16}
                                        color={colors.primary}
                                    />
                                    <ThemedText className="text-sm ml-1 text-primary font-medium">
                                        {multiCurrencyAccountsCount} Multi-Currency
                                    </ThemedText>
                                </View>
                            )}
                        </View>
                        <View className="flex-row items-baseline">
                            <ThemedText className="text-sm mr-2 text-text-sub-600">Total Balance (USD):</ThemedText>
                            <ThemedText className="text-xl text-primary font-semibold">
                                {formatCurrency(totalBalance)}
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
                        accessibilityHint="Opens screen to connect a bank account or add one manually"
                        accessibilityLabel="Add new account"
                        accessibilityRole="button"
                        className={cn(
                            'rounded-2xl items-center border-2 border-dashed p-6',
                            isDarkColorScheme ? 'border-grey4' : 'border-grey5',
                        )}>
                        <View className="mb-3 h-12 w-12 items-center justify-center rounded-full bg-bg-weak-50">
                            <MaterialCommunityIcons color={colors.primary} name="plus" size={24} />
                        </View>
                        <ThemedText className="text-base font-medium text-text-strong-950">Add New Account</ThemedText>
                        <ThemedText className="text-sm mt-1 text-text-sub-600">Connect bank or add manually</ThemedText>
                    </Pressable>
                </Animated.View>
            </ScrollView>
        </ThemedView>
    );
}

function AccountCard({ account, index }: { account: Account; index: number }) {
    const pressed = useSharedValue(0);
    const { colors } = useColorScheme();
    const isMultiCurrencyAccount = isMultiCurrency(account);

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
                accessibilityHint={`Shows details for ${account.name} with balance ${formatCurrency(account.current_balance, account.currency_code)}`}
                accessibilityLabel={`${account.name} account`}
                accessibilityRole="button"
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
                    
                    {/* Header with account info and badges */}
                    <View className="mb-6 flex-row items-start justify-between">
                        <View className="flex-1">
                            <View className="flex-row items-center mb-1">
                                <ThemedText className="text-lg font-semibold text-white mr-2">
                                    {account.name}
                                </ThemedText>
                                {isMultiCurrencyAccount && (
                                    <View className="bg-white/20 px-2 py-0.5 rounded-full">
                                        <ThemedText className="text-xs text-white/90 font-medium">
                                            Multi-Currency
                                        </ThemedText>
                                    </View>
                                )}
                            </View>
                            <ThemedText className="text-sm text-white/80">
                                {getAccountTypeDisplayName(account.subtype)}
                            </ThemedText>
                            {account.description && (
                                <ThemedText className="text-xs text-white/70 mt-1">
                                    {account.description}
                                </ThemedText>
                            )}
                        </View>
                        <View className="rounded-xl bg-white/20 p-2.5">
                            <MaterialCommunityIcons color="#ffffff" name={account.icon} size={24} />
                        </View>
                    </View>

                    {/* Balance Information */}
                    <View>
                        <ThemedText className="text-xs mb-1 text-white/60">Current Balance</ThemedText>
                        
                        {/* Primary Currency Balance */}
                        <View className="flex-row items-baseline mb-2">
                            <ThemedText className="text-2xl font-bold text-white">
                                {formatCurrency(account.current_balance, account.currency_code)}
                            </ThemedText>
                            <ThemedText className="text-sm text-white/70 ml-2">
                                {account.currency_code}
                            </ThemedText>
                        </View>

                        {/* USD Balance for Multi-Currency Accounts */}
                        {isMultiCurrencyAccount && account.base_current_balance !== null && (
                            <View className="flex-row items-center justify-between mt-2 pt-2 border-t border-white/20">
                                <View className="flex-row items-center">
                                    <MaterialCommunityIcons
                                        name="currency-usd"
                                        size={14}
                                        color="rgba(255, 255, 255, 0.8)"
                                    />
                                    <ThemedText className="text-sm text-white/80 ml-1">
                                        {formatCurrency(account.base_current_balance, account.base_currency!)}
                                    </ThemedText>
                                </View>
                                <View className="flex-row items-center">
                                    <ThemedText className="text-xs text-white/60">
                                        Rate: {account.currency_rate?.toFixed(4)}
                                    </ThemedText>
                                </View>
                            </View>
                        )}

                        {/* Account Number */}
                        <ThemedText className="text-sm text-white/80 mt-3">
                            ****{account.id.toString().padStart(4, '0')}
                        </ThemedText>
                    </View>
                </LinearGradient>
            </AnimatedPressable>
        </Animated.View>
    );
}
