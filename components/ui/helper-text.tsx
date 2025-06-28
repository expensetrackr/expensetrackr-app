import { AnimatePresence, MotiView } from 'moti';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { cn } from '#/utils/cn.ts';
import { Text } from './text.tsx';

interface HelperTextProps {
    /**
     * The error message to display. If empty/null/undefined, the helper text will be hidden
     */
    error?: string | null;
    /**
     * Custom styling for the helper text
     */
    className?: string;
    /**
     * Animation duration in milliseconds
     */
    duration?: number;
}

export function HelperText({ error, className, duration = 300 }: HelperTextProps) {
    const hasError = error && error.trim().length > 0;

    return (
        <AnimatePresence>
            {hasError && (
                <MotiView
                    animate={{
                        height: 24,
                        opacity: 1,
                    }}
                    exit={{
                        height: 0,
                        opacity: 0,
                    }}
                    from={{
                        height: 0,
                        opacity: 0,
                    }}
                    key="helper-text"
                    style={styles.container}
                    transition={{
                        type: 'spring',
                        damping: 15,
                        stiffness: 150,
                        opacity: {
                            type: 'timing',
                            duration,
                        },
                    }}>
                    <Text className={cn('text-xs text-destructive', className)} style={styles.text}>
                        {error}
                    </Text>
                </MotiView>
            )}
        </AnimatePresence>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        paddingHorizontal: 4,
    },
    text: {
        lineHeight: 16,
        paddingTop: 4,
    },
});
