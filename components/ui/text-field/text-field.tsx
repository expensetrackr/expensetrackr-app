import { useAugmentedRef, useControllableState } from '@rn-primitives/hooks';
import { Icon } from '@roninoss/icons';
import * as React from 'react';
import {
    Pressable,
    TextInput,
    View,
    ViewProps,
    ViewStyle,
    type NativeSyntheticEvent,
    type TextInputFocusEventData,
} from 'react-native';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';

import { useColorScheme } from '#/hooks/use-color-scheme.ts';
import { cn } from '#/utils/cn.ts';
import { tv } from '#/utils/tv.ts';

import type { TextFieldProps, TextFieldRef } from './types.ts';

const TextField = React.forwardRef<TextFieldRef, TextFieldProps>(
    (
        {
            value: valueProp,
            defaultValue: defaultValueProp,
            onChangeText: onChangeTextProp,
            onFocus: onFocusProp,
            onBlur: onBlurProp,
            placeholder,
            editable,
            className,
            leftView,
            rightView,
            label,
            labelClassName,
            containerClassName,
            accessibilityHint,
            errorMessage,
            materialVariant = 'outlined',
            materialRingColor,
            materialHideActionIcons,
            ...props
        },
        ref,
    ) => {
        const inputRef = useAugmentedRef({ ref, methods: { focus, blur, clear } });
        const [isFocused, setIsFocused] = React.useState(false);

        const [value = '', onChangeText] = useControllableState({
            prop: valueProp,
            defaultProp: defaultValueProp ?? valueProp ?? '',
            onChange: onChangeTextProp,
        });

        function focus() {
            inputRef.current?.focus();
        }

        function blur() {
            inputRef.current?.blur();
        }

        function clear() {
            onChangeText('');
        }

        function onFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
            setIsFocused(true);
            onFocusProp?.(e);
        }

        function onBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
            setIsFocused(false);
            onBlurProp?.(e);
        }

        const InputWrapper = materialVariant === 'filled' ? FilledWrapper : FilledWrapper;

        return (
            <Pressable
                accessibilityLabel="Focus text field"
                accessibilityRole="button"
                className={rootVariants({
                    $variant: materialVariant,
                    $state: getInputState({
                        isFocused,
                        hasError: !!errorMessage,
                        editable,
                    }),
                    className: containerClassName,
                })}
                disabled={editable === false}
                style={materialRingColor ? { borderColor: materialRingColor } : undefined}
                onPress={focus}>
                <View
                    className={innerRootVariants({
                        $variant: materialVariant,
                        $state: getInputState({
                            isFocused,
                            hasError: !!errorMessage,
                            editable,
                        }),
                    })}
                    style={materialRingColor && isFocused ? { borderColor: materialRingColor } : undefined}>
                    {leftView}
                    <InputWrapper>
                        {!!label && (
                            <MaterialLabel
                                className={labelClassName}
                                hasError={!!errorMessage}
                                hasLeftView={!!leftView}
                                isFocused={isFocused}
                                materialLabel={label}
                                materialVariant={materialVariant}
                                value={value}
                            />
                        )}
                        <TextInput
                            accessibilityHint={accessibilityHint ?? errorMessage}
                            accessibilityLabel={label}
                            accessibilityRole="text"
                            className={cn(
                                'rounded text-foreground flex-1 py-3 pl-2.5 text-[17px] placeholder:text-text-disabled-300',
                                materialVariant === 'filled' && !!label && 'pb-2 pt-5',
                                className,
                            )}
                            editable={editable}
                            placeholder={isFocused || !label ? placeholder : ''}
                            ref={inputRef}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChangeText}
                            onFocus={onFocus}
                            {...props}
                        />
                    </InputWrapper>
                    {!materialHideActionIcons && (
                        <>
                            {!!errorMessage ? (
                                <MaterialErrorIcon />
                            ) : (
                                !!value && isFocused && <MaterialClearIcon clearText={clear} editable={editable} />
                            )}
                        </>
                    )}
                    {rightView}
                </View>
            </Pressable>
        );
    },
);

TextField.displayName = 'TextField';

export { TextField };

type InputState = 'idle' | 'focused' | 'error' | 'errorAndFocused' | 'disabled';

type GetInputArgs = {
    isFocused: boolean;
    hasError?: boolean;
    editable?: boolean;
};

function getInputState(args: GetInputArgs): InputState {
    if (args.editable === false) {
        return 'disabled';
    }
    if (args.hasError && args.isFocused) {
        return 'errorAndFocused';
    }
    if (args.isFocused) {
        return 'focused';
    }
    return 'idle';
}

