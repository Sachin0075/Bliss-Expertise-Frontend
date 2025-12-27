const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");
const jsxA11y = require("eslint-plugin-jsx-a11y");
const eslintComments = require("eslint-plugin-eslint-comments");
const prettier = require("eslint-plugin-prettier");
const globals = require("globals");

module.exports = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2025,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": tseslint,
      import: importPlugin,
      "jsx-a11y": jsxA11y,
      "eslint-comments": eslintComments,
      prettier,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      // === YOUR RULES (UNCHANGED) ===
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-var-requires": "off",

      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",

      "@typescript-eslint/explicit-module-boundary-types": "off",

      "prettier/prettier": "error",
    },
  },
];
