'use strict';

/**
 * @ngdoc function
 * @name presidentsClubApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the presidentsClubApp
 */
angular.module('presidentsClubApp')
    .controller('MainCtrl', ['$scope', '$rootScope', '$q', '$location', 'settings', 'globals', '$timeout',
        function($scope, $rootScope, $q, $location, settings, globals, $timeout) {

            if ($scope.currentUser) {
                $location.path('/step1');
            }

            $scope.signIn = true;
            $scope.username = null;
            $scope.email = null;
            $scope.password = null;
            $scope.signupEmail = null;
            $scope.signupPassword = null;

            $scope.alert = {
                type: 'danger',
                msg: 'Unrecognized email & or password.'
            };
            $scope.loginError = false;

            settings.setValue('showNav', true);
            settings.setValue('showHelp', false);
            settings.setValue('logo', true);
            settings.setValue('back', false);


            $scope.tryLogin = function() {
                globals.loader.show = true;
                $scope.loginError = false;
                if ($scope.password) {

                    Parse.User.logIn($scope.email, $scope.password, {
                        success: function(user) {
                            $scope.currentUser = user;
                            $scope.$apply();
                            $timeout(function() {
                                $scope.login();
                            }, 500);
                        },
                        error: function(user, error) {
                            globals.loader.show = false;
                            $scope.loginError = true;
                            console.log("Unable to log in: " + error.code + " " + error.message);
                        }
                    });
                }
            };

            $scope.trySignup = function() {
                globals.loader.show = true;
                var user = new Parse.User();
                user.set("email", $scope.signupEmail);
                user.set("username", $scope.signupEmail);
                user.set("password", $scope.signupPassword);

                user.signUp(null, {
                    success: function(user) {
                        $scope.currentUser = user;
                        $scope.$apply();
                        $timeout(function() {
                            $scope.login();
                        }, 500);
                    },
                    error: function(user, error) {
                        globals.loader.show = false;
                        $scope.loginError = true;
                        console.log("Unable to sign up:  " + error.code + " " + error.message);
                    }
                });
            };

            $scope.login = function() {
                globals.loader.show = false;
                $location.path('/step1');
            };

        }
    ]);
