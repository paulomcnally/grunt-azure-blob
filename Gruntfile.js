'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env : {
      options : {
        //Shared Options Hash
      },
      configCDN : {
        AZURE_STORAGE_ACCOUNT : process.env.AZURE_STORAGE_ACCOUNT,
        AZURE_STORAGE_ACCESS_KEY : process.env.AZURE_STORAGE_ACCESS_KEY
      }
    },
    'azure-blob': {
      options: { // global options applied to each task
        containerName: 'grunt-azure-blob',
        containerDelete: false, //do not apply true here, container would be deleted at each task
        metadata: {cacheControl: 'public, max-age=31556926'}, // max-age 1 year for all entries
        gzip: true,
        copySimulation: false  // set true: only dry-run what copy would look like
      },
      css: {
        files: [{
          expand: true,
          cwd: 'example/css/',
          dest: '<%= pkg.version %>/css/',
          src: ['*.css']
        }]
      },
      js: {
        files: [{
          expand: true,
          cwd: 'example/js/',
          dest: '<%= pkg.version %>/js/',
          src: ['*.js']
        }]
      }
    }
  });

  // Load the plugin that provides all the pirate magic
  grunt.loadTasks('tasks');

  // Default task(s).
  grunt.registerTask('default', ['azure-blob']);
};
