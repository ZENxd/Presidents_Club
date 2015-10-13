'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('MainCtrl', ['$scope', '$rootScope', '$location', 'AuthenticationService', 'settings', 'globals',
        function($scope, $rootScope, $location, AuthenticationService, settings, globals) {

            //Bounce to here if we have a user logged in
            if ($rootScope.globals.currentUser) {
                $location.path('/home');
            }

            // Obj for user creds
            $scope.loginCredentials = {
                username: null,
                password: null,
                firstName: null,
                lastName: null,
                email: null
            };
            $scope.loginError = false;

            $scope.alert = {
                type: 'danger',
                msg: 'Unrecognized username & or password.'
            };

            //Settings for handling the top nav items
            settings.setValue('logo', true);
            settings.setValue('back', false);

            //Called on pressing login
            $scope.tryLogin = function() {
                globals.loader.show = true;
                AuthenticationService.Login($scope.loginCredentials, function(response) {
                    if (response.success) {
                        AuthenticationService.SetCredentials($scope.loginCredentials);
                        $scope.loginError = false;
                        $scope.next();
                    } else {
                        $scope.loginError = true;
                        $scope.alert.msg = response.message;
                        globals.loader.show = false;
                    }
                });
            };

            // Continue to step 1 after successfull login
            $scope.next = function() {
                globals.loader.show = false;
                $location.path('/home');
            };

        }
    ]);
