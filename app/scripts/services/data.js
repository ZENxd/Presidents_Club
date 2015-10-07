/*
    Consumable data for dropdowns, etc.
*/
(function() {
    'use strict';
    angular.module('presidentsClubApp')
        .service('dataService', function() {

            var data = {
                salesOrg: [{
                    id: '0',
                    name: 'LSAG/ACG'
                }, {
                    id: '1',
                    name: 'SAG2/ABC'
                }, {
                    id: '2',
                    name: 'SAG3/DEF'
                }, {
                    id: '3',
                    name: 'SAA4/EYT'
                }, {
                    id: '4',
                    name: 'SAG5/ANB'
                }],
                regions: [{
                    id: '0',
                    name: 'China'
                }, {
                    id: '1',
                    name: 'India'
                }, {
                    id: '2',
                    name: 'Russia'
                }, {
                    id: '3',
                    name: 'Italy'
                }, {
                    id: '4',
                    name: 'Australia'
                }],
                countries: [{
                    id: '0',
                    name: 'USA'
                }, {
                    id: '1',
                    name: 'Germany'
                }, {
                    id: '2',
                    name: 'Spain'
                }, {
                    id: '3',
                    name: 'England'
                }, {
                    id: '4',
                    name: 'France'
                }],
                titles: [{
                    id: '0',
                    name: 'Accountant'
                }, {
                    id: '1',
                    name: 'Account Manager'
                }, {
                    id: '2',
                    name: 'District Sales Managr'
                }, {
                    id: '3',
                    name: 'Product Designer'
                }, {
                    id: '4',
                    name: 'Product Specialist'
                }],
                salutations: [{
                    id: '0',
                    name: 'Mr'
                }, {
                    id: '1',
                    name: 'Ms'
                }, {
                    id: '2',
                    name: 'Mrs'
                }, {
                    id: '3',
                    name: 'Dr'
                }],
                winCount: [{
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
                }]
            };

            // Call this to get the data
            this.getData = function(callback) {
                callback(data);
            };

        });
})();
