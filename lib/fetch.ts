import { createFetch, createSchema } from '@better-fetch/fetch';
import * as SecureStore from 'expo-secure-store';
import * as z from 'zod/v4';

import { LoginSchema, RegisterSchema } from '#/schemas/auth.ts';

export const schema = createSchema({
    '@post/auth/login': {
        input: LoginSchema,
        output: z.string(),
    },
    '@post/auth/register': {
        input: RegisterSchema,
        output: z.string(),
    },
});

export const $fetch = createFetch({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    auth: {
        type: 'Bearer',
        async token() {
            const session = await SecureStore.getItemAsync('session');

            return session ?? undefined;
        },
    },
    schema,
});
