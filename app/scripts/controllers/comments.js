'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:CommentsCtrl
 * @description
 * # CommentsCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('CommentsCtrl', ['$scope', '$q', '$location', 'employeeService', 'usersService', 'settings', 
        function($scope, $q, $location, employeeService, usersService, settings) {

            settings.setValue('showNav', true);
            settings.setValue('showHelp', true);
            settings.setValue('logo', true);
            settings.setValue('back', false);
            settings.setValue('user', false);

            $scope.step = 3;
            $scope.user = {};
            $scope.employee = null;

            // employeeService.getEmployees(function(result) {
            //     $scope.employee = result[0];
            // });
            
            employeeService.getEmployeeTemplate(function(result) {
                $scope.employee = result;
            });

            usersService.getUserData(function(result) {
                $scope.user = result;
            });

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
