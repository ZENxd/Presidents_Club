'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:CommentsCtrl
 * @description
 * # CommentsCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('CommentsCtrl', ['$scope', '$rootScope', '$q', '$location', 'Nominee', 'dataService', 'settings', '$routeParams',
        function($scope, $rootScope, $q, $location, Nominee, dataService, settings, $routeParams) {

            $scope.currentUser = Parse.User.current();
            $scope.employeeId = $routeParams.id;

            settings.setValue('showNav', true);
            settings.setValue('showHelp', true);
            settings.setValue('logo', true);
            settings.setValue('back', false);

            $scope.step = 3;
            $scope.employee = null;

            if ($scope.employeeId) {
                Nominee.queryNominee(function(result) {
                    $scope.employee = result;
                });
            } else {
                $location.path('/step1');
            }

            $scope.next = function() {
                // check to make sure the form is completely valid
                //if ($scope.userForm.$valid) {
                $location.path('/step4');
                //}
            };

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
