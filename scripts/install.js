#!/usr/bin/env node

/*
 * @Description:
 * @Author: webtc
 * @Date: 2021-09-18 09:59:41
 * @LastEditors: webtc
 * @LastEditTime: 2021-10-11 22:24:03
 */
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

console.log("install universal-repo-config");
const packagePath = path.join(process.cwd(), "../../package.json");
const package = JSON.parse(fs.readFileSync(packagePath, "utf8"));
console.log(
  `package.devDependencies: ${package.devDependencies["universal-repo-config"]}`
);
if (package.devDependencies["universal-repo-config"]) {
  return;
}
console.log("start prompt");
inquirer
  .prompt([
    {
      name: "type",
      type: "list",
      message: "Please choose a language to use",
      choices: [
        { name: "React+JavaScript", value: "react-js" },
        { name: "React+TypeScript", value: "react-ts" },
        { name: "Vue+JavaScript", value: ["vue-js"] },
        { name: "Vue3+JavaScript", value: "vue3-jsjs" },
        { name: "Vue+TypeScript", value: ["vue-ts"] },
        { name: "Vue3+TypeScript", value: "vue3-ts" },
        { name: "TypeScript", value: "typescript" },
        { name: "JavaScript", value: "javascript" },
      ],
    },
  ])
  .then((answers) => {
    const projectDir = path.join(process.cwd());

    const fileList = [
      ".eslintrc.js",
      ".prettierrc.js",
      ".stylelintrc.js",
      ".gitignore",
      ".editorconfig",
    ];
    fileList.map((fileName) => {
      const src = path.join(
        __dirname,
        "../template/",
        `./${answers.type}/${fileName}-tpl`
      );
      const dist = `${projectDir}/${fileName}`;
      appendFile(src, dist);
    });
  });

const appendFile = (src, dist) => {
  fs.readFile(dist, "utf8", function (err, result) {
    if (err || !result) {
      fs.writeFileSync(dist, fs.readFileSync(src));
      return;
    }
    const comment = dist.indexOf(".js") > -1 ? "//" : "#";
    const lines = result.split(/\n/);
    const content = lines
      .map(function (line) {
        return comment + line;
      })
      .join("\n");
    const currentContent = fs.readFileSync(src, "utf8");
    fs.writeFile(
      dist,
      content + "\n\n" + currentContent,
      "utf8",
      function (err) {
        if (err) throw err;
        console.log(dist + " has been saved!");
      }
    );
  });
};
