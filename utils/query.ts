import { QueryClient } from '@tanstack/react-query';
export { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
            // gcTime needs to be _higher_ than maxAge in any persisted clients
            // see https://tanstack.com/query/v5/docs/react/plugins/persistQueryClient
            gcTime: 1000 * 60 * 60, // 1 hour
            throwOnError: false, // Don't throw errors by default to prevent crashes
            retry: (failureCount, error) => {
                if (failureCount >= 3) {
                    return false;
                }

                // Don't retry on certain error types
                if (error instanceof Error && error.message.indexOf('401') !== -1) {
                    return false; // Don't retry authentication errors
                }

                return true;
            },
        },
        mutations: {
            throwOnError: false, // Don't throw errors by default for mutations
            retry: false, // Don't retry mutations by default
        },
    },
});
