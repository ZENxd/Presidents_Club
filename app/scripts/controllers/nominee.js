'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:NomineeCtrl
 * @description
 * # NomineeCtrl
 * Controller of the presidentsClubApp step 1
 */
angular.module('presidentsClubApp')
  .controller('NomineeCtrl', ['$scope', '$q', '$location', 'employeeService', 'dataService', 'usersService',
   function ($scope, $q, $location, employeeService, dataService, usersService) {
  	$scope.step = 1;
  	$scope.employee = null;
  	$scope.user = null;

  	//Consumable Data
  	$scope.so = null;
  	$scope.regions = null;
  	$scope.countries = null;
  	$scope.salutations = ['Mr', 'Ms', 'Mrs', 'Dr'];
  	$scope.titles = null;

  	employeeService.getEmployeeData(function(result) {
      $scope.employee = result;
    });

  	dataService.getData(function(result) {
      $scope.so = result.so;
      $scope.regions = result.regions;
      $scope.countries = result.countries;
      $scope.titles = result.titles;
    });

    usersService.getUserData(function(result) {
      $scope.user = result;
    });

    $scope.next = function(){
    	// check to make sure the form is completely valid
        if ($scope.userForm.$valid) {
        	$location.path( '/step2' );
        }
    };

  }]);
