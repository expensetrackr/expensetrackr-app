import { DarkTheme, DefaultTheme } from '@react-navigation/native';

import { colors } from './colors';

const NAV_THEME = {
    light: {
        ...DefaultTheme,
        colors: {
            background: colors.light.bgWhite,
            border: colors.light.strokeSoft,
            card: colors.light.bgWhite,
            notification: colors.light.error,
            primary: colors.light.primary,
            text: colors.light.textStrong,
        },
    },
    dark: {
        ...DarkTheme,
        colors: {
            background: colors.dark.bgWhite,
            border: colors.dark.strokeSoft,
            card: colors.dark.bgWhite,
            notification: colors.dark.error,
            primary: colors.dark.primary,
            text: colors.dark.textStrong,
        },
    },
};

export { NAV_THEME };
