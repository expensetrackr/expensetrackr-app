import { Feather } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigationRoute, ParamListBase } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '#/hooks/use-color-scheme.ts';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedFeather = Animated.createAnimatedComponent(Feather);

interface TabConfig {
    name: string;
    icon: string;
    label: string;
}

const TAB_CONFIG: Record<string, TabConfig> = {
    index: { name: 'index', icon: 'home', label: 'Home' },
    accounts: { name: 'accounts', icon: 'credit-card', label: 'Accounts' },
    'add-transaction': { name: 'add-transaction', icon: 'plus', label: 'Add' },
    transactions: { name: 'transactions', icon: 'list', label: 'Transactions' },
    settings: { name: 'settings', icon: 'settings', label: 'Settings' },
};

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();
    const { colors } = useColorScheme();

    const addButtonScale = useSharedValue(1);

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingBottom: insets.bottom,
            backgroundColor: colors.bgWhite0,
        },
        tabBar: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: colors.bgWhite0,
            borderRadius: 28,
            paddingVertical: 12,
            paddingHorizontal: 8,
        },
        tabContainer: {
            flex: 1,
            alignItems: 'center',
        },
        tabButton: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            minHeight: 48,
            minWidth: 48,
        },
        tabButtonActive: {
            backgroundColor: colors.bgSoft200,
        },
        addButtonContainer: {
            flex: 1,
            alignItems: 'center',
            position: 'relative',
            paddingHorizontal: 8,
        },
        addButton: {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -26,
            shadowColor: colors.primary,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 8,
            borderWidth: 4,
            borderColor: colors.bgWhite0,
        },
    });

    const handleTabPress = (route: NavigationRoute<ParamListBase, string>) => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!event.defaultPrevented) {
            if (Platform.OS === 'ios') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            navigation.navigate(route.name, route.params);
        }
    };

    const handleAddPress = () => {
        addButtonScale.value = withSpring(0.85, {}, () => {
            addButtonScale.value = withSpring(1);
        });

        if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }

        router.push('/(authenticated)/add-transaction');
    };

    const TabButton = ({ route, index }: { route: NavigationRoute<ParamListBase, string>; index: number }) => {
        const isFocused = state.index === index;
        const tabConfig = TAB_CONFIG[route.name];

        const focusProgress = useSharedValue(isFocused ? 1 : 0);

        useEffect(() => {
            focusProgress.value = withTiming(isFocused ? 1 : 0, {
                duration: 300,
            });
        }, [isFocused]);

        const animatedStyle = useAnimatedStyle(() => {
            const scale = withSpring(isFocused ? 1.05 : 1, { damping: 15 });
            return {
                transform: [{ scale }],
            };
        });

        const animatedIconStyle = useAnimatedStyle(() => {
            const iconColor = interpolateColor(focusProgress.value, [0, 1], [colors.textSub600, colors.primary]);

            return {
                color: iconColor,
            };
        });

        const animatedIndicatorStyle = useAnimatedStyle(() => {
            const scale = withSpring(isFocused ? 1 : 0, { damping: 15 });
            const opacity = withTiming(isFocused ? 1 : 0, { duration: 200 });

            return {
                transform: [{ scale }],
                opacity,
            };
        });

        return (
            <Animated.View style={[styles.tabContainer, animatedStyle]}>
                <AnimatedPressable
                    accessibilityHint={`Navigate to ${tabConfig.label}`}
                    accessibilityLabel={tabConfig.label}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: isFocused }}
                    style={styles.tabButton}
                    testID={`tab-${route.name}`}
                    onPress={() => handleTabPress(route)}>
                    <AnimatedFeather name={tabConfig.icon as any} size={24} style={animatedIconStyle} />
                    <Animated.View
                        style={[
                            {
                                width: 4,
                                height: 4,
                                borderRadius: 2,
                                backgroundColor: colors.primary,
                                marginTop: 4,
                            },
                            animatedIndicatorStyle,
                        ]}
                    />
                </AnimatedPressable>
            </Animated.View>
        );
    };

    const AddButton = () => {
        const addButtonAnimatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: addButtonScale.value }],
        }));

        return (
            <Animated.View style={[styles.addButtonContainer, addButtonAnimatedStyle]}>
                <AnimatedPressable
                    accessibilityHint="Opens add transaction screen"
                    accessibilityLabel="Add transaction"
                    accessibilityRole="button"
                    style={styles.addButton}
                    testID="add-transaction-button"
                    onPress={handleAddPress}>
                    <Feather color={colors.textWhite0} name="plus" size={26} />
                </AnimatedPressable>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabBar}>
                {state.routes.map((route, index) => {
                    if (route.name === 'add-transaction') {
                        return <AddButton key={route.key} />;
                    }
                    return <TabButton index={index} key={route.key} route={route} />;
                })}
            </View>
        </View>
    );
}
