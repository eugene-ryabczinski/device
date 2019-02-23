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

		watch: {
			options: {
				spawn: false
			},
			scripts: {
				files: ['sass/*.scss'],
				tasks: ['sass', 'postcss', 'csso'] // пишем какие задачи будем запускать когда какой-либо файл scss изменён. наприемр так ['sass', 'postcss'] и т.д.
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// Есть плагин котрый делает это автоматически

	grunt.registerTask('default', ['sass', 'watch']);
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
