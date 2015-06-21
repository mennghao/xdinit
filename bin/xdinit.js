#!/usr/bin/env node
var program = require("commander"),
	create = require("./create");

program
	.allowUnknownOption()
    .version('0.0.1')
    .option('-m, --mobile', 'Create a mobile project!')
    .option('-p, --pc', 'Create a PC project!')
    .parse(process.argv);

//创建移动端项目
if (program.mobile) {
	create.mobile();
}

if (program.pc) {
	create.pc();
}

