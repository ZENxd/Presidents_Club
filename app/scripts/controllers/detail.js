'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('DetailCtrl', ['$scope', '$rootScope', '$q', '$location', 'employeeService', '$routeParams', 'settings', 'Nominee',
        function($scope, $rootScope, $q, $location, employeeService, $routeParams, settings, Nominee) {

            if (!Parse.User.current()) {
                $location.path('/');
            }

            settings.setValue('showNav', true);
            settings.setValue('logo', false);
            settings.setValue('back', true);

            $scope.employee = null;
            $scope.employeeId = $routeParams.id;

            Nominee.queryNominee($scope.employeeId).then(function(result) {
                $scope.employee = result;
            });

            // employeeService.queryEmployee(function(result) {
            //   $scope.employee = result;
            // },
            //   //Pass params to service
            //   $scope.employeeId
            // );

            $scope.approve = function(id) {
                $scope.id = id;
                $scope.employee.set('nomStatus', 'Approved');
                $scope.save();
            };

            $scope.deny = function(id) {
                $scope.id = id;
                $scope.employee.set('nomStatus', 'Denied');
                $scope.save();
            };

            $scope.save = function() {
                $scope.employee.save(null, {
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
