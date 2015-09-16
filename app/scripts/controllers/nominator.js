'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:NominatorCtrl
 * @description
 * # NominatorCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('NominatorCtrl', ['$scope', '$q', '$location', 'employeeService', 'usersService',
        function($scope, $q, $location, employeeService, usersService) {

            $scope.step = 4;
            $scope.user = {};
            $scope.employee = null;

            employeeService.getEmployeeData(function(result) {
                $scope.employee = result;
            });

            usersService.getUserData(function(result) {
                $scope.user = result;
            });

            $scope.next = function() {
                // check to make sure the form is completely valid
                //if ($scope.userForm.$valid) {
                $location.path('/step5');
                //}
            };

        }
    ]);
