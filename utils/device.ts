import * as Application from 'expo-application';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

interface DeviceInfo {
    platform: string;
    osVersion: string;
    appVersion: string;
    deviceModel?: string;
    deviceName?: string;
}

/**
 * Generates a dynamic device name for authentication and session management
 * @param customName - Optional custom device name
 * @returns Formatted device name string
 */
export async function generateDeviceName(customName?: string): Promise<string> {
    if (customName) {
        return customName;
    }

    try {
        const deviceInfo: DeviceInfo = {
            platform: Platform.OS,
            osVersion: Platform.Version.toString(),
            appVersion: Application.nativeApplicationVersion || 'unknown',
            deviceModel: Device.modelName || 'unknown',
            deviceName: Device.deviceName || undefined,
        };

        const parts = [
            'ExpenseTrackr',
            deviceInfo.platform === 'ios' ? 'iOS' : 'Android',
            deviceInfo.deviceModel !== 'unknown' ? deviceInfo.deviceModel : undefined,
            `v${deviceInfo.appVersion}`,
        ].filter(Boolean);

        return parts.join(' ');
    } catch (error) {
        console.warn('Failed to generate device name:', error);
        return 'ExpenseTrackr Mobile';
    }
}

/**
 * Generates a simple device name without async dependencies
 * @param customName - Optional custom device name
 * @returns Formatted device name string
 */
export function generateSimpleDeviceName(customName?: string): string {
    if (customName) {
        return customName;
    }

    const platform = Platform.OS === 'ios' ? 'iOS' : 'Android';
    return `ExpenseTrackr ${platform}`;
}
