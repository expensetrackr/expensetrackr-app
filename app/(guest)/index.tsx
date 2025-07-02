import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, {
    FadeIn,
    FadeInDown,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AlertAnchor } from '#/components/ui/alert/index.ts';
import { AlertRef } from '#/components/ui/alert/types.ts';
import { Button } from '#/components/ui/button.tsx';
import { Text } from '#/components/ui/text.tsx';

// Financial data for animations
const FINANCIAL_DATA = [
    { value: '+$1,234', type: 'gain', delay: 0 },
    { value: '+15.2%', type: 'gain', delay: 1000 },
    { value: '-$89', type: 'loss', delay: 2000 },
    { value: '+$567', type: 'gain', delay: 3000 },
    { value: '+8.5%', type: 'gain', delay: 4000 },
    { value: '-$45', type: 'loss', delay: 5000 },
    { value: '+$1,234', type: 'gain', delay: 6000 },
];

function FloatingFinancialNumber({ value, type, delay, position }: any) {
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);

    React.useEffect(() => {
        const startAnimation = () => {
            opacity.value = withSequence(
                withTiming(0.7, { duration: 500 }),
                withDelay(2000, withTiming(0, { duration: 1000 })),
            );
            translateY.value = withSequence(withTiming(-50, { duration: 3500 }), withTiming(-80, { duration: 0 }));
        };

        const timer = setTimeout(startAnimation, delay);
        const interval = setInterval(startAnimation, 6000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
            // Cancel any running animations
            opacity.value = 0;
            translateY.value = 0;
        };
    }, [delay, opacity, translateY]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={[animatedStyle, { position: 'absolute', ...position }]}>
            <Text className={`text-xs font-medium ${type === 'gain' ? 'text-green-500' : 'text-red-500'}`}>
                {value}
            </Text>
        </Animated.View>
    );
}

function AnimatedChart({ position }: any) {
    const height1 = useSharedValue(10);
    const height2 = useSharedValue(15);
    const height3 = useSharedValue(8);
    const height4 = useSharedValue(20);

    React.useEffect(() => {
        const animateBars = () => {
            height1.value = withRepeat(
                withSequence(
                    withTiming(Math.random() * 25 + 10, { duration: 2000 }),
                    withTiming(Math.random() * 25 + 10, { duration: 2000 }),
                ),
                -1,
                true,
            );
            height2.value = withRepeat(
                withSequence(
                    withTiming(Math.random() * 30 + 15, { duration: 2200 }),
                    withTiming(Math.random() * 30 + 15, { duration: 2200 }),
                ),
                -1,
                true,
            );
            height3.value = withRepeat(
                withSequence(
                    withTiming(Math.random() * 20 + 8, { duration: 1800 }),
                    withTiming(Math.random() * 20 + 8, { duration: 1800 }),
                ),
                -1,
                true,
            );
            height4.value = withRepeat(
                withSequence(
                    withTiming(Math.random() * 35 + 20, { duration: 2400 }),
                    withTiming(Math.random() * 35 + 20, { duration: 2400 }),
                ),
                -1,
                true,
            );
        };

        animateBars();

        return () => {
            // Cancel all running animations
            height1.value = 10;
            height2.value = 15;
            height3.value = 8;
            height4.value = 20;
        };
    }, [height1, height2, height3, height4]);

    const bar1Style = useAnimatedStyle(() => ({
        height: height1.value,
    }));
    const bar2Style = useAnimatedStyle(() => ({
        height: height2.value,
    }));
    const bar3Style = useAnimatedStyle(() => ({
        height: height3.value,
    }));
    const bar4Style = useAnimatedStyle(() => ({
        height: height4.value,
    }));

    return (
        <View style={[{ position: 'absolute', flexDirection: 'row', alignItems: 'flex-end', gap: 2 }, position]}>
            <Animated.View style={[bar1Style, { width: 3, backgroundColor: 'rgba(60, 126, 248, 0.3)' }]} />
            <Animated.View style={[bar2Style, { width: 3, backgroundColor: 'rgba(60, 126, 248, 0.4)' }]} />
            <Animated.View style={[bar3Style, { width: 3, backgroundColor: 'rgba(60, 126, 248, 0.3)' }]} />
            <Animated.View style={[bar4Style, { width: 3, backgroundColor: 'rgba(60, 126, 248, 0.5)' }]} />
        </View>
    );
}

