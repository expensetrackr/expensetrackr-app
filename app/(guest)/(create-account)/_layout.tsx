import { Stack } from 'expo-router';
import { Fragment } from 'react';
import { Platform } from 'react-native';

export default function CreateAccountLayout() {
    return (
        <Fragment>
            <Stack.Screen options={{ title: 'Create account' }} />
            <Stack screenOptions={SCREEN_OPTIONS} />
        </Fragment>
    );
}

const SCREEN_OPTIONS = {
    headerShown: Platform.OS === 'ios',
} as const;
