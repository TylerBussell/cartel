'use strict';

angular.module('myApp.analysisView', ['ngRoute', 'highcharts-ng', "ngTable"])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/analysisView', {
    templateUrl: 'analysisView/analysisView.html',
    controller: 'AnalysisViewCtrl'
  });
}])

.controller('AnalysisViewCtrl', ['$scope', 'NgTableParams', 'cartelAPI', function($scope, NgTableParams, cartelAPI) {

    $scope.options = {
        type: 'column'
    }

    $scope.highchartsNG = {
        options: {
            chart: {
                type: 'column'
            }
        },
        series: [{
        	name: "Trump Sentiment Analysis",
            data: [10, 15, 12, 8, 7, 1, 15, 10 , 8, 13]
        },
        {
        	name: "Sanders Sentiment Analysis",
            data: [8, 10, 6, 15, -1, 0, 3, 18 , 20, 10]
        }],
        yAxis: {
            title: {
                text: 'Sentiment'
            }
        },
        title: {
            text: 'Twitter Results for Trump'
        },
        xAxis: {
            categories: [
                'Jan',
                'hot',
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
    	console.log("Run Query Button Clicked");
    };
    
}]);