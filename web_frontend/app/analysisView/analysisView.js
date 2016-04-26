'use strict';

angular.module('myApp.analysisView', ['ngRoute', 'highcharts-ng', "ngTable", 'ngtweet'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/analysisView/:viewParam', {
    templateUrl: 'analysisView/analysisView.html',
    controller: 'AnalysisViewCtrl'
  });
}])

.controller('AnalysisViewCtrl', ['$scope', 'NgTableParams', 'cartelAPITrump', 'cartelAPIHillary', 'cartelAPIBernie', 'cartelAPICruz', 'cartelAPIDemocrat', 'cartelAPIRepublican', 'cartelAPITrumpAggregate', '$http', '$routeParams',
                                 function($scope, NgTableParams, cartelAPITrump, cartelAPIHillary, cartelAPIBernie, cartelAPICruz, cartelAPIDemocrat, cartelAPIRepublican, cartelAPITrumpAggregate, $http, $routeParams) {

	$scope.chartDataLoaded = true;
	$scope.tweetDataLoaded = true;
	$scope.dataLoaded = false;
	
	var view = $routeParams.viewParam;
	
    $scope.options = {
        type: 'column'
    }
    
    $scope.chartTitle = null;
    $scope.chartData = null;
    $scope.tweetData = null;
    $scope.color = null;
    
    switch (view) {
    	case "trump":
    		$scope.chartTitle = "Donald Trump";
    		cartelAPITrumpAggregate.queryAll()
    			.$promise.then(
	    			function( value ) {
	    				$scope.chartData = value;
	    				$scope.color = "#C6151D";
	    				console.log(value);
	    				$scope.buildChartBar();
	    			},
	    			function( error ) {
	    				console.log( "Bad Request" );
	    			}
	    	);
    		cartelAPITrump.queryAll()
	    		.$promise.then(
	    			function( value ) {
	    				$scope.tweetData = value;
	    				$scope.displayTweets();
	    			},
	    			function( error ) {
	    				console.log( "Bad Request" );
	    			}
	    	);
    		break;
    	case "clinton":
    		$scope.chartTitle = "Hillary Clinton";
    		cartelAPIHillary.queryAll()
	    		.$promise.then(
	    			function( value ) {
	    				$scope.chartData = value;
	    				$scope.color = "#C6151D";
	    				$scope.buildChartBar();
	    			},
	    			function( error ) {
	    				console.log( "Bad Request" );
	    			}
	    	);
    		break;
    	case "sanders":
    		$scope.chartTitle = "Bernie Sanders";
    		cartelAPIBernie.queryAll()
	    		.$promise.then(
	    			function( value ) {
	    				$scope.chartData = value;
	    				$scope.color = "#C6151D";
	    				$scope.buildChartBar();
	    			},
	    			function( error ) {
	    				console.log( "Bad Request" );
	    			}
	    	);
    		break;
    	case "cruz":
    		$scope.chartTitle = "Ted Cruz";
    		cartelAPICruz.queryAll()
	    		.$promise.then(
	    			function( value ) {
	    				$scope.chartData = value;
	    				$scope.color = "#C6151D";
	    				$scope.buildChartBar();
	    			},
	    			function( error ) {
	    				console.log( "Bad Request" );
	    			}
	    	);
    		break;
    	case "democrat":
    		$scope.chartTitle = "Democrat";
    		cartelAPIDemocrat.queryAll()
	    		.$promise.then(
	    			function( value ) {
	    				$scope.chartData = value;
	    				$scope.color = "#C6151D";
	    				$scope.buildChartBar();
	    			},
	    			function( error ) {
	    				console.log( "Bad Request" );
	    			}
	    	);
    		break;
    	case "republican":
    		$scope.chartTitle = "Republican";
    		cartelAPIRepublican.queryAll()
	    		.$promise.then(
	    			function( value ) {
	    				$scope.chartData = value;
	    				$scope.color = "#C6151D";
	    				$scope.buildChartBar();
	    			},
	    			function( error ) {
	    				console.log( "Bad Request" );
	    			}
	    	);
    		break;
    }
    
    $scope.buildChartBar = function() {
    	
//    	$scope.tweetIDs1 = [];
//    	$scope.tweetIDs2 = [];
//    	
//    	var tweetsLength = $scope.tweetData.length
//    	
//    	for (var i = 0; i < tweetsLength; i++) {
//    		if ( i < (tweetsLength / 2) ) {
//    			$scope.tweetIDs1.push($scope.tableData[i].tid);
//    		} else {
//    			$scope.tweetIDs2.push($scope.tableData[i].tid);
//    		}
//    	}	
    	
    	$scope.highchartsNG = {
    	        options: {
    	            chart: {
						backgroundColor: 'rgba(5, 5, 5, 0.7)',
    	                type: 'column',
    	                marginTop: 75,
						color: "#ff5656"
    	            },
    	            legend: {
        	            itemStyle: {
        	            	color: "#FFF"
        	            }
        	        }
    	        },
    	        series: [{
    	        	name: "Tweets",
    	        	color: $scope.color,
    	        	borderColor: $scope.color,
    	            data: [0.25, 0.3, 0.2, 0.4, 0.2, 0.25]
    	        }],
    	        yAxis: {
    	        	labels: {
	    	        	style: {
							color: '#FFF'
						}
    	        	},
    	            title: {
    	                text: 'Sentiment',
    	                style: {
							color: '#FFF'
						}
    	            }
    	        },
    	        title: {
    	        	y: 20,
					style: {
						color: '#FFF'
					},
    	            text: 'Sentiment Analysis for ' + $scope.chartTitle
    	        },
    	        xAxis: {
    	        	labels: {
	    	        	style: {
							color: '#FFF'
						}
    	        	},
    	            categories: [
    	                'March 1',
    	                'March 11',
    	                'March 21',
    	                'March 31',
    	                'April 11',
    	                'April 21'
    	            ],
    	            crosshair: true
    	        },
    	        loading: false
    	    }
    	
    	$scope.chartDataLoaded = false;
    	$scope.dataLoaded = true;

    }
    
    $scope.buildChartLine = function() {
    	
    	$scope.highchartsNG = {
    	        options: {
    	            chart: {
						backgroundColor: 'rgba(5, 5, 5, 0.7)',
    	                type: 'line',
    	                marginTop: 75,
						color: "#ff5656"
    	            },
    	            legend: {
        	            itemStyle: {
        	            	color: "#FFF"
        	            }
        	        }
    	        },
    	        series: [{
    	        	name: "Tweets",
    	        	color: $scope.color,
    	        	data: [0.25, 0.3, 0.2, 0.4, 0.2, 0.25]
    	        }],
    	        yAxis: {
    	        	labels: {
	    	        	style: {
							color: '#FFF'
						}
    	        	},
    	            title: {
    	                text: 'Sentiment',
    	                style: {
							color: '#FFF'
						}
    	            }
    	        },
    	        title: {
    	        	y: 20,
					style: {
						color: '#FFF'
					},
    	            text: 'Sentiment Analysis for ' + $scope.chartTitle
    	        },
    	        xAxis: {
    	        	labels: {
	    	        	style: {
							color: '#FFF'
						}
    	        	},
    	            categories: [
						'March 1',
						'March 11',
						'March 21',
						'March 31',
						'April 11',
						'April 21'
    	            ],
    	            crosshair: true
    	        },
    	        loading: false
    	    }
    	
    	$scope.chartDataLoaded = false;
    	$scope.dataLoaded = true;

    }
    
    $scope.displayTweets = function() {
	    $scope.tweetIDs1 = [];
		$scope.tweetIDs2 = [];
		
		var tweetsLength = $scope.tweetData.length
		
		for (var i = 0; i < tweetsLength; i++) {
			if ( i < (tweetsLength / 2) ) {
				$scope.tweetIDs1.push($scope.tweetData[i].tid);
			} else {
				$scope.tweetIDs2.push($scope.tweetData[i].tid);
			}
		}	
		
		$scope.tweetDataLoaded = false;
		$scope.dataLoaded = true;
    }
    
    $scope.changeDates = function() {
    	
    	$scope.tweetIDs1 = [];
    	$scope.tweetIDs2 = [];
    	
    	var tweetsLength = $scope.tweetData.length
    	
    	for (var i = 0; i < tweetsLength; i++) {
    		if ( i < (tweetsLength / 2) ) {
    			$scope.tweetIDs1.push($scope.tweetData[i].tid);
    		} else {
    			$scope.tweetIDs2.push($scope.tweetData[i].tid);
    		}
    	}	
    	
    	$scope.highchartsNG = {
    	        options: {
    	            chart: {
						backgroundColor: 'rgba(5, 5, 5, 0.7)',
    	                type: 'line',
    	                marginTop: 75,
						color: "#f00"
    	            },
    	            legend: {
        	            itemStyle: {
        	            	color: "#FFF"
        	            }
        	        }
    	        },
    	        series: [{
    	        	name: "Tweets",
    	        	color: $scope.color,
    	        	data: [0.25, 0.27, 0.25, 0.3, 0.35, 0.25]
    	        }],
    	        yAxis: {
    	        	labels: {
	    	        	style: {
							color: '#FFF'
						}
    	        	},
    	            title: {
    	                text: 'Sentiment',
    	                style: {
							color: '#FFF'
						}
    	            }
    	        },
    	        title: {
    	        	y: 20,
					style: {
						color: '#FFF'
					},
    	            text: 'Sentiment Analysis for ' + $scope.chartTitle
    	        },
    	        xAxis: {
    	        	labels: {
	    	        	style: {
							color: '#FFF'
						}
    	        	},
    	            categories: [
						'March 1',
						'March 6',
						'March 11',
						'March 16',
						'March 21',
						'March 26'
    	            ],
    	            crosshair: true
    	        },
    	        loading: false
    	    }
    	
    	$scope.dataLoaded = true;
    	$scope.hideChart = false;

    }
    
    $scope.toggleLine = function() {
    	$scope.buildChartLine();
    	//$scope.$apply();
    }
    
    $scope.toggleBar = function() {
    	$scope.buildChartBar();
    	//$scope.$apply();
    }
    
    $(function() {
        $( "#datepickerStart" ).datepicker( { dateFormat: 'dd-mm-yy' } );
        $( "#datepickerEnd" ).datepicker( { dateFormat: 'dd-mm-yy' } );
    });
}]);