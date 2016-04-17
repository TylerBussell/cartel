'use strict';

angular.module('myApp.teampage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/teampage', {
    templateUrl: 'teampage/teampage.html',
    controller: 'TeamPageCtrl'
  });
}])

.controller('TeamPageCtrl', ['$scope', function($scope) {
	
}]);