import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import boundariesPlugin from "eslint-plugin-boundaries";
import importPlugin from "eslint-plugin-import";
import vue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist", "node_modules", ".env*"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
  //JS/TS
  {
    files: ["**/*.{js,ts}"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        sourceType: "module",
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  vue.configs['flat/recommended'],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
  {
    files: ["**/*.{js,ts,vue}"],
    rules: {
      "no-extra-semi": "error",
      "no-unexpected-multiline": "error",
      "no-unreachable": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }],

      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "no-var": "error",
      "prefer-const": "error",
      "eqeqeq": ["error", "always"],
      "no-duplicate-imports": "error",

      // TypeScript
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",

      // Imports
      "import/order": ["error", {
        "groups": [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index"
        ],
        "newlines-between": "always",
        "alphabetize": { "order": "asc" }
      }],
      "import/no-duplicates": "error",
      "import/newline-after-import": "error",

      // Vue
      "vue/component-name-in-template-casing": ["error", "PascalCase"],
      "vue/require-default-prop": "off",
      "vue/no-v-html": "warn",
    },
  },
  // Architect rules
  {
    files: ["src/**/*.{js,ts,vue}"],
    ignores: [
      "*.config.js",
      "*.config.ts",
      "vite.config.*",
      "eslint.config.*",
    ],
    plugins: {
      boundaries: boundariesPlugin,
    },
    settings: {
      "boundaries/include": ["src/**/*"],
      "boundaries/ignore": [
        "**/*.spec.ts",
        "**/*.test.ts",
        "**/__tests__/**",
        "**/node_modules/**",
      ],
      "boundaries/elements": [
        {
          "type": "app",
          "pattern": "src/app/([^/]+)/**",
          "mode": "full",
        },
        {
          "type": "features",
          "pattern": "src/features/([^/]+)/**",
          "capture": ["featureName"],
          "mode": "full",
        },
        {
          "type": "shared",
          "pattern": [
            "src/api/**/*",
            "src/assets/**/*",
            "src/components/**/*",
            "src/constants/**/*",
            "src/store/**/*",
            "src/styles/**/*",
            "src/utils/**/*"
          ],
          "mode": "full",
        }
      ]
    },
    rules: {
      "boundaries/no-unknown": ["error"],
      "boundaries/no-unknown-files": ["error"],
      "boundaries/element-types": [
        "error",
        {
          "default": "disallow",
          "rules": [
            {
              "from": ["shared"],
              "allow": ["shared"]
            },
            {
              "from": ["features"],
              "allow": [
                "shared",
                ["features", { "featureName": "${from.featureName}" }]
              ]
            },
            {
              "from": ["app"],
              "allow": ["shared", "features", "app"]
            }
          ]
        }
      ]
    }
  },
  prettier,
);