'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
  .controller('MainCtrl', ['$scope', '$q', '$location', 'usersService',
   function ($scope, $q, $location, usersService) {
    $scope.user = {};

    usersService.getUserData(function(result) {
      $scope.user = result;
    });
    
    $scope.next = function(){
    	// check to make sure the form is completely valid
        //if ($scope.userForm.$valid) {
        	$location.path( '/step1' );
        //}
    };

  }]);
