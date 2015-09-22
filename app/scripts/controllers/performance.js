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
    $scope.winCount = [{id: '0', name: '1'},
                        {id: '1', name: '2'},
                        {id: '2', name: '3'},
                        {id: '3', name: '4'},
                        {id: '4', name: '5'}
                      ];

  	//Consumable Data
  	$scope.salesQuota = null;
    $scope.sales = null;
    $scope.percentOver = null;
    $scope.percentLast = null;

    // employeeService.getEmployees(function(result) {
    //     $scope.employee = result[0];
    // });

  	employeeService.getEmployeeTemplate(function(result) {
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
