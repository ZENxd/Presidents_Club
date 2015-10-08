'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('HomeCtrl', ['$scope', '$rootScope', '$location', 'AuthenticationService', 'settings', 'globals',
        function($scope, $rootScope, $location, AuthenticationService, settings, globals) {

            //Bounce to here if we have a user logged in
            if (!$rootScope.globals.currentUser) {
                $location.path('/');
            } else {
                $rootScope.cloud = false;
            }

            //Settings for handling the top nav items
            settings.setValue('logo', true);
            settings.setValue('back', false);

            // Continue to step 1 after successfull login
            $scope.next = function() {
                globals.loader.show = false;
                $location.path('/nominee');
            };

        }
    ]);
