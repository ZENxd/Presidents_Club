(function() {
  'use strict';
  angular.module('presidentsClubApp')
    .service('settings', function() {
      
      var settings = {
        'showNav': false,
        'showHelp': false,
        'logo': true,
        'back': false
      };

      this.getSettings = function(callback) {
        callback(settings);
      };

      this.setValue = function(key, val) {
        settings[key] = val;
      };


    });
})();