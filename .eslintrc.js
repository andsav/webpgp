module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  "parser": "babel-eslint",
  'extends': ['plugin:react/recommended', 'standard'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'react/jsx-uses-vars': 1,
    'react/react-in-jsx-scope': 1,
    'react/jsx-uses-react': 1,
    'react/prop-types': 0,
    'standard/no-callback-literal': 0,
    'react/no-string-refs': 0
  }
}
