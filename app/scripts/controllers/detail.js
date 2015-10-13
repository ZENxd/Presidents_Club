'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('DetailCtrl', ['$scope', '$rootScope', '$location', '$routeParams', 'demoService', 'settings', 
        function($scope, $rootScope, $location, $routeParams, demoService, settings) {

            settings.setValue('logo', false);
            settings.setValue('back', true);

            $scope.nomineeModel = null;
            $scope.nomineeModelId = $routeParams.id;


            demoService.queryNominee(function(result) {
              $scope.nomineeModel = result;
            },
              //Pass id as param to service
              $scope.nomineeModelId
            );

            $scope.approve = function(id) {
                demoService.save(id, 'Approved');
                $scope.back();
            };

            $scope.deny = function(id) {
                demoService.save(id, 'Denied');
                $scope.back();
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
