import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardController, KeyboardStickyView } from 'react-native-keyboard-controller';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '#/components/external-link.tsx';
import { Button } from '#/components/ui/button.tsx';
import { Form, FormItem, FormSection } from '#/components/ui/form.tsx';
import { TextField } from '#/components/ui/text-field/index.ts';
import { Text } from '#/components/ui/text.tsx';
import { useAppForm } from '#/hooks/use-app-form.tsx';
import { RegisterSchema } from '#/schemas/auth.ts';

export default function CreateAccountScreen() {
    const insets = useSafeAreaInsets();
    const [focusedTextField, setFocusedTextField] = React.useState<
        'fullName' | 'email' | 'password' | 'confirmPassword' | null
    >(null);
    const form = useAppForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
        },
        validators: {
            onSubmit: RegisterSchema,
        },
    });

    const handleSubmit = async () => {
        await form.handleSubmit();
    };

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
                            <Button $variant="plain" className="ios:px-0" onPress={() => router.dismiss()}>
                                <Text className="font-medium text-primary">Cancel</Text>
                            </Button>
                        );
                    },
                }}
            />

            <KeyboardAwareScrollView
                bottomOffset={Platform.select({ ios: 175 })}
                bounces={false}
                contentContainerClassName="ios:pt-20 pt-28"
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="handled">
                <View className="ios:px-12 flex-1 px-8">
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
                                Create your account
                            </Text>
                            <Text className="text-center text-sm text-muted-foreground">
                                Join thousands managing their finances with confidence
                            </Text>
                        </Animated.View>
                    </Animated.View>

                    <Animated.View className="ios:pt-4 pt-6" entering={FadeInDown.delay(600).duration(600)}>
                        <Form className="gap-3">
                            <FormSection className="ios:bg-background/95 backdrop-blur-sm" style={styles.formSection}>
                                <FormItem>
                                    <TextField
                                        autoCapitalize="words"
                                        autoFocus
                                        label={Platform.select({ ios: undefined, default: 'Full name' })}
                                        onBlur={() => setFocusedTextField(null)}
                                        onFocus={() => setFocusedTextField('fullName')}
                                        onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                                        placeholder={Platform.select({ ios: 'Full name', default: '' })}
                                        returnKeyType="next"
                                        submitBehavior="submit"
                                        textContentType="name"
                                    />
                                </FormItem>
                                <FormItem>
                                    <TextField
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        label={Platform.select({ ios: undefined, default: 'Email' })}
                                        onBlur={() => setFocusedTextField(null)}
                                        onFocus={() => setFocusedTextField('email')}
                                        onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                                        placeholder={Platform.select({ ios: 'Email', default: '' })}
                                        returnKeyType="next"
                                        submitBehavior="submit"
                                        textContentType="emailAddress"
                                    />
                                </FormItem>
                                <FormItem>
                                    <TextField
                                        label={Platform.select({ ios: undefined, default: 'Password' })}
                                        onBlur={() => setFocusedTextField(null)}
                                        onFocus={() => setFocusedTextField('password')}
                                        onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                                        placeholder={Platform.select({ ios: 'Password', default: '' })}
                                        returnKeyType="next"
                                        secureTextEntry
                                        submitBehavior="submit"
                                        textContentType="newPassword"
                                    />
                                </FormItem>
                                <FormItem>
                                    <TextField
                                        label={Platform.select({ ios: undefined, default: 'Confirm password' })}
                                        onBlur={() => setFocusedTextField(null)}
                                        onFocus={() => setFocusedTextField('confirmPassword')}
                                        onSubmitEditing={handleSubmit}
                                        placeholder={Platform.select({ ios: 'Confirm password', default: '' })}
                                        returnKeyType="done"
                                        secureTextEntry
                                        textContentType="newPassword"
                                    />
                                </FormItem>
                            </FormSection>

                            <Animated.View className="mt-2" entering={FadeInDown.delay(800).duration(600)}>
                                <Text className="text-center text-xs leading-relaxed text-muted-foreground">
                                    By creating an account, you agree to our{' '}
                                    <ExternalLink
                                        className="text-xs text-primary"
                                        href="https://expensetrackr.app/terms-of-service">
                                        Terms of Service
                                    </ExternalLink>{' '}
                                    and{' '}
                                    <ExternalLink
                                        className="text-xs text-primary"
                                        href="https://expensetrackr.app/privacy-policy">
                                        Privacy Policy
                                    </ExternalLink>
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
                        <Button $size="lg" onPress={handleSubmit} style={styles.primaryButton}>
                            <Text className="font-semibold">Create account</Text>
                        </Button>
                    </Animated.View>
                ) : (
                    <Animated.View
                        className="flex-row justify-between py-4 pl-6 pr-8"
                        entering={FadeInDown.delay(1000).duration(600)}>
                        <Button $variant="plain" className="px-2" onPress={() => router.replace('/(guest)/(login)')}>
                            <Text className="px-0.5 text-sm font-medium text-primary">Already have an account?</Text>
                        </Button>
                        <Button
                            onPress={() => {
                                if (focusedTextField === 'fullName') {
                                    KeyboardController.setFocusTo('next');
                                    return;
                                }
                                if (focusedTextField === 'email') {
                                    KeyboardController.setFocusTo('next');
                                    return;
                                }
                                if (focusedTextField === 'password') {
                                    KeyboardController.setFocusTo('next');
                                    return;
                                }
                                KeyboardController.dismiss();
                                handleSubmit();
                            }}
                            style={styles.primaryButton}>
                            <Text className="text-sm font-semibold">
                                {focusedTextField === 'confirmPassword' ? 'Create account' : 'Next'}
                            </Text>
                        </Button>
                    </Animated.View>
                )}
            </KeyboardStickyView>

            {Platform.OS === 'ios' && (
                <Animated.View entering={FadeIn.delay(1200).duration(600)}>
                    <Button
                        $variant="plain"
                        onPress={() => {
                            router.replace('/(guest)/(login)');
                        }}>
                        <Text className="text-sm font-medium text-primary">Already have an account?</Text>
                    </Button>
                </Animated.View>
            )}
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
