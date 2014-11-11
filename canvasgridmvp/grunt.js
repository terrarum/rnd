module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                files: {
                    'build/canvastest.css': 'client/views/stylesheets/*.less'
                }
            }
        },

        browserify: {
            "temp/canvastest.js": {
                entries: 'client/init.coffee'
            }
        },

        handlebars: {
            compile: {
                options: {
                    wrapped: true,
                    namespace: 'templates',
                    processName: function(filename) {
                        var pieces = filename.split("/");
                        filename = pieces[pieces.length - 1];

                        if (filename.substring(filename.length - 4) === ".hbs") {
                            filename = filename.substring(0, filename.length-4);
                        }

                        return filename;
                    }
                },
                files: {
                    "temp/templates.js": "client/views/templates/*.hbs"
                }
            }
        },

        // Concatenates the various libraries and bootstrap plugins into one log file,
        // and adds the templates to the compiled client file.
        concat: {
            lib: {
                src: ['lib/jquery.js', 'lib/underscore.js', 'lib/json2.js', 'lib/backbone.js', 'lib/handlebars.runtime.js'],
                dest: 'build/lib.js'
            },
            src: {
                src: ['temp/templates.js', 'temp/canvastest.js'],
                dest: 'build/canvastest.js'
            }
        },

        copy: {
            build: {
                files: {
//                    "build/assets/": "client/assets/*",
                    "build/": "client/index.html"
                }
            }
        },

        watch: {
            files: 'client/**',
            tasks: 'default'
        }
    });

    // NPM modules
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');

    // Grunt Tasks
    grunt.registerTask('default', 'less browserify handlebars concat copy');
};
