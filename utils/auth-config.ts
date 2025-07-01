import { generateDeviceName } from './device.ts';

/**
 * Authentication configuration options
 */
export interface AuthConfig {
    customDeviceName?: string;
}

/**
 * Default authentication configuration
 */
export const defaultAuthConfig: AuthConfig = {};

/**
 * Development authentication configuration
 */
export const devAuthConfig: AuthConfig = {
    customDeviceName: 'ExpenseTrackr-Dev',
};

/**
 * Production authentication configuration
 */
export const prodAuthConfig: AuthConfig = {};

/**
 * Gets the appropriate auth configuration based on environment
 */
export function getAuthConfig(): AuthConfig {
    const isDevelopment = __DEV__;
    return isDevelopment ? devAuthConfig : prodAuthConfig;
}

/**
 * Gets the configured device name for authentication (async for detailed device info)
 */
export async function getConfiguredDeviceName(customName?: string): Promise<string> {
    const config = getAuthConfig();
    const deviceName = customName || config.customDeviceName;

    return generateDeviceName(deviceName);
}
