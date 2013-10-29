module.exports = function(grunt) {
 
    // Project configuration.
    grunt.initConfig({
 
        // This will load in our package.json file so we can have access
        // to the project name and version number.
        pkg: grunt.file.readJSON('package.json'),
 
        // Constants for the Gruntfile so we can easily change the path for
        // our environments.
        BASE_PATH: '../',
        DEVELOPMENT_PATH: '../dev/',
        PRODUCTION_PATH: '../prod_<%= grunt.template.today("yyyy-mm-ddhh_mm") %>/',

        // A code block that will be added to all our minified code files.
        // Gets the name and version from the above loaded 'package.json' file.
        banner: [
                 '/*',
                 '* Project: <%= pkg.name %>',
                 '* Version: <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)',
                 '* Development By: <%= pkg.developedBy %>',
                 '* Copyright(c): <%= grunt.template.today("yyyy") %>',
                 '*/'
        ],
 
 
        // The different constants name that will be use to build our html files.
        // Example: <!-- @if NODE_ENV == 'DEVELOPMENT' -->
        env: {
            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },
            prod : {
                NODE_ENV : 'PRODUCTION'
            }
        },
 
        // Allows us to pass in variables to files that have place holders so we
        // can similar files with different data.
        // Example: <!-- @echo buildVersion --> or <!-- @echo filePath -->
        preprocess : {
            // Task to create the dev.html file that will be used during development.
            // Passes the app version and a file path into the dev/index.html and
            // creates the /dev.html
            dev : {
                src : '<%= DEVELOPMENT_PATH %>' + 'index.html',
                dest : '<%= DEVELOPMENT_PATH %>' + 'dev.html',
                options : {
                    context : {
                        buildVersion : '<%= pkg.version %>',
                        filePath: 'dev/'
                    }
                }
            },
            // Task to create the index.html file that will be used in production.
            // Passes the app version and a file path into the dev/index.html and
            // creates the /index.html
            prod : {
                src : '<%= DEVELOPMENT_PATH %>' + 'index.html',
                dest : '<%= PRODUCTION_PATH %>' + 'index.html',
                options : {
                    context : {
                        buildVersion : '<%= pkg.version %>',
                        filePath: 'prod/'
                    }
                }
            }

            // Task to create the HTML5 Cache Manifest.
            // Passes the app version and the current date into the
            // dev/offline/offline.manifest and creates prod/offline/offline.manifest.
            /*manifest : {
                src : '<%= DEVELOPMENT_PATH %>' + 'offline/offline.manifest',
                dest : '<%= PRODUCTION_PATH %>' + 'offline/offline.manifest',
                options : {
                    context : {
                        buildVersion : '<%= pkg.version %>',
                        timeStamp : '<%= grunt.template.today() %>'
                    }
                }
            }*/
        },

        uglify: {
            my_target: {
                files: {
                     '<%= PRODUCTION_PATH %>js/app.min.js' : ['<%= DEVELOPMENT_PATH %>' + 'js/main.js']
                }
            }
        },
 
        // The RequireJS plugin that will use uglify2 to build and minify our
        // JavaScript, templates and any other data we include in the require files.
        requirejs: {
            compile: {
                options: {
                    baseUrl: '<%= DEVELOPMENT_PATH %>' + 'js/',
                    mainConfigFile: '<%= DEVELOPMENT_PATH %>' + 'js/main.js',
                    name: 'main',
                    out: '<%= PRODUCTION_PATH %>' + 'js/app.min.js',
 
                    fileExclusionRegExp: /.svn/,
                    useStrict: true,
                    preserveLicenseComments: false,
                    pragmas: {
                        debugExclude: true
                    },
 
                    optimize: 'uglify2',
                    uglify2: {
                        output: {
                            beautify: false,
                            comments: false
                        },
                        compress: {
                            sequences: false,
                            global_defs: {
                                DEBUG: false
                            }
                        },
                        warnings: false,
                        mangle: true
                    }
                }
            }
        },
 
        // Minifies our css files that we specify and adds the banner to the top
        // of the minified css file.
       /* cssmin: {
            main: {
                options: {
                    banner: '<%= banner.join("\\n") %>',
                    keepSpecialComments: 0
                },
                files: {
                    '<%= PRODUCTION_PATH %>styles/main.min.css': [
                        '<%= DEVELOPMENT_PATH %>' + 'styles/setup.css',
                        '<%= DEVELOPMENT_PATH %>' + 'styles/bootstrap.css',
                        '<%= DEVELOPMENT_PATH %>' + 'styles/screen.css'
                    ]
                }
            }
        },*/
 
        // After the preprocess plugin creates our /index.html we remove all comments
        // and white space from the file so it will be minified.
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '<%= PRODUCTION_PATH %>index.html': '<%= PRODUCTION_PATH %>index.html'
                }
            }
        },
 
        // Copies certain files over from the dev/ folder to the prod/ so we don't
        // have to do it manually.
        copy: {
            prod:  {
                files: [
                    // Copy require.js file from dev/libs/require/ to prod/scripts/.
                    /* { expand: true, cwd: '<%= DEVELOPMENT_PATH %>' + 'libs/require/', src: 'require.js', dest: '<%= PRODUCTION_PATH %>' + 'scripts/' } ,*/
                    // Copy favicon.ico file from dev/ to prod/.
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: 'favicon.ico', dest: '<%= PRODUCTION_PATH %>' } ,

                    // Copy css file dev/ to prod/.
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: 'css/shell.css', dest: '<%= PRODUCTION_PATH %>' } ,

                    // Copy js minified app and requirejs file from dev to prod/.
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: 'js/app.min.js', dest: '<%= PRODUCTION_PATH %>' } ,
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: 'js/require-min.js', dest: '<%= PRODUCTION_PATH %>' } ,

                    // Copy the image folder from dev/images/ to prod/images/.
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: ['img/**'], dest: '<%= PRODUCTION_PATH %>' },

                    // Copy the frames folder from prod/frames/ to prod/frames/.
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: ['frames/**'], dest: '<%= PRODUCTION_PATH %>' },

                    // Copy the font folder from dev/font/ to prod/font/.
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: ['font/**'], dest: '<%= PRODUCTION_PATH %>' },

                     // Copy the relase log from dev/font/ to prod/font/.
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: ['log.md'], dest: '<%= PRODUCTION_PATH %>' },

                ]
            }

        },
 
        // Takes the minified JavaScript file and adds the banner to the top.
        concat: {
            prod: {
                options: {
                    banner: '<%= banner.join("\\n") %> \n'
                },
                src: ['<%= PRODUCTION_PATH %>' + 'js/app.min.js'],
                dest: '<%= PRODUCTION_PATH %>' + 'js/app.min.js'
            }
        }
 
    });
 
    // Loads the necessary tasks for this Grunt file.
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
 
    // Grunt tasks.
    //grunt.registerTask('default', ['requirejs']);
    grunt.registerTask('dev', ['env:dev', 'preprocess:dev']);
    //grunt.registerTask('prod', ['copy:prod', 'env:prod', 'preprocess:prod', 'preprocess:manifest', 'cssmin', 'htmlmin', 'requirejs', 'concat:prod']);
    grunt.registerTask('prod', ['copy:prod', 'uglify', 'env:prod', 'preprocess:prod', 'requirejs',  'concat:prod']);


};
