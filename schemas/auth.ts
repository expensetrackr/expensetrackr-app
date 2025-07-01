import * as z from 'zod/v4';

export const LoginSchema = z.object({
    email: z.email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const LoginValidationErrorSchema = z.object({
    email: z.array(z.string()).optional(),
    password: z.array(z.string()).optional(),
});

export const RegisterSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirm_password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const RegisterValidationErrorSchema = z.object({
    name: z.array(z.string()).optional(),
    email: z.array(z.string()).optional(),
    password: z.array(z.string()).optional(),
    confirm_password: z.array(z.string()).optional(),
});
