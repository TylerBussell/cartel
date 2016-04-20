var twitterServices = angular.module('myApp.cartelServices', ['ngResource']);

twitterServices.factory('cartelAPIAll', ['$resource',
  function($resource){
    return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com', {}, {
      queryAll: {method:'GET', isArray:true}
    });
}]);

twitterServices.factory('cartelAPI', ['$resource',
  function($resource){
    return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com', {}, {
        queryStats: {method:'GET', params:{terms:'terms', startDate:'startDate', endDate:'endDate'}, isArray:true}
    });
}]);
