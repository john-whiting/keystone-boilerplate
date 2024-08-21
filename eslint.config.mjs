import { fixupPluginRules } from "@eslint/compat";
import jseslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import eslintImport from "eslint-plugin-import";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  jseslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    // Style Config
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/array-bracket-spacing": [ "error", "always" ],
      "@stylistic/arrow-parens": [ "error", "always" ],
      "@stylistic/brace-style": [ "error", "1tbs", { allowSingleLine: true } ],
      "@stylistic/comma-dangle": [ "error", "always-multiline" ],
      "@stylistic/indent": [ "error", 2 ],
      "@stylistic/jsx-one-expression-per-line": [ "off" ],
      "@stylistic/jsx-tag-spacing": [ "error", {
        beforeClosing: "never",
        beforeSelfClosing: "never",
      } ],
      "@stylistic/max-statements-per-line": [ "error", { max: 1 } ],
      "@stylistic/member-delimiter-style": [ "error", {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: true,
        },
        multilineDetection: "brackets",
      } ],
      "@stylistic/no-multiple-empty-lines": [ "error", {
        max: 5,
        maxEOF: 1,
        maxBOF: 0,
      } ],
      "@stylistic/operator-linebreak": [ "error", "after" ],
      "@stylistic/quotes": [ "error", "double" ],
      "@stylistic/semi": [ "error", "always" ],
    },
  },
  {
    plugins: {
      import: fixupPluginRules(eslintImport),
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      // Import Rules
      "import/consistent-type-specifier-style": [ "error", "prefer-top-level" ],
      "import/first": [ "error" ],
      "import/newline-after-import": [ "warn", { count: 2 } ],
      "import/no-absolute-path": [ "error" ],
      "import/no-mutable-exports": [ "error" ],
      "import/no-useless-path-segments": [ "error" ],
      "import/order": [ "error", {
        "newlines-between": "always",
        "alphabetize": {
          order: "asc",
          orderImportKind: "asc",
          caseInsensitive: true,
        },
      } ],
    },
  },
  {
    ignores: [ ".keystone" ],
  },
];