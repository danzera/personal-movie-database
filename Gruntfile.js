module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'client/scripts/client.js',
        dest: 'server/public/scripts/client.min.js'
      }
    },
    copy: {
      images: {
        expand: true,
        cwd: 'client/images/', // Current working directory
        src: ['*.*'], // List of files to copy
        dest: 'server/public/images/' // Destination
      },
      html: {
        expand: true,
        cwd: 'client/views/', // Current working directory
        src: ['index.html'], // List of files to copy
        dest: 'server/public/views/' // Destination
      },
      css: {
        expand: true,
        cwd: 'client/stylesheets/', // Current working directory
        src: ['styles.css'], // List of files to copy
        dest: 'server/public/stylesheets/' // Destination
      },
      angular: {
        expand: true,
        cwd: 'node_modules/angular/', // Current working directory
        src: ['angular.*'], // List of files to copy
        dest: 'server/public/vendors/angular/' // Destination
      },
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/', // Current working directory
        src: ['css/*.css','fonts/*.*'], // List of files to copy
        dest: 'server/public/vendors/bootstrap/' // Destination
      }
    },
    watch: {
      save: {
        files: ['client/**/*.*'], // All files in the client folder
        tasks: ['uglify', 'copy']
      },
      refresh: {
        files: ['server/public/scripts/*.js', 'server/public/stylesheets/*.css', 'server/public/views/*.html', 'server/public/vendors/*.*'],
        options: {
          livereload: true
        }
      }
    }
  });
  // LOAD PLUGIN: Bring the plugin into the project
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch')

  // REGISTER TASK: Actually use the plugin
  grunt.registerTask('default', ['uglify','copy','watch']);
};
