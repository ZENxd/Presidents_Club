'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:CommentsCtrl
 * @description
 * # CommentsCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
  .controller('CommentsCtrl', ['$scope', '$q', '$location', 'employeeService', 'usersService',
   function ($scope, $q, $location, employeeService, usersService) {
    
    $scope.step = 3;
    $scope.user = {};
    $scope.employee = null;

    employeeService.getEmployeeData(function(result) {
      $scope.employee = result;
    });

    usersService.getUserData(function(result) {
      $scope.user = result;
    });
    
    $scope.next = function(){
    	// check to make sure the form is completely valid
        //if ($scope.userForm.$valid) {
        	$location.path( '/step4' );
        //}
    };

  }]);
