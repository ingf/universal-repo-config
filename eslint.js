module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    '@vue/prettier',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
    // 一个函数的复杂性不超过 6，所有分支、循环、回调加在一起，在一个函数里不超过 6 个
    complexity: [2, 6],
    // 一个函数的嵌套不能超过 3 层，多个 for 循环，深层的 if-else，都是罪恶之源
    'max-depth': [2, 3],
    // 一个函数最多有 2 层 callback，使用 async/await
    'max-nested-callbacks': [2, 2],
    // 一个文件的最大行数
    'max-lines': ['error', { max: 500 }],
    // 一个函数最多 4 个参数。参数太多的函数，意味着函数功能过于复杂，请拆分
    'max-params': [2, 4],
    // 一个函数最多有 8 个变量，如果超过了，请拆分之，或者精简之
    'max-statements': [2, 8],
    semi: [2, 'never'],
  },
}
