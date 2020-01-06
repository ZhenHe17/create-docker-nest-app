const ejs = require('ejs')
const fs = require('fs')
const chalk = require('chalk')
const path = require('path')

function delDir(path){
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}

function renderTemplate({targetFoldName, selectedArr, selectedObj}) {
    const readDirAndRender = (entry) => {
        const dirInfo = fs.readdirSync(entry);
        dirInfo.forEach(item=>{
            const location = path.join(entry,item);
            const info = fs.statSync(location);
            if(info.isDirectory()){
                // console.log(`dir:${location}`);
                readDirAndRender(location);
            }else{
                // console.log(`file:${location}`);
                ejs.renderFile(location, { keepReadme: false, ...selectedObj }, {}, function(err, str){
                    const notEmpty = /\S/.test(str)
                    if (notEmpty) {
                        const data = new Uint8Array(Buffer.from(str));
                        fs.writeFile(location, data, (err) => {
                            if (err) throw err;
                        });
                    } else {
                        fs.unlink(location, (err) => {
                            if (err) throw err;
                        });
                    }
                });
            }
        })
    }
    const entry = `./${targetFoldName}`
    if (!selectedObj.MongoDB) {
        delDir(`${entry}/src/cats`)
        delDir(`${entry}/src/database`)
    }
    if (!selectedObj.MySQL) {
        delDir(`${entry}/src/photo`)
    }
    readDirAndRender(entry)
    console.log('')
    console.log(chalk.green('项目创建成功！'))
    console.log('')
    console.log(chalk.green(`cd ${targetFoldName}`))
    console.log(chalk.green('docker-compose up'))
    console.log('')
    // console.log('files', files)
}

module.exports = renderTemplate;