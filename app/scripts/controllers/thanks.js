'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:ThanksCtrl
 * @description
 * # ThanksCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('ThanksCtrl', ['$scope', '$q', '$location', 'employeeService', 'usersService', 'settings', 
        function($scope, $q, $location, employeeService, usersService, settings) {

            settings.setValue('showNav', true);
            settings.setValue('showHelp', true);
            settings.setValue('logo', true);
            settings.setValue('back', false);
            settings.setValue('user', false);
            
            $scope.step = 5;
            $scope.user = {};
            $scope.employee = null;

            employeeService.getEmployeeData(function(result) {
                $scope.employee = result;
            });

            usersService.getUserData(function(result) {
                $scope.user = result;
            });

            $scope.next = function() {
                $location.path('/step1');
            };

        }
    ]);
