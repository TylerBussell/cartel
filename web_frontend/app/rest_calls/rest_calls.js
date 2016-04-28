var twitterServices = angular.module('myApp.cartelServices', ['ngResource']);
var apiURL = 'http://ec2-52-32-222-112.us-west-2.compute.amazonaws.com:8888/api/'
twitterServices.factory('cartelAPIBernie', ['$resource',
  function($resource){
    return $resource(apiURL+'tweets/bernie', {}, {
      queryAll: {method:'GET', isArray:true}
    });
  }
]);

twitterServices.factory('cartelAPIBernieAggregate', ['$resource',
    function($resource){
        return $resource(apiURL+'aggregate/bernie', {}, {
            queryAll: {method:'GET', isArray:true}
        });
    }
]);

twitterServices.factory('cartelAPIHillary', ['$resource',
    function($resource){
		return $resource(apiURL+'tweets/hillary', {}, {
			queryAll: {method:'GET', isArray:true}
	    });
	}
]);

twitterServices.factory('cartelAPIHillaryAggregate', ['$resource',
    function($resource){
	    return $resource(apiURL+'aggregate/hillary', {}, {
            queryAll: {method:'GET', isArray:true}
 	    });
 	}
]);

twitterServices.factory('cartelAPITrump', ['$resource',
    function($resource){
		return $resource(apiURL+'tweets/trump', {}, {
			queryAll: {method:'GET', isArray:true}
	    });
	}
]);

twitterServices.factory('cartelAPITrumpAggregate', ['$resource',
    function($resource){
	    return $resource(apiURL+'aggregate/trump', {}, {
            queryAll: {method:'GET', isArray:true}
   	    });
   	}
]);

twitterServices.factory('cartelAPICruz', ['$resource',
    function($resource){
		return $resource(apiURL+'tweets/cruz', {}, {
			queryAll: {method:'GET', isArray:true}
	    });
	}
]);

twitterServices.factory('cartelAPICruzAggregate', ['$resource',
    function($resource){
	    return $resource(apiURL+'aggregate/cruz', {}, {
		    queryAll: {method:'GET', isArray:true}
  	    });
  	}
]);

twitterServices.factory('cartelAPIDemocrat', ['$resource',
    function($resource){
		return $resource(apiURL+'tweets/democrat', {}, {
			queryAll: {method:'GET', isArray:true}
	    });
	}
]);

twitterServices.factory('cartelAPIDemocratAggregate', ['$resource',
    function($resource){
	    return $resource(apiURL+'aggregate/democrat', {}, {
            queryAll: {method:'GET', isArray:true}
  	    });
  	}
]);

twitterServices.factory('cartelAPIRepublican', ['$resource',
    function($resource){
		return $resource(apiURL+'tweets/republican', {}, {
			queryAll: {method:'GET', isArray:true}
	    });
	}
]);

twitterServices.factory('cartelAPIRepublicanAggregate', ['$resource',
	function($resource){
		return $resource(apiURL+'aggregate/republican', {}, {
		    queryAll: {method:'GET', isArray:true}
		});
	}
]);

twitterServices.factory('cartelAPIAll', ['$resource',
    function($resource){
	    return $resource(apiURL+'aggregate/all', {}, {
	        queryAll: {method:'GET', isArray:true}
 		});
 	}
]);