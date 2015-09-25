'use strict';

/**
 * @ngdoc overview
 * @name presidentsClubApp
 * @description
 * # presidentsClubApp
 *
 * Main module of the application.
 */
angular
    .module('presidentsClubApp', [
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
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading template files from Parse.com domain.
            'http://files.parsetfss.com/**'
        ]);
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/step1', {
                templateUrl: 'views/nominee.html',
                controller: 'NomineeCtrl',
                controllerAs: 'nominee'
            })
            .when('/step2', {
                templateUrl: 'views/performance.html',
                controller: 'NomineeCtrl',
                controllerAs: 'nominee'
            })
            .when('/step3', {
                templateUrl: 'views/comments.html',
                controller: 'NomineeCtrl',
                controllerAs: 'nominee'
            })
            .when('/step4', {
                templateUrl: 'views/nominator.html',
                controller: 'NomineeCtrl',
                controllerAs: 'nominee'
            })
            .when('/step5', {
                templateUrl: 'views/thanks.html',
                controller: 'ThanksCtrl',
                controllerAs: 'thanks'
            })
            .when('/list', {
                templateUrl: 'views/list.html',
                controller: 'ListCtrl',
                controllerAs: 'list'
            })
            .when('/list/:id', {
                templateUrl: 'views/detail.html',
                controller: 'DetailCtrl',
                controllerAs: 'detail'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(['$rootScope', '$location', function($scope, $location) {
            //Parse app init
            Parse.initialize("iN0dCO4RxgFH95fp0Ie9ONiwXTnjuj6nS3UeCxBW", "rJfKosKbp4myNqeWYECjDgxCNb77NZrmAdcq9oMc");
            $scope.currentUser = Parse.User.current();

            $scope.logOut = function() {
                Parse.User.logOut();
                $scope.currentUser = null;
                $location.path('/');
            };

        }])
        .value('globals', {
            loader: {
                show: false
            }
        });
