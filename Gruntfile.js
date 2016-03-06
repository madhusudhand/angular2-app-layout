module.exports = function(grunt){

  //load build config file
  const build_config = require('./build.config.js');

  //grunt config
  var config = {
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      options: {
        force: true
      },
      pre_build: ['<%= build_dir %>', '<%= temp_dir %>', '<%= debug_dir %>'],
      post_build: ['<%= temp_dir %>','<%= build_dir %>/<%= app_files.jade_dir %>/index.html'], // remove index cleaning when it is changed
      pre_debug: ['<%= build_dir %>', '<%= temp_dir %>', '<%= debug_dir %>'],
      post_debug: ['<%= temp_dir %>'],
    },

    jade: {
      options: { pretty: false },
      app_jade: {
        files: [{
          src: '<%= app_files.jade %>',
          dest: '<%= build_dir %>/<%= app_files.jade_dir %>',
          cwd: '<%= app_dir %>',
          expand: true,
          ext: '.html'
        }]
      }
    },


    concat: {
      app_sass: {
        //cwd: '<%= app_dir %>',
        src: ['<%= app_dir %>/*.scss', '<%= app_dir %>/**/*.scss'],
        dest: '<%= temp_dir %>/<%= app_files.css_file %>.scss',
      },
      app_js: {
        options: {
          separator: ';'
        },
        // cwd: '<%= app_dir %>', this is not working with concat
        src: ['<%= app_dir %>/*.js', '<%= app_dir %>/**/*.js'],
        dest: '<%= temp_dir %>/<%= app_files.js_file %>.js'
      }
    },


    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= temp_dir %>',
          src: ['*.scss'],
          dest: '<%= temp_dir %>',
          ext: '.css'
        }]
      }
    },

    // typescript: {
    //   base: {
    //     src: ['src/**/*.ts'],
    //     dest: '<%= build_dir %>',
    //     options: {
    //       module: 'amd', //or commonjs
    //       target: 'es5', //or es3
    //       basePath: '<%= build_dir %>',
    //       sourceMap: true,
    //       declaration: true
    //     }
    //   }
    // },

    ts: {
      base: {
        src: ['src/**/*.ts'],
        dest: 'build',
        options: {
          module: 'system',
          moduleResolution: 'node',
          target: 'es5',
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          noImplicitAny: false
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      app: {
        files: {
          '<%= build_dir %>/<%= app_files.js_file %>.min.js': '<%= temp_dir %>/<%= app_files.js_file %>.js'
        }
      }
    },

    jshint: {
//      options: {
//        force: true
//      },
      pre: ['<%= app_dir %>/*.js', '<%= app_dir %>/**/*.js'],
      //post: ['<%= build_dir %>/<%= app_files.js_file %>.min.js']
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      app: {
        files: {
          '<%= build_dir %>/<%= app_files.css_file %>.min.css': '<%= temp_dir %>/<%= app_files.css_file %>.css'
        }
      }
    },


    copy: {
      index: {
        expand: true,
        cwd: '<%= build_dir %>/<%= app_files.jade_dir %>/',
        src: ['index.html'], //remove index cleaning when it is changed
        dest: '<%= build_dir %>/'
      }
    },


    watchChanges: { // renamed because adding a watch task with some other tasks as well

      options: {
        spawn: false
      },

      // jade watch
      jade:{
        files: ['<%= app_dir %>/*.jade','<%= app_dir %>/**/*.jade'],
        tasks: ['jade:app_jade','copy:index']
      },

      // js watch
      js: {
        files: ['<%= app_dir %>/*.js', '<%= app_dir %>/**/*.js'],
        tasks: ['concat:app_js','uglify:app']
      }
    }



  }; // end of grunt config


  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-clean');
  // grunt.loadNpmTasks('grunt-contrib-jade');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-ts');


  grunt.initConfig(grunt.util._.extend(config, build_config));
  // grunt.registerTask('default', ['clean:pre_build']);
  // grunt.registerTask('compile', ['jade','concat','sass','uglify','jshint','cssmin','copy']);
  // grunt.registerTask('build', ['clean:pre_build','compile','clean:post_build']);
  //
  // grunt.renameTask('watch','watchChanges');
  // grunt.registerTask('watch', ['clean:pre_build','compile','watchChanges']);

}
