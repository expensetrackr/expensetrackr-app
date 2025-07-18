import * as AlertDialogPrimitive from '@rn-primitives/alert-dialog';
import { useAugmentedRef } from '@rn-primitives/hooks';
import { Icon } from '@roninoss/icons';
import * as React from 'react';
import { View } from 'react-native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown, useAnimatedStyle } from 'react-native-reanimated';

import { useColorScheme } from '#/hooks/use-color-scheme.ts';
import { cn } from '#/utils/cn.ts';

import { Button } from '../button.tsx';
import { TextField } from '../text-field/index.ts';
import { TextFieldRef } from '../text-field/types.ts';
import { Text } from '../text.tsx';

import { AlertProps, AlertRef } from './types.ts';

const Alert = React.forwardRef<AlertRef, AlertProps>(
    (
        {
            children,
            title: titleProp,
            message: messageProp,
            buttons: buttonsProp,
            prompt: promptProp,
            materialIcon: materialIconProp,
            materialWidth: materialWidthProp,
            materialPortalHost,
        },
        ref,
    ) => {
        const { height } = useReanimatedKeyboardAnimation();
        const [open, setOpen] = React.useState(false);
        const [{ title, message, buttons, prompt, materialIcon, materialWidth }, setProps] = React.useState<AlertProps>(
            {
                title: titleProp,
                message: messageProp,
                buttons: buttonsProp,
                prompt: promptProp,
                materialIcon: materialIconProp,
                materialWidth: materialWidthProp,
            },
        );
        const [text, setText] = React.useState(promptProp?.defaultValue ?? '');
        const [password, setPassword] = React.useState('');
        const { colors } = useColorScheme();
        const passwordRef = React.useRef<TextFieldRef>(null);
        const augmentedRef = useAugmentedRef({
            ref,
            methods: {
                show: () => {
                    setOpen(true);
                },
                alert,
                prompt: promptAlert,
            },
        });

        const bottomPaddingStyle = useAnimatedStyle(() => {
            return {
                paddingBottom: height.value * -1,
            };
        });

        function promptAlert(args: AlertProps & { prompt: Required<AlertProps['prompt']> }) {
            setText(args.prompt?.defaultValue ?? '');
            setPassword('');
            setProps(args);
            setOpen(true);
        }

        function alert(args: AlertProps) {
            setText(args.prompt?.defaultValue ?? '');
            setPassword('');
            setProps(args);
            setOpen(true);
        }

        function onOpenChange(open: boolean) {
            if (!open) {
                setText(prompt?.defaultValue ?? '');
                setPassword('');
            }
            setOpen(open);
        }

        return (
            <AlertDialogPrimitive.Root open={open} ref={augmentedRef} onOpenChange={onOpenChange}>
                <AlertDialogPrimitive.Trigger asChild={!!children}>{children}</AlertDialogPrimitive.Trigger>
                <AlertDialogPrimitive.Portal hostName={materialPortalHost}>
                    <AlertDialogPrimitive.Overlay asChild>
                        <Animated.View
                            className={cn(
                                'bg-popover/80 absolute bottom-0 left-0 right-0 top-0 items-center justify-center px-3',
                            )}
                            entering={FadeIn}
                            exiting={FadeOut}
                            style={bottomPaddingStyle}>
                            <AlertDialogPrimitive.Content>
                                <Animated.View
                                    className="rounded-3xl bg-card shadow-xl min-w-72 max-w-xl p-6 pt-7"
                                    entering={FadeInDown}
                                    exiting={FadeOutDown}
                                    style={typeof materialWidth === 'number' ? { width: materialWidth } : undefined}>
                                    {!!materialIcon && (
                                        <View className="items-center pb-4">
                                            <Icon color={colors.iconSub600} size={27} {...materialIcon} />
                                        </View>
                                    )}
                                    {!!message ? (
                                        <>
                                            <AlertDialogPrimitive.Title asChild>
                                                <Text
                                                    $variant="title2"
                                                    className={cn(!!materialIcon && 'text-center', 'pb-4')}>
                                                    {title}
                                                </Text>
                                            </AlertDialogPrimitive.Title>
                                            <AlertDialogPrimitive.Description asChild>
                                                <Text $variant="subhead" className="pb-4 opacity-90">
                                                    {message}
                                                </Text>
                                            </AlertDialogPrimitive.Description>
                                        </>
                                    ) : !!materialIcon ? (
                                        <AlertDialogPrimitive.Title asChild>
                                            <Text
                                                $variant="title2"
                                                className={cn(!!materialIcon && 'text-center', 'pb-4')}>
                                                {title}
                                            </Text>
                                        </AlertDialogPrimitive.Title>
                                    ) : (
                                        <AlertDialogPrimitive.Title asChild>
                                            <Text $variant="subhead" className="pb-4 opacity-90">
                                                {title}
                                            </Text>
                                        </AlertDialogPrimitive.Title>
                                    )}
                                    {!!prompt ? (
                                        <View className="gap-4 pb-8">
                                            <TextField
                                                autoFocus
                                                blurOnSubmit={prompt.type !== 'login-password'}
                                                keyboardType={
                                                    prompt.type === 'secure-text' ? 'default' : prompt.keyboardType
                                                }
                                                label={prompt.type === 'login-password' ? 'Email' : ''}
                                                labelClassName="bg-card"
                                                secureTextEntry={prompt.type === 'secure-text'}
                                                value={text}
                                                onChangeText={setText}
                                                onSubmitEditing={() => {
                                                    if (prompt.type === 'login-password' && passwordRef.current) {
                                                        passwordRef.current.focus();
                                                        return;
                                                    }
                                                    for (const button of buttons) {
                                                        if (!button.style || button.style === 'default') {
                                                            button.onPress?.(text);
                                                        }
                                                    }
                                                    onOpenChange(false);
                                                }}
                                            />
                                            {prompt.type === 'login-password' && (
                                                <TextField
                                                    defaultValue={prompt.defaultValue}
                                                    keyboardType={prompt.keyboardType}
                                                    label="Password"
                                                    labelClassName="bg-card"
                                                    ref={passwordRef}
                                                    secureTextEntry={prompt.type === 'login-password'}
                                                    value={password}
                                                    onChangeText={setPassword}
                                                    onSubmitEditing={() => {
                                                        for (const button of buttons) {
                                                            if (!button.style || button.style === 'default') {
                                                                button.onPress?.(text);
                                                            }
                                                        }
                                                        onOpenChange(false);
                                                    }}
                                                />
                                            )}
                                        </View>
                                    ) : (
                                        <View className="h-0.5" />
                                    )}
                                    <View
                                        className={cn(
                                            'flex-row items-center justify-end gap-0.5',
                                            buttons.length > 2 && 'justify-between',
                                        )}>
                                        {buttons.map((button, index) => {
                                            if (button.style === 'cancel') {
                                                return (
                                                    <View
                                                        className={cn(
                                                            buttons.length > 2 && index === 0 && 'flex-1 items-start',
                                                        )}
                                                        key={button.text}>
                                                        <AlertDialogPrimitive.Cancel asChild>
                                                            <Button
                                                                $variant="plain"
                                                                onPress={() => {
                                                                    button.onPress?.(
                                                                        prompt?.type === 'login-password'
                                                                            ? { login: text, password }
                                                                            : text,
                                                                    );
                                                                }}>
                                                                <Text className="text-primary text-[14px] font-medium">
                                                                    {button.text}
                                                                </Text>
                                                            </Button>
                                                        </AlertDialogPrimitive.Cancel>
                                                    </View>
                                                );
                                            }
                                            if (button.style === 'destructive') {
                                                return (
                                                    <View
                                                        className={cn(
                                                            buttons.length > 2 && index === 0 && 'flex-1 items-start',
                                                        )}
                                                        key={button.text}>
                                                        <AlertDialogPrimitive.Action asChild>
                                                            <Button
                                                                $variant="tonal"
                                                                className="bg-destructive/10 dark:bg-destructive/25"
                                                                onPress={() => {
                                                                    button.onPress?.(
                                                                        prompt?.type === 'login-password'
                                                                            ? { login: text, password }
                                                                            : text,
                                                                    );
                                                                }}>
                                                                <Text className="text-foreground text-[14px] font-medium">
                                                                    {button.text}
                                                                </Text>
                                                            </Button>
                                                        </AlertDialogPrimitive.Action>
                                                    </View>
                                                );
                                            }
                                            return (
                                                <View
                                                    className={cn(
                                                        buttons.length > 2 && index === 0 && 'flex-1 items-start',
                                                    )}
                                                    key={button.text}>
                                                    <AlertDialogPrimitive.Action asChild>
                                                        <Button
                                                            $variant="plain"
                                                            onPress={() => {
                                                                button.onPress?.(
                                                                    prompt?.type === 'login-password'
                                                                        ? { login: text, password }
                                                                        : text,
                                                                );
                                                            }}>
                                                            <Text className="text-primary text-[14px] font-medium">
                                                                {button.text}
                                                            </Text>
                                                        </Button>
                                                    </AlertDialogPrimitive.Action>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </Animated.View>
                            </AlertDialogPrimitive.Content>
                        </Animated.View>
                    </AlertDialogPrimitive.Overlay>
                </AlertDialogPrimitive.Portal>
            </AlertDialogPrimitive.Root>
        );
    },
);

Alert.displayName = 'Alert';

const AlertAnchor = React.forwardRef<AlertRef>((_, ref) => {
    return <Alert buttons={[]} ref={ref} title="" />;
});
AlertAnchor.displayName = 'AlertAnchor';

export { Alert, AlertAnchor };
