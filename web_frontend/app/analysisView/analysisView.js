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
    
    switch (view) {
    	case "trump":
    		$scope.chartTitle = "Donald Trump";
    		cartelAPITrump.queryAll()
	    		.$promise.then(
	    			function( value ) {
	    				$scope.tableData = value;
	    				$scope.buildChart();
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
	    				$scope.buildChart();
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
	    				$scope.buildChart();
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
	    				$scope.buildChart();
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
	    				$scope.buildChart();
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
	    				$scope.buildChart();
	    			},
	    			function( error ) {
	    				console.log( "Bad Request" );
	    			}
	    	);
    		break;
    }
    
    $scope.buildChart = function() {
    	
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
    	                type: 'column',
    	                marginTop: 50
    	            }
    	        },
    	        series: [{
    	        	name: "Tweets",
    	            data: [10, 15, 12, 8, 7, 1, 15, 10 , 8, 13]
    	        }],
    	        yAxis: {
    	            title: {
    	                text: 'Sentiment'
    	            }
    	        },
    	        title: {
    	            text: 'Sentiment Analysis for ' + $scope.chartTitle
    	        },
    	        xAxis: {
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
    	$scope.highchartsNG.options = {
    	    chart: {
    	        type: 'line',
    	        marginTop: 50
    	    }
    	}
    	$scope.$apply();
    }
    
    $scope.toggleBar = function() {
    	$scope.highchartsNG.options = {
    	    chart: {
    	        type: 'column',
    	        marginTop: 50
    	    }
    	}
    	$scope.$apply();
    }
    
    $(function() {
        $( "#datepickerStart" ).datepicker( { dateFormat: 'dd-mm-yy' } );
        $( "#datepickerEnd" ).datepicker( { dateFormat: 'dd-mm-yy' } );
    });
}]);