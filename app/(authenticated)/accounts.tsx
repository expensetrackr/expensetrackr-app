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
import { useColorScheme } from '#/hooks/use-color-scheme.ts';
import { cn } from '#/utils/cn.ts';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Account {
    id: number;
    name: string;
    type: string;
    balance: number;
    accountNumber: string;
    gradient: readonly [string, string];
    icon: string;
}

export default function AccountsScreen() {
    const insets = useSafeAreaInsets();
    const { isDarkColorScheme, colors } = useColorScheme();

    const accounts: Account[] = [
        {
            id: 1,
            name: 'Main Checking',
            type: 'Checking Account',
            balance: 5250.0,
            accountNumber: '****1234',
            gradient: ['#3b82f6', '#60a5fa'] as const,
            icon: 'bank',
        },
        {
            id: 2,
            name: 'Savings',
            type: 'Savings Account',
            balance: 12450.0,
            accountNumber: '****5678',
            gradient: ['#10b981', '#34d399'] as const,
            icon: 'piggy-bank',
        },
        {
            id: 3,
            name: 'Credit Card',
            type: 'Visa Card',
            balance: -1200.0,
            accountNumber: '****9012',
            gradient: ['#8b5cf6', '#a78bfa'] as const,
            icon: 'credit-card',
        },
        {
            id: 4,
            name: 'Investment',
            type: 'Brokerage Account',
            balance: 25890.0,
            accountNumber: '****3456',
            gradient: ['#f59e0b', '#fbbf24'] as const,
            icon: 'chart-line',
        },
    ];

    const totalBalance = accounts.reduce((acc, account) => {
        return acc + account.balance;
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
                        <ThemedText className="text-2xl mb-2 font-semibold text-text-strong-950">
                            Your Accounts
                        </ThemedText>
                        <View className="flex-row items-baseline">
                            <ThemedText className="text-sm mr-2 text-text-sub-600">Total Balance:</ThemedText>
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

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(pressed.value, [0, 1], [1, 0.95]),
            },
        ],
    }));

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

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
                        <ThemedText className="text-xs mb-1 text-white/60">Available Balance</ThemedText>
                        <ThemedText className="text-2xl mb-3 font-bold text-white">
                            {formatCurrency(account.balance)}
                        </ThemedText>
                        <ThemedText className="text-sm text-white/80">{account.accountNumber}</ThemedText>
                    </View>
                </LinearGradient>
            </AnimatedPressable>
        </Animated.View>
    );
}
