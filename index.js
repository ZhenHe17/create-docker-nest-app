#!/usr/bin/env node

const commander = require('commander');
const readlineSync = require('readline-sync');
const program = new commander.Command();
process.title = 'create-nest-app';
program
    .version(require('./package').version)

program.parse(process.argv);
console.log('your args: ', program.args);

const db = [' MySQL ', ' MongoDB '];
const index = readlineSync.keyInSelect(db, '选择项目内置的数据库');
if (index === -1) {
    console.error('项目创建已取消')
} else {
    console.log('Ok, ' + db[index] + ' goes to your room.');
}
