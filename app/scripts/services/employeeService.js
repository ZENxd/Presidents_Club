(function() {
  'use strict';
  angular.module('presidentsClubApp')
    .service('employeeService', function() {
      
      var template = {
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
       'years': '',
       'comments': {
          'performance' : '',
          'planning': '',
          'relationship': '',
          'behavior': '',
          'leadership': ''
       }
      };

      this.getEmployeeData = function(callback) {
        callback(template);
      };

      var nominees = [
        {first: 'BEN', last: 'EDWARDS', title: 'Product Specialist'},
        {first: 'MATTHEW', last: ' TYRELL', title: 'Account Manager' },
        {first: 'ALLISON', last: 'CAMPBELL', title: 'District Sales Manager'},
        {first: 'JESSE', last: 'BENNETT-CHAMBERLAIN', title: 'Product Specialist'},
        {first: 'KIRK', last: 'HERRON', title: 'Product Specialist'},
        {first: 'TAYLOR', last: 'BOSWELL', title: 'Account Manager'},
        {first: 'JENNIFER', last: 'BRADSHAW', title: 'District Sales Manager'},
        {first: 'BRIAN', last: 'KAUFMAN', title: 'Product Specialist'},
        {first: 'CARLOS', last: 'SANCHEZ', title: 'Product Specialist' },
        {first: 'WEYLAND', last: 'ERICKSON', title: 'Account Manager'},
        {first: 'AMY', last: 'PARKER', title: 'District Sales Manager'},
        {first: 'DUSTIN', last: 'ANDERSON', title: 'Product Specialist'}
      ];

      var nominators = [
        'Trent Walton', 'Jeremy Turner', 'Megham Armstrong', 'Ed Williams',
        'Trent Walton', 'Jeremy Turner', 'Megham Armstrong', 'Ed Williams',
        'Trent Walton', 'Jeremy Turner', 'Megham Armstrong', 'Ed Williams'
      ];

      var status = [
        'Awaiting Approval', 'Denied', 'Approved', 'Denied',
        'Awaiting Approval', 'Awaiting Approval', 'Denied', 'Approved',
        'Approved', 'Awaiting Approval', 'Awaiting Approval', 'Denied'
      ];

      this.getEmployees = function(callback) {
        var employees = [];
        angular.forEach(nominees, function(nominee, index){
          var employee = angular.copy(template);
          employee.id = index;
          employee.first = nominee.first;
          employee.last = nominee.last;
          employee.title = nominee.title;
          employee.nominator = {'name': nominators[index]};
          employee.nomStatus = status[index];
          employees.push(employee);
        });
        callback(employees);
      };

      this.queryEmployee = function(callback, id) {
        var employee = angular.copy(template);
        if(!id) {id = 0;}
        employee.id = id;
        employee.first = nominees[id].first;
        employee.last = nominees[id].last;
        employee.title = nominees[id].title;
        employee.nominator = {'name': nominators[id]};
        employee.nomStatus = status[id];
        callback(employee);
      };
    });
})();