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
					'build/css/style.css': 'dev/sass/style.scss'
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
				src: 'build/css/*.css'
			}
		},

		csscomb: {
			dist: {
				options: {
					config: '.csscomb.json'
				},
				files: {
					'build/css/style.css': ['build/css/style.css'] // 'dest/resorted.css': ['src.orgiginal.css']
				}
			}
		},

		csso: {
			compress: {
				options: {
					report: 'gzip'
				},
				files: {
					'build/css/style.min.css': ['build/css/style.css'] // 'output.css': ['input.css']
				}
			}
		},

		browserSync: {
			dev: {
				bsFiles: {
					src: ['build/css/*.css', 'build/*.html', 'build/js/*.js']
				},
				options: {
					watchTask: true,
					server: 'build'
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
					cwd: 'dev',
	  				src: [
						'fonts/**/*.{woff,woff2}',
						'img/**',
						'js/**',
						'css/**'
					],
					dest: 'build/'
				}]
			},

			html: {
				files: [{
					expand: true,
					cwd: 'dev',
	  				src: [
						'*.html'
					],
					dest: 'build/'
				}]
			},

			script: {
				files: [{
					expand: true,
					cwd: 'dev',
	  				src: [
						'js/**'
					],
					dest: 'build/'
				}]
			}
		},

		watch: {
			options: {
				spawn: false
			},

			style: {
				files: ['dev/sass/*.scss'],
				tasks: ['sass', 'postcss', 'csscomb', 'csso'] // пишем какие задачи будем запускать когда какой-либо файл scss изменён. наприемр так ['sass', 'postcss'] и т.д.
			},

			html: {
				files: ['dev/*.html'],
				tasks: ['copy:html']
			},

			script: {
				files: ['dev/js/*.js'],
				tasks: ['copy:script']
			}
		}
	});

	// Есть плагин котрый делает это автоматически
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-csscomb');
	grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// grunt.registerTask('default', ['browserSync', 'watch']);
	grunt.registerTask('serve', ['browserSync', 'watch']);
	grunt.registerTask('build', [
		'clean',
		'copy',
		'sass',
		'postcss',
		'csscomb',
		'csso'
	]);

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
