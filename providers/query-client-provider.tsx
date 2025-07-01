import { useReactQueryDevTools } from '@dev-plugins/react-query';

import { QueryErrorBoundary } from '#/components/ui/error-boundary.tsx';
import { QueryClientProvider as ReactQueryClientProvider, queryClient } from '#/utils/query.ts';

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
    useReactQueryDevTools(queryClient);

    return (
        <ReactQueryClientProvider client={queryClient}>
            <QueryErrorBoundary>{children}</QueryErrorBoundary>
        </ReactQueryClientProvider>
    );
}
