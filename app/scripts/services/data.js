(function() {
  'use strict';
  angular.module('presidentsClubApp')
    .service('dataService', function() {

      var data = {
        'so': [
        'Sales Organization 1',
        'Sales Organization 2',
        'Sales Organization 3',
        'Sales Organization 4',
        'Sales Organization 5',
        ],
        'regions': [
        'Region 1',
        'Region 2',
        'Region 3',
        'Region 4',
        'Region 5'
        ],
        'countries': [
        'Country 1',
        'Country 2',
        'Country 3',
        'Country 4',
        'Country 5'
        ],
        'titles': [
        'Title 1',
        'Title 2',
        'Title 3',
        'Title 4',
        'Title 5'
        ]
      };

      this.getData = function(callback) {
        callback(data);
      };

    });
})();