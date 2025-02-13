const globals = require("globals");
const path = require("node:path");
const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = [
    ...compat.extends("eslint:recommended"),
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
            ecmaVersion: 12,
            sourceType: "commonjs",
        },
        rules: {
            "no-unused-vars": "off",
            "no-console": "off",
            "quotes": ["error", "double"],
            "semi": ["error", "always"],
        },
    },
];
