import * as z from 'zod/v4';

import { $fetch } from '#/lib/fetch.ts';
import { LoginSchema } from '#/schemas/auth.ts';

export async function signIn(input: z.infer<typeof LoginSchema>) {
    try {
        console.info('Attempting to sign in with:', { input });
        console.info('API URL:', process.env.EXPO_PUBLIC_API_URL);

        const response = await $fetch<string, { email?: string[]; password?: string[] }>('@post/auth/login', {
            body: {
                ...input,
                device_name: 'mobile-app',
            },
        });

        console.info('Sign in response:', response);

        if (response.error?.status === 422) {
            return {
                error: {
                    message: response.error.email?.[0] ?? response.error.password?.[0],
                },
            };
        }

        return response;
    } catch (error) {
        console.error('Network request failed:', error);
        throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
    }
}
