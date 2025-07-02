import { useMutation, UseMutationResult } from '@tanstack/react-query';
import * as z from 'zod/v4';

import { $fetch } from '#/lib/fetch.ts';
import {
    LoginSchema,
    LoginValidationErrorSchema,
    RegisterSchema,
    RegisterValidationErrorSchema,
} from '#/schemas/auth.ts';
import { getConfiguredDeviceName } from '#/utils/auth-config.ts';

export function useLogin(): UseMutationResult<string, Error, z.infer<typeof LoginSchema>> {
    return useMutation({
        mutationFn: async (values: z.infer<typeof LoginSchema>) => {
            const response = await $fetch('@post/auth/login', {
                body: {
                    ...values,
                    device_name: await getConfiguredDeviceName(),
                },
            });

            if (response.error) {
                const validationErrorResult = LoginValidationErrorSchema.safeParse(response.error);

                if (validationErrorResult.success) {
                    const errorData = validationErrorResult.data;
                    const message = errorData.email?.[0] || errorData.password?.[0] || 'Invalid credentials';
                    throw new Error(`Login failed: ${message}`);
                }

                throw new Error('Login failed');
            }

            return response.data;
        },
    });
}

export function useRegister(): UseMutationResult<string, Error, z.infer<typeof RegisterSchema>> {
    return useMutation({
        mutationFn: async (values: z.infer<typeof RegisterSchema>) => {
            const response = await $fetch('@post/auth/register', {
                body: values,
            });

            if (response.error) {
                const validationErrorResult = RegisterValidationErrorSchema.safeParse(response.error);

                if (validationErrorResult.success) {
                    const errorData = validationErrorResult.data;
                    const message =
                        errorData.name?.[0] ||
                        errorData.email?.[0] ||
                        errorData.password?.[0] ||
                        errorData.confirm_password?.[0] ||
                        'Unknown error';
                    throw new Error(`Register failed: ${message}`);
                }

                throw new Error('Register failed: Unknown error');
            }

            return response.data;
        },
    });
}
