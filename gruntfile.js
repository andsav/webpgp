module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            dist: {
                src: ['src/jsx/helpers.jsx', 'src/jsx/components.jsx', 'src/jsx/pages.jsx', 'src/jsx/main.jsx'],
                dest: 'src/jsx/concat/app.jsx',
            },
        },
        babel: {
            options: {
                plugins: ['transform-react-jsx'],
                presets: ['es2015', 'react']
            },
            jsx: {
                files: [{
                    expand: true,
                    cwd: 'src/jsx/concat/',
                    src: ['*.jsx'],
                    dest: 'dist/',
                    ext: '.js'
                }]
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dist/app.min.js': ['dist/app.js']
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'dist/style.css': ['src/sass/style.sass']
                }
            }
        },
        watch: {
            concat: {
                files: "src/jsx/*.jsx",
                tasks: ['concat']
            },
            babel: {
                files: "src/jsx/concat/app.jsx",
                tasks: ['babel']
            },
            sass: {
                files: "src/sass/style.sass",
                tasks: ['sass']
            },
            uglify: {
                files: "dist/app.js",
                tasks: ['uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'babel', 'sass', 'uglify', 'watch']);

};