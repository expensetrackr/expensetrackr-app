import { Platform, View, ViewStyle } from 'react-native';

import { cn } from '#/utils/cn.ts';

import { Text } from './text.tsx';

const BORDER_CURVE: ViewStyle = Platform.select({
    ios: { borderCurve: 'continuous' },
    default: {},
});

type TextProps = React.ComponentPropsWithoutRef<typeof Text>;

type BadgeVariant = 'info' | 'destructive';

type BadgeProps = Omit<TextProps, '$variant'> & {
    /**
     * "info" | "destructive" - Defaults to 'destructive'
     */
    variant?: BadgeVariant;
    /**
     * The maximum count to display. If the count is greater than the maxCount, it will display "{maxCount}+".
     */
    maxCount?: number;
    /**
     * Defaults to "caption2"
     */
    textVariant?: TextProps['$variant'];
    containerClassName?: string;
};

/**
 * Positioning is relative to its parent.
 * @example With a count
 * <View>
      <Icon name="bell-outline" />
      <Badge maxCount={9}>6</Badge>
   </View>
 * @example Without a count
 * <View>
      <Icon name="bell-outline" />
      <Badge variant="info" />
   </View>
 */
export function Badge({
    variant = 'destructive',
    className,
    textVariant = 'caption2',
    children,
    maxCount,
    ...props
}: BadgeProps) {
    return (
        <View
            accessibilityLabel={children ? `Badge with count ${getCount(children, maxCount)}` : 'Badge indicator'}
            accessibilityRole="text"
            className={cn(
                variant === 'info' ? 'bg-primary' : variant === 'destructive' ? 'bg-destructive' : '',
                'absolute z-50 items-center justify-center rounded-full text-center',
                !children
                    ? 'ios:-right-px -right-0.5 top-0 h-2.5 w-2.5'
                    : 'ios:-right-1 -right-1.5 -top-0.5 min-w-4 px-1',
            )}
            style={BORDER_CURVE}>
            <Text $variant={textVariant} className={cn('font-extrabold text-white', className)} {...props}>
                {getCount(children, maxCount)}
            </Text>
        </View>
    );
}

function getCount(count: React.ReactNode, maxCount?: number) {
    if (maxCount === undefined) {
        return count;
    }
    if (typeof count !== 'string' && typeof count !== 'number') {
        return count;
    }
    // Check that the count string is a number
    if (typeof count === 'string' && !/^\d+$/.test(count.trim())) {
        return count;
    }

    const countNumber = typeof count === 'number' ? count : parseInt(count.trim(), 10);
    if (Number.isNaN(countNumber)) {
        return count;
    }

    return countNumber <= maxCount ? count : `${maxCount}+`;
}
