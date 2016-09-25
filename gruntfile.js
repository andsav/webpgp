module.exports = function(grunt) {
    grunt.initConfig({
        babel: {
            options: {
                plugins: ['transform-react-jsx'],
                presets: ['es2015', 'react']
            },
            jsx: {
                files: [{
                    expand: true,
                    cwd: 'src/',
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
                    'dist/style.css': ['src/style.sass']
                }
            }
        },
        watch: {
            babel: {
                files: "src/app.jsx",
                tasks: ['babel']
            },
            sass: {
                files: "src/style.sass",
                tasks: ['sass']
            },
            uglify: {
                files: "dist/app.js",
                tasks: ['uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['babel', 'sass', 'uglify', 'watch']);

};