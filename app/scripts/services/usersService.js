(function() {
  'use strict';
  angular.module('presidentsClubApp')
    .service('usersService', function() {
      
      var data = {
       'id': '1',
       'first': '',
       'last': '',
       'officeTel': '',
       'mobileTel': '',
       'email': '',
       'title': '',
       'submitter': 'No',
       'submitterFirst': '',
       'submitterLast': '',
       'submitterEmail': ''
      };

      this.getUserData = function(callback) {
        callback(data);
      };

    });
})();