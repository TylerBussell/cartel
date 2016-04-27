'use strict';

angular.module('myApp.analysisView', ['ngRoute', 'highcharts-ng', "ngTable", 'ngtweet'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/analysisView/:viewParam', {
    templateUrl: 'analysisView/analysisView.html',
    controller: 'AnalysisViewCtrl'
  });
}])

.controller('AnalysisViewCtrl', ['$scope', 'NgTableParams', 'cartelAPITrump', 'cartelAPIHillary', 'cartelAPIBernie', 'cartelAPICruz', 'cartelAPIDemocrat', 'cartelAPIRepublican', 'cartelAPITrumpAggregate', 'cartelAPIHillaryAggregate', 'cartelAPIBernieAggregate', 'cartelAPICruzAggregate', '$http', '$routeParams',
                                 function($scope, NgTableParams, cartelAPITrump, cartelAPIHillary, cartelAPIBernie, cartelAPICruz, cartelAPIDemocrat, cartelAPIRepublican, cartelAPITrumpAggregate, cartelAPIHillaryAggregate, cartelAPIBernieAggregate, cartelAPICruzAggregate, $http, $routeParams) {

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
    		cartelAPIHillaryAggregate.queryAll() 
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
    		cartelAPIHillary.queryAll()
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
    	case "sanders":
    		$scope.chartTitle = "Bernie Sanders";
    		cartelAPIBernieAggregate.queryAll()
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
    		cartelAPIBernie.queryAll()
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
    	case "cruz":
    		$scope.chartTitle = "Ted Cruz";
    		cartelAPICruzAggregate.queryAll()
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
    		cartelAPICruz.queryAll()
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
    
    $scope.createDataSets = function() {
    	$scope.positiveSentimentArray = [];
    	$scope.negativeSentimentArray = [];
    	
    	for (var i = 0; i < $scope.chartData.length; i++) {
    		var baseDate = Date.UTC(2016, 3, 16);
    		baseDate = baseDate + ($scope.chartData[i].datetime_block*60*60*1000);
    		var posDateSentiment = [baseDate, $scope.chartData[i].avg_pos_sentiment.toFixed(3)/1];
    		var negDateSentiment = [baseDate, $scope.chartData[i].avg_neg_sentiment.toFixed(3)/1];
    		$scope.positiveSentimentArray.push(posDateSentiment);
    		$scope.negativeSentimentArray.push(negDateSentiment);
    	}
    }
    
    $scope.displayTweets = function() {
	    $scope.tweetIDs1 = [];
		$scope.tweetIDs2 = [];
		
		var tweetsLength = $scope.tweetData.length
		
		$scope.tweetScatterData = [];
		
		for (var i = 0; i < tweetsLength; i++) {
			if ( i < (tweetsLength / 2) ) {
				$scope.tweetIDs1.push($scope.tweetData[i].tid);
			} else {
				$scope.tweetIDs2.push($scope.tweetData[i].tid);
			}
			$scope.tweetScatterData.push([$scope.tweetData[i].sentiment.toFixed(2)/1, $scope.tweetData[i].text.length])
		}	
		
		$scope.tweetDataLoaded = false;
		$scope.dataLoaded = true;
    }
    
    $scope.buildChartBar = function() {
    	
    	$scope.createDataSets();
    	
    	$scope.highchartsNG = {
    	        options: {
    	            chart: {
						backgroundColor: 'rgba(34, 34, 34, 1)',
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
    	        	name: "Negative Sentiment",
    	        	color: $scope.color,
    	        	borderColor: $scope.color,
    	            data: $scope.negativeSentimentArray
    	        },{
    	        	name: "Positive Sentiment",
    	        	color: '#003f74',
    	        	borderColor: '#003f74',
    	            data: $scope.positiveSentimentArray
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
    	            },
    	            gridLineColor: 'transparent'
    	        },
    	        title: {
    	        	y: 20,
					style: {
						color: '#FFF'
					},
    	            text: 'Public Twitter Opinion of ' + $scope.chartTitle + ' Over Time'
    	        },
    	        xAxis: {
    	        	labels: {
	    	        	style: {
							color: '#FFF'
						}
    	        	},
    	        	type: 'datetime',
    	            crosshair: true
    	        },
    	        loading: false
    	    }
    	
    	$scope.chartDataLoaded = false;
    	$scope.dataLoaded = true;

    }
    
    $scope.buildChartLine = function() {
    	
    	$scope.createDataSets();
    	
    	$scope.highchartsNG = {
    	        options: {
    	            chart: {
						backgroundColor: 'rgba(34, 34, 34, 1)',
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
    	        	name: "Negative Sentiment",
    	        	color: $scope.color,
    	        	borderColor: $scope.color,
    	            data: $scope.negativeSentimentArray
    	        },{
    	        	name: "Positive Sentiment",
    	        	color: '#003f74',
    	        	borderColor: '#003f74',
    	            data: $scope.positiveSentimentArray
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
    	            },
    	            gridLineColor: 'transparent'
    	        },
    	        title: {
    	        	y: 20,
					style: {
						color: '#FFF'
					},
    	            text: 'Public Twitter Opinion of ' + $scope.chartTitle + ' Over Time'
    	        },
    	        xAxis: {
    	        	labels: {
	    	        	style: {
							color: '#FFF'
						}
    	        	},
    	        	type: 'datetime',
    	            crosshair: true
    	        },
    	        loading: false
    	    }
    	
    	$scope.chartDataLoaded = false;
    	$scope.dataLoaded = true;

    }
    
    $scope.buildChartScatter = function() {
    	
    	$scope.createDataSets();
    	
    	$scope.highchartsNG = {
    	        options: {
    	            chart: {
						backgroundColor: 'rgba(34, 34, 34, 1)',
    	                type: 'scatter',
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
    	        	name: "Latest Tweets",
    	        	color: $scope.color,
    	        	borderColor: $scope.color,
    	            data: $scope.tweetScatterData
    	        }],
    	        yAxis: {
    	        	labels: {
	    	        	style: {
							color: '#FFF'
						}
    	        	},
    	            title: {
    	                text: 'Length',
    	                style: {
							color: '#FFF'
						}
    	            },
    	            gridLineColor: 'transparent'
    	        },
    	        title: {
    	        	y: 20,
					style: {
						color: '#FFF'
					},
    	            text: 'Public Twitter Opinion of ' + $scope.chartTitle + ' Over Time'
    	        },
    	        xAxis: {
    	        	title: {
    	                text: 'Sentiment',
    	                style: {
							color: '#FFF'
						}
    	            },
    	        	labels: {
	    	        	style: {
							color: '#FFF'
						}
    	        	},
    	            crosshair: true
    	        },
    	        loading: false
    	    }
    	
    	$scope.chartDataLoaded = false;
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
    	        	name: "Avg Sentiment",
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
    	            text: 'Public Twitter Opinion of ' + $scope.chartTitle + ' Over Time'
    	        },
    	        xAxis: {
    	        	labels: {
	    	        	style: {
							color: '#FFF'
						}
    	        	},
    	            categories: [
	 	                'April 15',
		                'April 17',
		                'April 19',
		                'April 21',
		                'April 23',
		                'April 25'
    	            ],
    	            crosshair: true
    	        },
    	        loading: false
    	    }
    	
    	$scope.dataLoaded = true;
    	$scope.hideChart = false;

    }
    
    $(function() {
        $( "#datepickerStart" ).datepicker( { dateFormat: 'dd-mm-yy' } );
        $( "#datepickerEnd" ).datepicker( { dateFormat: 'dd-mm-yy' } );
    });
}]);