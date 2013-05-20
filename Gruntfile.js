module.exports = function(grunt) {

	var config = {};

	config.root = './';
 	config.stylesheets = config.root + 'public/css';
	config.cssbin = config.stylesheets + '/generated';

	// Project configuration.
	grunt.initConfig({

		'compass': require('./build/config/compass.js')(config),

		'cssmin': require('./build/config/cssmin.js')(config),

		'watch': require('./build/config/watch.js')(config)

	});

	// Default task.
	grunt.registerTask('default', ['compass:app', 'cssmin']);

	// load grunt plugins
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
};