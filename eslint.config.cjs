module.exports = [
  {
    ignores: ["node_modules/**", ".next/**"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx,md,mdx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    linterOptions: {
      reportUnusedDisableDirectives: false,
    },
    extends: ["next/core-web-vitals", "eslint:recommended"],
    rules: {
      "react/react-in-jsx-scope": "off"
    }
  }
];
