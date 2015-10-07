'use strict';

/**
 * @ngdoc overview
 * @name presidentsClubApp
 * @description
 * # presidentsClubApp
 *
 * Main module of the application.
 */
angular.module('presidentsClubApp', [
        'ngAnimate',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.mask'
    ])
    .config(function($routeProvider, $sceDelegateProvider, $httpProvider) {
        $httpProvider.useApplyAsync(true);
        $routeProvider
            .when('/', {
                templateUrl: 'views/login.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/nominee', {
                templateUrl: 'views/nominee.html',
                controller: 'NomineeCtrl',
                controllerAs: 'nominee'
            })
            .when('/performance', {
                templateUrl: 'views/performance.html',
                controller: 'NomineeCtrl',
                controllerAs: 'nominee'
            })
            .when('/comments', {
                templateUrl: 'views/comments.html',
                controller: 'NomineeCtrl',
                controllerAs: 'nominee'
            })
            .when('/thanks', {
                templateUrl: 'views/thanks.html',
                controller: 'ThanksCtrl',
                controllerAs: 'thanks'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function($rootScope, $location, $cookieStore, $http) {
            $rootScope.cloud = false;
            // keep user logged in after page refresh
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }

            $rootScope.$on('$locationChangeStart', function(event, next, current) { // jshint ignore:line
                // redirect to login page if not logged in
                if ($location.path() !== '/' && !$rootScope.globals.currentUser) {
                    $location.path('/');
                }
            });
        }
    ])
    .value('globals', {
        loader: {
            show: false
        }
    });
