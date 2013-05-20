module.exports = function(config) {

	return {

		'app': {
			'files': [
				{
					expand: true,
					cwd: config.cssbin,
					src: ['**/*.css', '!**/*.min.css'],
					dest: config.cssbin,
					rename: function (dest, src) {
						var path = dest + '/' + src;

						path = path.split('.');
						path.pop();
						path = path.join('.');

						return  path + '.min.css';
					}
				}
			]
		}

	};

}