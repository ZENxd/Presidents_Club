(function() {
  'use strict';
  angular.module('presidentsClubApp')
    .service('employeeService', function() {
      
      var data = {
       'id': '1',
       'number': '',
       'so': '',
       'region': '',
       'country': '',
       'salutation': '',
       'first': '',
       'last': '',
       'address': '',
       'officeTel': '',
       'mobileTel': '',
       'email': '',
       'title': '',
       'nominatedByManager': 'Yes',
       'recurringWinner': 'No',
       'winCount': '',
       'years': ''
      };

      this.getEmployeeData = function(callback) {
        callback(data);
      };

    });
})();