function FloatingGeometry({ position, type }: any) {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.3);

    React.useEffect(() => {
        translateX.value = withRepeat(
            withSequence(withTiming(20, { duration: 4000 }), withTiming(-20, { duration: 4000 })),
            -1,
            true,
        );

        translateY.value = withRepeat(
            withSequence(withTiming(-15, { duration: 3500 }), withTiming(15, { duration: 3500 })),
            -1,
            true,
        );

        scale.value = withRepeat(
            withSequence(withTiming(1.2, { duration: 3000 }), withTiming(0.8, { duration: 3000 })),
            -1,
            true,
        );

        opacity.value = withRepeat(
            withSequence(withTiming(0.6, { duration: 2500 }), withTiming(0.2, { duration: 2500 })),
            -1,
            true,
        );
    }, [opacity, scale, translateX, translateY]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={[animatedStyle, { position: 'absolute', ...position }]}>
            {type === 'circle' && (
                <View
                    style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: 'rgba(60, 126, 248, 0.4)',
                    }}
                />
            )}
            {type === 'square' && (
                <View
                    style={{
                        width: 25,
                        height: 25,
                        borderWidth: 1,
                        borderColor: 'rgba(60, 126, 248, 0.3)',
                        transform: [{ rotate: '45deg' }],
                    }}
                />
            )}
            {type === 'line' && (
                <View
                    style={{
                        width: 40,
                        height: 1,
                        backgroundColor: 'rgba(60, 126, 248, 0.4)',
                    }}
                />
            )}
        </Animated.View>
    );
}

function ConnectedDots({ position }: any) {
    const dot1X = useSharedValue(0);
    const dot1Y = useSharedValue(0);
    const dot2X = useSharedValue(30);
    const dot2Y = useSharedValue(0);
    const lineOpacity = useSharedValue(0.3);

    React.useEffect(() => {
        dot1X.value = withRepeat(
            withSequence(withTiming(10, { duration: 3000 }), withTiming(-10, { duration: 3000 })),
            -1,
            true,
        );

        dot1Y.value = withRepeat(
            withSequence(withTiming(-8, { duration: 2800 }), withTiming(8, { duration: 2800 })),
            -1,
            true,
        );

        dot2X.value = withRepeat(
            withSequence(withTiming(40, { duration: 3200 }), withTiming(20, { duration: 3200 })),
            -1,
            true,
        );

        dot2Y.value = withRepeat(
            withSequence(withTiming(12, { duration: 2600 }), withTiming(-12, { duration: 2600 })),
            -1,
            true,
        );

        lineOpacity.value = withRepeat(
            withSequence(withTiming(0.6, { duration: 2000 }), withTiming(0.1, { duration: 2000 })),
            -1,
            true,
        );
    }, [dot1X, dot1Y, dot2X, dot2Y, lineOpacity]);

    const dot1Style = useAnimatedStyle(() => ({
        transform: [{ translateX: dot1X.value }, { translateY: dot1Y.value }],
    }));

    const dot2Style = useAnimatedStyle(() => ({
        transform: [{ translateX: dot2X.value }, { translateY: dot2Y.value }],
    }));

    const lineStyle = useAnimatedStyle(() => ({
        opacity: lineOpacity.value,
    }));

    return (
        <View style={[{ position: 'absolute' }, position]}>
            <Animated.View style={[dot1Style, { position: 'absolute' }]}>
                <View
                    style={{
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: 'rgba(60, 126, 248, 0.6)',
                    }}
                />
            </Animated.View>
            <Animated.View style={[dot2Style, { position: 'absolute' }]}>
                <View
                    style={{
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: 'rgba(60, 126, 248, 0.6)',
                    }}
                />
            </Animated.View>
            <Animated.View
                style={[
                    lineStyle,
                    {
                        position: 'absolute',
                        top: 2,
                        left: 2,
                        width: 26,
                        height: 1,
                        backgroundColor: 'rgba(60, 126, 248, 0.3)',
                    },
                ]}
            />
        </View>
    );
}

