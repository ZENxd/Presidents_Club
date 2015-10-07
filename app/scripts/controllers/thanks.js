'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:ThanksCtrl
 * @description
 * # ThanksCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('ThanksCtrl', ['$scope', '$q', '$location', 'settings', 
        function($scope, $q, $location, settings) {

            settings.setValue('logo', false);
            settings.setValue('back', true);
            
            $scope.restart = function() {
                $location.path('/nominee');
            };

        }
    ]);
