'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('DetailCtrl', ['$scope', '$rootScope', '$q', '$location', 'nomineeService', '$routeParams', 'settings', 'Nominee',
        function($scope, $rootScope, $q, $location, nomineeService, $routeParams, settings, Nominee) {

            settings.setValue('showNav', true);
            settings.setValue('logo', false);
            settings.setValue('back', true);

            $scope.nomineeModel = null;
            $scope.nomineeModelId = $routeParams.id;

            Nominee.queryNominee($scope.nomineeModelId).then(function(result) {
                $scope.nomineeModel = result;
            });

            // nomineeService.queryNominee(function(result) {
            //   $scope.nomineeModel = result;
            // },
            //   //Pass params to service
            //   $scope.nomineeModelId
            // );

            $scope.approve = function(id) {
                $scope.id = id;
                $scope.nomineeModel.set('nomStatus', 'Approved');
                $scope.save();
            };

            $scope.deny = function(id) {
                $scope.id = id;
                $scope.nomineeModel.set('nomStatus', 'Denied');
                $scope.save();
            };

            $scope.save = function() {
                $scope.nomineeModel.save(null, {
                    success: function(result) {
                        console.log(result.id);
                    },
                    error: function(result, error) {
                        console.log(error.message);
                    }
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
