'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('ListCtrl', ['$scope', '$rootScope', '$location', 'demoService', 'settings', '$anchorScroll',
        function($scope, $rootScope, $location, demoService, settings, $anchorScroll) {

            //Bounce to here if we have a user not logged in
            if (!$rootScope.globals.currentUser) {
                $location.path('/');
            } else {
                $rootScope.cloud = true;
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

            demoService.getNominees(function(result) {
                $scope.nomineesModel = result;
            });

            $scope.detail = function(id) {
                $location.path('/detail/' + id);
            };

        }
    ]);
