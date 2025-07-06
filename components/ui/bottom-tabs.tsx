import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { Platform, Pressable, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '#/hooks/use-color-scheme.ts';
import { cn } from '#/utils/cn.ts';

import { Text } from './text.tsx';

const BORDER_CURVE: ViewStyle = {
    borderCurve: 'continuous',
};

interface TabItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    iconActive: React.ReactNode;
}

interface BottomTabsProps {
    tabs: TabItem[];
    activeTab: string;
    onTabPress: (tabId: string) => void;
    onAddPress: () => void;
    addButtonIcon?: React.ReactNode;
}

const BottomTabs = React.forwardRef<React.ComponentRef<typeof View>, BottomTabsProps>(
    ({ tabs, activeTab, onTabPress, onAddPress, addButtonIcon }, ref) => {
        const insets = useSafeAreaInsets();
        const { isDarkColorScheme } = useColorScheme();
        const addButtonScale = useSharedValue(1);

        const addButtonAnimatedStyle = useAnimatedStyle(() => {
            return {
                transform: [{ scale: addButtonScale.value }],
            };
        });

        const handleAddPress = () => {
            addButtonScale.value = withSpring(0.95, {}, () => {
                addButtonScale.value = withSpring(1);
            });
            onAddPress();
        };

        const TabButton = ({ tab, isActive }: { tab: TabItem; isActive: boolean }) => {
            const tabScale = useSharedValue(1);
            const tabOpacity = useSharedValue(1);

            const tabAnimatedStyle = useAnimatedStyle(() => {
                return {
                    transform: [{ scale: tabScale.value }],
                    opacity: tabOpacity.value,
                };
            });

            const handleTabPress = () => {
                tabScale.value = withSpring(0.95, {}, () => {
                    tabScale.value = withSpring(1);
                });
                onTabPress(tab.id);
            };

            return (
                <Animated.View style={tabAnimatedStyle} className="flex-1 items-center">
                    <Pressable
                        onPress={handleTabPress}
                        className={cn(
                            'items-center justify-center py-3 px-2 rounded-2xl min-h-[56px] w-full',
                            isActive && 'bg-primary/10',
                        )}
                        style={BORDER_CURVE}
                        android_ripple={{
                            color: isDarkColorScheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                            borderless: false,
                        }}
                        accessibilityLabel={tab.label}
                        accessibilityRole="tab"
                        accessibilityState={{ selected: isActive }}>
                        <View className={cn(
                            'mb-1 transition-all duration-200',
                            isActive ? 'scale-110' : 'scale-100'
                        )}>
                            {isActive ? tab.iconActive : tab.icon}
                        </View>
                        <Text
                            className={cn(
                                'text-xs font-medium text-center transition-all duration-200',
                                isActive ? 'text-primary font-semibold' : 'text-text-sub-600',
                            )}>
                            {tab.label}
                        </Text>
                    </Pressable>
                </Animated.View>
            );
        };

        return (
            <View
                ref={ref}
                className={cn(
                    'absolute bottom-0 left-0 right-0 border-t',
                    isDarkColorScheme ? 'bg-bg-weak-50 border-border-weak-200' : 'bg-bg-white-0 border-border-weak-200',
                )}
                style={[
                    BORDER_CURVE,
                    {
                        paddingBottom: Math.max(insets.bottom, 16),
                        paddingTop: 8,
                    },
                ]}>
                <View className="flex-row items-center justify-around px-6">
                    {tabs.slice(0, 2).map((tab) => (
                        <TabButton key={tab.id} tab={tab} isActive={activeTab === tab.id} />
                    ))}

                    {/* Central Add Button */}
                    <Animated.View style={addButtonAnimatedStyle} className="items-center">
                        <Pressable
                            onPress={handleAddPress}
                            className="items-center justify-center"
                            style={BORDER_CURVE}
                            android_ripple={{
                                color: 'rgba(255,255,255,0.2)',
                                borderless: true,
                            }}
                            accessibilityLabel="Add transaction"
                            accessibilityRole="button"
                            accessibilityHint="Opens add transaction screen">
                            <LinearGradient
                                colors={['#3b82f6', '#8b5cf6']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className="w-12 h-12 rounded-full items-center justify-center shadow-lg"
                                style={[
                                    BORDER_CURVE,
                                    Platform.select({
                                        ios: {
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: 0.15,
                                            shadowRadius: 8,
                                        },
                                        android: {
                                            elevation: 8,
                                        },
                                    }),
                                ]}>
                                <View className="w-6 h-6 items-center justify-center">
                                    {addButtonIcon}
                                </View>
                            </LinearGradient>
                        </Pressable>
                        <Text className="text-xs font-medium text-primary mt-1">Add</Text>
                    </Animated.View>

                    {tabs.slice(2).map((tab) => (
                        <TabButton key={tab.id} tab={tab} isActive={activeTab === tab.id} />
                    ))}
                </View>
            </View>
        );
    },
);

BottomTabs.displayName = 'BottomTabs';

export { BottomTabs };
export type { BottomTabsProps, TabItem };