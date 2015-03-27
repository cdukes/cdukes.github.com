// See: http://24ways.org/2013/grunt-is-not-weird-and-hard/
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			build: {
				src: ['build']
			}
		},

		csscomb: {
			options: {
				config: 'sass/csscomb.json'
			},
			build: {
				expand: true,
				cwd: 'sass/',
				src: ['**/*.scss', '!_mixins.scss', '!_variables.scss'],
				dest: 'sass/'
			}
		},

		sass: {
			options: {
				compass: true,
				style: 'expanded',
				precision: 3,
				sourcemap: 'none'
			},
			build: {
				files: {
					'build/css/style.css': 'sass/style.scss'
				}
			}
		},

		autoprefixer: {
			options: {
				cascade: true
			},
			build: {
				files: {
					'build/css/style.css': ['build/css/style.css']
				}
			}
		},

		csso: {
			options: {
				report: 'min'
			},
			build: {
				files: {
					'build/css/style.min.css': ['build/css/style.css']
				}
			}
		},

		imagemin: {
			options: {
				cache: false // Bug: https://github.com/gruntjs/grunt-contrib-imagemin/issues/140
			},
			build: {
				files: [{
					expand: true,
					cwd: 'images/',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: 'build/images/'
				}]
			}
		},

		watch: {
			css: {
				files: ['sass/**/*.scss'],
				tasks: ['sass', 'autoprefixer'],
				options: {
					spawn: false
				}
			},

			images: {
				files: ['images/**/*'],
				tasks: ['newer:imagemin'],
				options: {
					spawn: false
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-csscomb');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-notify');

	grunt.registerTask('default', ['clean', 'sass', 'imagemin', 'watch']);
	grunt.registerTask('build', ['clean', 'csscomb', 'sass', 'imagemin', 'autoprefixer', 'csso']);

};
