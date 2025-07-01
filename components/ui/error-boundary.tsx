import { QueryErrorResetBoundary } from '@tanstack/react-query';
import React from 'react';
import { View } from 'react-native';

import { Button } from './button.tsx';
import { Text } from './text.tsx';

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ComponentType<ErrorFallbackProps>;
}

interface ErrorFallbackProps {
    error: Error;
    resetError: () => void;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to monitoring service (e.g., Sentry)
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError && this.state.error) {
            const FallbackComponent = this.props.fallback || DefaultErrorFallback;
            return (
                <FallbackComponent
                    error={this.state.error}
                    resetError={() => this.setState({ hasError: false, error: null })}
                />
            );
        }

        return this.props.children;
    }
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
    return (
        <View className="flex-1 items-center justify-center bg-background p-6">
            <Text className="mb-2 text-xl font-semibold text-foreground">Something went wrong</Text>
            <Text className="mb-6 text-center text-muted-foreground">
                {error.message || 'An unexpected error occurred. Please try again.'}
            </Text>
            <Button className="px-6" onPress={resetError}>
                <Text>Try Again</Text>
            </Button>
        </View>
    );
}

export function QueryErrorBoundary({ children }: { children: React.ReactNode }) {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary
                    fallback={({ error, resetError }) => (
                        <DefaultErrorFallback
                            error={error}
                            resetError={() => {
                                reset();
                                resetError();
                            }}
                        />
                    )}>
                    {children}
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
}
