# grunt-azure-blob

A Grunt task for copying html assets to azure blob/cdn storage.

# Installation
Install npm package next to your projects gruntfile.js file

        npm install grunt-azure-blob

Add this line to your projects Gruntfile.js

        grunt.loadNpmTasks('grunt-azure-blob');

# Environment Requirment
+ The Azure SDK provides a Node.js package for access to the Azure Table Storage.  By default, this library uses the following environment variables for authentication (set as required as global, user, or with a task).  I've had great success with grunt-env to manage the these settings as a task (sample usage shown below).  _These environment variables must be set to your appropriate values!_
  + AZURE_STORAGE_ACCOUNT
  + AZURE_STORAGE_ACCESS_KEY


## AzureBlob Options and default values
grunt-azureblob is a multi task that implicity iterates over all of the named sub-properties (targets).  In addition to the default properties , task specific properties are also available inside each task function.  Options are essentially globally available (across tasks), but can be overridden / set at each task level as needed.


        {
          serviceOptions: [], // custom arguments to azure.createBlobService
          containerName: null, // container name, required
          containerDelete: false, // deletes container if it exists
          containerOptions: {publicAccessLevel: "blob", timeoutIntervalInMs: 10000}, // container
          copySimulation: false, // do everything but physically touch storage blob when true
          metadata: {cacheControl: 'public, max-age=31556926'}, // file metadata properties
          gzip: false, // gzip files
          maxNumberOfConcurrentUploads: 10 // Maximum number of concurrent uploads
        };


## Example Gruntfile.js
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



## Sample console run (from Gruntfile.js)
    Running "azure-blob:css" (azure-blob) task
    skiping delete of container[grunt-azure-blob]...OK
    azure-blob:css - Create blob container [grunt-azure-blob] ....OK
    Copy example.css => grunt-azure-blob/0.0.1/css/example.css - text/css OK
    blobStorage copy completed (1) files...OK

    Running "azure-blob:js" (azure-blob) task
    skiping delete of container[grunt-azure-blob]...OK
    azure-blob:js - Create blob container [grunt-azure-blob] ....OK
    Copy example.js => grunt-azure-blob/0.0.1/js/example.js - application/javascript OK
    blobStorage copy completed (1) files...OK


## Original source
[https://github.com/jstott/grunt-azureblob](https://github.com/jstott/grunt-azureblob)
