// eslint.config.js
module.exports = [
  {
    ignores: ["node_modules", "dist"], // Ignore unnecessary files
  },
  {
    languageOptions: {
      ecmaVersion: "latest", // Use the latest ECMAScript version
      sourceType: "commonjs", // Since your project uses CommonJS
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      "no-console": "off", // Allows console.log
      "indent": ["error", 2], // Enforce 2-space indentation
      "quotes": ["error", "double"], // Enforce double quotes
      "semi": ["error", "always"], // Require semicolons
    },
  },
];
