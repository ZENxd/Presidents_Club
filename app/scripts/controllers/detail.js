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
    settings.setValue('user', true);

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
      $scope.employee.nomStatus = 'Approved';
    };

    $scope.deny = function(id){
      $scope.id = id;
      $scope.employee.nomStatus = 'Denied';
    };

    $scope.back = function(){
      $location.path( '/list' );
    };

    $scope.formatPhone = function(value) {
      if(value.length === 10)
      {
        value = value.replace(/-/g, '');
        var areaCode = value.substring(0, 3);
        var exchange = value.substring(3, 6);
        var tail = value.substring(6);
        return "(" + areaCode + ")" + "-" + exchange + "-" + tail;
      } else {
        return '';
      }
    };

  }]);
