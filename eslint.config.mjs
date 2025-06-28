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
            'import/extensions': ['warn', 'ignorePackages'],
            'react/jsx-sort-props': 'warn',
            'react/react-in-jsx-scope': 'off',
        },
    },
    {
        ignores: ['dist/*'],
    },
];
