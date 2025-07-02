// https://docs.expo.dev/guides/using-eslint/
// const { config: epicWebConfig } = require('@epic-web/config/eslint');
import expoConfig from 'eslint-config-expo/flat.js';
import prettierConfig from 'eslint-config-prettier/flat';

/** @type {import("eslint").Linter.Config[]} */
export default [
    ...expoConfig,
    prettierConfig,
    {
        files: ['**/*.tsx', '**/*.jsx'],
        rules: {
            // Import rules
            'import/extensions': ['warn', 'ignorePackages'],
            'import/order': [
                'warn',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            'import/no-unused-modules': 'warn',

            // React rules
            'react/jsx-sort-props': ['warn', { callbacksLast: true, shorthandFirst: true }],
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off', // Using TypeScript instead
            'react/jsx-no-leaked-render': 'warn',
            'react/jsx-key': 'error',
            'react/no-array-index-key': 'warn',

            // General code quality
            'prefer-const': 'error',
            'no-var': 'error',
            'no-unused-vars': 'off', // Using TypeScript instead
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            eqeqeq: ['error', 'always'],
            curly: ['error', 'all'],
        },
    },
    {
        files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
        rules: {
            // Test file specific rules
            'no-console': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    {
        ignores: ['dist/*', 'build/*', '.expo/*', 'node_modules/*', 'coverage/*', '*.config.js', '*.config.mjs'],
    },
];
