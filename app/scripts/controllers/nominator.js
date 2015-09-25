'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:NominatorCtrl
 * @description
 * # NominatorCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('NominatorCtrl', ['$scope', '$rootScope', '$q', '$location', 'Nominee', 'dataService', 'settings', '$routeParams',  
        function($scope, $rootScope, $q, $location, Nominee, dataService, settings, $routeParams) {

            $scope.currentUser = Parse.User.current();
            $scope.employeeId = $routeParams.id;

            settings.setValue('showNav', true);
            settings.setValue('showHelp', true);
            settings.setValue('logo', true);
            settings.setValue('back', false);

            $scope.step = 4;
            $scope.employee = null;

            if ($scope.employeeId) {
                Nominee.queryNominee(function(result) {
                    $scope.employee = result;
                });
            } else {
                $location.path('/step1');
            }

            $scope.saveNominee = function() {
                if ($scope.currentUser) {
                    Nominee.saveNominee($scope.employee).then(function(nominee) {
                        $scope.employeeId = nominee;
                        console.log('Nominee Saved');
                        $location.path('/step5');
                    });
                }
            };

        }
    ]);
