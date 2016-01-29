# grunt-template
一个基于grunt自动化构建的项目模板

创建grunt项目的方法
========================

1、新建项目目录，就是新建一文件夹，名称如：myproject

2、进入刚建立的那个目录后，再新建分别新建几个文件，做成项目的基本目录结构。

我个人喜好的结构是

myproject

开发目录

|- template

       |-   js
       
       |-   Scripts
       
       |-   css
       
              |-   img
              
       |-   sass
       
       |-   img
       

发布后的目录

|- demo

       |- Scripts
       
       |-  Images
       
       |-  Themes
       
               |-  default
               
                         |-  img
                         
                         |-  all.css
                         

       
       
3、打开命令行工具，进入该目录

4、执行命令： npm init

     这个命令能创建一个pack.json文件，你需要一步一步的配置好
     


怕麻烦就直接新建pack.json文件，里面内容是：
<pre>
{
"name": "grunt-template",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"author": "likuan",
"license": "ISC",
"devDependencies": {
"connect-livereload": "^0.5.4",
"grunt": "^0.4.5",
"grunt-contrib-concat": "^0.5.1",
"grunt-contrib-connect": "^0.11.2",
"grunt-contrib-copy": "^0.8.2",
"grunt-contrib-cssmin": "^0.14.0",
"grunt-contrib-jshint": "^0.12.0",
"grunt-contrib-sass": "^0.9.2",
"grunt-contrib-uglify": "^0.11.0",
"grunt-contrib-watch": "^0.6.1",
"load-grunt-tasks": "^3.4.0"
}
}
</pre>
5、安装常用组件

执行命令：npm install grunt --save-dev

这条命令将安装Grunt最新版本到项目目录中，并将其添加到pack.json中的devDependencies内


常用安装有六个组件，分别是：sass预处理编译、concat合并、jshint检查语法、uglify压缩、watch监控、connect、livereload
执行命令：

npm install load-grunt-tasks --save-dev

npm install grunt-contrib-sass  --save-dev

npm install grunt-contrib-concat  --save-dev

npm install grunt-contrib-jshint  --save-dev

npm install grunt-contrib-uglify  --save-dev

npm install grunt-contrib-watch  --save-dev

npm install grunt-contrib-connect  --save-dev

npm install connect-livereload  --save-dev

npm install grunt-contrib-copy  --save-dev

npm install grunt-contrib-cssmin  --save-dev



6、新建gruntfile.js文件，这就是配置文件，告诉grunt该干什么？

其内容基本分为三个部分组成：1、初始化任务，可理解为新建任务，2、加载任务， 3、注册任务，可理解为执行任务


gruntfile.js文件内容如下：
<pre>
module.exports= function (grunt) {
var sassStyle = 'expanded';
require('load-grunt-tasks')(grunt); //加载所有的任务
//初始化任务，可理解为新建任务
grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),
//合并js文件
concat: {
concatsass: {
src:[
'./template/sass/index.scss',
'./template/sass/page.scss',
'./template/sass/dialog.scss'
],
dest: './template/sass/all.scss'
},
concatjs: {
src: [
'./template/js/init.js',
'./template/js/function.js'
],
dest: './template/Scripts/global.js'
},
concatku:{
src:[
'./template/js/jquery-1.11.3.min.js',
'./template/js/jquery.cookie.js'
],
dest: './template/Scripts/jquery.js'
}
        },
//预处理SCSS文件
sass: {
output: {
options: {
style: sassStyle
},
files: {
'./template/css/all.css': './template/sass/all.scss'
}
            }
        },
//检查js语法
jshint: {
temlfile: [
'./template/Scripts/global.js'
//'./template/js/jquery.js'
]
        },
//文件复制
copy: {
copys: {
files: [
                    {expand: true, cwd: './template/js', src: ['{Bootstrap,swiper}/**'],dest: './template/Scripts', filter: 'isFile'}
                ]
            },
copyhtml: {
files: [
                    {expand: true, cwd: './template', src: ['*.html','*.htm'],dest: './demo/', filter: 'isFile'}
/*
                    //包括路径中的文件
                    {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},
                    //复制指定文件夹下所有文件和文件夹，由于cwd缺失，所以会连带文件夹一起复制粘贴到目标文件夹中//
                    {expand: true, src: ['path/**'], dest: 'dest/'},
                     //复制cwd文件夹下的文件和文件夹，到dest路径下//
                    {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},
                    //的结果为单级显示
                    {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'}
                    */
]
            },
copyjs: {
files: [
                    {expand: true, cwd: './template/Scripts', src: ['**'],dest: './demo/Scripts', filter: 'isFile'}
                ]
            },
copycss: {
files: [
                    {expand: true,cwd: './template/css', src: ['**'],dest: './demo/css', filter: 'isFile'}
                ]
            },
copyimg: {
files: [
                    {expand: true,cwd: './template/img', src: ['**'],dest: './demo/img', filter: 'isFile'}
                ]
            }
        },
//压缩css
cssmin: {
minify: {
expand: true,
cwd: './demo/css/',
src: ['all.css'],
dest: './demo/css/'
//ext: '.min.css'
}
        },
//压缩js
uglify: {
compressjs: {
files: {
'./demo/Scripts/global.js': ['./demo/Scripts/global.js']
                }
            },
compressku: {
files: {
'./demo/Scripts/jquery.js': ['./demo/Scripts/jquery.js']
                }
            }
        },
//建立监听任务,监听文件变化
watch: {
scripts: {
files: [
'./template/js/**'
],
tasks: ['concat:concatjs','jshint']
            },
sass: {
files: ['./template/sass/**'],
tasks: ['concat:concatsass','sass']
            },
//监听服务器负载
livereload: {
options: {
livereload: '<%=connect.options.livereload%>'//监听前面声明的端口  35729
},
files: [  //下面文件的改变就会实时刷新网页
'./tamplate/*.html',
'./tamplate/css/*.scss',
'./tamplate/Scripts/*.js',
'./tamplate/img/{,*/}*.{png,jpg}'
]
            }
        },
//监听文件变化后,服务器更新文件
connect: {
options: {
port: 8000,
hostname: '127.0.0.1',
livereload: 35729
},
server: {
options: {
open: true,
base: [
'./'
]
              }
          }
      }
    });

//注册任务，可理解为执行任务
grunt.registerTask('test', ['concat','sass','copy:copys','jshint']);
grunt.registerTask('up',['copy:copyhtml','copy:copyjs','copy:copycss','copy:copyimg','cssmin','uglify']);
grunt.registerTask('open', ['connect:server','watch']);
};


</pre>

7、修改gruntfile里面对应的路径，找不到的文件或文件夹全部补齐，或根据自己的目录设定


9、撸码后，执行命令：

grunt watch


这个命令是开启监控，监控文件发生变化后，执行相应的任务！！！！

这样整个项目配置就基本完成。。。。。。
