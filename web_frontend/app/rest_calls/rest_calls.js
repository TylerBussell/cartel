var twitterServices = angular.module('myApp.cartelServices', ['ngResource']);

twitterServices.factory('cartelAPIBernie', ['$resource',
  function($resource){
    return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/tweets/bernie', {}, {
      queryAll: {method:'GET', isArray:true}
    });
  }
]);

twitterServices.factory('cartelAPIBernieAggregate', ['$resource',
    function($resource){
        return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/aggregate/bernie', {}, {
            queryAll: {method:'GET', isArray:true}
        });
    }
]);

twitterServices.factory('cartelAPIHillary', ['$resource',
    function($resource){
		return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/tweets/hillary', {}, {
			queryAll: {method:'GET', isArray:true}
	    });
	}
]);

twitterServices.factory('cartelAPIHillaryAggregate', ['$resource',
    function($resource){
	    return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/aggregate/hillary', {}, {
            queryAll: {method:'GET', isArray:true}
 	    });
 	}
]);

twitterServices.factory('cartelAPITrump', ['$resource',
    function($resource){
		return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/tweets/trump', {}, {
			queryAll: {method:'GET', isArray:true}
	    });
	}
]);

twitterServices.factory('cartelAPITrumpAggregate', ['$resource',
    function($resource){
	    return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/aggregate/trump', {}, {
            queryAll: {method:'GET', isArray:true}
   	    });
   	}
]);

twitterServices.factory('cartelAPICruz', ['$resource',
    function($resource){
		return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/tweets/cruz', {}, {
			queryAll: {method:'GET', isArray:true}
	    });
	}
]);

twitterServices.factory('cartelAPICruzAggregate', ['$resource',
    function($resource){
	    return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/aggregate/cruz', {}, {
		    queryAll: {method:'GET', isArray:true}
  	    });
  	}
]);

twitterServices.factory('cartelAPIDemocrat', ['$resource',
    function($resource){
		return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/tweets/democrat', {}, {
			queryAll: {method:'GET', isArray:true}
	    });
	}
]);

twitterServices.factory('cartelAPIDemocratAggregate', ['$resource',
    function($resource){
	    return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/aggregate/democrat', {}, {
            queryAll: {method:'GET', isArray:true}
  	    });
  	}
]);

twitterServices.factory('cartelAPIRepublican', ['$resource',
    function($resource){
		return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/tweets/republican', {}, {
			queryAll: {method:'GET', isArray:true}
	    });
	}
]);

twitterServices.factory('cartelAPIRepublicanAggregate', ['$resource',
	function($resource){
		return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/aggregate/republican', {}, {
		    queryAll: {method:'GET', isArray:true}
		});
	}
]);