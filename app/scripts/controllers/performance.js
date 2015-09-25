'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:PerformanceCtrl
 * @description
 * # PerformanceCtrl
 * Controller of the presidentsClubApp step 2
 */
angular.module('presidentsClubApp')
    .controller('PerformanceCtrl', ['$scope', '$rootScope', '$q', '$location', 'Nominee', 'dataService', 'settings', '$routeParams',
        function($scope, $rootScope, $q, $location, Nominee, dataService, settings, $routeParams) {

            $scope.currentUser = Parse.User.current();
            $scope.employeeId = $routeParams.id;

            settings.setValue('showNav', true);
            settings.setValue('showHelp', true);
            settings.setValue('logo', true);
            settings.setValue('back', false);

            $scope.step = 2;
            $scope.employee = null;
            $scope.user = null;
            $scope.winCount = [{
                id: '0',
                name: '1'
            }, {
                id: '1',
                name: '2'
            }, {
                id: '2',
                name: '3'
            }, {
                id: '3',
                name: '4'
            }, {
                id: '4',
                name: '5'
            }];

            //Consumable Data
            $scope.salesQuota = null;
            $scope.sales = null;
            $scope.percentOver = null;
            $scope.percentLast = null;

            if ($scope.employeeId) {
                Nominee.queryNominee($scope.employeeId).then(function(result) {
                    $scope.employee = result;
                });
            } else {
                $location.path('/step1');
            }

            dataService.getData(function(result) {
                $scope.so = result.so;
                $scope.regions = result.regions;
                $scope.countries = result.countries;
                $scope.titles = result.titles;
            });

            $scope.next = function() {
                // check to make sure the form is completely valid
                //if ($scope.userForm.$valid) {
                Nominee.updateNominee(function(result) {
                        $scope.temp = result;
                        $location.path('/step3/' + $scope.employeeId);
                    },
                    //Pass params to service
                    $scope.employee
                );
                //}
            };

        }
    ]);
