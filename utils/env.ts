// Environment configuration and validation
export const ENV_CONFIG = {
    API_URL: 'https://api.expensetrackr.app', // Default API URL
    IS_DEV: true, // Will be replaced by build process
    VERSION: '1.0.0',
} as const;

export function getApiUrl(): string {
    // In a real app, this would come from environment variables
    // For now, using the default from ENV_CONFIG
    return ENV_CONFIG.API_URL;
}

export function isDevelopment(): boolean {
    return ENV_CONFIG.IS_DEV;
}

export function isProduction(): boolean {
    return !ENV_CONFIG.IS_DEV;
}

export function getAppVersion(): string {
    return ENV_CONFIG.VERSION;
}

// Validation function to ensure required config is present
export function validateEnvironment(): void {
    if (!ENV_CONFIG.API_URL) {
        throw new Error('API_URL is required but not configured');
    }
    
    if (!ENV_CONFIG.VERSION) {
        throw new Error('VERSION is required but not configured');
    }
}

// Initialize validation on module load
validateEnvironment();