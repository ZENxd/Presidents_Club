'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('ListCtrl', ['$scope', '$rootScope', '$q', '$location', 'employeeService', 'settings', 'Nominee',
        function($scope, $rootScope, $q, $location, employeeService, settings, Nominee) {

            $scope.currentUser = Parse.User.current();

            if (!$scope.currentUser) {
                $location.path('/');
            }

            settings.setValue('showNav', true);
            settings.setValue('logo', true);
            settings.setValue('back', false);

            $scope.employees = [];

            Nominee.getNominees().then(function(results) {
                $scope.employees = results;
            });


            // employeeService.getEmployees(function(result) {
            //     $scope.employees = result;
            // });

            $scope.detail = function(id) {
                $location.path('/list/' + id);
            };

            $scope.edit = function(id) {
                $location.path('/step1/' + id);
            };

        }
    ]);
