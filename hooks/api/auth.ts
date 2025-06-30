import { useMutation, UseMutationResult } from '@tanstack/react-query';
import * as z from 'zod/v4';

import { $fetch } from '#/lib/fetch.ts';
import { LoginSchema } from '#/schemas/auth.ts';

export function useLogin(): UseMutationResult<string, Error, z.infer<typeof LoginSchema>> {
    return useMutation({
        mutationFn: async (values: z.infer<typeof LoginSchema>) => {
            const response = await $fetch('@post/auth/login', {
                body: {
                    ...values,
                    device_name: 'mobile-app',
                },
            });

            if (response.error) {
                const errorData = response.error as { errors?: { email?: string[]; password?: string[] } };

                if (response.error.status === 422) {
                    const message =
                        errorData.errors?.email?.[0] || errorData.errors?.password?.[0] || 'Invalid credentials';
                    throw new Error(message);
                }

                throw new Error(`Login failed: ${response.error.status} ${response.error.statusText}`);
            }

            return response.data;
        },
    });
}
