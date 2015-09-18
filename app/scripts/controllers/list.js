'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
  .controller('ListCtrl', ['$scope', '$q', '$location', 'employeeService', 'usersService',
   function ($scope, $q, $location, employeeService, usersService) {
    $scope.user = {};
    $scope.employees = [];

    employeeService.getEmployees(function(result) {
        $scope.employees = result;
    });

    usersService.getUserData(function(result) {
      $scope.user = result;
    });
    
    $scope.next = function(){
    	// check to make sure the form is completely valid
        //if ($scope.userForm.$valid) {
        	$location.path( '/step1' );
        //}
    };

  }]);
