'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
  .controller('ListCtrl', ['$scope', '$q', '$location', 'employeeService', 'usersService', 'settings', 
   function ($scope, $q, $location, employeeService, usersService, settings) {

    settings.setValue('showNav', true);
    settings.setValue('logo', true);
    settings.setValue('back', false);
    settings.setValue('user', true);

    $scope.user = {};
    $scope.employees = [];

    employeeService.getEmployees(function(result) {
        $scope.employees = result;
    });

    usersService.getUserData(function(result) {
      $scope.user = result;
    });

    $scope.detail = function(id){
        $location.path( '/list/'+id );
    };

  }]);
