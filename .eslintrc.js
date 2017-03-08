module.exports = {
  'extends': 'standard',
  'plugins': [
    'standard',
    'promise'
  ],
  'globals': {
    'io': true,
    'moment': true,
    'Mustache': true
  },
  'env': {
    'node': true,
    'mocha': true,
    'browser': true,
    'jquery': true,
  },
  'extends': ['standard', 'standard-react'],
  'parserOptions': {
    'ecmaVersion': 7,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'parser': 'babel-eslint',
  'rules': {
    'indent': 2,
    'semi': 2,
    'quotes': 2,
    'comma-dangle': 0,
    'space-before-function-paren': 0,
    'spaced-comment': 0,
    'jsx-quotes': 0,
    'standard/object-curly-even-spacing': [2, 'either'],
    'standard/array-bracket-even-spacing': [2, 'either'],
    'standard/computed-property-even-spacing': [2, 'even']
  }
}
