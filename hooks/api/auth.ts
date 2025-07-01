import { useMutation, UseMutationResult } from '@tanstack/react-query';
import * as z from 'zod/v4';

import { $fetch } from '#/lib/fetch.ts';
import { ApiErrorSchema, AuthValidationErrorSchema, LoginSchema } from '#/schemas/auth.ts';

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
                const apiErrorResult = ApiErrorSchema.safeParse(response.error);

                if (apiErrorResult.success && apiErrorResult.data.status === 422) {
                    const validationErrorResult = AuthValidationErrorSchema.safeParse(response.error);

                    if (validationErrorResult.success) {
                        const errorData = validationErrorResult.data;
                        const message =
                            errorData.errors?.email?.[0] || errorData.errors?.password?.[0] || 'Invalid credentials';
                        throw new Error(message);
                    }

                    throw new Error('Invalid credentials');
                }

                if (apiErrorResult.success) {
                    throw new Error(`Login failed: ${apiErrorResult.data.status} ${apiErrorResult.data.statusText}`);
                }

                throw new Error('Login failed: Unknown error');
            }

            return response.data;
        },
    });
}
