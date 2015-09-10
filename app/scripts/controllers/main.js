'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
  .controller('MainCtrl', ['$scope', '$q', 'employeeService', 'dataService', function ($scope, $q, employeeService, dataService) {
  	$scope.step = 1;
  	$scope.employee = null;

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

  }]);
