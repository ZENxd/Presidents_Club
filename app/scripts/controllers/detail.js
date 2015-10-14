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
            }

            settings.setValue('logo', false);
            settings.setValue('back', true);

            $scope.nomineeModel = null;
            $scope.nomineeModelId = $routeParams.id;

            $scope.scrollTo = function(id) {
                $location.hash(id);
                $anchorScroll();
            };

            demoService.queryNominee(function(result) {
                    $scope.nomineeModel = result;
                },
                //Pass id as param to service
                $scope.nomineeModelId
            );

            $scope.approve = function(id) {
                //Demo
                var value = ($scope.nomineeModel.nomStatus === 'Approved') ? 'Awaiting Approval' : 'Approved';
                demoService.save(id, value);
                //$scope.back();
                //

                //API call
                //$scope.save(id, 'Approved');

                
            };

            $scope.deny = function(id) {
                //Demo
                var value = ($scope.nomineeModel.nomStatus === 'Denied') ? 'Awaiting Approval' : 'Denied';
                demoService.save(id, value);
                //$scope.back();
                //

                //API call
                //$scope.save(id, 'Denied');
            };

            //API only
            $scope.save = function(id, value) {
                //Update model to server
                var vote = {'id':id, 'value':value};
                nomineeService.updateNominee(vote).then(function(result) {
                    console.log(result);
                    $scope.back();
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
