'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:PerformanceCtrl
 * @description
 * # PerformanceCtrl
 * Controller of the presidentsClubApp step 2
 */
angular.module('presidentsClubApp')
  .controller('PerformanceCtrl', ['$scope', '$q', '$location', 'employeeService', 'dataService', 'usersService', 'settings', 
   function ($scope, $q, $location, employeeService, dataService, usersService, settings) {
  	
    settings.setValue('showNav', true);
    settings.setValue('showHelp', true);
    settings.setValue('logo', true);
    settings.setValue('back', false);
    settings.setValue('user', false);
    
    $scope.step = 2;
  	$scope.employee = null;
  	$scope.user = null;

  	//Consumable Data
  	$scope.salesQuota = null;
    $scope.sales = null;
    $scope.percentOver = null;
    $scope.percentLast = null;

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
        //if ($scope.userForm.$valid) {
          $location.path( '/step3' );
        //}
    };

  }]);
