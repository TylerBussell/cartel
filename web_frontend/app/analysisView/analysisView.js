'use strict';

angular.module('myApp.analysisView', ['ngRoute', 'highcharts-ng', "ngTable", 'ngtweet'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/analysisView/:viewParam', {
    templateUrl: 'analysisView/analysisView.html',
    controller: 'AnalysisViewCtrl'
  });
}])

.controller('AnalysisViewCtrl', ['$scope', 'NgTableParams', 'cartelAPITrump', 'cartelAPIHillary', 'cartelAPIBernie', 'cartelAPICruz', 'cartelAPIDemocrat', 'cartelAPIRepublican', '$http', '$routeParams',
                                 function($scope, NgTableParams, cartelAPITrump, cartelAPIHillary, cartelAPIBernie, cartelAPICruz, cartelAPIDemocrat, cartelAPIRepublican, $http, $routeParams) {

	$scope.dataLoaded = false;
	$scope.hideChart = true;
	
	var view = $routeParams.viewParam;
	
    $scope.options = {
        type: 'column'
    }
    
    $scope.chartTitle = null;
    $scope.tableData = null;
    $scope.color = null;
    
    switch (view) {
    	case "trump":
    		$scope.chartTitle = "Donald Trump";
    		cartelAPITrump.queryAll()
	    		.$promise.then(
	    			function( value ) {
	    				$scope.tableData = value;
	    				$scope.color = "#C6151D";
	    				$scope.buildChartBar();
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
	    				$scope.tableData = value;
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
	    				$scope.tableData = value;
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
	    				$scope.tableData = value;
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
	    				$scope.tableData = value;
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
	    				$scope.tableData = value;
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
    	
    	$scope.tweetIDs1 = [];
    	$scope.tweetIDs2 = [];
    	
    	var tweetsLength = $scope.tableData.length
    	
    	for (var i = 0; i < tweetsLength; i++) {
    		if ( i < (tweetsLength / 2) ) {
    			$scope.tweetIDs1.push($scope.tableData[i].tid);
    		} else {
    			$scope.tweetIDs2.push($scope.tableData[i].tid);
    		}
    	}	
    	
    	$scope.highchartsNG = {
    	        options: {
    	            chart: {
						backgroundColor: 'rgba(5, 5, 5, 0.7)',
    	                type: 'column',
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
    	            data: [10, 15, 12, 8, 7, 1, 15, 10 , 8, 13]
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
    	                'Jan',
    	                'Feb',
    	                'Mar',
    	                'Apr',
    	                'May',
    	                'Jun',
    	                'Jul',
    	                'Aug',
    	                'Sep',
    	                'Oct',
    	                'Nov',
    	                'Dec'
    	            ],
    	            crosshair: true
    	        },
    	        loading: false
    	    }
    	
    	$scope.dataLoaded = true;
    	$scope.hideChart = false;

    }
    
    $scope.buildChartLine = function() {
    	
    	$scope.tweetIDs1 = [];
    	$scope.tweetIDs2 = [];
    	
    	var tweetsLength = $scope.tableData.length
    	
    	for (var i = 0; i < tweetsLength; i++) {
    		if ( i < (tweetsLength / 2) ) {
    			$scope.tweetIDs1.push($scope.tableData[i].tid);
    		} else {
    			$scope.tweetIDs2.push($scope.tableData[i].tid);
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
    	            data: [10, 15, 12, 8, 7, 1, 15, 10 , 8, 13]
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
    	                'Jan',
    	                'Feb',
    	                'Mar',
    	                'Apr',
    	                'May',
    	                'Jun',
    	                'Jul',
    	                'Aug',
    	                'Sep',
    	                'Oct',
    	                'Nov',
    	                'Dec'
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
    	$scope.$apply();
    }
    
    $scope.toggleBar = function() {
    	$scope.buildChartBar();
    	$scope.$apply();
    }
    
    $(function() {
        $( "#datepickerStart" ).datepicker( { dateFormat: 'dd-mm-yy' } );
        $( "#datepickerEnd" ).datepicker( { dateFormat: 'dd-mm-yy' } );
    });
}]);