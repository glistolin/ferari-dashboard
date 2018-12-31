 'use strict';

/**
 * @ngdoc function
 * @name ferariApp.controller:EventCounterCtrl
 * @description: Controller for getting data from UpdateCouter service
 * # EventCounterCtrl
 * Service of the ferariApp
 */

 angular.module('ferariApp')
	.controller('EventCounterCtrl', ['$scope', 'UpdateCounter',  
		function($scope, UpdateCounter) {

            //call countRealTime from service
            $scope.countToTotal  = UpdateCounter.countRealTime();

    		//call inSixHours from service
    		$scope.countInSixHours = UpdateCounter.inSixHours();

    		//call in24Hours from service
    		$scope.countIn24Hours = UpdateCounter.in24Hours();
	}]); 
	

