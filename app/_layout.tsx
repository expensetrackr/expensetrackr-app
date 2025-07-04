import { InstrumentSerif_400Regular } from '@expo-google-fonts/instrument-serif/400Regular';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import 'react-native-reanimated';
import { Toaster } from 'sonner-native';

import { Colors } from '#/constants/Colors.ts';
import { useColorScheme } from '#/hooks/use-color-scheme.ts';
import { setAndroidNavigationBar } from '#/lib/android-navigation-bar.ts';
import { QueryClientProvider } from '#/providers/query-client-provider.tsx';
import { SessionProvider } from '#/providers/session-provider.tsx';
import '../global.css';

// Set the animation options. This is optional.
SplashScreen.setOptions({
    duration: 1000,
    fade: true,
});

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: Colors.light,
};
const DARK_THEME: Theme = {
    ...DarkTheme,
    colors: Colors.dark,
};

export const unstable_settings = {
    initialRouteName: '(authenticated)/home',
};

export default function RootLayout() {
    const hasMounted = useRef(false);
    const { colorScheme, isDarkColorScheme } = useColorScheme();
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

    const [fontsLoaded] = useFonts({
        InstrumentSerif_400Regular,
    });

    useIsomorphicLayoutEffect(() => {
        if (hasMounted.current) {
            return;
        }

        setAndroidNavigationBar(colorScheme);
        setIsColorSchemeLoaded(true);
        hasMounted.current = true;
    }, []);

    const onLayoutRootView = useCallback(() => {
        if (fontsLoaded) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            SplashScreen.hide();
        }
    }, [fontsLoaded]);

    if (!isColorSchemeLoaded || !fontsLoaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <SessionProvider>
            <QueryClientProvider>
                <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
                    <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />

                    <GestureHandlerRootView>
                        <KeyboardProvider navigationBarTranslucent statusBarTranslucent>
                            <MotiView
                                animate={{ opacity: 1 }}
                                className="flex-1 bg-background"
                                from={{ opacity: 0 }}
                                transition={{ type: 'timing' }}
                                onLayout={onLayoutRootView}>
                                <Slot />
                            </MotiView>

                            <Toaster />

                            <PortalHost />
                        </KeyboardProvider>
                    </GestureHandlerRootView>
                </ThemeProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}

const useIsomorphicLayoutEffect = Platform.OS === 'web' && typeof window === 'undefined' ? useEffect : useLayoutEffect;
