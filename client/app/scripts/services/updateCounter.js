'use strict';

/**
 * @ngdoc function
 * @name ferariApp.service:UpdateCounter
 * @description: Service for counting incoming events
 * # UpdateCounter
 * Service of the ferariApp
 */

angular.module('ferariApp')
    .factory('UpdateCounter', ['$http', 'socketio', function ($http, socketio) {

    	// return available functions for use in the controllers
	    return ({
	      countRealTime: countRealTime,
	      inSixHours: inSixHours,
	      in24Hours: in24Hours
	    });

	    function countRealTime() {
	      	var countToTotal  = { count: 0 };

	        socketio.on('message', function (msg) {
	            countToTotal.count += 1;
	        });
	        return countToTotal ;
	    }

	    function inSixHours() {
	    	var countInSixHours = {count: 0};

	    	$http.get('/countSixHours')
		      // handle success
		      .success(function (data) {
		      	var data = JSON.stringify(data[0].count);
		        countInSixHours.count += data;
		      })
		      // handle error
		      .error(function (data) {
		        
		      });

		      return countInSixHours ;
	    }

	    function in24Hours() {
	    	var countIn24Hours = {count: 0};

	    	$http.get('/count24hours')
		      // handle success
		      .success(function (data) {
		      	var data = JSON.stringify(data[0].count);
		        countIn24Hours.count += data;
		      })
		      // handle error
		      .error(function (data) {
		        
		      });

		      return countIn24Hours ;
	    }
    
}]);