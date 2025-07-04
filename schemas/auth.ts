import * as z from 'zod/v4';

const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character');

export const LoginSchema = z.object({
    email: z.email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    device_name: z.string().optional(),
});

export const LoginValidationErrorSchema = z.object({
    email: z.array(z.string()).optional(),
    password: z.array(z.string()).optional(),
});

export const RegisterSchema = z
    .object({
        name: z.string().min(1, 'Name is required'),
        email: z.email('Please enter a valid email address'),
        password: passwordSchema,
        confirm_password: z.string().min(8, 'Password must be at least 8 characters long'),
        device_name: z.string().optional(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: 'Passwords do not match',
        path: ['confirm_password'],
    });

export const RegisterValidationErrorSchema = z.object({
    name: z.array(z.string()).optional(),
    email: z.array(z.string()).optional(),
    password: z.array(z.string()).optional(),
    confirm_password: z.array(z.string()).optional(),
});
