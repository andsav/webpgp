module.exports = function(grunt) {
    grunt.initConfig({
        react: {
            combined_file_output: {
                files: {
                    'dist/app.js': ['src/app.jsx']
                }
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
            my_target: {
                files: {
                    'dist/app.min.js': ['dist/app.js']
                }
            }
        },
        watch: {
            react: {
                files: "src/app.jsx",
                tasks: ['react']
            },
            uglify: {
                files: "dist/app.js",
                tasks: ['uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);

};