'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('DetailCtrl', ['$scope', '$rootScope', '$location', '$routeParams', 'nomineeService', 'demoService', 'settings', '$anchorScroll', 
        function($scope, $rootScope, $location, $routeParams, nomineeService, demoService, settings, $anchorScroll) {

            //Bounce to here if we have a user not logged in
            if (!$rootScope.globals.currentUser) {
                $location.path('/');
            } else {
                $rootScope.cloud = true;
                $scope.authLevel = $rootScope.globals.currentUser.authLevel;
            }

            settings.setValue('logo', false);
            settings.setValue('back', true);
            settings.setValue('backText', '2015 Nominees');
            settings.setValue('backLink', '#/list');
            
            $scope.nomineeModel = null;
            $scope.nomineeModelId = $routeParams.id;

            $scope.scrollTo = function(id) {
                $location.hash(id);
                $anchorScroll();
            };

            // Use for Demo only
            demoService.queryNominee(function(result) {
                    $scope.nomineeModel = result;
                },
                //Pass id as param to service
                $scope.nomineeModelId
            );

            // Use for API only
            /*
            nomineeService.getNomineeById($scope.nomineeModelId).then(function(result) {
                $scope.nomineeModel = result;
            });
            */

            $scope.approve = function() {
                var value = ($scope.nomineeModel.nomStatus === 'Approved') ? 'Awaiting Approval' : 'Approved';
                $scope.nomineeModel.nomStatus = value;

                // Demo Save
                demoService.save($scope.nomineeModelId, $scope.nomineeModel);

                // API Save
                //$scope.save($scope.nomineeModelId, 'Approved');
            };

            $scope.deny = function() {
                var value = ($scope.nomineeModel.nomStatus === 'Denied') ? 'Awaiting Approval' : 'Denied';
                $scope.nomineeModel.nomStatus = value;

                // Demo Save
                demoService.save($scope.nomineeModelId, $scope.nomineeModel);

                // API Save
                //$scope.save($scope.nomineeModelId, 'Denied');
            };

            $scope.winner = function() {
                var value = ($scope.nomineeModel.winner) ? false : true;
                $scope.nomineeModel.winner = value;

                // Demo Winner
                demoService.save($scope.nomineeModelId, $scope.nomineeModel);

                // API Winner
                //$scope.save($scope.nomineeModelId, 'Denied');
            };

            // API only
            $scope.save = function() {
                //Update model to server
                nomineeService.updateNominee($scope.nomineeModel).then(function(result) {
                    console.log(result);
                });
            };

            $scope.back = function() {
                $location.path('/list');
            };

            $scope.formatPhone = function(value) {
                if (value && value.length === 10) {
                    value = value.replace(/-/g, '');
                    var areaCode = value.substring(0, 3);
                    var exchange = value.substring(3, 6);
                    var tail = value.substring(6);
                    return "(" + areaCode + ")" + "-" + exchange + "-" + tail;
                } else {
                    return '';
                }
            };

        }
    ]);
