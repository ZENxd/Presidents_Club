'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('MainCtrl', ['$scope', '$rootScope', '$location', 'AuthenticationService', 'settings', 'globals', 'dataService', 
        function($scope, $rootScope, $location, AuthenticationService, settings, globals, dataService) {

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
                email: null,
                region: null
            };
            $scope.loginError = false;

            // Only needed when Regional Managers login time
            // Consumable Data for pre-population regions dropdown.
            dataService.getRegions(function(result) {
                $scope.regions = result;
            });

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
                        console.log($scope.loginCredentials.authLevel);
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
                var path = '/home';
                if($scope.loginCredentials.authLevel > 0) {
                    path = '/list';
                }
                $location.path(path);
            };

        }
    ]);
