import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import * as React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardController, KeyboardStickyView } from 'react-native-keyboard-controller';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AlertAnchor } from '#/components/ui/alert';
import { AlertRef } from '#/components/ui/alert/types';
import { Button } from '#/components/ui/button';
import { Form, FormItem, FormSection } from '#/components/ui/form';
import { Text } from '#/components/ui/text';
import { TextField } from '#/components/ui/text-field';

const LOGO_SOURCE = {
    uri: 'https://expensetrackr.app/img/isotype-light.png',
};

export default function ForgotPasswordScreen() {
    const insets = useSafeAreaInsets();
    const alertRef = React.useRef<AlertRef>(null);

    function onSubmit() {
        alertRef.current?.prompt({
            title: 'Check your inbox',
            message:
                'We&apos;ve sent you a secure link to reset your password. Check your email and follow the instructions:',
            prompt: {
                keyboardType: 'number-pad',
                type: 'plain-text',
            },
            buttons: [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {
                        KeyboardController.dismiss();
                    },
                },
                {
                    text: 'Verify',
                    style: 'default',
                    onPress: () => {
                        KeyboardController.dismiss();
                        router.replace('/');
                    },
                },
            ],
        });
    }

    return (
        <View className="ios:bg-card flex-1" style={{ paddingBottom: insets.bottom }}>
            {/* Gradient Background */}
            <LinearGradient
                colors={['rgba(60.3, 126, 248, 0.3)', 'rgba(60.3, 126, 248, 0.1)', 'transparent']}
                locations={[0, 0.2, 0.6]}
                style={styles.background}
            />

            <Stack.Screen
                options={{
                    title: '',
                    headerShadowVisible: false,
                    headerTransparent: true,
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTitleStyle: {
                        color: '#1f2937',
                        fontWeight: '600',
                    },
                    headerLeft() {
                        return (
                            <Button $variant="plain" className="ios:px-0" onPress={() => router.back()}>
                                <Text className="font-medium text-primary">Back</Text>
                            </Button>
                        );
                    },
                }}
            />

            <KeyboardAwareScrollView
                bottomOffset={Platform.select({ ios: 175 })}
                bounces={false}
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="handled"
                contentContainerClassName="ios:pt-20 pt-28">
                <View className="ios:px-12 flex-1 px-8">
                    <Animated.View className="items-center pb-6" entering={FadeIn.delay(200).duration(800)}>
                        <View style={styles.logoContainer}>
                            <Image source={LOGO_SOURCE} className="ios:h-16 ios:w-16 h-12 w-12" resizeMode="contain" />
                        </View>
                        <Animated.View entering={FadeInUp.delay(400).duration(600)}>
                            <Text
                                $variant="title1"
                                className="ios:font-bold pb-2 pt-6 text-center text-2xl"
                                style={styles.welcomeText}>
                                Forgot your password?
                            </Text>
                            <Text className="text-center text-sm leading-relaxed text-muted-foreground">
                                No worries! Enter your email address and we&apos;ll send you a secure link to reset your
                                password.
                            </Text>
                        </Animated.View>
                    </Animated.View>

                    <Animated.View className="ios:pt-4 pt-6" entering={FadeInDown.delay(600).duration(600)}>
                        <Form className="gap-3">
                            <FormSection className="ios:bg-background/95 backdrop-blur-sm" style={styles.formSection}>
                                <FormItem>
                                    <TextField
                                        placeholder={Platform.select({ ios: 'Email', default: '' })}
                                        label={Platform.select({ ios: undefined, default: 'Email' })}
                                        onSubmitEditing={onSubmit}
                                        submitBehavior="submit"
                                        autoFocus
                                        keyboardType="email-address"
                                        textContentType="emailAddress"
                                        returnKeyType="send"
                                        autoCapitalize="none"
                                    />
                                </FormItem>
                            </FormSection>

                            <Animated.View className="mt-2" entering={FadeInDown.delay(800).duration(600)}>
                                <Text className="text-center text-xs leading-relaxed text-muted-foreground">
                                    You&apos;ll receive an email with instructions to reset your password. The link will
                                    expire in 24 hours for security.
                                </Text>
                            </Animated.View>
                        </Form>
                    </Animated.View>
                </View>
            </KeyboardAwareScrollView>

            <KeyboardStickyView
                offset={{
                    closed: 0,
                    opened: Platform.select({ ios: insets.bottom + 30, default: insets.bottom }),
                }}>
                {Platform.OS === 'ios' ? (
                    <Animated.View className="px-12 py-4" entering={FadeInDown.delay(1000).duration(600)}>
                        <Button $size="lg" style={styles.primaryButton} onPress={onSubmit}>
                            <Text className="font-semibold">Send reset link</Text>
                        </Button>
                    </Animated.View>
                ) : (
                    <Animated.View
                        className="flex-row justify-between py-4 pl-6 pr-8"
                        entering={FadeInDown.delay(1000).duration(600)}>
                        <Button
                            $variant="plain"
                            className="px-2"
                            onPress={() => {
                                router.replace('/(guest)/(create-account)');
                            }}>
                            <Text className="px-0.5 text-sm font-medium text-primary">Create account</Text>
                        </Button>
                        <Button style={styles.primaryButton} onPress={onSubmit}>
                            <Text className="text-sm font-semibold">Send reset link</Text>
                        </Button>
                    </Animated.View>
                )}
            </KeyboardStickyView>

            <AlertAnchor ref={alertRef} />
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        inset: 0,
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
    },
    welcomeText: {
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    formSection: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: 'rgba(60, 126, 248, 0.1)',
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
});
