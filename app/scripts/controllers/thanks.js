'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:ThanksCtrl
 * @description
 * # ThanksCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('ThanksCtrl', ['$scope', '$q', '$location', 'settings', 'modelService', 
        function($scope, $q, $location, settings, modelService) {

            settings.setValue('logo', false);
            settings.setValue('back', true);
            
            $scope.restart = function() {
            	modelService.resetModel();
                $location.path('/nominee');
            };

        }
    ]);
