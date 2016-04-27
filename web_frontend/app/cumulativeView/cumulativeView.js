/**
 * 
 */
'use strict';

angular.module('myApp.cumulativeView', ['ngRoute', 'highcharts-ng', "ngTable", 'ngtweet'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cumulativeView', {
    templateUrl: 'cumulativeView/cumulativeView.html',
    controller: 'CumulativeViewCtrl'
  });
}])

.controller('CumulativeViewCtrl', ['$scope', 'cartelAPIAll', '$http', '$routeParams', function($scope, cartelAPIAll, $http, $routeParams) {
	
	$scope.chartDataLoaded = true;
	$scope.dataLoaded = false;
	$scope.currentChart = null;
	
	$scope.chartTitle = "All Candidates Compared";
	cartelAPIAll.queryAll()
		.$promise.then(
			function( value ) {
				$scope.chartData = value;
				$scope.createCumulativeDataArray();
				$scope.buildCumulativeNegativeChart();
			},
			function( error ) {
				console.log( "Bad Request" );
			}
	);
	
	 $scope.createCumulativeDataArray = function() {
	    	$scope.trumpNegativeCumulative = [];
	    	$scope.trumpTweetCumulative = [];
	    	$scope.clintonNegativeCumulative = [];
	    	$scope.clintonTweetCumulative = [];
	    	$scope.sandersNegativeCumulative = [];
	    	$scope.sandersTweetCumulative = [];
	    	$scope.cruzNegativeCumulative = [];
	    	$scope.cruzTweetCumulative = [];
	    	$scope.trumpPositiveCumulative = [];
	    	$scope.clintonPositiveCumulative = [];
	    	$scope.sandersPositiveCumulative = [];
	    	$scope.cruzPositiveCumulative = [];
	    	
	    	for (var i = 0; i < $scope.chartData.length; i++) {
	    		var baseDate = Date.UTC(2016, 3, 16);
	    		baseDate = baseDate + ($scope.chartData[i].datetime_block*60*60*1000);
	    		var candidateName = $scope.chartData[i].candidate
	    		switch (candidateName) {
	    			case "trump":
	    				$scope.trumpPositiveCumulative.push([baseDate, $scope.chartData[i].avg_pos_sentiment.toFixed(3)/1]);
	    	    		$scope.trumpNegativeCumulative.push([baseDate, $scope.chartData[i].avg_neg_sentiment.toFixed(3)/1]);
	    	    		$scope.trumpTweetCumulative.push([baseDate, $scope.chartData[i].count_pos_sentiment+$scope.chartData[i].count_neg_sentiment]);
	    	    		break;
	    			case "bernie":
	    				$scope.sandersPositiveCumulative.push([baseDate, $scope.chartData[i].avg_pos_sentiment.toFixed(3)/1]);
	    	    		$scope.sandersNegativeCumulative.push([baseDate, $scope.chartData[i].avg_neg_sentiment.toFixed(3)/1]);
	    	    		$scope.sandersTweetCumulative.push([baseDate, $scope.chartData[i].count_pos_sentiment+$scope.chartData[i].count_neg_sentiment]);
	    	    		break;
	    			case "hillary":
	    				$scope.clintonPositiveCumulative.push([baseDate, $scope.chartData[i].avg_pos_sentiment.toFixed(3)/1]);
	    	    		$scope.clintonNegativeCumulative.push([baseDate, $scope.chartData[i].avg_neg_sentiment.toFixed(3)/1]);
	    	    		$scope.clintonTweetCumulative.push([baseDate, $scope.chartData[i].count_pos_sentiment+$scope.chartData[i].count_neg_sentiment]);
	    	    		break;
	    			case "cruz":
	    				$scope.cruzPositiveCumulative.push([baseDate, $scope.chartData[i].avg_pos_sentiment.toFixed(3)/1]);
	    	    		$scope.cruzNegativeCumulative.push([baseDate, $scope.chartData[i].avg_neg_sentiment.toFixed(3)/1]);
	    	    		$scope.cruzTweetCumulative.push([baseDate, $scope.chartData[i].count_pos_sentiment+$scope.chartData[i].count_neg_sentiment]);
	    	    		break;
	    		}
	    	}
	    	
	 } 
	 
	 $scope.buildCumulativeNegativeChart = function() {
		 
		 	$scope.currentChart = 'neg';
		 
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
	        	        },
	        	        plotOptions: {
	        	        	series: {
		        	        	marker: {
		                            enabled: false
		                        }
	        	        	}
	        	        },
	        	        tooltip: {
	        	            shared:true
	        	        }
	    	        },
	    	        series: [{
	    	        	name: "Trump Avg - Sentiment",
	    	            data: $scope.trumpNegativeCumulative
	    	        },{
	    	        	name: "Bernie Avg - Sentiment",
	    	            data: $scope.sandersNegativeCumulative
	    	        },
	    	        {
	    	        	name: "Clinton Avg - Sentiment",
	    	            data: $scope.clintonNegativeCumulative
	    	        },{
	    	        	name: "Cruz Avg - Sentiment",
	    	            data: $scope.cruzNegativeCumulative
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
	    	            text: 'Average Negative Sentiment of ' + $scope.chartTitle + ' Over Time'
	    	        },
	    	        xAxis: {
	    	        	labels: {
		    	        	style: {
								color: '#FFF'
							}
	    	        	},
	    	        	type: 'datetime',
	    	            crosshair: true,
	    	            min: $scope.startDate,
	    	            max: $scope.endDate
	    	        },
	    	        loading: false
	    	    }
	    	
	    	$scope.chartDataLoaded = false;
	    	$scope.dataLoaded = true;
	    }
	 
	 	$scope.buildCumulativeCountChart = function() {
	 		
	 		$scope.currentChart = 'count';
	 		
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
	        	        },
	        	        plotOptions: {
	        	        	series: {
		        	        	marker: {
		                            enabled: false
		                        }
	        	        	}
	        	        },
	        	        tooltip: {
	        	            shared:true
	        	        }
	    	        },
	    	        series: [{
	    	        	name: "Trump Avg Tweet Count",
	    	            data: $scope.trumpTweetCumulative
	    	        },{
	    	        	name: "Bernie Avg Tweet Count",
	    	            data: $scope.sandersTweetCumulative
	    	        },
	    	        {
	    	        	name: "Clinton Avg Tweet Count",
	    	            data: $scope.clintonTweetCumulative
	    	        },{
	    	        	name: "Cruz Avg Tweet Count",
	    	            data: $scope.cruzTweetCumulative
	    	        }],
	    	        yAxis: {
	    	        	labels: {
		    	        	style: {
								color: '#FFF'
							}
	    	        	},
	    	            title: {
	    	                text: '# of Tweets',
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
	    	            text: 'Average Tweet Counts of ' + $scope.chartTitle + ' Over Time'
	    	        },
	    	        xAxis: {
	    	        	labels: {
		    	        	style: {
								color: '#FFF'
							}
	    	        	},
	    	        	type: 'datetime',
	    	            crosshair: true,
	    	            min: $scope.startDate,
	    	            max: $scope.endDate
	    	        },
	    	        loading: false
	    	    }
	    	
	    	$scope.chartDataLoaded = false;
	    	$scope.dataLoaded = true;
	    }
	 	
	 	$scope.buildCumulativePositiveChart = function() {
	 		
	 		$scope.currentChart = 'pos';
	 		
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
	        	        },
	        	        plotOptions: {
	        	        	series: {
		        	        	marker: {
		                            enabled: false
		                        }
	        	        	}
	        	        },
	        	        tooltip: {
	        	            shared:true
	        	        }
	    	        },
	    	        series: [{
	    	        	name: "Trump Avg + Sentiment",
	    	            data: $scope.trumpPositiveCumulative
	    	        },{
	    	        	name: "Bernie Avg + Sentiment",
	    	            data: $scope.sandersPositiveCumulative
	    	        },
	    	        {
	    	        	name: "Clinton Avg + Sentiment",
	    	            data: $scope.clintonPositiveCumulative
	    	        },{
	    	        	name: "Cruz Avg + Sentiment",
	    	            data: $scope.cruzPositiveCumulative
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
	    	            text: 'Average Positive Sentiment of ' + $scope.chartTitle + ' Over Time'
	    	        },
	    	        xAxis: {
	    	        	labels: {
		    	        	style: {
								color: '#FFF'
							}
	    	        	},
	    	        	type: 'datetime',
	    	            crosshair: true,
	    	            min: $scope.startDate,
	    	            max: $scope.endDate
	    	        },
	    	        loading: false
	    	    }
	    	
	    	$scope.chartDataLoaded = false;
	    	$scope.dataLoaded = true;
	    }
	 	
	 	$scope.changeDates = function() {
	    	$scope.startDate = Date.parse( $( "#datepickerStart" ).val() );
	    	$scope.endDate = Date.parse( $( "#datepickerEnd" ).val() );
	    	switch ($scope.currentChart) {
	    		case 'neg':
	    			$scope.buildCumulativeNegativeChart();
	    			break;
	    		case 'pos':
	    			$scope.buildCumulativePositiveChart();
	    			break;
	    		case 'count':
	    			$scope.buildCumulativeCountChart()
	    			break;
	    	}
	    }
	 	
	 	$(function() {
	    	$( "#datepickerStart" ).datetimepicker({
	    		showMinute: false,
	    		minDate: new Date(2016, 3, 16, 0, 0),
	    		maxDate: new Date()
	    	});
	    	$( "#datepickerEnd" ).datetimepicker({
	    		showMinute: false,
	    		minDate: new Date(2016, 3, 16, 0, 0),
	    		maxDate: new Date()
	    	});
	    });
	  	
}])