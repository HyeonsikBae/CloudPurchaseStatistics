module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  env: {
    browser: true,
    es2021: true,
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/explicit-function-return-type": 1,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "react/button-has-type": 0,
    "react/jsx-filename-extension": 0,
    "no-shadow": 0,
    "import/no-extraneous-dependencies": 0,
    "no-restricted-globals": 0,
    "no-plusplus": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "react/function-component-definition": 0,
    "import/no-unresolved": "off",
    "no-use-before-define": 0,
    "no-await-in-loop": 0,
    "import/extensions": [
      "off",
      "always",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
      },
    },
  },
};
