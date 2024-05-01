module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "semi": ["error", "never"], // Proibir ponto e vírgula
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }], // Máximo de uma linha vazia
    "@typescript-eslint/no-explicit-any": "off" // Permitir any
  },
}
