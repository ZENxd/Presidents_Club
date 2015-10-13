'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
  .controller('NavCtrl', ['$scope', '$rootScope', '$q', '$location', '$routeParams', 'AuthenticationService', 'settings', 'modelService', 
   function ($scope, $rootScope, $q, $location, $routeParams, AuthenticationService, settings, modelService) {
    
    $scope.settings = null;

    $scope.checkForLogin = function(){
      if($rootScope.globals.currentUser){
        return true;
      }
      return false;
    };

    $scope.getUsername = function(){
      if($rootScope.globals.currentUser){
        return $rootScope.globals.currentUser.username;
      }
      return '';
    };

    settings.getSettings(function(result) {
      $scope.settings = result;
    });

    $scope.logout = function(){
      modelService.resetModel();
      // reset login status & return to login
      AuthenticationService.ClearCredentials();
      $rootScope.cloud = false;
      $location.path('/');
    };
    
  }]);
