import * as z from 'zod/v4';

export const LoginSchema = z.object({
    email: z.email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const AuthValidationErrorSchema = z.object({
    errors: z
        .object({
            email: z.array(z.string()).optional(),
            password: z.array(z.string()).optional(),
        })
        .optional(),
});

export const ApiErrorSchema = z.object({
    status: z.number(),
    statusText: z.string(),
});
