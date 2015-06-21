var build = require('./build'),
	path = process.cwd();

/**
 * [创建项目结构]
 * @return {[type]} [description]
 */
var createBase = function(fn){
	console.log(['一切准备就绪...',
				 '对接完成，开始生成项目结构',
				 '分析目录结构...',
				 '  ├── App',
				 '  │   ├── template',
				 '  │   │ ',
				 '  │   ├── test',
				 '  │   │   ├── images',
				 '  │   │   ├── js',
				 '  │   │   │   ├── common',
				 '  │   │   │   ├── lib',
				 '  │   │   ├── less'].join('\n '));

	
	build.copy(__dirname+'/../build/common/', path, function(){
		console.log('项目结构创建完成，开始生成FIS配置文件');

		build.copyFile(__dirname+'/../build/fis-conf.js', './fis-conf.js', function(){
			console.log('FIS配置文件创建完成，开始生成index.html');

			if (fn) fn();
		});
	});
};


var mobile = function(){
	createBase(function(){
		build.copyFile(__dirname+'/../build/mobile/index.html', './template/index.html', function(){
			console.log('新的项目已经创建！');
		});
	});
};

var pc = function(){
	createBase(function(){
		build.copyFile(__dirname+'/../build/pc/index.html', './template/index.html', function(){
			console.log('新的项目已经创建！');
		});
	});
}

exports.mobile = mobile;
exports.pc = pc;