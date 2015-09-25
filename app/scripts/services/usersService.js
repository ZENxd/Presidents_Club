(function() {
    'use strict';
    angular.module('presidentsClubApp')
        .factory('appAuth', function($location, redirectToUrlAfterLogin) {
            return {
                isLoggedIn: function() {
                    return Parse.User.current();
                },
                saveAttemptUrl: function() {
                    if ($location.path().toLowerCase() !== '/list') {
                        redirectToUrlAfterLogin.url = $location.path();
                    } else {
                        redirectToUrlAfterLogin.url = '/list';
                    }
                },
                redirectToAttemptedUrl: function() {
                    $location.path(redirectToUrlAfterLogin.url);
                    redirectToUrlAfterLogin.url = '/list';
                },
                getRedirectUrl: function() {
                    return redirectToUrlAfterLogin.url;
                }
            };
        })
        .service('usersService', function() {

            var user = {
                'id': '1',
                'first': '',
                'last': '',
                'officeTel': '',
                'mobileTel': '',
                'email': '',
                'title': ''
            };

            this.getUserData = function(callback) {
                callback(user);
            };

        });
})();
