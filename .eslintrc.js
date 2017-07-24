module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  extends: 'rtablada',
  env: {
    node: true
  },
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "no-underscore-dangle": ["error", { "allow": ["_super"] }]
  }
};
