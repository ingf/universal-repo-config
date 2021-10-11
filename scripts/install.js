/*
 * @Description: 
 * @Author: webtc
 * @Date: 2021-09-18 09:59:41
 * @LastEditors: webtc
 * @LastEditTime: 2021-10-11 22:24:03
 */
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')

;(async () => {
  const packagePath = path.join(process.cwd(), '../../package.json')
  const package = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
  if (package.devDependencies['universal-repo-config']) {
    return
  }
  const projectDir = path.join(process.cwd(), '../..')

  let answers = await inquirer.prompt([
    {
      name: 'type',
      type: 'list',
      message: 'Please choose a language to use',
      choices: [
        { name: 'React+JavaScript', value: 'react-js' },
        { name: 'React+TypeScript', value: 'react-ts' },
        { name: 'Vue+TypeScript', value: ['vue', 'ts'] },
        { name: 'Vue+JavaScript', value: 'vue,js' },
        { name: 'Node+TypeScript', value: 'node-ts' },
        { name: 'JavaScript', value: 'js' },
      ],
    },
  ])
  if (answers.type[0] == 'vue') {
    const suffix = answers.type[1]
    answers = await inquirer.prompt([
      {
        name: 'type',
        type: 'list',
        message: 'Please choose vue version',
        choices: [
          { name: 'vue2.x', value: `vue-${suffix}` },
          { name: 'vue3.x', value: `vue3-${suffix}` },
        ],
      },
    ])
  }

  const fileList = [
    '.eslintrc.js',
    '.prettierrc.js',
    '.stylelintrc.js',
    '.gitignore',
    '.editorconfig',
  ]

  const appendFile = (src, dist) => {
    fs.readFile(dist, 'utf8', function(err, result) {
      if (err || !result) {
        fs.writeFileSync(dist, fs.readFileSync(src))
        return
      }
      const comment = dist.indexOf('.js') > -1 ? '//' : '#'
      const lines = result.split(/\n/)
      const content = lines
        .map(function(line) {
          return comment + line
        })
        .join('\n')
      const currentContent = fs.readFileSync(src, 'utf8')
      fs.writeFile(dist, content + '\n\n' + currentContent, 'utf8', function(
        err
      ) {
        if (err) throw err
        console.log(dist + ' has been saved!')
      })
    })
  }

  fileList.map(fileName => {
    const src = path.join(
      __dirname,
      '../template/',
      `./${answers.type}/${fileName}-tpl`
    )
    const dist = `${projectDir}/${fileName}`
    appendFile(src, dist)
  })
})()
