/**
 * @ngdoc function
 * @name presidentsClubApp.service:nomineeService
 * @description
 * # NomineeService
 * Main HTTP Service for the presidentsClubApp
 */
(function() {
    'use strict';
    angular.module('presidentsClubApp')
        .factory('nomineeService', function($http, $log, $q) {
            return {
                /* 
                    Server REST API (CRUD) operations.
                    Change URL's to path to your REST call.
                */
                //Post a nominee
                postNominee: function(dataObj) {
                    var q = $q.defer();
                    $http.post('/api/v1/save', dataObj)
                        .success(function(result) {
                            q.resolve(result);
                        }).error(function(msg, code) {
                            q.reject(msg);
                            console.log(msg, code);
                        });
                    return q.promise;
                },
                //Update nominee (Approve, Deny)
                updateNominee: function(dataObj) {
                    var q = $q.defer();
                    $http.post('/api/v1/update', dataObj)
                        .success(function(result) {
                            q.resolve(result);
                        }).error(function(msg, code) {
                            q.reject(msg);
                            console.log(msg, code);
                        });
                    return q.promise;
                },
                //Get all nominees
                getNominees: function() {
                    var q = $q.defer();
                    $http.get('/api/v1/query')
                        .success(function(result) {
                            q.resolve(result);
                        }).error(function(msg, code) {
                            q.reject(msg);
                            console.log(msg, code);
                        });
                    return q.promise;
                },
                //Get a nominee by id
                getNomineeById: function(id) {
                    var q = $q.defer();
                    $http.get('/api/v1/query' + id)
                        .success(function(result) {
                            q.resolve(result);
                        }).error(function(msg, code) {
                            q.reject(msg);
                            console.log(msg, code);
                        });
                    return q.promise;
                }
            };
        })
        /*
            Service used to persist the data throughout the form flow
        */
        .service('modelService', function() {
            var nomineeModel = null;
            var template = {
                number: '',
                salesOrg: {},
                region: {},
                country: {},
                salutation: {},
                first: '',
                last: '',
                address: '',
                officeTel: '',
                mobileTel: '',
                email: '',
                title: {},
                recurringWinner: 'No',
                winCount: {},
                years: '',
                performance: {
                    salesQuota: null,
                    sales: null,
                    percentOver: null,
                    percentLast: null
                },
                comments: {
                    performance: '',
                    planning: '',
                    relationship: '',
                    behavior: '',
                    leadership: ''
                },
                nominationStatus: '',
                winner: false
            };
            nomineeModel = angular.copy(template);

            this.getModel = function(callback) {
                callback(nomineeModel);
            };
            this.updateModel = function(model) {
                nomineeModel = model;
            };
            this.resetModel = function() {
                nomineeModel = angular.copy(template);
            };
        });
})();
