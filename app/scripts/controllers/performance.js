'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:PerformanceCtrl
 * @description
 * # PerformanceCtrl
 * Controller of the presidentsClubApp step 2
 */
angular.module('presidentsClubApp')
  .controller('PerformanceCtrl', ['$scope', '$q', '$location', 'employeeService', 'dataService', 'usersService',
   function ($scope, $q, $location, employeeService, dataService, usersService) {
  	$scope.step = 2;
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

  }]);
