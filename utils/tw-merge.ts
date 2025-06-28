import { extendTailwindMerge } from 'tailwind-merge';

import { borderRadii, shadows, texts } from './alignui';

export const twMergeConfig = {
    extend: {
        classGroups: {
            'font-size': [
                {
                    text: Object.keys(texts),
                },
            ],
            shadow: [
                {
                    shadow: Object.keys(shadows),
                },
            ],
            rounded: [
                {
                    rounded: Object.keys(borderRadii),
                },
            ],
        },
    },
};

export const twMerge = extendTailwindMerge(twMergeConfig);
