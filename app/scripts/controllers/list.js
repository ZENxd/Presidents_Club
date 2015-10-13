'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('ListCtrl', ['$scope', '$rootScope', '$location', 'demoService', 'settings', 
        function($scope, $rootScope, $location, demoService, settings) {


            settings.setValue('logo', true);
            settings.setValue('back', false);
            settings.setValue('backText', '2015 Nominees');
            settings.setValue('backLink', '#/list');
            $scope.nomineesModel = null;

            demoService.getNominees(function(result) {
                $scope.nomineesModel = result;
            });

            $scope.detail = function(id) {
                $location.path('/detail/' + id);
            };

        }
    ]);
