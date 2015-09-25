'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:NomineeCtrl
 * @description
 * # NomineeCtrl
 * Controller of the presidentsClubApp step 1
 */
angular.module('presidentsClubApp')
    .controller('NomineeCtrl', ['$scope', '$rootScope', '$q', '$location', 'Nominee', 'dataService', 'settings', '$routeParams',
        function($scope, $rootScope, $q, $location, Nominee, dataService, settings, $routeParams) {

            $scope.currentUser = Parse.User.current();
            $scope.employeeId = $routeParams.id;

            $scope.step = 1;
            $scope.employee = null;
            $scope.nominee = null;
            $scope.editMode = false;


            settings.setValue('showNav', true);
            settings.setValue('showHelp', true);
            settings.setValue('logo', true);
            settings.setValue('back', false);

            //Consumable Data
            $scope.so = null;
            $scope.regions = null;
            $scope.countries = null;
            $scope.titles = null;
            $scope.salutations = null;

            if ($scope.employeeId) {
                $scope.editMode = true;
                Nominee.queryNominee($scope.employeeId).then(function(result) {
                    $scope.nominee = result;
                    $scope.employee = angular.copy($scope.nominee.attributes);
                });
            } else {
                $scope.editMode = false;
                $scope.employee = Nominee.getData();
                if (!$scope.employee) {
                    $scope.step = 1;
                    Nominee.setTemplate();
                    $scope.employee = Nominee.getData();
                    $location.path('/step1');
                }
            }


            $scope.save = function(step) {
                // check to make sure the form is completely valid
                if ($scope.userForm.$valid) {
                    Nominee.setData($scope.employee);
                    if ($scope.editMode && $scope.employeeId) {
                        Nominee.saveNominee($scope.nominee).then(function(result) {
                            $scope.nominee = result;
                            $scope.step = step;
                            $scope.next();
                        });
                    } else {
                        $scope.step = step;
                        $scope.next();
                    }
                }
            };

            $scope.next = function() {
                if ($scope.editMode && $scope.employeeId) {
                    $location.path('/step' + $scope.step + '/' + $scope.employeeId);
                } else {
                    $location.path('/step' + $scope.step);
                }
            };

            $scope.saveNominee = function(step) {
                Nominee.setData($scope.employee);
                if ($scope.editMode && $scope.employeeId) {
                    Nominee.saveNominee($scope.nominee).then(function(result) {
                        $scope.nominee = result;
                        $scope.editMode = null;
                        $scope.employeeId = null;
                        $scope.step = step;
                        $scope.next();
                    });
                } else {
                    Nominee.newNominee().then(function(result) {
                        $scope.nominee = result;
                        $scope.employeeId = $scope.nominee.id;
                        $scope.step = step;
                        $scope.next();
                    });
                }

            };

            dataService.getData(function(result) {
                $scope.so = result.so;
                $scope.regions = result.regions;
                $scope.countries = result.countries;
                $scope.titles = result.titles;
                $scope.salutations = result.salutations;
            });

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
        }
    ])
    .directive('maximumWordsValidation', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {
                // Figure out name of count variable we will set on parent scope
                var wordCountName = attrs.ngModel.replace('.', '_') + '_words_count';

                scope.$watch(function() {
                    return ngModelCtrl.$modelValue;
                }, function(newValue) {
                    var str = newValue && newValue.replace('\n', '');
                    // Dont split when string is empty, else count becomes 1
                    var wordCount = str ? str.split(' ').length : 0;
                    // Set count variable
                    scope.$parent[wordCountName] = wordCount;
                    // Update validity
                    var max = attrs.maximumWordsValidation;
                    ngModelCtrl.$setValidity('maximumWords', wordCount <= max);
                });
            }
        };
    });
