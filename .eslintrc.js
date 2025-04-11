module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "@babel/eslint-parser",
  extends: ["standard", "plugin:prettier/recommended"],
  rules: {
    semi: [2, "always"],
    indent: [2, 2],
    "no-tabs": 2,
    "no-console": "off",
    "eol-last": ["error", "always"]
  },
};
