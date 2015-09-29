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

            //The current session user
            $scope.currentUser = Parse.User.current();
            //Looks for an ID passed to the url for edit mode
            $scope.nomineeModelId = $routeParams.id;

            //Step through counter for visuals
            $scope.step = 1;
            //The data model bound to html
            $scope.nomineeModel = null;
            //The model class from the API
            $scope.nomineeClass = null;
            //For toggling edit/input mode
            $scope.editMode = false;

            //Visual DOM switches
            settings.setValue('showNav', true);
            settings.setValue('showHelp', true);
            settings.setValue('logo', true);
            settings.setValue('back', false);

            //Consumable Data for pre-population
            $scope.so = null;
            $scope.regions = null;
            $scope.countries = null;
            $scope.titles = null;
            $scope.salutations = null;

            if ($scope.nomineeModelId) {
                $scope.editMode = true;
                Nominee.queryNominee($scope.nomineeModelId).then(function(result) {
                    $scope.nomineeClass = result;
                    $scope.nomineeModel = angular.copy($scope.nomineeClass.attributes);
                });
            } else {
                $scope.editMode = false;
                //Blank template object will act as the model
                $scope.nomineeModel = Nominee.getData();
                if (!$scope.nomineeModel) {
                    $scope.step = 1;
                    Nominee.setTemplate();
                    $scope.nomineeModel = Nominee.getData();
                    $location.path('/step1');
                }
            }


            $scope.save = function(step) {
                //console.table($scope.nomineeModel);
                //console.log(JSON.stringify($scope.nomineeModel));
                // check to make sure the form is completely valid
                if ($scope.userForm.$valid) {
                    Nominee.setData($scope.nomineeModel);
                    if ($scope.editMode && $scope.nomineeModelId) {
                        Nominee.saveNominee($scope.nomineeClass).then(function(result) {
                            $scope.nomineeClass = result;
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
                if ($scope.editMode && $scope.nomineeModelId) {
                    $location.path('/step' + $scope.step + '/' + $scope.nomineeModelId);
                } else {
                    $location.path('/step' + $scope.step);
                }
            };

            $scope.saveNominee = function(step) {
                Nominee.setData($scope.nomineeModel);
                if ($scope.editMode && $scope.nomineeModelId) {
                    Nominee.saveNominee($scope.nomineeClass).then(function(result) {
                        $scope.nomineeClass = result;
                        $scope.editMode = null;
                        $scope.nomineeModelId = null;
                        $scope.step = step;
                        $scope.next();
                    });
                } else {
                    Nominee.newNominee().then(function(result) {
                        $scope.nomineeClass = result;
                        $scope.nomineeModelId = $scope.nomineeClass.id;
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
