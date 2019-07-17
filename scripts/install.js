const fs = require('fs')
const path = require('path')

const projectDir = path.join(process.cwd(), '../..')
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
    fs.writeFile(dist, content + '\n\n' + currentContent, 'utf8', function(err) {
      if (err) throw err
      console.log('The file has been saved!')
    })
  })
}

fileList.map(fileName=>{
  const src = path.join(__dirname, '../template/', `${fileName}-tpl`)
  const dist = `${projectDir}/${fileName}`
  appendFile(src, dist)
})
