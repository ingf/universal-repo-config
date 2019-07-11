module.exports = {
  extends: ['airbnb', 'prettier', 'plugin:sonarjs/recommended'],
  plugins: ['prettier', 'sonarjs'],
  settings: {
    react: {
      version: 'detect' // React version. "detect" automatically picks the version you have installed.
    }
  },
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'es5'
      }
    ],
    // 一个函数的复杂性不超过 10，所有分支、循环、回调加在一起，在一个函数里不超过 10 个
    complexity: [2, 10],
    // 一个函数的嵌套不能超过 4 层，多个 for 循环，深层的 if-else，都是罪恶之源
    'max-depth': [2, 4],
    // 一个函数最多有 3 层 callback，使用 async/await
    'max-nested-callbacks': [2, 3],
    // 一个文件的最大行数
    'max-lines': ['error', { max: 400 }],
    // 一个函数最多 5 个参数。参数太多的函数，意味着函数功能过于复杂，请拆分
    'max-params': [2, 5],
    // 一个函数最多有 10 个变量，如果超过了，请拆分之，或者精简之
    'max-statements': [2, 15],
    // 坚定的 semicolon-less 拥护者
    semi: [2, 'never'],
    'class-methods-use-this': 0,
    'no-console': 2,
    'no-debugger': 2,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to']
      }
    ],
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          some: ['nesting', 'id']
        },
        allowChildren: false
      }
    ],
    'arrow-parens': 0,
    'arrow-body-style': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/display-name': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/forbid-prop-types': [
      1,
      {
        forbid: [],
        checkContextTypes: false,
        checkChildContextTypes: false
      }
    ],
    'react/destructuring-assignment': 0,
    'react/prop-types': 0,
    'react/prefer-stateless-function': 0,
    // "react/require-default-props": 0,
    'sonarjs/no-duplicate-string': 0,
    'sonarjs/cognitive-complexity': 0
  }
};
