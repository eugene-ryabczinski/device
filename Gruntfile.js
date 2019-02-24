module.exports = function (grunt) {

	const sass = require('node-sass');

	grunt.initConfig({
		sass: {
			options: {
				implementation: sass,
				outputStyle: 'expanded',
				indentWidth: 4,
				sourceMap: false
			},
			dist: {
				files: {
					'css/style.css': 'sass/style.scss'
				}
			}
		},

		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')({ browsers: 'last 3 versions' })
				]
			},
			dist: {
				src: 'css/*.css'
			}
		},

		csscomb: {
			dist: {
				options: {
					config: '.csscomb.json'
				},
				files: {
					'css/style.css': ['css/style.css']
				}
			}
		},

		csso: {
			compress: {
				options: {
					report: 'gzip'
				},
				files: {
					'css/style.min.css': ['css/style.css']
				}
			}
		},

		browserSync: {
			dev: {
				bsFiles: {
					src: ['css/*.css', '*.html']
				},
				options: {
					watchTask: true,
					server: ''
				}
			}
		},

		clean: {
			build: ['build']
		},

		copy: {
			build: {
				files: [{
					expand: true,
					cwd: '',
	  				src: [
						'fonts/**/*.{woff,woff2}',
						'img/**',
						'js/**'
					],
					dest: 'build/'
				}]
			},

			html: {
				files: [{
					expand: true,
					cwd: '',
	  				src: [
						'*.html'
					],
					dest: 'build/'
				}]
			}
		},

		watch: {
			options: {
				spawn: false
			},

			// html: {
			// 	files: ['*.html'],
			// 	tasks: ['copy:html']
			// },

			scripts: {
				files: ['sass/*.scss'],
				tasks: ['sass', 'postcss', 'csscomb', 'csso'] // пишем какие задачи будем запускать когда какой-либо файл scss изменён. наприемр так ['sass', 'postcss'] и т.д.
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-csscomb');
	grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	// Есть плагин котрый делает это автоматически

	grunt.registerTask('default', ['browserSync', 'watch:scripts']);

	// м.б. sass тут не обязателен если есть watch?
	// уточни куда класть browserSync. в registerTask или добваить его в watcher?
};

/*
		concat: {
		  dist : {
		   src : ["js/*js"],
		   dest : "js/build.js"
		  }
		}
	});
*/
// grunt.loadNpmTasks("grunt-contrib-concat");
