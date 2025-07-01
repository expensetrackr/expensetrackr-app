import { useReactQueryDevTools } from '@dev-plugins/react-query';

import { QueryClientProvider as ReactQueryClientProvider, queryClient } from '#/utils/query.ts';

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
    useReactQueryDevTools(queryClient);

    return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>;
}
