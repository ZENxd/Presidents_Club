(function() {
    'use strict';
    angular.module('presidentsClubApp')
        .factory('appAuth', function($location, redirectToUrlAfterLogin) {
            return {
                isLoggedIn: function() {
                    return Parse.User.current();
                },
                saveAttemptUrl: function() {
                    if ($location.path().toLowerCase() !== '/step1') {
                        redirectToUrlAfterLogin.url = $location.path();
                    } else {
                        redirectToUrlAfterLogin.url = '/';
                    }
                },
                redirectToAttemptedUrl: function() {
                    $location.path(redirectToUrlAfterLogin.url);
                    redirectToUrlAfterLogin.url = '/';
                },
                getRedirectUrl: function() {
                    return redirectToUrlAfterLogin.url;
                }
            };
        })
        .service('settings', function() {

            var settings = {
                'showNav': false,
                'showHelp': false,
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
