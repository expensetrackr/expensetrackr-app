import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';

import { colors } from '#/theme/colors.ts';

export async function setAndroidNavigationBar(theme: 'light' | 'dark') {
    if (Platform.OS !== 'android') return;
    await NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
    await NavigationBar.setBackgroundColorAsync(theme === 'dark' ? colors.dark.bgWhite : colors.light.bgWhite);
}
