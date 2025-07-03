import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardController, KeyboardStickyView } from 'react-native-keyboard-controller';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AlertAnchor } from '#/components/ui/alert/index.ts';
import { AlertRef } from '#/components/ui/alert/types.ts';
import { Button } from '#/components/ui/button.tsx';
import { Form, FormItem, FormSection } from '#/components/ui/form.tsx';
import { TextField } from '#/components/ui/text-field/index.ts';
import { Text } from '#/components/ui/text.tsx';

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

            <KeyboardAwareScrollView
                bottomOffset={Platform.select({ ios: 175 })}
                bounces={false}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="handled">
                <View className="ios:px-12 flex-1 justify-center px-8">
                    <Animated.View className="items-center pb-6" entering={FadeIn.delay(200).duration(800)}>
                        <View style={styles.logoContainer}>
                            <Image
                                className="ios:h-16 ios:w-16 h-12 w-12"
                                contentFit="contain"
                                source={require('#/assets/images/logo.png')}
                                style={styles.logo}
                            />
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
                                        autoFocus
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        label={Platform.select({ ios: undefined, default: 'Email' })}
                                        placeholder={Platform.select({ ios: 'Email', default: '' })}
                                        returnKeyType="send"
                                        submitBehavior="submit"
                                        textContentType="emailAddress"
                                        onSubmitEditing={onSubmit}
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
                                router.push('/(guest)/(auth)/create-account');
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
        flex: 1,
        shadowColor: '#3C7EF8',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    logo: {
        flex: 1,
        width: Platform.OS === 'ios' ? 64 : 48,
        height: Platform.OS === 'ios' ? 64 : 48,
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
