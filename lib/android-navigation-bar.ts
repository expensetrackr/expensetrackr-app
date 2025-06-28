import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';

import { Colors } from '#/constants/Colors';

export async function setAndroidNavigationBar(theme: 'light' | 'dark') {
    if (Platform.OS !== 'android') return;
    await NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
    await NavigationBar.setBackgroundColorAsync(theme === 'dark' ? Colors.dark.background : Colors.light.background);
}
