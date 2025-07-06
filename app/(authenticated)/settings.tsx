import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, ScrollView, Switch, View } from 'react-native';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '#/components/ThemedText.tsx';
import { ThemedView } from '#/components/ThemedView.tsx';
import { useColorScheme } from '#/hooks/use-color-scheme.ts';
import { cn } from '#/utils/cn.ts';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SettingsScreen() {
    const insets = useSafeAreaInsets();
    const { isDarkColorScheme, colors, toggleColorScheme } = useColorScheme();
    const [notifications, setNotifications] = React.useState(true);
    const [biometrics, setBiometrics] = React.useState(false);

    const settingsSections = [
        {
            title: 'Account',
            items: [
                { id: 'profile', label: 'Profile', icon: 'account-circle', color: '#3b82f6' },
                { id: 'categories', label: 'Categories', icon: 'shape', color: '#8b5cf6' },
                { id: 'currency', label: 'Currency', icon: 'currency-usd', color: '#10b981' },
            ],
        },
        {
            title: 'Preferences',
            items: [
                {
                    id: 'theme',
                    label: 'Dark Theme',
                    icon: 'theme-light-dark',
                    isToggle: true,
                    value: isDarkColorScheme,
                    onToggle: toggleColorScheme,
                },
                {
                    id: 'notifications',
                    label: 'Notifications',
                    icon: 'bell',
                    isToggle: true,
                    value: notifications,
                    onToggle: () => setNotifications(!notifications),
                },
                { id: 'language', label: 'Language', icon: 'translate', value: 'English' },
            ],
        },
        {
            title: 'Security',
            items: [
                {
                    id: 'biometrics',
                    label: 'Biometric Login',
                    icon: 'fingerprint',
                    isToggle: true,
                    value: biometrics,
                    onToggle: () => setBiometrics(!biometrics),
                },
                { id: 'pin', label: 'Change PIN', icon: 'lock' },
                { id: 'export', label: 'Export Data', icon: 'download' },
            ],
        },
        {
            title: 'About',
            items: [
                { id: 'help', label: 'Help & Support', icon: 'help-circle' },
                { id: 'privacy', label: 'Privacy Policy', icon: 'shield-check' },
                { id: 'terms', label: 'Terms of Service', icon: 'file-document' },
                { id: 'rate', label: 'Rate App', icon: 'star' },
            ],
        },
    ];

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
                        <ThemedText className="text-2xl mb-2 font-semibold text-text-strong-950">Settings</ThemedText>
                    </Animated.View>
                </View>

                {/* Profile Card */}
                <Animated.View className="mb-6 px-5" entering={FadeInDown.delay(200).springify()}>
                    <LinearGradient
                        className="rounded-2xl p-4"
                        colors={isDarkColorScheme ? ['#1e293b', '#334155'] : ['#f8fafc', '#f1f5f9']}
                        end={{ x: 1, y: 1 }}
                        start={{ x: 0, y: 0 }}>
                        <View className="flex-row items-center">
                            <LinearGradient
                                className="mr-3 h-16 w-16 items-center justify-center rounded-full"
                                colors={['#3b82f6', '#8b5cf6']}
                                end={{ x: 1, y: 1 }}
                                start={{ x: 0, y: 0 }}>
                                <ThemedText className="text-2xl font-bold text-white">JD</ThemedText>
                            </LinearGradient>
                            <View className="flex-1">
                                <ThemedText className="text-lg font-semibold text-text-strong-950">John Doe</ThemedText>
                                <ThemedText className="text-sm text-text-sub-600">john.doe@example.com</ThemedText>
                            </View>
                            <Feather color={colors.iconSub600} name="chevron-right" size={20} />
                        </View>
                    </LinearGradient>
                </Animated.View>

                {/* Settings Sections */}
                {settingsSections.map((section, sectionIndex) => (
                    <Animated.View
                        className="mb-6"
                        entering={FadeInDown.delay((sectionIndex + 3) * 100).springify()}
                        key={section.title}>
                        <ThemedText className="text-sm mb-2 px-5 font-medium text-text-sub-600">
                            {section.title}
                        </ThemedText>
                        <View
                            className={cn(
                                'rounded-xl mx-5 overflow-hidden',
                                isDarkColorScheme ? 'bg-bg-weak-50' : 'bg-bg-white-0',
                            )}>
                            {section.items.map((item, index) => (
                                <SettingsItem
                                    colors={colors}
                                    isDarkColorScheme={isDarkColorScheme}
                                    isLast={index === section.items.length - 1}
                                    item={item}
                                    key={item.id}
                                />
                            ))}
                        </View>
                    </Animated.View>
                ))}

                {/* Sign Out Button */}
                <Animated.View className="mt-2 px-5" entering={FadeInDown.delay(700).springify()}>
                    <Pressable
                        android_ripple={{ color: colors.error }}
                        className="rounded-xl items-center bg-error-lighter py-4">
                        <View className="flex-row items-center">
                            <MaterialCommunityIcons color={colors.error} name="logout" size={20} />
                            <ThemedText className="ml-2 font-medium text-error-base">Sign Out</ThemedText>
                        </View>
                    </Pressable>
                </Animated.View>
            </ScrollView>
        </ThemedView>
    );
}

function SettingsItem({
    item,
    isLast,
    colors,
    isDarkColorScheme,
}: {
    item: any;
    isLast: boolean;
    colors: any;
    isDarkColorScheme: boolean;
}) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const content = (
        <View
            className={cn(
                'flex-row items-center px-4 py-4',
                !isLast && 'border-b',
                isDarkColorScheme ? 'border-grey5' : 'border-stroke-soft-200',
            )}>
            <View
                className="mr-3 h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: item.color ? `${item.color}20` : colors.grey5 }}>
                <MaterialCommunityIcons color={item.color || colors.grey} name={item.icon} size={20} />
            </View>
            <View className="flex-1">
                <ThemedText className="text-base text-text-strong-950">{item.label}</ThemedText>
                {item.value && !item.isToggle ? (
                    <ThemedText className="text-sm mt-0.5 text-text-sub-600">{item.value}</ThemedText>
                ) : null}
            </View>
            {item.isToggle ? (
                <Switch
                    thumbColor={item.value ? '#ffffff' : colors.grey3}
                    trackColor={{ false: colors.grey5, true: colors.primary }}
                    value={item.value}
                    onValueChange={item.onToggle}
                />
            ) : (
                <Feather color={colors.grey2} name="chevron-right" size={20} />
            )}
        </View>
    );

    if (item.isToggle) {
        return content;
    }

    return (
        <AnimatedPressable
            android_ripple={{ color: colors.grey5 }}
            style={animatedStyle}
            onPressIn={() => {
                scale.value = withSpring(0.98);
            }}
            onPressOut={() => {
                scale.value = withSpring(1);
            }}>
            {content}
        </AnimatedPressable>
    );
}
