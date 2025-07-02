import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { MotiView } from 'moti';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardController, KeyboardStickyView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

import { ExternalLink } from '#/components/external-link.tsx';
import { ActivityIndicator } from '#/components/ui/activity-indicator.tsx';
import { Button } from '#/components/ui/button.tsx';
import { Form, FormItem, FormSection } from '#/components/ui/form.tsx';
import { HelperText } from '#/components/ui/helper-text.tsx';
import { TextField } from '#/components/ui/text-field/index.ts';
import { Text } from '#/components/ui/text.tsx';
import { useRegister } from '#/hooks/api/auth.ts';
import { useAppForm } from '#/hooks/use-app-form.tsx';
import { useSession } from '#/providers/session-provider.tsx';
import { RegisterSchema } from '#/schemas/auth.ts';

export default function CreateAccountScreen() {
    const insets = useSafeAreaInsets();
    const [focusedTextField, setFocusedTextField] = React.useState<
        'fullName' | 'email' | 'password' | 'confirmPassword' | null
    >(null);
    const { mutateAsync, isPending } = useRegister();
    const { setSession } = useSession();
    const form = useAppForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
        },
        async onSubmit({ value }) {
            try {
                const token = await mutateAsync(value);

                setSession(token);
            } catch (error) {
                toast.error(error instanceof Error ? error.message : 'An unknown error occurred');
            }
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

            <KeyboardAwareScrollView
                bottomOffset={Platform.select({ ios: 175 })}
                bounces={false}
                contentContainerClassName="ios:pt-20 pt-28"
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="handled">
                <View className="ios:px-12 flex-1 px-8">
                    <MotiView
                        animate={{ opacity: 1 }}
                        className="items-center pb-6"
                        from={{ opacity: 0 }}
                        transition={{ type: 'timing', delay: 200, duration: 800 }}>
                        <View style={styles.logoContainer}>
                            <Image
                                contentFit="contain"
                                source={require('#/assets/images/logo.png')}
                                style={styles.logo}
                            />
                        </View>
                        <MotiView
                            animate={{ opacity: 1, translateY: 0 }}
                            from={{ opacity: 0, translateY: 20 }}
                            transition={{ type: 'timing', delay: 400, duration: 600 }}>
                            <Text
                                $variant="title1"
                                className="ios:font-bold pb-2 pt-6 text-center text-2xl"
                                style={styles.welcomeText}>
                                Create your account
                            </Text>
                            <Text className="text-center text-sm text-muted-foreground">
                                Join thousands managing their finances with confidence
                            </Text>
                        </MotiView>
                    </MotiView>

                    <MotiView
                        animate={{ opacity: 1, translateY: 0 }}
                        className="ios:pt-4 pt-6"
                        from={{ opacity: 0, translateY: 30 }}
                        transition={{ type: 'timing', delay: 600, duration: 600 }}>
                        <Form className="gap-3">
                            <FormSection className="ios:bg-background/95 backdrop-blur-sm" style={styles.formSection}>
                                <form.AppField name="name">
                                    {(field) => (
                                        <FormItem>
                                            <TextField
                                                autoCapitalize="words"
                                                autoFocus
                                                id={field.name}
                                                label={Platform.select({ ios: undefined, default: 'Full name' })}
                                                onBlur={() => {
                                                    setFocusedTextField(null);
                                                    field.handleBlur();
                                                }}
                                                onChangeText={field.handleChange}
                                                onFocus={() => {
                                                    setFocusedTextField('fullName');
                                                }}
                                                onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                                                placeholder={Platform.select({ ios: 'Full name', default: '' })}
                                                returnKeyType="next"
                                                submitBehavior="submit"
                                                textContentType="name"
                                                value={field.state.value}
                                            />
                                            <HelperText
                                                className="px-1.5"
                                                error={field.state.meta.errors?.[0]?.message}
                                            />
                                        </FormItem>
                                    )}
                                </form.AppField>
                                <form.AppField name="email">
                                    {(field) => (
                                        <FormItem>
                                            <TextField
                                                autoCapitalize="none"
                                                id={field.name}
                                                keyboardType="email-address"
                                                label={Platform.select({ ios: undefined, default: 'Email' })}
                                                onBlur={() => {
                                                    setFocusedTextField(null);
                                                    field.handleBlur();
                                                }}
                                                onChangeText={field.handleChange}
                                                onFocus={() => {
                                                    setFocusedTextField('email');
                                                }}
                                                onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                                                placeholder={Platform.select({ ios: 'Email', default: '' })}
                                                returnKeyType="next"
                                                submitBehavior="submit"
                                                textContentType="emailAddress"
                                                value={field.state.value}
                                            />
                                            <HelperText
                                                className="px-1.5"
                                                error={field.state.meta.errors?.[0]?.message}
                                            />
                                        </FormItem>
                                    )}
                                </form.AppField>

                                <form.AppField name="password">
                                    {(field) => (
                                        <FormItem>
                                            <TextField
                                                id={field.name}
                                                label={Platform.select({ ios: undefined, default: 'Password' })}
                                                onBlur={() => {
                                                    setFocusedTextField(null);
                                                    field.handleBlur();
                                                }}
                                                onChangeText={field.handleChange}
                                                onFocus={() => {
                                                    setFocusedTextField('password');
                                                }}
                                                onSubmitEditing={() => KeyboardController.setFocusTo('next')}
                                                placeholder={Platform.select({ ios: 'Password', default: '' })}
                                                returnKeyType="next"
                                                secureTextEntry
                                                submitBehavior="submit"
                                                textContentType="newPassword"
                                                value={field.state.value}
                                            />
                                            <HelperText
                                                className="px-1.5"
                                                error={field.state.meta.errors?.[0]?.message}
                                            />
                                        </FormItem>
                                    )}
                                </form.AppField>

                                <form.AppField name="confirm_password">
                                    {(field) => (
                                        <FormItem>
                                            <TextField
                                                id={field.name}
                                                label={Platform.select({ ios: undefined, default: 'Confirm password' })}
                                                onBlur={() => {
                                                    setFocusedTextField(null);
                                                    field.handleBlur();
                                                }}
                                                onChangeText={field.handleChange}
                                                onFocus={() => {
                                                    setFocusedTextField('confirmPassword');
                                                }}
                                                onSubmitEditing={handleSubmit}
                                                placeholder={Platform.select({ ios: 'Confirm password', default: '' })}
                                                returnKeyType="done"
                                                secureTextEntry
                                                textContentType="newPassword"
                                                value={field.state.value}
                                            />
                                            <HelperText
                                                className="px-1.5"
                                                error={field.state.meta.errors?.[0]?.message}
                                            />
                                        </FormItem>
                                    )}
                                </form.AppField>
                            </FormSection>

                            <MotiView
                                animate={{ opacity: 1, translateY: 0 }}
                                className="mt-2"
                                from={{ opacity: 0, translateY: 20 }}
                                transition={{ type: 'timing', delay: 800, duration: 600 }}>
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
                            </MotiView>
                        </Form>
                    </MotiView>
                </View>
            </KeyboardAwareScrollView>

            <KeyboardStickyView
                offset={{
                    closed: 0,
                    opened: Platform.select({ ios: insets.bottom + 30, default: insets.bottom }),
                }}>
                {Platform.OS === 'ios' ? (
                    <MotiView
                        animate={{ opacity: 1, translateY: 0 }}
                        className="px-12 py-4"
                        from={{ opacity: 0, translateY: 30 }}
                        transition={{ type: 'timing', delay: 1000, duration: 600 }}>
                        <Button 
                            $size="lg" 
                            disabled={isPending} 
                            onPress={handleSubmit} 
                            style={styles.primaryButton}
                            accessibilityLabel="Create account"
                            accessibilityHint="Submit the registration form to create a new account"
                            accessibilityRole="button">
                            <Text className="font-semibold">
                                {isPending ? 'Creating account...' : 'Create account'}
                            </Text>
                            {isPending ? (
                                <MotiView
                                    animate={{ opacity: 1 }}
                                    from={{ opacity: 0 }}
                                    transition={{ type: 'timing', delay: 200 }}>
                                    <ActivityIndicator color="#fff" size="small" />
                                </MotiView>
                            ) : null}
                        </Button>
                    </MotiView>
                ) : (
                    <MotiView
                        animate={{ opacity: 1, translateY: 0 }}
                        className="flex-row justify-between py-4 pl-6 pr-8"
                        from={{ opacity: 0, translateY: 30 }}
                        transition={{ type: 'timing', delay: 1000, duration: 600 }}>
                        <Button $variant="plain" className="px-2" onPress={() => router.push('/(guest)/(auth)/login')}>
                            <Text className="px-0.5 text-sm font-medium text-primary">Already have an account?</Text>
                        </Button>
                        <Button
                            disabled={isPending}
                            onPress={() => {
                                const fieldsRequiringNext = ['fullName', 'email', 'password'];
                                if (focusedTextField && fieldsRequiringNext.includes(focusedTextField)) {
                                    KeyboardController.setFocusTo('next');
                                    return;
                                }
                                KeyboardController.dismiss();
                                handleSubmit();
                            }}
                            style={styles.primaryButton}
                            accessibilityLabel={
                                isPending
                                    ? 'Creating account'
                                    : focusedTextField === 'confirmPassword'
                                      ? 'Create account'
                                      : 'Next field'
                            }
                            accessibilityHint={
                                focusedTextField === 'confirmPassword'
                                    ? 'Submit the registration form to create a new account'
                                    : 'Move to the next form field'
                            }
                            accessibilityRole="button">
                            <Text className="text-sm font-semibold">
                                {isPending
                                    ? 'Creating account...'
                                    : focusedTextField === 'confirmPassword'
                                      ? 'Create account'
                                      : 'Next'}
                            </Text>
                            {isPending ? (
                                <MotiView
                                    animate={{ opacity: 1 }}
                                    from={{ opacity: 0 }}
                                    transition={{ type: 'timing', delay: 200 }}>
                                    <ActivityIndicator color="#fff" size="small" />
                                </MotiView>
                            ) : null}
                        </Button>
                    </MotiView>
                )}
            </KeyboardStickyView>

            {Platform.OS === 'ios' && (
                <MotiView
                    animate={{ opacity: 1 }}
                    from={{ opacity: 0 }}
                    transition={{ type: 'timing', delay: 1200, duration: 600 }}>
                    <Button
                        $variant="plain"
                        onPress={() => {
                            router.push('/(guest)/(auth)/login');
                        }}>
                        <Text className="text-sm font-medium text-primary">Already have an account?</Text>
                    </Button>
                </MotiView>
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
