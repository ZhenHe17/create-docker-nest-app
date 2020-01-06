#!/usr/bin/env node

const commander = require('commander');
const readlineSync = require('readline-sync');
const download = require('download-git-repo')
const chalk = require('chalk')
const renderTemplate = require('./renderTemplate')

function createNestApp() {
    const program = new commander.Command()
    process.title = 'create-nest-app'
    program
        .version(require('./package').version)
    
    program.parse(process.argv);
    if (program.args.length > 1) {
        console.log(chalk.bgRed('参数错误 使用示例：cdna my-nest-app'))
        return false
    }
    const targetFoldName = program.args[0] || 'my-nest-app'
    
    const optionKeys = ['MySQL', 'MongoDB', 'redis']

    const selectedArr = []
    const selectedObj = {}

    console.log('')
    for (const key of optionKeys) {
        const result = readlineSync.keyInYN(`需要在项目里安装 ${chalk.green(key)} 吗？)`)
        if (result) {
            selectedArr.push(key)
        }
        selectedObj[key] = result
    }

    const downloadRepoUrl = 'ZhenHe17/docker-nest-template'
    // switch (db[index]) {
    //     case 'MySQL':
    //         downloadRepoUrl = 'ZhenHe17/nest-mysql-template'
    //         break;
    //     case 'MongoDB':
    //         downloadRepoUrl = 'ZhenHe17/nest-mongodb-template'
    //         break;
    //     default:
    //         break;
    // }
    console.log('')
    console.log(`目录名：${targetFoldName}`)
    console.log('项目中将安装：', selectedArr)
    console.log(`正在下载项目模板`)
    console.log(`请耐心等候... ^_^ `)
    console.log('')
    // renderTemplate({
    //     targetFoldName,
    //     selectedArr,
    //     selectedObj
    // })
    download(downloadRepoUrl, `./${targetFoldName}`, (err) => {
        if (err) {
            console.log(chalk.bgRed(err))
        } else {
            renderTemplate({
                targetFoldName,
                selectedArr,
                selectedObj
            })
        }
    })
}

createNestApp()
