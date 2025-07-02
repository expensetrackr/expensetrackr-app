import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useDerivedValue,
    useScrollViewOffset
} from 'react-native-reanimated';

import { useColorScheme } from '#/hooks/use-color-scheme.ts';

import { ThemedView } from './ThemedView.tsx';
// import { useBottomTabOverflow } from '#/components/ui/tab-bar-background';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
    headerImage: ReactElement;
    headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({ children, headerImage, headerBackgroundColor }: Props) {
    const { colorScheme } = useColorScheme();
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);
    // const bottom = useBottomTabOverflow();
    
    // Optimize scroll calculations by using useDerivedValue
    const scrollProgress = useDerivedValue(() => {
        return scrollOffset.value;
    }, [scrollOffset]);
    
    const headerAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollProgress.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
        );
        
        const scale = interpolate(
            scrollProgress.value, 
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT], 
            [2, 1, 1]
        );
        
        return {
            transform: [
                { translateY },
                { scale },
            ],
        };
    }, [scrollProgress]);

    return (
        <ThemedView style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                // scrollIndicatorInsets={{ bottom }}
                // contentContainerStyle={{ paddingBottom: bottom }}
            >
                <Animated.View
                    style={[
                        styles.header,
                        { backgroundColor: headerBackgroundColor[colorScheme] },
                        headerAnimatedStyle,
                    ]}>
                    {headerImage}
                </Animated.View>
                <ThemedView style={styles.content}>{children}</ThemedView>
            </Animated.ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: HEADER_HEIGHT,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
});
