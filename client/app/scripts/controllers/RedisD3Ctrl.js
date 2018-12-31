'use strict'

angular.module('ferariApp')
.controller('RedisToD3Ctrl', ['$scope', 'socketio',
	function($scope, socketio){

		socketio.on('message', function (msg) {
			var data = msg.data;
			
			$http({
		    	method: 'GET',
		    	url: '/onehour'	
		    }).then(function requstData( json ) {
		        $scope.data = formatData(json.data);  // format received data

		        // generate chart
		        $scope.mini_onehour = c3.generate({
					bindto: d3.select('#mini_onehour'),
					size: {
						height: 88 
					},
					data: {
						json: $scope.data,
						keys: {
						    value: ['FrequentLongCallsAtNight', 'LongCallAtNight', 'FrequentLongCalls', 'FrequentEachLongCall', 'ExpensiveCalls'],
						},
						type: 'bar',
						colors: {
						    FrequentLongCallsAtNight: '#3F51B5',
						    LongCallAtNight: '#FF4081',
						    FrequentLongCalls: '#cddc39',
						    FrequentEachLongCall: '#7b1fa2',
						    ExpensiveCalls: '#ff5722',
						    data6: '#009688' 
						}
					},
					tooltip: {
					  show: true
					},
					bar: {
						width: {
							ratio: 0.5 
						}
					},
					axis: {
						x: {
						    show: false
						},
						y: {
						    show: false
						}
					}, 
					legend: {
						//bindto: d3.select("#mini-footer")
						show: false
					}
		        });
		      },

		      function ( err ) {
		        console.log(err);   // log if an error occurs
		      });
		      
		     //refresh after X ms
		     setTimeout(requstData, 1000);

		    // function that take you raw data into input and return a c3 compatible array
		    function formatData ( json ) {
		      var formattedData = [],
		          object        = {};

		      // fill object with data
		      angular.forEach(json, function(row) {
		        if (row.hasOwnProperty('DERIVED_EVENT_NAME') && row.hasOwnProperty('NO')) {
		          this[row.DERIVED_EVENT_NAME] = row.NO;
		        }
		      },object);

		      formattedData.push(object); // push c3 object in the array

		      return formattedData;
		    }
	});
}]);