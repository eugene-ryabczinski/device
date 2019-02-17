module.exports = function(grunt) {	
	
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
	    
        watch: {
            options: {
                spawn: false
            },
            scripts: {
                files: ['sass/*.scss'],
                tasks: ['sass'] // пишем какие задачи будем запускать когда какой-либо файл scss изменён. наприемр так ['sass', 'postcss'] и т.д.
            }
        }
	});
	
	grunt.loadNpmTasks('grunt-sass');
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
