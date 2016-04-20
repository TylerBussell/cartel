'use strict';

angular.module('myApp.analysisView', ['ngRoute', 'highcharts-ng', "ngTable"])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/analysisView', {
    templateUrl: 'analysisView/analysisView.html',
    controller: 'AnalysisViewCtrl'
  });
}])

.controller('AnalysisViewCtrl', ['$scope', 'NgTableParams', 'cartelAPIAll', function($scope, NgTableParams, cartelAPIAll) {

	$scope.dataLoaded = true;
	
    $scope.options = {
        type: 'column'
    }
    
    $scope.highchartsNG = {
	        options: {
	            chart: {
	                type: 'column',
	                marginTop: 50
	            }
	        },
	        series: [{
	        	name: "Sample1 Sentiment Analysis",
	            data: [10, 15, 12, 8, 7, 1, 15, 10 , 8, 13]
	        },
	        {
	        	name: "Sample2 Sentiment Analysis",
	            data: [8, 10, 6, 15, -1, 0, 3, 18 , 20, 10]
	        }],
	        yAxis: {
	            title: {
	                text: 'Sentiment'
	            }
	        },
	        title: {
	            text: 'Twitter Results for Sample1, Sample2'
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
    
    var data = [
            {
    			link: "FMA_TEST",
    			text: "Blase Blase Blase"
    		},
    		{
    			link: "FMA_TEST",
    			text: "Blase Blase Blase"
    		}
    ];
    
    $scope.tableParams = new NgTableParams({
        page: 1,            // show first page
        count: 10			// count per page
    }, {
        data: data
    });
    
    $scope.runQuery = function() {
    	
    	$('#statisticDiv').hide();
    	$scope.dataLoaded = false;
    	
    	console.log("Run Query Button Clicked");
    	var input = $('#queryInput').val();
    	
    	cartelAPIAll.queryAll()
    		.$promise.then(
    			function( value ) {
    		
    			},
    			function( error ) {
    				console.log( "Bad Request" );
    			}
    		);
    	//code before the pause
		setTimeout(function(){
			$scope.highchartsNG.title = {
	            text: 'Twitter Results for ' + input
 	        },
			$scope.highchartsNG.series = [{
	    	        	name: "Trump Sentiment Analysis",
	    	            data: [10, 15, 12, 8, 7, 1, 15, 10 , 8, 13]
	    	        },
	    	        {
	    	        	name: "Sanders Sentiment Analysis",
	    	            data: [8, 10, 6, 15, -1, 0, 3, 18 , 20, 10]
	    	        }];
			
			 $scope.dataLoaded = true;
			 $scope.$apply();
			$('#statisticDiv').show();
		}, 2000);
    
    };
    
    $scope.toogleLine = function() {
    	$scope.highchartsNG.options = {
    	    chart: {
    	        type: 'line',
    	        marginTop: 50
    	    }
    	}
    	$scope.$apply();
    }
    
    $scope.toogleBar = function() {
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