var twitterServices = angular.module('myApp.cartelServices', ['ngResource']);

twitterServices.factory('cartelAPIBernie', ['$resource',
  function($resource){
    return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/bernie/?format=json', {}, {
      queryAll: {method:'GET', isArray:true}
    });
  }
]);

twitterServices.factory('cartelAPIHillary', ['$resource',
    function($resource){
		return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/hillary/?format=json', {}, {
			queryAll: {method:'GET', isArray:true}
	    });
	}
]);

twitterServices.factory('cartelAPITrump', ['$resource',
    function($resource){
		return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/trump/?format=json', {}, {
			queryAll: {method:'GET', isArray:true}
	    });
	}
]);

twitterServices.factory('cartelAPICruz', ['$resource',
    function($resource){
		return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/cruz/?format=json', {}, {
			queryAll: {method:'GET', isArray:true}
	    });
	}
]);

twitterServices.factory('cartelAPIDemocrat', ['$resource',
    function($resource){
		return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/democrat/?format=json', {}, {
			queryAll: {method:'GET', isArray:true}
	    });
	}
]);

twitterServices.factory('cartelAPIRepublican', ['$resource',
    function($resource){
		return $resource('http://ec2-52-38-210-101.us-west-2.compute.amazonaws.com\:8888/api/republican/?format=json', {}, {
			queryAll: {method:'GET', isArray:true}
	    });
	}
]);