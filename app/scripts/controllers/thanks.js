'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:ThanksCtrl
 * @description
 * # ThanksCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('ThanksCtrl', ['$scope', '$q', '$location', 'settings', 'Nominee',
        function($scope, $q, $location, settings, Nominee) {

            $scope.currentUser = Parse.User.current();
            settings.setValue('showNav', true);
            settings.setValue('showHelp', true);
            settings.setValue('logo', true);
            settings.setValue('back', false);
            
            $scope.restart = function() {
                Nominee.resetData();
                $location.path('/step1');
            };

            $scope.view = function() {
                if($scope.currentUser){
                    Nominee.resetData();
                    $location.path('/list');
                }
            };

        }
    ]);
