import { Icon, type IconProps } from '@roninoss/icons';
import * as React from 'react';
import { Platform, View, ViewProps, ViewStyle } from 'react-native';

import { useColorScheme } from '#/hooks/use-color-scheme';
import { cn } from '#/utils/cn';
import { Text } from './text';

const Form = React.forwardRef<View, ViewProps>(({ className, ...props }, ref) => {
    return <View className={cn('flex-1 gap-9', className)} ref={ref} {...props} />;
});
Form.displayName = 'Form';

// Add as class when possible: https://github.com/marklawlor/nativewind/issues/522
const BORDER_CURVE: ViewStyle = {
    borderCurve: 'continuous',
};

type FormSectionProps = ViewProps & {
    rootClassName?: string;
    footnote?: string;
    footnoteClassName?: string;
    ios?: {
        title: string;
        titleClassName?: string;
    };
    materialIconProps?: Omit<IconProps<'material'>, 'namingScheme' | 'ios'>;
};

const FormSection = React.forwardRef<React.ElementRef<typeof View>, FormSectionProps>(
    (
        {
            rootClassName,
            className,
            footnote,
            footnoteClassName,
            ios,
            materialIconProps,
            style = BORDER_CURVE,
            children: childrenProps,
            ...props
        },
        ref,
    ) => {
        const { colors } = useColorScheme();
        const children = React.useMemo(() => {
            if (Platform.OS !== 'ios') return childrenProps;
            const childrenArray = React.Children.toArray(childrenProps);
            // Add isLast prop to last child
            return React.Children.map(childrenArray, (child, index) => {
                if (!React.isValidElement(child)) return child;
                const isLast = index === childrenArray.length - 1;
                if (typeof child.type === 'string') {
                    console.warn('FormSection - String elements should not be direct children', child);
                    return child; // Return the string element as-is
                }
                return React.cloneElement<ViewProps & { isLast?: boolean }, View>(
                    child,
                    { isLast },
                );
            });
        }, [childrenProps]);

        return (
            <View
                className={cn(
                    'relative',
                    Platform.OS !== 'ios' && !!materialIconProps && 'flex-row gap-4',
                    rootClassName,
                )}>
                {Platform.OS === 'ios' && !!ios?.title && (
                    <Text
                        $variant="footnote"
                        className={cn('pb-1 pl-3 uppercase text-muted-foreground', ios?.titleClassName)}>
                        {ios.title}
                    </Text>
                )}
                {!!materialIconProps && (
                    <View className="ios:hidden pt-0.5">
                        <Icon color={colors.grey} size={24} {...(materialIconProps as IconProps<'material'>)} />
                    </View>
                )}
                <View className="flex-1">
                    <View
                        className={cn(
                            'ios:overflow-hidden ios:rounded-lg ios:bg-card ios:gap-0 ios:pl-1 gap-4',
                            className,
                        )}
                        ref={ref}
                        style={style}
                        {...props}>
                        {children}
                    </View>
                    {!!footnote && (
                        <Text
                            $variant="footnote"
                            className={cn('ios:pl-3 ios:pt-1 pl-3 pt-0.5 text-muted-foreground', footnoteClassName)}>
                            {footnote}
                        </Text>
                    )}
                </View>
            </View>
        );
    },
);
FormSection.displayName = 'FormSection';

const FormItem = React.forwardRef<
    View,
    ViewProps & {
        isLast?: boolean;
        iosSeparatorClassName?: string;
    }
>(({ className, isLast, iosSeparatorClassName, ...props }, ref) => {
    return (
        <>
            <View className={cn('ios:pr-1', className)} ref={ref} {...props} />
            {Platform.OS === 'ios' && !isLast && (
                <View className={cn('ml-2 h-px flex-1 bg-border', iosSeparatorClassName)} />
            )}
        </>
    );
});
FormItem.displayName = 'FormItem';

export { Form, FormItem, FormSection };
