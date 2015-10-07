/**
 * @ngdoc function
 * @name presidentsClubApp.service:settings
 * @description
 * # Settings
 * Show/hide nav based items for the presidentsClubApp
 */
(function() {
    'use strict';
    angular.module('presidentsClubApp')
        .service('settings', function() {

            var settings = {
                'logo': true,
                'back': false,
                'user': false
            };

            this.getSettings = function(callback) {
                callback(settings);
            };

            this.setValue = function(key, val) {
                settings[key] = val;
            };

        });
})();
