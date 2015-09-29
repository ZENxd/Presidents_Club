'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('ListCtrl', ['$scope', '$rootScope', '$q', '$location', 'nomineeService', 'settings', 'Nominee',
        function($scope, $rootScope, $q, $location, nomineeService, settings, Nominee) {

            $scope.currentUser = Parse.User.current();

            settings.setValue('showNav', true);
            settings.setValue('logo', true);
            settings.setValue('back', false);

            $scope.nomineeModels = [];

            Nominee.getNominees().then(function(results) {
                $scope.nomineeModels = results;
            });


            // nomineeService.getNominees(function(result) {
            //     $scope.nomineeModels = result;
            // });

            $scope.detail = function(id) {
                $location.path('/list/' + id);
            };

            $scope.edit = function(id) {
                $location.path('/step1/' + id);
            };

        }
    ]);
