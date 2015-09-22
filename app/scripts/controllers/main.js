'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
  .controller('MainCtrl', ['$scope', '$q', '$location', 'usersService', 'settings', 
   function ($scope, $q, $location, usersService, settings) {

    settings.setValue('showNav', true);
    settings.setValue('showHelp', false);
    settings.setValue('logo', true);
    settings.setValue('back', false);
    settings.setValue('user', false);
    
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
