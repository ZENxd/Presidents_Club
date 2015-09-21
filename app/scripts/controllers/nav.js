'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
  .controller('NavCtrl', ['$scope', '$q', '$location', '$routeParams', 'settings', 
   function ($scope, $q, $location, $routeParams, settings) {
    
    $scope.settings = null;

    settings.getSettings(function(result) {
      $scope.settings = result;
    });

  }]);
