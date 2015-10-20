(function() {
  'use strict';
  angular.module('presidentsClubApp')
    .service('demoService', ['$rootScope', function($rootScope) {
      
      var data = [];
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

      var nominees = [
        {salutation: {id: 0, name: 'Mr.'},  number: '225087', first: 'BEN', last: 'EDWARDS', title:{id: 0, name: 'Accountant'}},
        {salutation: {id: 3, name: 'Dr.'},  number: '155084', first: 'MATTHEW', last: ' TYRELL', title:{id: 1, name: 'Account Manager' }},
        {salutation: {id: 2, name: 'Mrs.'}, number: '233087', first: 'ALLISON', last: 'CAMPBELL', title:{id: 2, name: 'District Sales Manager'}},
        {salutation: {id: 0, name: 'Mr.'},  number: '234086', first: 'JESSE', last: 'BENNETT-CHAMBERLAIN', title:{id: 3, name: 'Product Designer'}},
        {salutation: {id: 0, name: 'Mr.'},  number: '455087', first: 'KIRK', last: 'HERRON', title:{id: 4, name: 'Product Specialist'}},
        {salutation: {id: 0, name: 'Mr.'},  number: '355087', first: 'TAYLOR', last: 'BOSWELL', title:{id: 0, name: 'Account Manager'}},
        {salutation: {id: 1, name: 'Ms.'},  number: '255344', first: 'JENNIFER', last: 'BRADSHAW', title:{id: 1, name: 'Account Manager'}},
        {salutation: {id: 0, name: 'Mr.'},  number: '255287', first: 'BRIAN', last: 'KAUFMAN', title:{id: 2, name: 'District Sales Managr'}},
        {salutation: {id: 0, name: 'Mr.'},  number: '252587', first: 'CARLOS', last: 'SANCHEZ', title:{id: 3, name: 'Product Designer' }},
        {salutation: {id: 0, name: 'Mr.'},  number: '285083', first: 'WEYLAND', last: 'ERICKSON', title:{id: 4, name: 'Product Specialist'}},
        {salutation: {id: 1, name: 'Ms.'},  number: '143087', first: 'AMY', last: 'PARKER', title:{id: 0, name: 'Accountant'}},
        {salutation: {id: 3, name: 'Dr.'},  number: '255025', first: 'DUSTIN', last: 'ANDERSON', title:{id: 1, name: 'Account Manager'}}
      ];

      var details = {
        so: {id: '0', name: 'LSAG/ACG'},
        region: {id: '0', name: 'Americas'}, 
        country: {id: '0', name: 'USA'},
        address: '5301 Stevens Creek Blvd., Santa Clara CA, 95051',
        officeTel: '8774244536', mobileTel: '4083458886',
        recurringWinner: 'Yes',
        performance: {salesQuota: 1500000, sales: 1700000, percentOver: 110, percentLast: 103},
        winCount: {id: '1', name: '2'},
        years: '2010, 2011'
      };

      var comment = 'Curabitur blandit tempus porttitor. Maecenas faucibus mollis interdum. Nullam id dolor id nibh ultricies' +
      'vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit' +
      'amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec ullamcorper nulla non metus auctor' +
      'fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.';
      
      var nominators = [
        {first: 'Trent', last: 'Walton', email: '', phone: '8774244536'}, {first: 'Jeremy', last: 'Turner', email: '', phone: '8774244536'}, {first: 'Megham', last: 'Armstrong', email: '', phone: '8774244536'}, {first: 'Ed', last: 'Williams', email: '', phone: '8774244536'},
        {first: 'Trent', last: 'Walton', email: '', phone: '8774244536'}, {first: 'Jeremy', last: 'Turner', email: '', phone: '8774244536'}, {first: 'Megham', last: 'Armstrong', email: '', phone: '8774244536'}, {first: 'Ed', last: 'Williams', email: '', phone: '8774244536'},
        {first: 'Trent', last: 'Walton', email: '', phone: '8774244536'}, {first: 'Jeremy', last: 'Turner', email: '', phone: '8774244536'}, {first: 'Megham', last: 'Armstrong', email: '', phone: '8774244536'}, {first: 'Ed', last: 'Williams', email: '', phone: '8774244536'}
      ];

      this.makeNominees = function(){
        angular.forEach(nominees, function(nominee, index){
          var chosenValue = Math.random() < 0.5 ? 'Approved' : 'Denied';
          var regions = [{
                    id: 0,
                    name: 'AFO'
                },{
                    id: 1,
                    name: 'China'
                },{
                    id: 2,
                    name: 'EMEAI'
                },{
                    id: 3,
                    name: 'Japan'
                },{
                    id: 4,
                    name: 'SAPK'
                }];
          var region = regions[Math.floor(Math.random() * regions.length)];
          var employee = angular.copy(template);
          employee.id = index;
          employee.number = nominees[index].number;
          employee.salutation = nominees[index].salutation;
          employee.first = nominees[index].first;
          employee.last = nominees[index].last;
          employee.title = nominees[index].title;
          employee.email = nominees[index].first+'@agilent.com';
          employee.so = details.so;
          employee.region = region; //details.region;
          employee.country = details.country;
          employee.address = details.address;
          employee.officeTel = details.officeTel;
          employee.mobileTel = details.mobileTel;
          employee.recurringWinner = details.recurringWinner;
          employee.winCount = details.winCount;
          employee.years = details.years;
          employee.performance.salesQuota = details.performance.salesQuota;
          employee.performance.sales = details.performance.sales;
          employee.performance.percentOver = details.performance.percentOver;
          employee.performance.percentLast = details.performance.percentLast;
          employee.comments.performance = comment;
          employee.comments.planning = comment;
          employee.comments.relationship = comment;
          employee.comments.behavior = comment;
          employee.comments.leadership = comment;
          employee.nomStatus = ($rootScope.globals.currentUser.authLevel === 2) ? chosenValue : 'Awaiting Approval';
          employee.nominator = {first: nominators[index].first, last: nominators[index].last, 
                                email: nominators[index].first+'@agilent.com',
                                phone: nominators[index].phone};
          employee.winner = false;
          data.push(employee);
        });
      };
      this.makeNominees();

      this.getNominees = function(callback) {
        callback(data);
      };

      this.queryNominee = function(callback, id) {
        callback(data[id]);
      };

      this.save = function(id, nominee){
        data[id] = nominee;
      };


    }]);
})();