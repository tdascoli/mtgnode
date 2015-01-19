module.exports = function(grunt) {

    grunt.config.set('jshint', {
        assets: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: ['assets/js/**/*.js','scripts/**/*.js','!assets/js/bower/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};