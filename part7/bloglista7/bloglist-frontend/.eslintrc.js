module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'commonjs': true,
    'es2021': true,
    'cypress/globals': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react', 'jest', 'cypress'
  ],
  'rules': {
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'indent': [
      'warn',
      2
    ],
    'linebreak-style': [
      'warn',
      'windows'
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'semi': [
      'warn',
      'never'
    ],
    'eqeqeq': 'warn',
    'no-trailing-spaces': 'warn',
    'object-curly-spacing': [
      'warn', 'always'
    ],
    'arrow-spacing': [
      'warn', { 'before': true, 'after': true }
    ],
    'no-console': 0,
    'no-unused-vars': 'warn',
    'react/prop-types': 'warn',


  },

}