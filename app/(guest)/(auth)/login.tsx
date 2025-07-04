import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { MotiView } from 'moti';
import * as React from 'react';
import { useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardController, KeyboardStickyView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

import { ActivityIndicator } from '#/components/ui/activity-indicator.tsx';
import { AlertAnchor } from '#/components/ui/alert/index.ts';
import { AlertRef } from '#/components/ui/alert/types.ts';
import { Button } from '#/components/ui/button.tsx';
import { Form, FormItem, FormSection } from '#/components/ui/form.tsx';
import { HelperText } from '#/components/ui/helper-text.tsx';
import { TextField } from '#/components/ui/text-field/index.ts';
import { Text } from '#/components/ui/text.tsx';
import { useLogin } from '#/hooks/api/auth.ts';
import { useAppForm } from '#/hooks/use-app-form.tsx';
import { useSession } from '#/providers/session-provider.tsx';
import { LoginSchema } from '#/schemas/auth.ts';

export default function LoginScreen() {
    const alertRef = useRef<AlertRef>(null);
    const insets = useSafeAreaInsets();
    const [focusedTextField, setFocusedTextField] = React.useState<'email' | 'password' | null>(null);
    const { setSession } = useSession();
    const { mutateAsync } = useLogin();
    const form = useAppForm({
        defaultValues: {
            email: '',
            password: '',
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
            onSubmit: LoginSchema,
        },
    });

    const handleSubmit = async () => {
        await form.handleSubmit();
    };

    return (
        <>
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
                                    Welcome back!
                                </Text>
                                <Text className="text-center text-sm text-muted-foreground">
                                    Sign in to continue managing your finances
                                </Text>
                            </MotiView>
                        </MotiView>

                        <MotiView
                            animate={{ opacity: 1, translateY: 0 }}
                            className="ios:pt-4 pt-6"
                            from={{ opacity: 0, translateY: 30 }}
                            transition={{ type: 'timing', delay: 600, duration: 600 }}>
                            <Form className="gap-3">
                                <FormSection
                                    className="ios:bg-background/95 backdrop-blur-sm"
                                    style={styles.formSection}>
                                    <form.AppField name="email">
                                        {(field) => (
                                            <FormItem>
                                                <TextField
                                                    autoFocus
                                                    autoCapitalize="none"
                                                    id={field.name}
                                                    keyboardType="email-address"
                                                    label={Platform.select({ ios: undefined, default: 'Email' })}
                                                    placeholder={Platform.select({ ios: 'Email', default: '' })}
                                                    returnKeyType="next"
                                                    submitBehavior="submit"
                                                    textContentType="emailAddress"
                                                    value={field.state.value}
                                                    onBlur={() => {
                                                        setFocusedTextField(null);
                                                        field.handleBlur();
                                                    }}
                                                    onChangeText={field.handleChange}
                                                    onFocus={() => setFocusedTextField('email')}
                                                    onSubmitEditing={() => KeyboardController.setFocusTo('next')}
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
                                                    secureTextEntry
                                                    id={field.name}
                                                    label={Platform.select({ ios: undefined, default: 'Password' })}
                                                    placeholder={Platform.select({ ios: 'Password', default: '' })}
                                                    returnKeyType="done"
                                                    textContentType="password"
                                                    value={field.state.value}
                                                    onBlur={() => {
                                                        setFocusedTextField(null);
                                                        field.handleBlur();
                                                    }}
                                                    onChangeText={field.handleChange}
                                                    onFocus={() => setFocusedTextField('password')}
                                                    onSubmitEditing={handleSubmit}
                                                />
                                                <HelperText
                                                    className="px-1.5"
                                                    error={field.state.meta.errors?.[0]?.message}
                                                />
                                            </FormItem>
                                        )}
                                    </form.AppField>
                                </FormSection>
                                <View className="flex-row justify-end">
                                    <Link asChild href="/(guest)/(auth)/forgot-password">
                                        <Button $size="sm" $variant="plain" className="px-0.5">
                                            <Text className="text-sm font-medium text-primary">Forgot password?</Text>
                                        </Button>
                                    </Link>
                                </View>
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
                            transition={{ type: 'timing', delay: 800, duration: 600 }}>
                            <Button
                                $size="lg"
                                disabled={form.state.isSubmitting}
                                style={styles.primaryButton}
                                onPress={handleSubmit}>
                                <Text className="font-semibold">Continue</Text>
                                {form.state.isSubmitting ? (
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
                            transition={{ type: 'timing', delay: 800, duration: 600 }}>
                            <Button
                                $variant="plain"
                                className="px-2"
                                onPress={() => {
                                    router.push('/(guest)/(auth)/create-account');
                                }}>
                                <Text className="px-0.5 text-sm font-medium text-primary">Create account</Text>
                            </Button>
                            <Button
                                disabled={form.state.isSubmitting}
                                style={styles.primaryButton}
                                onPress={() => {
                                    if (focusedTextField === 'email') {
                                        KeyboardController.setFocusTo('next');
                                        return;
                                    }
                                    KeyboardController.dismiss();
                                    handleSubmit();
                                }}>
                                {form.state.isSubmitting ? (
                                    <MotiView
                                        animate={{ opacity: 1 }}
                                        from={{ opacity: 0 }}
                                        transition={{ type: 'timing', delay: 200 }}>
                                        <ActivityIndicator color="#fff" size="small" />
                                    </MotiView>
                                ) : null}
                                <Text className="text-sm font-semibold">
                                    {focusedTextField === 'email' ? 'Next' : 'Submit'}
                                </Text>
                            </Button>
                        </MotiView>
                    )}
                </KeyboardStickyView>
                {Platform.OS === 'ios' && (
                    <MotiView
                        animate={{ opacity: 1 }}
                        from={{ opacity: 0 }}
                        transition={{ type: 'timing', delay: 1000, duration: 600 }}>
                        <Button
                            $variant="plain"
                            onPress={() => {
                                router.push('/(guest)/(auth)/create-account');
                            }}>
                            <Text className="text-sm font-medium text-primary">Create account</Text>
                        </Button>
                    </MotiView>
                )}
            </View>

            <AlertAnchor ref={alertRef} />
        </>
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
