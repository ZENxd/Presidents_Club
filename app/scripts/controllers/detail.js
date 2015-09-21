'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
  .controller('DetailCtrl', ['$scope', '$q', '$location', 'employeeService', 'usersService', '$routeParams', 'settings', 
   function ($scope, $q, $location, employeeService, usersService, $routeParams, settings) {

    settings.setValue('showNav', true);
    settings.setValue('logo', false);
    settings.setValue('back', true);

    $scope.user = {};
    $scope.employee = null;
    $scope.employeeId = $routeParams.id;

    usersService.getUserData(function(result) {
      $scope.user = result;
    });
    
    employeeService.queryEmployee(function(result) {
      $scope.employee = result;
    },
      //Pass params to service
      $scope.employeeId
    );

    $scope.approve = function(id){
      $scope.id = id;
      $scope.employee.status = 'Approved';
    };

    $scope.deny = function(id){
      $scope.id = id;
      $scope.employee.status = 'Denied';
    };

    $scope.back = function(){
      $location.path( '/list' );
    };

  }]);
