'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
  .controller('MainCtrl', ['$scope', '$q', function ($scope, $q) {
  	$scope.step = 1;
  }]);
