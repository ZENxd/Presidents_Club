'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('ListCtrl', ['$scope', '$rootScope', '$location', 'nomineeService', 'demoService', 'settings', '$anchorScroll',
        function($scope, $rootScope, $location, nomineeService, demoService, settings, $anchorScroll) {

            //Bounce to here if we have a user not logged in
            if (!$rootScope.globals.currentUser) {
                $location.path('/');
            } else {
                $rootScope.cloud = true;
                if ($rootScope.globals.currentUser.region && $rootScope.globals.currentUser.region.hasOwnProperty('name')) {
                    $scope.region = $rootScope.globals.currentUser.region.name;
                }
            }

            settings.setValue('logo', true);
            settings.setValue('back', false);
            settings.setValue('backText', '2015 Nominees');
            settings.setValue('backLink', '#/list');
            $scope.nomineesModel = null;


            $scope.scrollTo = function(id) {
                $location.hash(id);
                $anchorScroll();
            };

            // Use for Demo only
            demoService.getNominees(function(result) {
                $scope.nomineesModel = result;
            });

            // Use for API only
            /*
            nomineeService.getNominees().then(function(result) {
                $scope.nomineesModel = result;
            });
            */

            $scope.detail = function(id) {
                $location.path('/detail/' + id);
            };

        }
    ]);