const rootVariants = tv({
    base: 'relative rounded-[5px]',
    variants: {
        $variant: {
            outlined: 'border',
            filled: 'rounded-b-none border-b',
        },
        $state: {
            idle: 'border-transparent',
            error: 'border-transparent',
            focused: 'border-primary',
            errorAndFocused: 'border-destructive',
            disabled: 'opacity-50',
        },
    },
    defaultVariants: {
        $variant: 'outlined',
        $state: 'idle',
    },
});

const innerRootVariants = tv({
    base: 'flex-row rounded',
    variants: {
        $variant: {
            outlined: 'border-border border',
            filled: 'bg-border/70 rounded-b-none border-b',
        },
        $state: {
            idle: 'border-foreground/30',
            error: 'border-destructive',
            focused: 'border-primary',
            errorAndFocused: 'border-destructive',
            disabled: 'border-foreground/30',
        },
    },
    defaultVariants: {
        $variant: 'outlined',
        $state: 'idle',
    },
});

function FilledWrapper(props: ViewProps) {
    return <View className="relative flex-1 flex-row" {...props} />;
}

type MaterialLabelProps = {
    isFocused: boolean;
    value: string;
    materialLabel: string;
    hasLeftView: boolean;
    hasError?: boolean;
    className?: string;
    materialVariant: 'outlined' | 'filled';
};

const DEFAULT_TEXT_FIELD_HEIGHT = 56;

function MaterialLabel(props: MaterialLabelProps) {
    const isLifted = props.isFocused || !!props.value;
    const isLiftedDerived = useDerivedValue(() => isLifted);
    const hasLeftViewDerived = useDerivedValue(() => props.hasLeftView);
    const variantDerived = useDerivedValue(() => props.materialVariant);
    const animatedRootStyle = useAnimatedStyle(() => {
        const style: ViewStyle = {
            position: 'absolute',
            alignSelf: 'center',
        };
        if (variantDerived.value === 'outlined') {
            style.paddingLeft = withTiming(hasLeftViewDerived.value && isLiftedDerived.value ? 0 : 12, {
                duration: 200,
            });
            style.transform = [
                {
                    translateY: withTiming(isLiftedDerived.value ? -DEFAULT_TEXT_FIELD_HEIGHT / 2 : 0, {
                        duration: 200,
                    }),
                },
                {
                    translateX: withTiming(hasLeftViewDerived.value && isLiftedDerived.value ? -12 : 0, {
                        duration: 200,
                    }),
                },
            ];
        }
        if (variantDerived.value === 'filled') {
            style.paddingLeft = 8;
            style.transform = [
                {
                    translateY: withTiming(isLiftedDerived.value ? -DEFAULT_TEXT_FIELD_HEIGHT / 4 : 0, {
                        duration: 200,
                    }),
                },
                {
                    translateX: 0,
                },
            ];
        }
        return style;
    });
    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            fontSize: withTiming(isLiftedDerived.value ? 10 : 17, { duration: 200 }),
        };
    });
    return (
        <Animated.View pointerEvents="none" style={animatedRootStyle}>
            <Animated.Text
                className={cn(
                    'bg-card/0 text-foreground/70 rounded',
                    isLifted && 'px-0.5',
                    isLifted && props.materialVariant === 'outlined' && 'bg-background',
                    props.isFocused && 'text-primary/60 dark:text-primary',
                    props.hasError && 'text-destructive dark:text-destructive',
                    props.className,
                )}
                style={animatedTextStyle}>
                {props.materialLabel}
            </Animated.Text>
        </Animated.View>
    );
}

type MaterialClearIconProps = {
    editable?: boolean;
    clearText: () => void;
};

function MaterialClearIcon(props: MaterialClearIconProps) {
    const { colors } = useColorScheme();
    return (
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
            <Pressable
                className="flex-1 justify-center px-2 active:opacity-65"
                disabled={props.editable === false}
                onPress={props.clearText}>
                <Icon color={colors.iconSub600} name="close-circle-outline" size={24} />
            </Pressable>
        </Animated.View>
    );
}

function MaterialErrorIcon() {
    const { colors } = useColorScheme();
    return (
        <Animated.View
            className="justify-center pr-2"
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            pointerEvents="none">
            <Icon
                color={colors.error}
                materialIcon={{
                    name: 'alert-circle',
                    type: 'MaterialCommunityIcons',
                }}
                name="close-circle-outline"
                size={24}
            />
        </Animated.View>
    );
}
