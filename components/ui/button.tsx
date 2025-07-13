import * as Slot from '@rn-primitives/slot';
import { ColorTranslator } from 'colortranslator';
import * as React from 'react';
import { Platform, Pressable, PressableProps, View, ViewStyle } from 'react-native';

import { useColorScheme } from '#/hooks/use-color-scheme.ts';
import { colors } from '#/theme/colors.ts';
import { cn } from '#/utils/cn.ts';
import { tv, VariantProps } from '#/utils/tv.ts';

import { TextClassContext } from './text.tsx';

const buttonVariants = tv({
    base: 'flex-row items-center justify-center gap-2',
    variants: {
        $variant: {
            primary: 'ios:active:opacity-80 bg-primary',
            secondary: 'ios:border-primary ios:active:bg-primary/5 border border-foreground/40',
            tonal: 'ios:bg-primary/10 dark:ios:bg-primary/10 ios:active:bg-primary/15 bg-primary/15 dark:bg-primary/30',
            plain: 'ios:active:opacity-70',
        },
        $size: {
            none: '',
            sm: 'py-1 px-2.5 rounded-full',
            md: 'ios:rounded-lg py-2 ios:py-1.5 ios:px-3.5 px-5 rounded-full',
            lg: 'py-2.5 px-5 ios:py-2 rounded-xl gap-2',
            icon: 'ios:rounded-lg h-10 w-10 rounded-full',
        },
    },
    defaultVariants: {
        $variant: 'primary',
        $size: 'md',
    },
});

const androidRootVariants = tv({
    base: 'overflow-hidden',
    variants: {
        $size: {
            none: '',
            icon: 'rounded-full',
            sm: 'rounded-full',
            md: 'rounded-full',
            lg: 'rounded-xl',
        },
    },
    defaultVariants: {
        $size: 'md',
    },
});

const buttonTextVariants = tv({
    base: 'font-medium',
    variants: {
        $variant: {
            primary: 'text-white',
            secondary: 'ios:text-primary text-foreground',
            tonal: 'ios:text-primary text-foreground',
            plain: 'text-foreground',
        },
        $size: {
            none: '',
            icon: '',
            sm: 'text-[15px] leading-5',
            md: 'text-[17px] leading-7',
            lg: 'text-[17px] leading-7',
        },
    },
    defaultVariants: {
        $variant: 'primary',
        $size: 'md',
    },
});

const ANDROID_RIPPLE = {
    dark: {
        primary: { color: new ColorTranslator(colors.dark.gray300).setA(0.4).RGBA, borderless: false },
        secondary: { color: new ColorTranslator(colors.dark.gray500).setA(0.8).RGBA, borderless: false },
        plain: { color: new ColorTranslator(colors.dark.gray500).setA(0.8).RGBA, borderless: false },
        tonal: { color: new ColorTranslator(colors.dark.gray500).setA(0.8).RGBA, borderless: false },
    },
    light: {
        primary: { color: new ColorTranslator(colors.light.gray400).setA(0.4).RGBA, borderless: false },
        secondary: { color: new ColorTranslator(colors.light.gray500).setA(0.4).RGBA, borderless: false },
        plain: { color: new ColorTranslator(colors.light.gray500).setA(0.4).RGBA, borderless: false },
        tonal: { color: new ColorTranslator(colors.light.gray600).setA(0.4).RGBA, borderless: false },
    },
};

// Add as class when possible: https://github.com/marklawlor/nativewind/issues/522
const BORDER_CURVE: ViewStyle = {
    borderCurve: 'continuous',
};

type ButtonVariantProps = Omit<VariantProps<typeof buttonVariants>, '$variant'> & {
    $variant?: Exclude<VariantProps<typeof buttonVariants>['$variant'], null>;
};

type AndroidOnlyButtonProps = {
    /**
     * ANDROID ONLY: The class name of root responsible for hidding the ripple overflow.
     */
    androidRootClassName?: string;
};

type ButtonProps = PressableProps & ButtonVariantProps & AndroidOnlyButtonProps;

const Root = Platform.OS === 'android' ? View : Slot.Pressable;

const Button = React.forwardRef<React.ComponentRef<typeof Pressable>, ButtonProps>(
    ({ className, $variant = 'primary', $size, style = BORDER_CURVE, androidRootClassName, ...props }, ref) => {
        const { colorScheme } = useColorScheme();

        return (
            <TextClassContext.Provider value={buttonTextVariants({ $variant, $size })}>
                <Root
                    className={Platform.select({
                        ios: undefined,
                        default: androidRootVariants({
                            $size,
                            className: androidRootClassName,
                        }),
                    })}>
                    <Pressable
                        android_ripple={ANDROID_RIPPLE[colorScheme][$variant]}
                        className={cn(props.disabled && 'opacity-50', buttonVariants({ $variant, $size, className }))}
                        ref={ref}
                        style={style}
                        {...props}
                    />
                </Root>
            </TextClassContext.Provider>
        );
    },
);

Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
