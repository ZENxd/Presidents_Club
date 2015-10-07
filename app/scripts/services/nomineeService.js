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
                    Server REST API Calls
                    Change URL's to path to your REST call.
                */
                //Post a nominee
                postNominee: function(dataObj) {
                    var q = $q.defer();
                    $http.post('/api/v1/nominees', dataObj)
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
                    $http.get('/api/v1/nominees')
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
                    $http.get('/api/v1/nominees' + id)
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
                nominatedByManager: 'No',
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
                nominator: {
                    first: '',
                    last: '',
                    email: '',
                    phone: ''
                },
                nominationStatus: ''
            };
            nomineeModel = angular.copy(template);

            this.getModel = function(callback) {
                callback(nomineeModel);
            };
            this.updateModel = function(model) {
                nomineeModel = model;
            };
        });
})();
