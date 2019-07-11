const fs = require('fs')
const path = require('path')

const projectDir = path.join(process.cwd(), '../..')
const eslintTxt = path.join(__dirname, '../eslint.js')
const prettierTxt = path.join(__dirname, '../prettier.js')
const stylelintTxt = path.join(__dirname, '../stylelint.js')

console.log(eslintTxt)
/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(path) {
  return new Promise(resolve => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false)
      } else {
        resolve(stats)
      }
    })
  })
}

const copyFile = (src, dist) => {
  fs.writeFileSync(dist, fs.readFileSync(src))
}

copyFile(eslintTxt, `${projectDir}/.eslintrc.js`)
copyFile(prettierTxt, `${projectDir}/.prettierrc.js`)
copyFile(stylelintTxt, `${projectDir}/.stylelintrc.js`)
