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
      pre_build: ['<%= build_dir %>', '<%= temp_dir %>'],
      post_build: ['<%= temp_dir %>']
    },

    jade: {
      dev: {
        options: { pretty: true },
        files: [{
          src: '<%= app_files.jade %>',
          dest: '<%= build_dir %>',
          cwd: '<%= app_dir %>',
          expand: true,
          ext: '.html'
        }]
      },
      dist: {
        options: { pretty: false },
        files: [{
          src: '<%= app_files.jade %>',
          dest: '<%= build_dir %>',
          cwd: '<%= app_dir %>',
          expand: true,
          ext: '.html'
        }]
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

    ts: {
      dist: {
        src: ['<%= app_dir %>/**/*.ts'],
        dest: '<%= temp_dir %>',
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

    concat: {
      sass: {
        src: ['<%= app_dir %>/*.scss', '<%= app_dir %>/**/*.scss'],
        dest: '<%= temp_dir %>/<%= app_files.css_file %>.scss',
      },
      js: {
        options: {
          separator: ';'
        },
        src: ['<%= temp_dir %>/*.js'],
        dest: '<%= temp_dir %>/<%= app_files.js_file %>.js'
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
      modules: {
        expand: true,
        cwd: 'node_modules/',
        src: ['angular2/**', 'rxjs/**'],
        dest: '<%= build_dir %>/'
      },
      dependencies: {
        expand: true,
        flatten: true,
        cwd: 'node_modules/',
        src: [
              'angular2/es6/dev/src/testing/shims_for_IE.js',
              'angular2/bundles/angular2-polyfills.js',
              'angular2/bundles/angular2.dev.js',
              'rxjs/bundles/Rx.js',
              'systemjs/dist/system.src.js',
              'systemjs/dist/system-polyfills.js',
              'es6-shim/es6-shim.min.js'
             ],
        dest: '<%= build_dir %>/lib/'
      },
      assets: {
        expand: true,
        cwd: '<%= app_dir %>/',
        src: ['assets/**'],
        dest: '<%= build_dir %>/'
      },
      dev: {
        expand: true,
        cwd: '<%= temp_dir %>/',
        src: ['*.js','**/*.js'],
        dest: '<%= build_dir %>/'
      }
    },


    watch: {

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

      // sass watch

    }

  }; // end of grunt config


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-ts');


  grunt.initConfig(grunt.util._.extend(config, build_config));

  grunt.registerTask('default', ['clean:pre_build']);
  grunt.registerTask('init', ['clean:pre_build', 'copy:modules', 'copy:dependencies']);
  grunt.registerTask('dev', ['jade:dev','ts','concat:sass','sass','copy:assets', 'copy:dev']);
  grunt.registerTask('dist', ['init','jade:dist','concat','sass','cssmin','uglify','clean:post_build']);

}
