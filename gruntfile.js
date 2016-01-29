module.exports = function (grunt) {
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
