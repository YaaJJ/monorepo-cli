#!/usr/bin/env node

const program = require('commander')
const ora = require('ora')
const { showTable } = require(`${__dirname}/../util/showTable`)
const templateList = require(`${__dirname}/../template`)
const symbols = require('log-symbols')
const chalk = require('chalk')
const execSync = require('child_process').execSync;
const path = require('path');
const fs = require('fs')
const rimraf = require('rimraf');
const fsMove = require('fs-extra');
chalk.level = 1

program
  .usage('<template-name> [project-name]')
program.parse(process.argv)
// 当没有输入参数的时候给个提示
if (program.args.length < 1) return program.help()

// 第一个参数是 模板里面的 name，第二个参数是 project-name
let templateName = program.args[0]
let projectName = program.args[1]

if (!templateList[templateName]) {
  console.log(chalk.red('\n Template does not exit! \n '))
  return
}
if (!projectName) {
  console.log(chalk.red('\n Project should not be empty! \n '))
  return
}
let url = templateList[templateName]
console.log(url)

console.log(chalk.green('\n Start generating... \n'))
// 出现加载图标
const spinner = ora("Downloading...");
spinner.start();

function downloadTemplate(url, projectName) {
  const gitCloneDir = path.resolve(__dirname, '..', projectName + 1);
  const gitSparseDir = 'packages/create-vite/template-vue'; // 替换为您需要的目录或文件的路径
  console.log(`${gitCloneDir}/packages/create-vite/template-vue`, 111111);

  try {
    // 克隆 Vite 仓库
    execSync(`git clone --depth=1 --filter=blob:none ${url} ${gitCloneDir}`);
    process.chdir(gitCloneDir);

    // 拉取指定目录或文件
    execSync(`git sparse-checkout init --cone`);
    execSync(`echo ${gitSparseDir} >> .git/info/sparse-checkout`);
    execSync(`git read-tree -mu HEAD`);
    // 读取模板项目的 package.json 文件
    const templateList = require(path.join(gitCloneDir, gitSparseDir, 'package.json'));
    templateList.name = projectName;

    // 写入修改后的 package.json 文件
    fs.writeFileSync(path.join(gitCloneDir, gitSparseDir, 'package.json'), JSON.stringify(templateList), 'utf-8');

    // 显示表格等信息
    console.log('\n');

    // 成功完成操作
    console.log(chalk.green(symbols.success), chalk.green('Generation completed!'));
    console.log('\n To get started');
    console.log(`\n    cd ${projectName} \n`);

    const src = path.join(gitCloneDir, gitSparseDir)
    const dest = path.join(gitCloneDir, '..', projectName)

    async function asyncAwait() {
      try {
        await fsMove.move(src, dest, { overwrite: true });
        // setTimeout(() => {
        //   try {
        //     rimraf(gitCloneDir, { disableGlob: true, maxBusyTries: 10, emfileWait: 2000 })
        //   } catch (error) {
        //   }
        // }, 100);
        process.exit()
      } catch (err) {
        console.log(err);
        process.exit()
      }
    }
    asyncAwait()
    showTable(templateList);
  } catch (err) {
    console.log(chalk.red(symbols.error), chalk.red(`Generation failed. ${err}`));
    process.exit()
  }
}

downloadTemplate(url, projectName)

