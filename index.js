#!/usr/bin/env node

const commander = require('commander');
const readlineSync = require('readline-sync');
const download = require('download-git-repo')
const chalk = require('chalk')

function createNestApp() {
    const program = new commander.Command()
    process.title = 'create-nest-app'
    program
        .version(require('./package').version)
    
    program.parse(process.argv);
    if (program.args.length > 1) {
        console.log(chalk.bgRed('参数错误 使用示例：create-nest-app my-nest-app'))
        return false
    }
    const targetFoldName = program.args[0] || 'my-nest-app'
    
    const db = ['MySQL', 'MongoDB']
    const index = readlineSync.keyInSelect(db, '选择项目内置的数据库')

    if (index === -1) {
        console.log(chalk.bgRed('已取消项目创建'))
    } else {
        let downloadRepoUrl = ''
        switch (db[index]) {
            case 'MySQL':
                downloadRepoUrl = 'ZhenHe17/nest-mysql-template'
                break;
            case 'MongoDB':
                downloadRepoUrl = 'ZhenHe17/nest-mongodb-template'
                break;
            default:
                break;
        }
        console.log('')
        console.log(`目录名：${targetFoldName}、内置数据库：${db[index]}`)
        console.log(`正在下载项目模板`)
        console.log(`请耐心等候... ^_^ `)
        console.log('')
        download(downloadRepoUrl, `./${targetFoldName}`, (err) => {
            if (err) {
                console.log(chalk.bgRed(err))
            } else {
                console.log('')
                console.log(chalk.green('项目创建成功！'))
                console.log('')
                console.log(chalk.green(`cd ${targetFoldName}`))
                console.log(chalk.green('docker-compose up'))
                console.log('')
            }
        })
    }
}

createNestApp()
