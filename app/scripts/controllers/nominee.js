'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:NomineeCtrl
 * @description
 * # NomineeCtrl
 * Controller of the presidentsClubApp nomination forms
 */
angular.module('presidentsClubApp')
    .controller('NomineeCtrl', ['$scope', '$rootScope', '$location', '$routeParams', 'dataService', 'settings', 'modelService', 'nomineeService',
        function($scope, $rootScope, $location, $routeParams, dataService, settings, modelService, nomineeService) {

            //Bounce to here if we have a user not logged in
            if (!$rootScope.globals.currentUser) {
                $location.path('/');
            } else {
                $rootScope.cloud = true;
            }

            $scope.submitError = false;

            //The persistant data model bound to html
            modelService.getModel(function(result) {
                $scope.nomineeModel = result;
                //Bind user login credentials to niminee model -> nimonator attributes
                /*
                $scope.nomineeModel.nominator.nom_first = $rootScope.globals.currentUser.userFirst;
                $scope.nomineeModel.nominator.nom_last = $rootScope.globals.currentUser.userLast;
                $scope.nomineeModel.nominator.nom_email = $rootScope.globals.currentUser.userEmail;
                */
            });

            //Top nav DOM visual switches
            settings.setValue('logo', false);
            settings.setValue('back', true);
            settings.setValue('backText', 'RETURN TO HOME');
            settings.setValue('backLink', '#/');

            //Step forward to next form after validation
            $scope.next = function(url) {
                if ($scope.userForm.$valid) {
                    //Update local model for persistance
                    modelService.updateModel($scope.nomineeModel);
                    $location.path('/' + url);
                }
            };

            //Step back to previous form
            $scope.back = function(url) {
                $scope.submitError = false;
                //Update local model for persistance
                modelService.updateModel($scope.nomineeModel);
                $location.path('/' + url);
            };

            /*
                Last form (Step 3) calls this method
                Call postNominee in nomineeService here.

            */
            $scope.save = function(url) {
                $scope.submitError = false;
                if ($scope.userForm.$valid) {
                    //Update local model for persistance
                    modelService.updateModel($scope.nomineeModel);

                    var checkModel = true;
                    for (var prop in $scope.nomineeModel) {
                        if ($scope.nomineeModel.hasOwnProperty(prop)) {
                            if ($scope.nomineeModel[prop] === null || $scope.nomineeModel[prop] === '') {
                                console.log(prop, ' was null');
                                if(prop === 'winCount'){
                                    console.log('Ignoring winCount');
                                } else if(prop === 'years'){
                                    console.log('Ignoring years');
                                } else if(prop === 'nominationStatus'){
                                    console.log('Ignoring nominationStatus');
                                } else {
                                    checkModel = false;
                                }
                            }
                        }
                    }

                    if (!checkModel) {
                        $location.path('/nominee');
                    } else {
                        //Post model to server
                        nomineeService.postNominee($scope.nomineeModel).then(function(result) {
                            if (result.error) {
                                $scope.submitError = true;
                            }
                            //Goto thank you page.
                            $location.path('/' + url);
                        });
                    }

                }
            };

            //Consumable Data for pre-population, dropdowns etc.
            dataService.getData(function(result) {
                $scope.salesOrg = result.salesOrg;
                $scope.regions = result.regions;
                $scope.countries = result.countries;
                $scope.titles = result.titles;
                $scope.salutations = result.salutations;
                $scope.winCount = result.winCount;
            });

        }
    ])
    /*
        Directive to handle 70 word max in textarea validation
    */
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
/*
    .directive('currencyMask', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelController) {
                // Run formatting on keyup
                var numberWithCommas = function(value, addExtraZero) {
                    if (addExtraZero == undefined)
                        addExtraZero = false
                    value = value.toString();
                    value = value.replace(/[^0-9\.]/g, "");
                    var parts = value.split('.');
                    parts[0] = parts[0].replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
                    if (parts[1] && parts[1].length > 2) {
                        parts[1] = parts[1].substring(0, 2);
                    }
                    if (addExtraZero && parts[1] && (parts[1].length === 1)) {
                        parts[1] = parts[1] + "0"
                    }
                    return parts.join(".");
                };
                var applyFormatting = function() {
                    var value = element.val();
                    var original = value;
                    if (!value || value.length == 0) {
                        return
                    }
                    value = numberWithCommas(value);
                    if (value != original) {
                        element.val(value);
                        element.triggerHandler('input')
                    }
                };
                element.bind('keyup', function(e) {
                    var keycode = e.keyCode;
                    var isTextInputKey =
                        (keycode > 47 && keycode < 58) || // number keys
                        keycode == 32 || keycode == 8 || // spacebar or backspace
                        (keycode > 64 && keycode < 91) || // letter keys
                        (keycode > 95 && keycode < 112) || // numpad keys
                        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
                        (keycode > 218 && keycode < 223); // [\]' (in order)
                    if (isTextInputKey) {
                        applyFormatting();
                    }
                });
                ngModelController.$parsers.push(function(value) {
                    if (!value || value.length == 0) {
                        return value;
                    }
                    value = value.toString();
                    value = value.replace(/[^0-9\.]/g, "");
                    return value;
                });
                ngModelController.$formatters.push(function(value) {
                    if (!value || value.length == 0) {
                        return value;
                    }
                    value = numberWithCommas(value, true);
                    return value;
                });
            }
        };
    });
*/
