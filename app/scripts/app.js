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
  .config(function ($routeProvider) {
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
        controller: 'PerformanceCtrl',
        controllerAs: 'performance'
      })
      .when('/step3', {
        templateUrl: 'views/comments.html',
        controller: 'CommentsCtrl',
        controllerAs: 'comments'
      })
      .when('/step4', {
        templateUrl: 'views/nominator.html',
        controller: 'NominatorCtrl',
        controllerAs: 'nominator'
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
  .run(function($rootScope) {
    //set global values
    $rootScope.foo = 'bar';
});
