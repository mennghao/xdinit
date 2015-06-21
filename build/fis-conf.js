var now = new Date();
fis.config.set('timestamp', [now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours()].join(''));

fis.config.set('modules.parser.less', 'less');
//将less文件编译为css
fis.config.set('roadmap.ext.less', 'css');
fis.config.set('roadmap.path',[
    {
        reg: /^\/test\/less\/(.*)/i,
        release: '/src/css/$1'
    },
    {
        reg: /^\/template\/(.*)/i,
        release: '/$1'
    },
    {
        reg: /^\/test\/images\/(.*)/i,
        release: '/src/images/$1'
    },
    {
        reg: /^\/test\/js\/lib\/(.*)/i,
        release: '/src/static/js/lib/$1'
    },
    {
        reg: /^\/test\/js\/(.*)/i,
        release: '/src/static/js/$1'
    },
    {
        reg: /.*\.(js|css)$/,
        query: '?t=${timestamp}',
        //useSprite: true
        useHash: false
    },
    {
        reg: '**.html',
        useCache: false
    }
]);
fis.config.set('pack', {
    'src/static/css/common.css': [
        '/test/less/base.less',
    ],

    'src/static/js/lib.js': [
        '/test/js/lib/vue.min.js',
        '/test/js/common/function.js',
        '/test/js/common/unit.js',
    ],



});