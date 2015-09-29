'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
  .controller('NavCtrl', ['$scope', '$rootScope', '$q', '$location', '$routeParams', 'settings', 'Nominee',
   function ($scope, $rootScope, $q, $location, $routeParams, settings, Nominee) {
    
    $scope.currentUser = Parse.User.current();
    $scope.settings = null;

    $scope.checkForLogin = function(){
      $scope.currentUser = Parse.User.current();
      if(Parse.User.current()){
        return true;
      }
      return false;
    };

    $scope.getEmail = function(){
      if(Parse.User.current()){
        return Parse.User.current().get('email');
      }
      return '';
    };

    settings.getSettings(function(result) {
      $scope.settings = result;
    });

    $scope.logout = function(){
      Nominee.resetData();
      $rootScope.logOut();
    };
    
  }]);
