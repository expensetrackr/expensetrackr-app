import { Href, Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };

function isValidHttpUrl(urlString: string): boolean {
    try {
        const url = new URL(urlString);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

export function ExternalLink({ href, ...rest }: Props) {
    const handlePress = (event: any) => {
        if (Platform.OS !== 'web') {
            // Prevent the default behavior of linking to the default browser on native.
            event.preventDefault();
            
            // Validate URL before opening
            if (!isValidHttpUrl(href)) {
                console.warn('ExternalLink: Invalid or unsafe URL provided:', href);
                return;
            }
            
            // Open the link in an in-app browser.
            openBrowserAsync(href).catch((error: unknown) => {
                console.error('ExternalLink: Failed to open URL:', error);
            });
        }
    };

    return (
        <Link
            target="_blank"
            {...rest}
            href={href}
            onPress={handlePress}
        />
    );
}
