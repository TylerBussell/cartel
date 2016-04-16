var twitterServices = angular.module('myApp.cartelServices', ['ngResource']);

twitterServices.factory('cartelAPI', ['$resource',
  function($resource){
    return $resource('http://tempurl.com/term/:term/startDate/:startDate/endDate/:endDate', {}, {
      queryStats: {method:'GET', params:{terms:'terms', startDate:'startDate', endDate:'endDate'}, isArray:true}
    });
}]);