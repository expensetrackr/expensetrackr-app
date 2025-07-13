import { DarkTheme, DefaultTheme } from '@react-navigation/native';

import { colors } from './colors';

const NAV_THEME = {
    light: {
        ...DefaultTheme,
        colors: {
            background: colors.light.bgWhite0,
            border: colors.light.strokeSoft200,
            card: colors.light.bgWhite0,
            notification: colors.light.error,
            primary: colors.light.primary,
            text: colors.light.textStrong950,
        },
    },
    dark: {
        ...DarkTheme,
        colors: {
            background: colors.dark.bgWhite0,
            border: colors.dark.strokeSoft200,
            card: colors.dark.bgWhite0,
            notification: colors.dark.error,
            primary: colors.dark.primary,
            text: colors.dark.textStrong950,
        },
    },
};

export { NAV_THEME };