export default function AuthIndexScreen() {
    const alertRef = React.useRef<AlertRef>(null);

    return (
        <>
            <SafeAreaView style={{ flex: 1, position: 'relative' }}>
                <LinearGradient
                    colors={['rgba(60.3, 126, 248, 0.4)', 'rgba(60.3, 126, 248, 0.1)', 'transparent']}
                    locations={[0, 0.3, 0.7]}
                    style={styles.background}
                />

                {/* Financial Background Animations */}
                {FINANCIAL_DATA.map((item, index) => (
                    <FloatingFinancialNumber
                        delay={item.delay}
                        key={index}
                        position={{
                            top: 100 + index * 80,
                            left: index % 2 === 0 ? 20 : undefined,
                            right: index % 2 === 1 ? 20 : undefined,
                        }}
                        type={item.type}
                        value={item.value}
                    />
                ))}

                {/* Animated Charts */}
                <AnimatedChart position={{ top: 150, left: 50 }} />
                <AnimatedChart position={{ top: 300, right: 60 }} />
                <AnimatedChart position={{ bottom: 200, left: 30 }} />

                {/* Floating Geometric Shapes */}
                <FloatingGeometry position={{ top: 120, right: 40 }} type="circle" />
                <FloatingGeometry position={{ top: 250, left: 30 }} type="square" />
                <FloatingGeometry position={{ bottom: 300, right: 50 }} type="line" />
                <FloatingGeometry position={{ top: 400, left: 60 }} type="circle" />
                <FloatingGeometry position={{ bottom: 180, left: 80 }} type="square" />

                {/* Connected Dots */}
                <ConnectedDots position={{ top: 180, right: 70 }} />
                <ConnectedDots position={{ bottom: 250, left: 40 }} />
                <ConnectedDots position={{ top: 350, left: 20 }} />

                <View className="ios:justify-end relative flex-1 justify-center gap-0 px-6 py-4">
                    <View className="flex-1 items-center justify-center gap-5">
                        <Animated.View entering={FadeIn.delay(300).duration(1000)} style={styles.logoContainer}>
                            <Image
                                contentFit="contain"
                                source={require('#/assets/images/logo.png')}
                                style={styles.logo}
                                transition={1000}
                            />
                        </Animated.View>

                        <Animated.View
                            className="ios:pb-4 ios:pt-1 pb-2 pt-1"
                            entering={FadeInUp.delay(600).duration(800)}>
                            <Text
                                className="ios:font-extrabold text-center text-3xl font-bold leading-tight"
                                style={styles.mainHeading}>
                                Tracking your finances?
                            </Text>
                            <Text
                                className="ios:font-extrabold text-center text-3xl font-bold leading-tight"
                                style={styles.mainHeading}>
                                It just got <Text className="text-3xl text-primary">simpler.</Text>
                            </Text>
                            <Animated.View entering={FadeInUp.delay(900).duration(600)}>
                                <Text className="mx-4 mt-3 text-center text-sm leading-relaxed text-muted-foreground">
                                    Effortlessly manage your money with confidence
                                </Text>
                                <Text className="mt-2 text-center text-xs tracking-wider text-muted-foreground">
                                    SIMPLE • SECURE • POWERFUL
                                </Text>
                            </Animated.View>
                        </Animated.View>
                    </View>

                    <Animated.View className="gap-3" entering={FadeInDown.delay(1200).duration(600)}>
                        <View className="items-center">
                            <Text className="text-xs text-muted-foreground">
                                Free to start • Premium features available
                            </Text>
                        </View>
                        <Link asChild href="/(guest)/(create-account)">
                            <Button $size={Platform.select({ ios: 'lg', default: 'md' })} style={styles.primaryButton}>
                                <Text className="font-semibold">Get started now</Text>
                            </Button>
                        </Link>
                        <Button
                            $size={Platform.select({ ios: 'lg', default: 'md' })}
                            $variant="secondary"
                            className="ios:border-foreground/20 bg-white/90 dark:bg-background"
                            onPress={() => {
                                alertRef.current?.alert({
                                    title: 'Suggestion',
                                    message: 'Use @react-native-google-signin/google-signin',
                                    buttons: [{ text: 'OK', style: 'cancel' }],
                                });
                            }}
                            style={styles.secondaryButton}>
                            <Image
                                contentFit="contain"
                                source={require('#/assets/images/google-logo.png')}
                                style={{ flex: 1, height: 16, width: 16, position: 'absolute', left: 12 }}
                            />
                            <Text className="ios:text-foreground font-medium">Continue with Google</Text>
                        </Button>
                        <Link asChild href="/(guest)/(login)">
                            <Button $size={Platform.select({ ios: 'lg', default: 'md' })} $variant="plain">
                                <Text className="font-semibold text-primary">Log in</Text>
                            </Button>
                        </Link>
                    </Animated.View>
                </View>
            </SafeAreaView>
            <AlertAnchor ref={alertRef} />
        </>
    );
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        inset: 0,
    },
    floatingElement1: {
        position: 'absolute',
        top: 100,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(60, 126, 248, 0.1)',
        opacity: 0.6,
    },
    floatingElement2: {
        position: 'absolute',
        top: 200,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(60, 126, 248, 0.15)',
        opacity: 0.4,
    },
    floatingElement3: {
        position: 'absolute',
        bottom: 150,
        right: 50,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(60, 126, 248, 0.08)',
        opacity: 0.5,
    },
    featureCard: {
        shadowColor: '#3C7EF8',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: 'rgba(60, 126, 248, 0.2)',
    },
    logoContainer: {
        shadowColor: '#3C7EF8',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
        width: Platform.OS === 'ios' ? 64 : 48,
        height: Platform.OS === 'ios' ? 64 : 48,
    },
    logo: {
        flex: 1,
        width: Platform.OS === 'ios' ? 64 : 48,
        height: Platform.OS === 'ios' ? 64 : 48,
    },
    mainHeading: {
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    primaryButton: {
        shadowColor: '#3C7EF8',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    secondaryButton: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});
